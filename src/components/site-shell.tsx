import Link from "next/link";

type SiteShellProps = {
  children: React.ReactNode;
  footerTone?: "light" | "muted";
};

export function SiteShell({
  children,
  footerTone = "light",
}: SiteShellProps) {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <header className="px-4 pt-3 sm:px-6 sm:pt-4">
        <div className="mx-auto flex max-w-5xl items-center justify-end border-b border-slate-200/70 pb-3 sm:pb-4">
          <Link
            href="/"
            className="text-[11px] font-medium tracking-[0.12em] text-slate-500 transition hover:text-slate-700"
          >
            dartcrossings.co.uk
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer
        className={`border-t px-4 py-8 sm:px-6 ${
          footerTone === "muted" ? "surface-panel" : ""
        }`}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>dartcrossings.co.uk</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms-of-business">Terms</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/contact-us">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
