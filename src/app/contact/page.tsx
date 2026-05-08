import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact information for CrossPay Online.",
};

function ContactCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
        {children}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 px-4 pt-5 sm:px-6 z-10">
        <div className="mx-auto max-w-5xl flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-[#0052cc] font-bold text-xl tracking-tight">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 15L15 4M8 19L19 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              CrossPay Online
            </Link>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6 text-sm font-semibold text-slate-800">
            <Link href="/">Home</Link>
            <span className="text-slate-300">|</span>
            <Link href="/payment">Pay Now</Link>
            <span className="text-slate-300">|</span>
            <Link href="/contact" className="text-[#0052cc]">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Get in touch
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Need help with a payment, refund, or general question? Use the
              contact details below and allow up to 24 hours for a response.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <ContactCard title="Customer Support">
              <p className="font-medium text-slate-800">
                Email us at:{" "}
                <a
                  href="mailto:support@crosspay.co.uk"
                  className="text-[#0052cc] underline decoration-blue-200 underline-offset-4 hover:decoration-[#0052cc]"
                >
                  support@crosspay.co.uk
                </a>
              </p>
              <p>
                Having trouble paying through the website? Send us an email and our team will get back to you within 24 hours.
              </p>
            </ContactCard>

            <ContactCard title="Refunds & Returns">
              <p className="font-medium text-slate-800">
                Email us at:{" "}
                <a
                  href="mailto:refunds@crosspay.co.uk"
                  className="text-[#0052cc] underline decoration-blue-200 underline-offset-4 hover:decoration-[#0052cc]"
                >
                  refunds@crosspay.co.uk
                </a>
              </p>
              <p>
                If you are not satisfied with our service, requesting a refund is simple. Email us within 24 hours to receive a full refund.
              </p>
            </ContactCard>

            <ContactCard title="Business & Sales">
              <p className="font-medium text-slate-800">
                Email us at:{" "}
                <a
                  href="mailto:sales@crosspay.co.uk"
                  className="text-[#0052cc] underline decoration-blue-200 underline-offset-4 hover:decoration-[#0052cc]"
                >
                  sales@crosspay.co.uk
                </a>
              </p>
              <p>For any B2B or sales-related questions, please contact our business team directly.</p>
            </ContactCard>

            <ContactCard title="Registered Office">
              <p>CrossPay Online Services</p>
              <p>124 City Road</p>
              <p>London, EC1V 2NX</p>
              <p>United Kingdom</p>
            </ContactCard>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 px-4 py-12 sm:px-6 mt-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-medium text-slate-500 leading-relaxed">
            Independent service with processing fee.<br className="hidden sm:block" />
            Pay the official charge directly at gov.uk/pay-dartford-crossing-charge.
          </p>
        </div>
      </footer>
    </div>
  );
}
