import { PaymentForm } from "@/components/payment-form";
import { SiteShell } from "@/components/site-shell";
import { getPricingMap } from "@/services";

export default async function PaymentPage() {
  const pricing = await getPricingMap();

  return (
    <SiteShell footerTone="muted">
      <section className="px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-[0.16em] text-slate-500">
                ONE OFF PAYMENT
              </p>
              <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
                Enter vehicle and payment details
              </h1>
            </div>
            <PaymentForm pricing={pricing} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
