import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DashboardStatCard } from "@/components/admin/dashboard-stat-card";
import { OrdersTable } from "@/components/admin/orders-table";
import { getDashboardData } from "@/services";

function formatCurrency(amountPence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amountPence / 100);
}

export default async function AdminDashboardHomePage() {
  const data = await getDashboardData();

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="View the latest payment activity and manage the site from one place."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Pending orders"
          value={String(data.summary.pendingPayments)}
        />
        <DashboardStatCard
          label="Paid orders"
          value={String(data.summary.paidPayments)}
        />
        <DashboardStatCard
          label="Failed orders"
          value={String(data.summary.failedPayments)}
        />
        <DashboardStatCard
          label="Revenue"
          value={formatCurrency(data.summary.totalRevenuePence)}
        />
      </div>
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-slate-950">Recent orders</h3>
        <OrdersTable orders={data.recentPayments} />
      </div>
    </div>
  );
}
