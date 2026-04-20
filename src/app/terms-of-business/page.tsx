import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for Toll Charge Limited trading as londonmission.co.uk.",
};

const cityCharges = [
  {
    city: "Bath",
    price: "Cars and Vans £14.00 per day inclusive of Clean Air Zone Payments service fee.",
    heavyVehicles:
      "HGV vehicles over 7.5 Tonnes – visit Drive in a clean air zone – GOV.UK (www.gov.uk)",
    exemptions: [
      "Euro 6 (VI) or better for diesel engine.",
      "Euro 4 or better for petrol engines.",
      "For diesel/petrol electric hybrids the vehicle should meet the relevant emission standards.",
      "Fully electric or hydrogen fuel cell-powered vehicles will not need to pay the charge.",
      "There are also certain exceptions, including for some people who live or work in the Clean Air Zone, who may be able to apply for temporary exemption permits if certain criteria are met.",
    ],
  },
  {
    city: "Birmingham",
    price: "Cars and Vans £12.50 per day inclusive of Clean Air Zone Payments service fee.",
    heavyVehicles:
      "HGV vehicles over 7.5 Tonnes – visit Drive in a clean air zone – GOV.UK (www.gov.uk)",
    exemptions: [
      "Euro 6 (VI) or better for diesel engine.",
      "Euro 4 or better for petrol engines.",
      "For diesel/petrol electric hybrids the vehicle should meet the relevant emission standards.",
      "Fully electric or hydrogen fuel cell-powered vehicles will not need to pay the charge.",
      "There are also certain exceptions, including for some people who live or work in the Clean Air Zone, who may be able to apply for temporary exemption permits if certain criteria are met.",
    ],
  },
  {
    city: "Bradford",
    price: "Cars and Vans £14.00 per day inclusive of Clean Air Zone Payments service fee.",
    heavyVehicles:
      "HGV vehicles over 7.5 Tonnes – visit Drive in a clean air zone – GOV.UK (www.gov.uk)",
    exemptions: [
      "Passenger car, or motorbike, or the vehicle meets the required emission standards of ultra low emissions.",
    ],
  },
  {
    city: "Bristol",
    price: "Cars and Vans £14.00 per day inclusive of Clean Air Zone Payments service fee.",
    heavyVehicles:
      "HGV vehicles over 7.5 Tonnes – visit Drive in a clean air zone – GOV.UK (www.gov.uk)",
    exemptions: [
      "Euro 4, 5 and 6 petrol vehicles.",
      "Euro 6 diesel vehicles.",
      "Fully electric vehicles and hydrogen fuel cell vehicles.",
      "Modified or retrofitted vehicles registered with the Energy Saving Trust’s Clean Vehicle Retrofit Accreditation Scheme (CVRAS).",
      "Motorbikes.",
    ],
  },
  {
    city: "Portsmouth",
    price: "Cars and Vans £14.00 per day inclusive of Clean Air Zone Payments service fee.",
    heavyVehicles:
      "HGV vehicles over 7.5 Tonnes – visit Drive in a clean air zone – GOV.UK (www.gov.uk)",
    exemptions: [
      "Private cars and vans.",
      "Euro 4, 5 and 6 petrol vehicles.",
      "Euro 6 diesel vehicles.",
      "Fully electric vehicles and hydrogen fuel cell vehicles.",
      "Modified or retrofitted vehicles registered with the Energy Saving Trust’s Clean Vehicle Retrofit Accreditation Scheme (CVRAS).",
      "Motorbikes.",
    ],
  },
  {
    city: "Sheffield",
    price:
      "Cars £14.00 per day inclusive of Clean Air Zone Payments service fee. Vans £14.00 per day inclusive of Clean Air Zone Payments service fee.",
    heavyVehicles:
      "HGV vehicles over 7.5 Tonnes – visit Drive in a clean air zone – GOV.UK (www.gov.uk)",
    exemptions: ["Private passenger cars and motorbikes."],
  },
  {
    city: "Tyneside – Newcastle and Gateshead",
    price:
      "Cars £14.00 per day inclusive of Clean Air Zone Payments service fee. Vans £14.00 per day inclusive of Clean Air Zone Payments service fee.",
    heavyVehicles:
      "HGV vehicles over 7.5 Tonnes – visit Drive in a clean air zone – GOV.UK (www.gov.uk)",
    exemptions: [],
  },
];

