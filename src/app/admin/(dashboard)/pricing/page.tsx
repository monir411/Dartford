import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PricingForm } from "@/components/admin/pricing-form";
import { getPricingSettings } from "@/server/repositories/settings.repository";

type PricingPageProps = {
  searchParams: Promise<{
    saved?: string;
    error?: string;
  }>;
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const params = await searchParams;
  const items = await getPricingSettings();

  return (
    <div>
      <AdminPageHeader
        title="Pricing management"
        description="Manage the vehicle-type prices used by checkout. Prices are loaded from Neon through Prisma and saved without hardcoding them in the frontend."
      />
      <PricingForm
        items={items}
        saved={params.saved === "1"}
        error={params.error}
      />
    </div>
  );
}
