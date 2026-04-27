import Link from "next/link";
import { PaymentShell } from "@/components/payment-shell";
import { getStripeCheckoutSession } from "@/lib/stripe";
import { completeOrder, findOrderById, findOrderBySessionId } from "@/services";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

function formatCurrency(amount: number | null, currency: string | null) {
  if (amount === null || !currency) {
    return null;
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

type VerificationResult =
  | {
      ok: true;
      orderReference: string;
      amountTotal: number | null;
      currency: string | null;
      paymentStatus: string;
      customerEmail: string;
    }
  | { ok: false; error: string };

async function verifyAndCompletePayment(
  sessionId: string,
): Promise<VerificationResult> {
  try {
    // Call Stripe SDK directly — never use a self-referential HTTP fetch from a
    // server component, it can deadlock or fail depending on the host.
    const session = await getStripeCheckoutSession(sessionId);

    console.log(
      `[success] Stripe session ${sessionId}: payment_status=${session.payment_status}`,
    );

    if (session.payment_status !== "paid") {
      return {
        ok: false,
        error: `Payment has not been confirmed (status: ${session.payment_status}).`,
      };
    }

    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error(
        `[success] Stripe session ${sessionId} is missing orderId in metadata`,
      );
      return {
        ok: false,
        error: "Stripe session is missing order reference.",
      };
    }

    const order =
      (await findOrderBySessionId(session.id)) ?? (await findOrderById(orderId));

    if (!order) {
      console.error(
        `[success] No order found for orderId=${orderId}, sessionId=${session.id}`,
      );
      return {
        ok: false,
        error: "Order not found for this payment session.",
      };
    }

    if (order.stripeSessionId && order.stripeSessionId !== session.id) {
      console.error(
        `[success] Session mismatch: order.stripeSessionId=${order.stripeSessionId}, session.id=${session.id}`,
      );
      return {
        ok: false,
        error: "Payment session does not match this order.",
      };
    }

    const updatedOrder = await completeOrder(order.id);

    return {
      ok: true,
      orderReference: updatedOrder.reference,
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_email ?? updatedOrder.email,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Stripe error";
    console.error(`[success] Stripe verification failed: ${message}`, error);
    return {
      ok: false,
      error: `Unable to verify payment: ${message}`,
    };
  }
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  const result: VerificationResult | null = sessionId
    ? await verifyAndCompletePayment(sessionId)
    : null;

  const isVerified = result?.ok === true;

  return (
    <PaymentShell>
      <section className="flex flex-1 items-start justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="w-full max-w-2xl rounded-3xl border border-white/70 bg-white p-6 text-center shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-8">
          <div
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold ${
              isVerified
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isVerified ? "OK" : "ERR"}
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-slate-950">
            {isVerified ? "Payment verified" : "We could not verify this payment"}
          </h1>

          {isVerified && result && result.ok ? (
            <>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Your one off Dartford tunnel payment has been confirmed and your
                order has been marked as paid.
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
                <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>Order reference</span>
                  <span className="font-semibold text-slate-950">
                    {result.orderReference}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>Payment status</span>
                  <span className="font-semibold text-slate-950">
                    {result.paymentStatus}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>Email</span>
                  <span className="font-semibold text-slate-950">
                    {result.customerEmail}
                  </span>
                </div>
                {formatCurrency(result.amountTotal, result.currency) ? (
                  <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-600">
                    <span>Total paid</span>
                    <span className="font-semibold text-slate-950">
                      {formatCurrency(result.amountTotal, result.currency)}
                    </span>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {!sessionId
                  ? "Missing Stripe session information in the success URL."
                  : result && !result.ok
                    ? result.error
                    : "Unable to confirm the Stripe session."}
              </p>
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700">
                Only verified payments are shown as successful. If you were charged
                and still see this message, please contact support with your payment
                details.
              </div>
            </>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="btn-primary inline-flex h-12 items-center justify-center rounded-xl px-5 text-base font-semibold"
            >
              Back to homepage
            </Link>
            {!isVerified ? (
              <Link
                href="/payment"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 px-5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Try payment again
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </PaymentShell>
  );
}
