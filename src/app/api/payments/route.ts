import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createStripeCheckoutSession } from "@/lib/stripe";
import { attachStripeSessionToOrder, createPendingPayment } from "@/services";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Use POST to create a Stripe Checkout session.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await createPendingPayment(body);

    const session = await createStripeCheckoutSession({
      orderId: order.id,
      orderReference: order.reference,
      amountPence: order.totalAmountPence,
      customerEmail: order.email,
      description: `${order.registrationNumber} • ${order.crossings} crossing${order.crossings > 1 ? "s" : ""}`,
    });

    await attachStripeSessionToOrder(order.id, session.id);

    return NextResponse.json({
      ok: true,
      checkoutUrl: session.url,
      orderReference: order.reference,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: error.issues[0]?.message ?? "Invalid payment details.",
        },
        { status: 400 },
      );
    }

    const message =
      error instanceof Error ? error.message : "Unable to create checkout session.";

    return NextResponse.json(
      {
        ok: false,
        error:
          message.includes("The database is not ready yet")
            ? "Payment is temporarily unavailable because the database tables have not been created yet."
            : message,
      },
      { status: 500 },
    );
  }
}
