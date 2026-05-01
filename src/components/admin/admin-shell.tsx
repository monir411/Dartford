import Link from "next/link";
import { adminNavigation } from "@/config/navigation";
import type { AdminUser } from "@/types";
import { logoutAdminAction } from "@/app/admin/actions";

type AdminShellProps = {
  children: React.ReactNode;
  admin: AdminUser;
};

export function AdminShell({ children, admin }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500">
              ADMIN DASHBOARD
            </p>
            <h1 className="truncate text-lg font-semibold text-slate-950">
              Tunnel Charge
            </h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="max-w-full break-all text-sm text-slate-600">
              {admin.email}
            </p>
            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 lg:sticky lg:top-6 lg:self-start">
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
