import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Tunnel Charge.",
};

function PolicyCard({
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

export default function PrivacyPolicyPage() {
  return (
    <SiteShell footerTone="muted">
      <section className="px-4 pb-8 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_28px_70px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Privacy Policy
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-slate-500">Last Updated: 06 Aug 2024</p>
            <p className="mt-2 text-sm text-slate-500">Effective Date: 01/03/2024</p>
            <p className="mt-6 text-base leading-8 text-slate-600">
              LondonMission Limited, trading as LondonMission ("we," "our," or
              "us"), is committed to safeguarding the privacy and security of
              your personal data.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              This privacy policy explains how we collect, use, and protect
              your personal information in compliance with UK law and the
              General Data Protection Regulation (GDPR).
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6">
          <PolicyCard title="1. Introduction">
            <p>
              This policy applies to the personal data collected through our
              website in connection with our payment and support services.
            </p>
          </PolicyCard>

          <PolicyCard title="2. Information We Collect">
            <p>
              We may collect and process personal data including contact
              information, payment information, transaction history, and
              vehicle information.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Name, address, email address, and phone number.</li>
              <li>Payment information and transaction history.</li>
              <li>Vehicle information, including registration and vehicle type.</li>
            </ul>
            <p>
              All personal data collected through our website is removed when
              we have processed the information, which will usually take no
              longer than 24 hours.
            </p>
          </PolicyCard>

          <PolicyCard title="3. How We Use Your Information">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Processing payments for low emission zones, Clean Air Zones,
                and associated services.
              </li>
              <li>Providing customer support and resolving inquiries.</li>
              <li>Managing your account and transaction history.</li>
              <li>Complying with legal obligations and regulations.</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="4. Legal Basis for Processing">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Performance of a contract: to fulfill our obligations in
                providing toll payment services.
              </li>
              <li>
                Legitimate interests: to manage and improve our services,
                prevent fraud, and enhance user experience.
              </li>
              <li>
                Legal obligations: to comply with legal requirements and
                government authorities.
              </li>
            </ul>
          </PolicyCard>

          <PolicyCard title="5. Data Retention">
            <p>
              We will retain your personal data only for as long as necessary
              to fulfill the purposes outlined in this privacy policy. This
              will generally be 24 hours, unless a longer retention period is
              required by law.
            </p>
          </PolicyCard>

          <PolicyCard title="6. Data Security">
            <p>
              We implement appropriate technical and organizational measures to
              help protect personal data from unauthorized access, loss, or
              misuse.
            </p>
          </PolicyCard>

          <PolicyCard title="7. Your Rights">
            <ul className="list-disc space-y-2 pl-5">
              <li>Access to the personal data we hold about you.</li>
              <li>Rectification of inaccurate or incomplete data.</li>
              <li>Erasure under certain circumstances.</li>
              <li>Restriction of processing in specific situations.</li>
              <li>Data portability in a structured, machine-readable format.</li>
              <li>Objection to processing in certain situations.</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="8. Contact Us">
            <p>
              If you have any questions or concerns about our privacy
              practices, or wish to exercise your rights, please contact us via
              our contact page information.
            </p>
          </PolicyCard>

          <PolicyCard title="9. Changes to this Privacy Policy">
            <p>
              We may update this privacy policy from time to time. The latest
              version will be published on our website.
            </p>
          </PolicyCard>

          <PolicyCard title="Website Relationship">
            <p>
              https://cleanairzonepayment.co.uk/ is unaffiliated with any other
              website charging for the low emission zone areas including Drive
              in a clean air zone - GOV.UK (www.gov.uk).
            </p>
            <p>
              By continuing you agree to our terms and conditions and our
              service fee is payable on completion of our service on this
              website.
            </p>
            <p>&copy; 2024 Toll Charge Limited. All rights reserved.</p>
          </PolicyCard>
        </div>
      </section>
    </SiteShell>
  );
}
