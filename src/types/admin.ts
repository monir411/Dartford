export type AdminRole = "SUPER_ADMIN" | "EDITOR";

export type AdminUser = {
  id: string;
  email: string;
  name?: string | null;
  role: AdminRole;
  lastLoginAt?: Date | null;
};

export type AdminDashboardSummary = {
  pendingPayments: number;
  paidPayments: number;
  failedPayments: number;
  totalRevenuePence: number;
};
