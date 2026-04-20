import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ThemeForm } from "@/components/admin/theme-form";
import { getCurrentTheme } from "@/services";

type ThemePageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function ThemePage({ searchParams }: ThemePageProps) {
  const params = await searchParams;
  const theme = await getCurrentTheme();

  return (
    <div>
      <AdminPageHeader
        title="Theme settings"
        description="Set the primary color, button color, and background color. Changes are stored in Neon and applied dynamically across the frontend."
      />
      <ThemeForm theme={theme} saved={params.saved === "1"} />
    </div>
  );
}
