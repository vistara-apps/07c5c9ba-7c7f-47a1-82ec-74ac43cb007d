import { NextRequest, NextResponse } from 'next/server';
import { generateContent, PROMPTS } from '@/lib/openai';
import { supabaseAdmin, TABLES } from '@/lib/supabase';
import { ScenarioScript } from '@/types';
import { generateId } from '@/utils/helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scenario, language = 'en', state, context } = body;

    if (!scenario || !state) {
      return NextResponse.json(
        { success: false, error: 'Scenario and state are required' },
        { status: 400 }
      );
    }

    // Check if script already exists
    const { data: existingScript } = await supabaseAdmin
      .from(TABLES.SCENARIO_SCRIPTS)
      .select('*')
      .eq('scenario', scenario)
      .eq('language', language)
      .single();

    if (existingScript) {
      return NextResponse.json({
        success: true,
        data: existingScript,
      });
    }

    // Generate script using OpenAI
    const prompt = PROMPTS.GENERATE_SCRIPT(scenario, language, state);
    const scriptText = await generateContent(prompt);

    if (!scriptText) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate script' },
        { status: 500 }
      );
    }

    // Determine category based on scenario
    let category: ScenarioScript['category'] = 'general';
    if (scenario.includes('traffic')) category = 'traffic_stop';
    else if (scenario.includes('question')) category = 'questioning';
    else if (scenario.includes('search')) category = 'search';
    else if (scenario.includes('arrest')) category = 'arrest';

    // Create the script
    const newScript: Omit<ScenarioScript, 'id'> = {
      scenario,
      language,
      script: scriptText.trim(),
      context: context || `What to say during ${scenario.replace('_', ' ')}`,
      category,
    };

    const { data: script, error } = await supabaseAdmin
      .from(TABLES.SCENARIO_SCRIPTS)
      .insert([{
        id: generateId(),
        scenario: newScript.scenario,
        language: newScript.language,
        script: newScript.script,
        context: newScript.context,
        category: newScript.category,
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save script' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: script,
    });
  } catch (error) {
    console.error('Script generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/scripts/generate - Fetch existing scripts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const scenario = searchParams.get('scenario');
    const language = searchParams.get('language') as 'en' | 'es' || 'en';
    const category = searchParams.get('category');

    let query = supabaseAdmin
      .from(TABLES.SCENARIO_SCRIPTS)
      .select('*')
      .eq('language', language);

    if (scenario) {
      query = query.eq('scenario', scenario);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data: scripts, error } = await query.order('scenario');

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch scripts' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: scripts || [],
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
