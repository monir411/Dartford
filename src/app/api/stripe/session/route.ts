import { NextResponse } from "next/server";
import { getStripeCheckoutSession } from "@/lib/stripe";
import { completeOrder, findOrderById, findOrderBySessionId } from "@/services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { ok: false, error: "Missing session_id." },
      { status: 400 },
    );
  }

  try {
    const session = await getStripeCheckoutSession(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { ok: false, error: "Payment has not been confirmed." },
        { status: 400 },
      );
    }

    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json(
        { ok: false, error: "Stripe session is missing order metadata." },
        { status: 400 },
      );
    }

    const order =
      (await findOrderBySessionId(session.id)) ?? (await findOrderById(orderId));

    if (!order) {
      return NextResponse.json(
        { ok: false, error: "Order not found for this Stripe session." },
        { status: 404 },
      );
    }

    if (order.stripeSessionId && order.stripeSessionId !== session.id) {
      return NextResponse.json(
        { ok: false, error: "Stripe session does not match this order." },
        { status: 409 },
      );
    }

    const updatedOrder = await completeOrder(order.id);

    return NextResponse.json({
      ok: true,
      data: {
        orderReference: updatedOrder.reference,
        amountTotal: session.amount_total,
        currency: session.currency,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email ?? updatedOrder.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unable to verify Stripe session.",
      },
      { status: 400 },
    );
  }
}
