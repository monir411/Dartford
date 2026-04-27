type DashboardStatCardProps = {
  label: string;
  value: string;
};

export function DashboardStatCard({ label, value }: DashboardStatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 break-words text-2xl font-semibold text-slate-950 sm:text-3xl">
        {value}
      </p>
    </div>
  );
}
