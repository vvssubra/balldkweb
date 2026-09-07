"use client";

import type { ScorecardPath } from "@/lib/scoring/types";
import { CTA, CTA_RESPONSIVE } from "@/lib/cta-styles";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";

const BENEFITS = [
  "Your personalised R.I.S.E. score across all four stages",
  "The financial or career stage that needs your attention first",
  "Three practical actions you can start this month",
  "A clear next step, and me on WhatsApp if you want to talk it through",
];

interface GatedCtaProps {
  /** Restrict the section to one scorecard. Omit to offer both. */
  path?: ScorecardPath;
  heading?: string;
}

export function GatedCta({ path, heading = "Discover Your Current R.I.S.E. Stage" }: GatedCtaProps) {
  const { open } = useScorecard();
  const showFinancial = path !== "career";
  const showCareer = path !== "financial";

  return (
    <section id="scorecard" className="bg-navy px-4 py-20 text-white sm:px-6" aria-labelledby="gated-heading">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Free R.I.S.E. Scorecard</p>
        <h2 id="gated-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Twelve questions. Three minutes. Your result appears on screen immediately. Here is what you get:
        </p>

        <ul className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm text-white/80">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {showFinancial ? (
            <button type="button" onClick={() => open("financial")} className={`${CTA.gold} ${CTA_RESPONSIVE}`}>
              Start My Financial Health Scorecard
            </button>
          ) : null}
          {showCareer ? (
            <button
              type="button"
              onClick={() => open("career")}
              className={`${showFinancial ? CTA.outlineLight : CTA.gold} ${CTA_RESPONSIVE}`}
            >
              Start My Career Growth Scorecard
            </button>
          ) : null}
        </div>

        <p className="mt-6 text-xs text-white/50">
          Your information is kept private and used only to provide your result and relevant follow-up.
          You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
