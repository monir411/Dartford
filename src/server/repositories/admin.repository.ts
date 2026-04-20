import { prisma } from "@/lib/prisma";
import { isMissingTableError } from "@/lib/db/safe-query";
import type { AdminDashboardSummary } from "@/types";

export async function getAdminDashboardSummary(): Promise<AdminDashboardSummary> {
  try {
    const [pendingPayments, paidPayments, failedPayments, revenue] =
      await Promise.all([
        prisma.order.count({ where: { status: "PENDING" } }),
        prisma.order.count({ where: { status: "PAID" } }),
        prisma.order.count({ where: { status: "FAILED" } }),
        prisma.order.aggregate({
          _sum: { totalAmountPence: true },
          where: { status: "PAID" },
        }),
      ]);

    return {
      pendingPayments,
      paidPayments,
      failedPayments,
      totalRevenuePence: revenue._sum.totalAmountPence ?? 0,
    };
  } catch (error) {
    if (isMissingTableError(error)) {
      return {
        pendingPayments: 0,
        paidPayments: 0,
        failedPayments: 0,
        totalRevenuePence: 0,
      };
    }

    throw error;
  }
}
