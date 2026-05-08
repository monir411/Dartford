import Link from "next/link";
import { getHomepageContent } from "@/services";
import { VehicleCheckForm } from "@/components/vehicle-check-form";

function Divider() {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="h-[1px] w-full max-w-[120px] bg-slate-200/80"></div>
      <div className="mx-4 h-1.5 w-1.5 rounded-full border border-blue-400 bg-white"></div>
      <div className="h-[1px] w-full max-w-[120px] bg-slate-200/80"></div>
    </div>
  );
}

export default async function HomePage() {
  const content = await getHomepageContent(); // kept for compatibility

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Wrapper with exact CSS */}
      <div
        className="relative w-full overflow-hidden pt-[90px] pb-[120px] min-h-[620px] flex flex-col after:content-[''] after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:w-[150%] sm:after:w-[120%] after:h-[120px] after:bg-white after:rounded-t-[50%]"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(87, 156, 255, 0.28), transparent 35%),
            radial-gradient(circle at 80% 10%, rgba(120, 190, 255, 0.22), transparent 30%),
            linear-gradient(180deg, #eaf4ff 0%, #f6fbff 55%, #ffffff 100%)
          `
        }}
      >
        <header className="absolute top-0 inset-x-0 px-4 pt-5 sm:px-6 z-10">
          <div className="mx-auto max-w-5xl flex items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-[#0052cc] font-bold text-xl tracking-tight">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 15L15 4M8 19L19 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                CrossPay Online
              </div>
            </div>
            <nav className="flex items-center gap-3 sm:gap-6 text-sm font-semibold text-slate-800">
              <Link href="/">Home</Link>
              <span className="text-slate-300">|</span>
              <Link href="/payment">Pay Now</Link>
              <span className="text-slate-300">|</span>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 w-full flex-1">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-[2.2rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-[3.5rem]">
              Vehicle Crossing<br />Charge Online
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base text-slate-700 sm:text-lg font-medium">
              Make payment before midnight the day after crossing.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <VehicleCheckForm />
          </div>
        </div>
      </div>

      <main>

        <section className="px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              How it works
            </h2>

            <Divider />

            <div className="grid gap-8 md:grid-cols-3 mt-8">
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-950">1. Enter Vehicle Registration</h3>
                <div className="mx-auto mt-2 h-[2px] w-4 bg-slate-300"></div>
                <p className="mt-3 text-sm text-slate-600 font-medium">Start in entering your vehicle reg</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-950">2. Confirm Details</h3>
                <div className="mx-auto mt-2 h-[2px] w-4 bg-slate-300"></div>
                <p className="mt-3 text-sm text-slate-600 font-medium">Review your vehicle and crossing info</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-950">3. Make Payment</h3>
                <div className="mx-auto mt-2 h-[2px] w-4 bg-slate-300"></div>
                <p className="mt-3 text-sm text-slate-600 font-medium">Complete secure payment</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 sm:py-12 mt-4 mb-8">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-xl sm:text-2xl font-medium text-slate-900 leading-snug">
              Official Dart Charge fees from <span className="font-bold bg-slate-100 px-2 py-1 rounded">£3.50 - £8.40</span>
              <br className="hidden sm:block" /> depending on vehicle type + our processing fee
            </h3>

            <p className="mt-5 text-sm text-slate-500 font-medium leading-relaxed">
              Independent payment assistance service. Not affiliated with<br className="hidden sm:block" /> National Highways, Dart Charge or GOV.UK.
            </p>

            <div className="mt-8">
              <Link
                href="/payment"
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-lg bg-[#0052cc] px-8 text-base font-semibold text-white shadow-md transition hover:bg-[#0047b3]"
              >
                Start Payment Now
              </Link>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
