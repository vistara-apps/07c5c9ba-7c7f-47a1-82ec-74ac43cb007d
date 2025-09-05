import Stripe from 'stripe';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Client-side Stripe configuration
export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
};

// Pricing configuration
export const PRICING = {
  SINGLE_GUIDE: 99, // $0.99 in cents
  FULL_ACCESS: 299, // $2.99 in cents
  INCIDENT_RECORDING: 50, // $0.50 in cents
} as const;

// Product metadata
export const PRODUCTS = {
  SINGLE_GUIDE: 'single_guide',
  FULL_ACCESS: 'full_access',
  INCIDENT_RECORDING: 'incident_recording',
} as const;
