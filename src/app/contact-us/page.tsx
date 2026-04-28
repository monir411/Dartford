import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact information for dartcross.co.uk.",
};

function ContactCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:p-7">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
        {children}
      </div>
    </section>
  );
}

export default function ContactUsPage() {
  return (
    <SiteShell footerTone="muted">
      <section className="px-4 pb-8 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_28px_70px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              dartcross.co.uk
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-3 text-sm text-slate-500">Last Updated: 29 Jul 2024</p>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Need help with a payment, refund, or general question? Use the
              contact details below and allow up to 24 hours for a response.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 md:grid-cols-2">
          <ContactCard title="Refunds">
            <p className="font-medium text-slate-800">
              REFUNDS ={" "}
              <a
                href="mailto:tollcharge@outlook.com"
                className="text-slate-900 underline decoration-slate-300 underline-offset-4"
              >
                tollcharge@outlook.com
              </a>
            </p>
            <p>
              If you are not satisfied with our service, a refund could not be
              easier. Just email us within 24 hours and receive a full refund.
            </p>
          </ContactCard>

          <ContactCard title="Sales">
            <p className="font-medium text-slate-800">
              SALES ={" "}
              <a
                href="mailto:cazpay@gmail.com"
                className="text-slate-900 underline decoration-slate-300 underline-offset-4"
              >
                cazpay@gmail.com
              </a>
            </p>
            <p>For sales-related questions, please contact us by email.</p>
          </ContactCard>

          <ContactCard title="Support">
            <p>
              Need to get in touch and cannot pay through the website? Please
              email{" "}
              <a
                href="mailto:admin@dartcrossing.co.uk"
                className="text-slate-900 underline decoration-slate-300 underline-offset-4"
              >
                admin@dartcrossing.co.uk
              </a>
              .
            </p>
            <p>Please allow 24 hours for a response.</p>
          </ContactCard>

          <ContactCard title="Address">
            <p>63/66 Hatton Garden, Fifth Floor Suite 23</p>
            <p>London, England, EC1N 8LE</p>
          </ContactCard>
        </div>
      </section>
    </SiteShell>
  );
}
