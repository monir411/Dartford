import Link from "next/link";

type PaymentShellProps = {
  children: React.ReactNode;
};

/**
 * Shared layout wrapper for all payment-related pages:
 * /payment, /success, /cancel
 *
 * Uses a soft blue gradient background to visually distinguish these
 * pages from the main marketing site.
 */
export function PaymentShell({ children }: PaymentShellProps) {
  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{
        background:
          "linear-gradient(160deg, #eaf6ff 0%, #d7edff 45%, #b8dcf5 100%)",
      }}
    >
      {/* Subtle radial glow — top centre */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(255,255,255,0.55) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <header className="relative z-10 px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="mx-auto max-w-5xl border-b border-blue-200/60 pb-3 sm:pb-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-[11px] font-medium tracking-[0.14em] text-slate-500 transition hover:text-slate-700"
            >
              ← Back
            </Link>
            <Link
              href="/"
              className="text-[11px] font-medium tracking-[0.14em] text-slate-500 transition hover:text-slate-700"
            >
              dartcross.co.uk
            </Link>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="relative z-10 flex flex-1 flex-col">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-blue-200/60 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>dartcross.co.uk</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/terms-of-business"
              className="transition hover:text-slate-700"
            >
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className="transition hover:text-slate-700"
            >
              Privacy
            </Link>
            <Link
              href="/contact-us"
              className="transition hover:text-slate-700"
            >
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
