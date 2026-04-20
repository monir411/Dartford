type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/92 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur sm:p-7">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
        {children}
      </div>
    </section>
  );
}
