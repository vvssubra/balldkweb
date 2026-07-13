import type { ScorecardPath } from "@/lib/scoring/types";

interface GatedCtaProps {
  onSelectPath: (path: ScorecardPath) => void;
}

const BENEFITS = [
  "Receive your personalised R.I.S.E. score",
  "Identify your missing financial or career stage",
  "Get a practical 30-day action plan",
  "Receive a recommended coaching pathway",
];

export function GatedCta({ onSelectPath }: GatedCtaProps) {
  return (
    <section className="bg-[#0A0E1A] px-4 py-20 text-white sm:px-6" aria-labelledby="gated-heading">
      <div className="mx-auto max-w-4xl text-center">
        <h2 id="gated-heading" className="text-3xl font-bold sm:text-4xl">
          Discover Your Current R.I.S.E. Stage
        </h2>

        <ul className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm text-white/80">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#D4AF37]" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => onSelectPath("financial")}
            className="w-full rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A0E1A] transition-transform hover:scale-105 active:scale-95 sm:w-auto"
          >
            Start My Financial Health Scorecard
          </button>
          <button
            type="button"
            onClick={() => onSelectPath("career")}
            className="w-full rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] sm:w-auto"
          >
            Start My Career Growth Scorecard
          </button>
        </div>

        <p className="mt-6 text-xs text-white/50">
          Your information is kept private and used only to provide your result and relevant follow-up.
          You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
