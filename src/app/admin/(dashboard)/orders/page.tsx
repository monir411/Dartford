import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { OrdersTable } from "@/components/admin/orders-table";
import { listPayments } from "@/server";

export default async function OrdersPage() {
  const orders = await listPayments();

  return (
    <div>
      <AdminPageHeader
        title="Orders list"
        description="Review all orders submitted through the payment flow."
      />
      <OrdersTable orders={orders} />
    </div>
  );
}
