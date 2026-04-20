import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

type CancelPageProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function CancelPage({ searchParams }: CancelPageProps) {
  const params = await searchParams;

  return (
    <SiteShell footerTone="muted">
      <section className="px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <h1 className="text-3xl font-semibold text-slate-950">
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
    </SiteShell>
  );
}
