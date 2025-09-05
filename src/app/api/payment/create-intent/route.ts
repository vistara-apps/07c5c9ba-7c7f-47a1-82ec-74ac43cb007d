import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICING, PRODUCTS } from '@/lib/stripe';
import { supabaseAdmin, TABLES } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guideId, productType = 'single_guide', userId } = body;

    if (!guideId && productType === PRODUCTS.SINGLE_GUIDE) {
      return NextResponse.json(
        { success: false, error: 'Guide ID is required for single guide purchase' },
        { status: 400 }
      );
    }

    // Determine amount based on product type
    let amount: number;
    let description: string;

    switch (productType) {
      case PRODUCTS.SINGLE_GUIDE:
        amount = PRICING.SINGLE_GUIDE;
        description = `RightsGuard - Single Guide Access`;
        break;
      case PRODUCTS.FULL_ACCESS:
        amount = PRICING.FULL_ACCESS;
        description = `RightsGuard - Full Access`;
        break;
      case PRODUCTS.INCIDENT_RECORDING:
        amount = PRICING.INCIDENT_RECORDING;
        description = `RightsGuard - Incident Recording`;
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid product type' },
          { status: 400 }
        );
    }

    // Get guide details if purchasing a single guide
    let guideDetails = null;
    if (guideId) {
      const { data: guide, error } = await supabaseAdmin
        .from(TABLES.RIGHTS_GUIDES)
        .select('*')
        .eq('guide_id', guideId)
        .single();

      if (error || !guide) {
        return NextResponse.json(
          { success: false, error: 'Guide not found' },
          { status: 404 }
        );
      }

      guideDetails = guide;
      description = `RightsGuard - ${guide.title} (${guide.state})`;
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description,
      metadata: {
        productType,
        guideId: guideId || '',
        userId: userId || '',
        appName: 'RightsGuard',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        paymentIntentId: paymentIntent.id,
        guideDetails,
      },
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
