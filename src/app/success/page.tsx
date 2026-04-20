import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { env } from "@/config/env";

type VerifySessionResponse =
  | {
      ok: true;
      data: {
        orderReference: string;
        amountTotal: number | null;
        currency: string | null;
        paymentStatus: string;
        customerEmail: string;
      };
    }
  | {
      ok: false;
      error: string;
    };

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

async function verifyStripeSession(sessionId: string) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`,
    { cache: "no-store" },
  );

  return (await response.json()) as VerifySessionResponse;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;
  const verification = sessionId ? await verifyStripeSession(sessionId) : null;
  const isVerified = Boolean(sessionId && verification?.ok);

  return (
    <SiteShell>
      <section className="px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
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

          {isVerified && verification && verification.ok ? (
            <>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Your one off Dartford Crossing payment has been confirmed and your
                order has been marked as paid.
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
                <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>Order reference</span>
                  <span className="font-semibold text-slate-950">
                    {verification.data.orderReference}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>Payment status</span>
                  <span className="font-semibold text-slate-950">
                    {verification.data.paymentStatus}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>Email</span>
                  <span className="font-semibold text-slate-950">
                    {verification.data.customerEmail}
                  </span>
                </div>
                {formatCurrency(
                  verification.data.amountTotal,
                  verification.data.currency,
                ) ? (
                  <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-600">
                    <span>Total paid</span>
                    <span className="font-semibold text-slate-950">
                      {formatCurrency(
                        verification.data.amountTotal,
                        verification.data.currency,
                      )}
                    </span>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {sessionId
                  ? verification && !verification.ok
                    ? verification.error
                    : "Unable to confirm the Stripe session."
                  : "Missing Stripe session information in the success URL."}
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
    </SiteShell>
  );
}
