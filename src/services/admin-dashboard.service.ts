import { getAdminDashboardSummary, listPayments } from "@/server";

export async function getDashboardData() {
  const [summary, payments] = await Promise.all([
    getAdminDashboardSummary(),
    listPayments(),
  ]);

  return {
    summary,
    recentPayments: payments.slice(0, 10),
  };
}
