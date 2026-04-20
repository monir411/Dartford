import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { OrderDetailCard } from "@/components/admin/order-detail-card";
import { getOrderById } from "@/server";

type OrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/admin/orders"
          className="text-sm font-medium text-slate-700 underline underline-offset-4"
        >
          Back to orders
        </Link>
      </div>
      <AdminPageHeader
        title="Order detail"
        description="Review the full order record, including vehicle details, payment status, and submitted contact information."
      />
      <OrderDetailCard order={order} />
    </div>
  );
}
