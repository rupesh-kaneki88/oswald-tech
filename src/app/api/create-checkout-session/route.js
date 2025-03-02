// app/api/create-checkout-session/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { price, productName } = body;
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // Change to your currency (e.g., 'inr' for Indian Rupee)
            // currency: 'inr', // Change to your currency (e.g., 'inr' for Indian Rupee)
            product_data: {
              name: productName,
            },
            unit_amount: price * 100, // Stripe uses smallest currency unit (cents, paise, etc.)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    //   success_url: `${request.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        success_url: `${request.headers.get('origin')}/payment/success?session_id=${session.id}`,
        cancel_url: `${request.headers.get('origin')}/payment/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}