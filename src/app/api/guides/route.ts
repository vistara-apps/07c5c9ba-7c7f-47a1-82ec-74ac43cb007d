import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, TABLES } from '@/lib/supabase';
import { generateContent, PROMPTS } from '@/lib/openai';
import { RightsGuide } from '@/types';
import { generateId } from '@/utils/helpers';

// GET /api/guides - Fetch available guides
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const language = searchParams.get('language') as 'en' | 'es' || 'en';
    const scenario = searchParams.get('scenario');

    let query = supabaseAdmin
      .from(TABLES.RIGHTS_GUIDES)
      .select('*')
      .eq('language', language);

    if (state) {
      query = query.eq('state', state);
    }

    if (scenario) {
      query = query.eq('scenario', scenario);
    }

    const { data: guides, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch guides' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: guides || [],
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/guides - Create a new guide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { state, scenario, language = 'en', title } = body;

    if (!state || !scenario || !title) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if guide already exists
    const { data: existingGuide } = await supabaseAdmin
      .from(TABLES.RIGHTS_GUIDES)
      .select('guide_id')
      .eq('state', state)
      .eq('scenario', scenario)
      .eq('language', language)
      .single();

    if (existingGuide) {
      return NextResponse.json(
        { success: false, error: 'Guide already exists for this state and scenario' },
        { status: 409 }
      );
    }

    // Generate content using OpenAI
    const prompt = PROMPTS.GENERATE_GUIDE_CONTENT(scenario, state, language);
    const content = await generateContent(prompt);

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate guide content' },
        { status: 500 }
      );
    }

    // Create the guide
    const newGuide: Omit<RightsGuide, 'createdAt' | 'updatedAt'> = {
      guideId: generateId(),
      state,
      title,
      content,
      language,
      scenario,
      price: 99, // $0.99 in cents
    };

    const { data: guide, error } = await supabaseAdmin
      .from(TABLES.RIGHTS_GUIDES)
      .insert([{
        guide_id: newGuide.guideId,
        state: newGuide.state,
        title: newGuide.title,
        content: newGuide.content,
        language: newGuide.language,
        scenario: newGuide.scenario,
        price: newGuide.price,
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create guide' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: guide,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
