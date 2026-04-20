function VisaIcon() {
  return (
    <div className="flex h-8 w-12 items-center justify-center rounded-md bg-[#1434CB] text-[11px] font-black uppercase tracking-[0.08em] text-white">
      Visa
    </div>
  );
}

function MastercardIcon() {
  return (
    <div className="relative flex h-8 w-12 items-center justify-center">
      <span className="absolute left-2 h-5 w-5 rounded-full bg-[#EB001B]" />
      <span className="absolute right-2 h-5 w-5 rounded-full bg-[#F79E1B]" />
      <span className="absolute h-5 w-5 rounded-full bg-[#FF5F00]/90" />
    </div>
  );
}

function PaymentBadge({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
      <div className="flex h-8 items-center">{children}</div>
      <span className="text-sm font-semibold text-slate-900">{label}</span>
    </div>
  );
}

export function PaymentMethods() {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-700">Accepted payment methods</p>
      <div className="flex flex-wrap items-center gap-3">
        <PaymentBadge label="Visa">
          <VisaIcon />
        </PaymentBadge>
        <PaymentBadge label="Mastercard">
          <MastercardIcon />
        </PaymentBadge>
      </div>
    </div>
  );
}
