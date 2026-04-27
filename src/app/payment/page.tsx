import { PaymentForm } from "@/components/payment-form";
import { PaymentShell } from "@/components/payment-shell";
import { getVehiclePricingMap } from "@/services";

type PaymentPageProps = {
  searchParams: Promise<{
    reg?: string;
    make?: string;
    colour?: string;
    fuelType?: string;
    year?: string;
    motStatus?: string;
    taxStatus?: string;
  }>;
};

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const pricing = await getVehiclePricingMap();
  const params = await searchParams;

  const prefill = {
    registrationNumber: params.reg ?? "",
    make: params.make ?? "",
    colour: params.colour ?? "",
    fuelType: params.fuelType ?? "",
    yearOfManufacture: params.year ?? "",
    motStatus: params.motStatus ?? "",
    taxStatus: params.taxStatus ?? "",
  };

  return (
    <PaymentShell>
      <section className="flex flex-1 items-start justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="w-full max-w-3xl">
          <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-8">
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-[0.16em] text-slate-500">
                ONE OFF PAYMENT
              </p>
              <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
                Enter vehicle and payment details
              </h1>
            </div>
            <PaymentForm pricing={pricing} prefill={prefill} />
          </div>
        </div>
      </section>
    </PaymentShell>
  );
}
