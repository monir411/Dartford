import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ContentForm } from "@/components/admin/content-form";
import { getHomepageContent } from "@/services";

type ContentPageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function ContentPage({ searchParams }: ContentPageProps) {
  const params = await searchParams;
  const content = await getHomepageContent();

  return (
    <div>
      <AdminPageHeader
        title="Content management"
        description="Edit the homepage title, description, and section copy."
      />
      <ContentForm content={content} saved={params.saved === "1"} />
    </div>
  );
}
