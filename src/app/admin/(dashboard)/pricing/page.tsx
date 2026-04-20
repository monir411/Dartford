import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PricingForm } from "@/components/admin/pricing-form";
import { getPricingSettings } from "@/server/repositories/settings.repository";

type PricingPageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const params = await searchParams;
  const items = await getPricingSettings();

  return (
    <div>
      <AdminPageHeader
        title="Pricing management"
        description="Set the payment prices stored in Neon. Checkout always recalculates on the server using these values."
      />
      <PricingForm items={items} saved={params.saved === "1"} />
    </div>
  );
}
