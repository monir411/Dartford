import Link from "next/link";
import { PaymentShell } from "@/components/payment-shell";

type CancelPageProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function CancelPage({ searchParams }: CancelPageProps) {
  const params = await searchParams;

  return (
    <PaymentShell>
      <section className="flex flex-1 items-start justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="w-full max-w-2xl rounded-3xl border border-white/70 bg-white p-6 text-center shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-700">
            !
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-slate-950">
            Payment cancelled
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            No payment was taken. You can return to the form and try again when
            you are ready.
          </p>
          {params.order ? (
            <p className="mt-4 text-sm text-slate-500">
              Order reference: {params.order}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/payment"
              className="btn-primary inline-flex h-12 items-center justify-center rounded-xl px-5 text-base font-semibold"
            >
              Try again
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 px-5 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </PaymentShell>
  );
}
