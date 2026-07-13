import { CAREER_DISCLAIMER, FINANCIAL_DISCLAIMER, NAV_LINKS } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy px-4 py-16 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(212,175,55,0.08), transparent 55%), radial-gradient(circle at 80% 100%, rgba(212,175,55,0.06), transparent 55%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
              B
            </span>
            <span className="text-lg font-medium tracking-wide text-white">Balla DK</span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
            One clear financial roadmap. Two paths. A clearer next step — protect, strengthen, grow and
            build a legacy.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Navigate</p>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/60 sm:grid-cols-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-6xl space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/50 backdrop-blur-sm">
        <p>
          <strong className="text-white/80">Financial disclaimer:</strong> {FINANCIAL_DISCLAIMER}
        </p>
        <p>
          <strong className="text-white/80">Career disclaimer:</strong> {CAREER_DISCLAIMER}
        </p>
        <p>
          Your information is kept private and used only to provide your result and relevant follow-up.
          You can unsubscribe at any time.
        </p>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-xs text-white/30">
        © {new Date().getFullYear()} Balla DK. All rights reserved.
      </p>
    </footer>
  );
}