function TermsCard({
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

export default function TermsOfBusinessPage() {
  return (
    <SiteShell footerTone="muted">
      <section className="px-4 pb-8 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_28px_70px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Terms and Conditions
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Terms of Business
            </h1>
            <p className="mt-3 text-sm text-slate-500">Last Updated: 06 Aug 2024</p>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Terms and Conditions for Toll Charge Limited trading as
              londonmission.co.uk.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              These terms and conditions outline the agreement between you
              ("Customer," "User," "You") and Toll Charge Limited ("We," "Us,"
              "Our") regarding the use of our online payment service for Clean
              Air Zones, including any associated service charges. By using our
              website, you agree to abide by these terms and conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6">
          <TermsCard title="Service Description">
            <p>
              We provide a convenient online platform for paying and checking Low
              Emission Charges for an additional service charge. The total cost
              for vehicle checking and processing the payment if required is
              14.00.
            </p>
            <p>Our services are available exclusively online through our website.</p>
          </TermsCard>

          <TermsCard title="Payment Methods">
            <p>We accept payments via Visa, Mastercard, Apple Pay and Google Pay.</p>
          </TermsCard>

          <TermsCard title="Data Privacy">
            <p>Please refer to the privacy policy.</p>
          </TermsCard>

          <TermsCard title="Refund Policy">
            <p>
              A full refund will be granted if requested before the service has
              been provided or is requested within 24 hours of the purchase.
            </p>
            <p>
              To request a refund, please contact our customer support via email
              on the contact page.
            </p>
          </TermsCard>

          <TermsCard title="Website Usage">
            <p>
              Our website is intended solely for the purpose of facilitating
              payments for Low emission zones in England. Unauthorized use is
              prohibited.
            </p>
            <p>Our site is designed for payment vehicles under 7.5 ton.</p>
          </TermsCard>

          <TermsCard title="Dispute Resolution">
            <p>
              For any disputes, please contact our customer support via email. We
              will respond within 24 hours.
            </p>
          </TermsCard>

          <TermsCard title="Error in Payments">
            <p>
              We are not liable for payments made in error, including incorrect
              payments or accidental transactions. We are not liable for any
              incorrect inputs by users for the following: registration numbers,
              vehicle type, date of travel.
            </p>
            <p>
              Payments made after the 6 day window of travel will be refunded.
              By using this service you confirming that your vehicle is not
              exempt from the low emission charge at the time of travel and
              understand that transactions for exempt vehicles may not be
              refunded automatically.
            </p>
            <p>
              To check your vehicle please visit Enter the vehicle registration
              (number plate) | Drive in a clean air zone | GOV.UK
              (drive-clean-air-zone.service.gov.uk).
            </p>
          </TermsCard>

          <TermsCard title="Age Requirement">
            <p>Users of our service must be a minimum of 16 years old.</p>
          </TermsCard>

          <TermsCard title="Liability">
            <p>
              We assume no liability for the usage of our service, including but
              not limited to payment errors by anyone other than LONDONMISSION
              Ltd, service interruptions, or any losses incurred.
            </p>
            <p>
              LondonMission is liable for any fines that result from the correct
              usage of our site that are paid within the time window of 15 days
              before travel – current day – 6 days after date of travel.
            </p>
            <p>
              Please read these terms and conditions carefully before using our
              service. Your use of our website implies your acceptance of these
              terms. We reserve the right to modify these terms at any time, and
              any changes will be effective upon posting on our website.
            </p>
            <p>
              By using our services, you acknowledge that you have read,
              understood, and agreed to the terms and conditions outlined above.
            </p>
          </TermsCard>

          <TermsCard title="Fees">
            <p>
              LondonMission Ltd will charge a service fee of up to £5.00 per
              transaction for all vehicle types.
            </p>
          </TermsCard>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:gap-6">
            {cityCharges.map((item) => (
              <TermsCard key={item.city} title={item.city}>
                <p>{item.price}</p>
                <p>{item.heavyVehicles}</p>
                {item.exemptions.length > 0 ? (
                  <div>
                    <p className="font-medium text-slate-800">Exemptions</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5">
                      {item.exemptions.map((exemption) => (
                        <li key={exemption}>{exemption}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </TermsCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6">
          <TermsCard title="Refunds">
            <p>REFUNDS = tollcharge@outlook.com</p>
            <p>
              If at all you are not satisfied with our service a refund could not
              be easier. Just email us at tollcharge@outlook.com within 24 hours
              of your purchase and receive a full refund.
            </p>
          </TermsCard>

          <TermsCard title="Website Relationship">
            <p>
              https://londonmission.co.uk/ is unaffiliated with any other website
              charging for the low emission zone areas including Drive in a clean
              air zone – GOV.UK (www.gov.uk).
            </p>
            <p>
              By continuing you agree to our terms and conditions and our service
              fee is payable on completion of our service on this website.
            </p>
          </TermsCard>
        </div>
      </section>
    </SiteShell>
  );
}
