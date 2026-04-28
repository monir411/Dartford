import { LoginForm } from "@/components/admin/login-form";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="panel w-full max-w-md rounded-3xl p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500">
          ADMIN LOGIN
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">
          Manage dartcross.co.uk
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sign in to manage pricing, colors, homepage content, sections, and
          orders.
        </p>
        <div className="mt-8">
          <LoginForm error={params.error} />
        </div>
      </div>
    </main>
  );
}
