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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500">
              ADMIN DASHBOARD
            </p>
            <h1 className="text-lg font-semibold text-slate-950">
              dartcrossings.co.uk
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden text-sm text-slate-600 sm:block">{admin.email}</p>
            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-3">
          <nav className="grid gap-2">
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
