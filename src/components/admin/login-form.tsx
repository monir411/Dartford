import { loginAdminAction } from "@/app/admin/actions";

type LoginFormProps = {
  error?: string;
};

export function LoginForm({ error }: LoginFormProps) {
  return (
    <form action={loginAdminAction} className="space-y-5">
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Invalid email or password.
        </div>
      ) : null}
      <label className="block text-sm font-medium text-slate-800">
        Email
        <input
          name="email"
          type="email"
          className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4"
          placeholder="admin@example.com"
          required
        />
      </label>
      <label className="block text-sm font-medium text-slate-800">
        Password
        <input
          name="password"
          type="password"
          className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4"
          placeholder="Enter password"
          required
        />
      </label>
      <button type="submit" className="btn-primary h-12 w-full rounded-xl text-sm font-semibold">
        Log in
      </button>
    </form>
  );
}
