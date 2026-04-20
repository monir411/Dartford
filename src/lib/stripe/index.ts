import Stripe from "stripe";
import { env } from "@/config/env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

export type StripeCheckoutPayload = {
  orderId: string;
  orderReference: string;
  amountPence: number;
  customerEmail: string;
  description: string;
};

export async function createStripeCheckoutSession(
  payload: StripeCheckoutPayload,
) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/cancel?order=${payload.orderReference}`,
    customer_email: payload.customerEmail,
    billing_address_collection: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: payload.amountPence,
          product_data: {
            name: "Dartford Crossing one off payment",
            description: payload.description,
          },
        },
      },
    ],
    metadata: {
      orderId: payload.orderId,
      orderReference: payload.orderReference,
    },
  });
}

export async function getStripeCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId);
}
