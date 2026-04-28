import Link from "next/link";
import { getHomepageContent } from "@/services";
import { VehicleCheckForm } from "@/components/vehicle-check-form";

function VisaBadge() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
      <div className="flex h-8 w-12 items-center justify-center rounded-lg bg-[#1434CB] text-[11px] font-black uppercase tracking-[0.08em] text-white">
        Visa
      </div>
      <span className="text-sm font-semibold text-slate-900">Visa</span>
    </div>
  );
}

function MastercardBadge() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
      <div className="relative flex h-8 w-12 items-center justify-center">
        <span className="absolute left-2 h-5 w-5 rounded-full bg-[#EB001B]" />
        <span className="absolute right-2 h-5 w-5 rounded-full bg-[#F79E1B]" />
        <span className="absolute h-5 w-5 rounded-full bg-[#FF5F00]/90" />
      </div>
      <span className="text-sm font-semibold text-slate-900">Mastercard</span>
    </div>
  );
}

function SectionFrame({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}

function InfoCard({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.07)] sm:p-7">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
        {number}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
      <div className="h-2 w-12 rounded-full bg-yellow-400" />
      <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function TrustItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
        ✓
      </div>
      <p className="text-sm font-medium text-slate-800">{text}</p>
    </div>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-slate-950">
        <span>{question}</span>
        <span className="text-slate-400 transition group-open:rotate-45">+</span>
      </summary>
      <p className="mt-4 text-sm leading-7 text-slate-600">{answer}</p>
    </details>
  );
}

export default async function HomePage() {
  const content = await getHomepageContent();

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.14),transparent_38%),linear-gradient(180deg,#f8fafc_0%,#ffffff_72%)]" />
        <div className="absolute left-1/2 top-10 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl sm:h-96 sm:w-96" />

        <header className="px-4 pt-3 sm:px-6 sm:pt-5">
          <div className="mx-auto max-w-6xl border-b border-slate-200/70 pb-3 sm:pb-4">
            <div className="flex justify-end">
              <Link
                href="/"
                className="text-[11px] font-medium tracking-[0.14em] text-slate-500 transition hover:text-slate-700"
              >
                dartcross.co.uk
              </Link>
            </div>
          </div>
        </header>

        <main>
          <section className="px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-12">
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur">
                  Online crossing payment
                </div>

                <h1 className="mt-6 text-[2.5rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[3.6rem]">
                  {content.homepageTitle}
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-[1.1rem] sm:leading-8">
                  {content.homepageDescription}
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-3xl rounded-[34px] border border-slate-200/80 bg-white/95 p-5 shadow-[0_34px_90px_rgba(15,23,42,0.10)] backdrop-blur sm:mt-12 sm:p-7">
                <VehicleCheckForm />

                <div className="mt-5 rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:mt-6 sm:p-6">
                  <p className="text-sm font-medium text-slate-700">
                    Accepted payment methods
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <VisaBadge />
                    <MastercardBadge />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionFrame
            eyebrow="Simple process"
            title="How it works"
            description="A clear three-step flow designed to help drivers complete payment quickly and confidently."
          >
            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
              <StepCard
                number="1"
                title="Enter registration"
                description="Start by entering your vehicle registration so you can begin the payment journey in just a few seconds."
              />
              <StepCard
                number="2"
                title="Confirm details"
                description="Review your vehicle and crossing details carefully before moving to checkout."
              />
              <StepCard
                number="3"
                title="Make payment"
                description="Complete your payment using a secure checkout flow with a clear final confirmation."
              />
            </div>
          </SectionFrame>

          <SectionFrame
            eyebrow="Why choose this"
            title="Why use this service"
            description="Built to feel straightforward, reliable, and easy to use across mobile and desktop."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <FeatureCard
                title="Simple payment process"
                description="A focused payment flow that keeps the steps clear and removes unnecessary friction."
              />
              <FeatureCard
                title="Mobile-friendly experience"
                description="Designed for quick use on phones, with large fields, clean spacing, and clear actions."
              />
              <FeatureCard
                title="Clear checkout journey"
                description="From registration to payment confirmation, the experience stays easy to follow."
              />
              <FeatureCard
                title="Secure payment flow"
                description="Checkout is handled through a trusted payment process with clear confirmation after payment."
              />
            </div>
          </SectionFrame>

          <SectionFrame
            eyebrow="Confidence"
            title="A clear and trustworthy payment experience"
            description="Everything is designed to help users pay with confidence, without confusion or clutter."
          >
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <TrustItem text="Secure checkout experience" />
              <TrustItem text="Simple step-by-step payment flow" />
              <TrustItem text="Clear journey from start to finish" />
              <TrustItem text="Optimised for mobile and desktop" />
            </div>
          </SectionFrame>

          {content.whoNeedsToPayVisible || content.whenToPayVisible ? (
            <section className="px-4 py-8 sm:px-6 sm:py-10">
              <div className="mx-auto grid max-w-6xl gap-4 sm:gap-6 md:grid-cols-2">
                {content.whoNeedsToPayVisible ? (
                  <InfoCard
                    title={content.whoNeedsToPayTitle}
                    paragraphs={content.whoNeedsToPayBody.split("\n\n")}
                  />
                ) : null}

                {content.whenToPayVisible ? (
                  <InfoCard
                    title={content.whenToPayTitle}
                    paragraphs={content.whenToPayBody.split("\n\n")}
                  />
                ) : null}
              </div>
            </section>
          ) : null}

          <SectionFrame
            eyebrow="Questions"
            title="Frequently asked questions"
            description="Useful answers to common questions about timing, vehicles, and the payment process."
          >
            <div className="mx-auto grid max-w-4xl gap-4">
              <FaqItem
                question="When do I need to pay the Dartford tunnel?"
                answer="Payment should be made by midnight on the day after you use the crossing. Paying as early as possible helps avoid missed deadlines."
              />
              <FaqItem
                question="What details do I need before making payment?"
                answer="You will usually need your vehicle registration and the basic vehicle details required during the payment process."
              />
              <FaqItem
                question="Do all vehicles need to pay?"
                answer="Many vehicles using the crossing need a charge paid, although some exemptions or discounts may apply depending on the vehicle and account status."
              />
              <FaqItem
                question="Can I complete payment on my phone?"
                answer="Yes. The payment journey is designed to work cleanly on mobile devices as well as desktop screens."
              />
            </div>
          </SectionFrame>

          <section className="px-4 py-8 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-[32px] border border-slate-200/80 bg-slate-950 px-6 py-8 text-center shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:px-10 sm:py-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                  Ready to begin
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Start your Dartford tunnel payment
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Complete your payment with a clean, simple process designed to
                  help you finish quickly and clearly.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/payment"
                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-yellow-400 px-6 text-sm font-semibold text-slate-950 shadow-[0_18px_34px_rgba(250,204,21,0.28)] transition hover:-translate-y-0.5 hover:bg-yellow-300"
                  >
                    Start payment
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/20 bg-white px-6 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition"
                  >
                    Back to top
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="border-t border-slate-200/80 bg-white px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-800">ddartcross.co.ukk</p>
            <p className="text-xs leading-6 text-slate-500">
              Online payment for Dartford tunnel with a clear and simple
              checkout experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Help</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
