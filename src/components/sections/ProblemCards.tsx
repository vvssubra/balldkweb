"use client";

import { PROBLEM_CARDS } from "@/lib/site-content";
import type { CategoryKey } from "@/lib/scoring/types";
import { CTA, CTA_RESPONSIVE } from "@/lib/cta-styles";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";
import { AntiGravityCanvas } from "@/components/ui/particle-effect-for-hero";

/** Per-stage tint on dark glass: 2px border, corner glow, stage badge. */
const STAGE_STYLE: Record<CategoryKey, { border: string; glow: string; badge: string; name: string }> = {
  R: { border: "border-rise-r/50 hover:border-rise-r", glow: "bg-rise-r/40", badge: "bg-rise-r/20 text-rise-r", name: "Restore" },
  I: { border: "border-rise-i/60 hover:border-rise-i", glow: "bg-rise-i/40", badge: "bg-rise-i/20 text-rise-i", name: "Income" },
  S: { border: "border-rise-s/50 hover:border-rise-s", glow: "bg-rise-s/40", badge: "bg-rise-s/20 text-rise-s", name: "Sustain" },
  E: { border: "border-rise-e/50 hover:border-rise-e", glow: "bg-rise-e/40", badge: "bg-rise-e/20 text-rise-e", name: "Empire" },
};

const GLASS =
  "relative overflow-hidden rounded-2xl border-2 bg-white/[0.06] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]";

export function ProblemCards() {
  const { open } = useScorecard();

  return (
    <section className="relative overflow-hidden bg-navy px-4 py-20 text-white sm:px-6" aria-labelledby="problem-heading">
      <AntiGravityCanvas />

      {/* Content sits above the canvas but lets pointer events through to it outside the cards. */}
      <div className="pointer-events-none relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="problem-heading" className="text-3xl font-bold sm:text-4xl">
            What Is Missing From Your Financial Life?
          </h2>
          <p className="mt-4 text-white/60">
            Most people I meet do not have a money problem alone. They have a missing-system problem.
            See if any of these sound familiar.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEM_CARDS.map((card, index) => {
            const style = STAGE_STYLE[card.stage];
            const isLead = index === 0;
            return (
              <article
                key={card.title}
                className={`pointer-events-auto ${GLASS} ${style.border} ${
                  isLead ? "p-8 sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-center" : "p-6"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-2xl ${style.glow}`}
                />
                <div className="relative">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}>
                    <span className="font-heading">{card.stage}</span>
                    <span aria-hidden="true">·</span>
                    {style.name}
                  </span>
                  <h3 className={isLead ? "mt-4 font-heading text-2xl font-semibold" : "mt-3 font-heading text-lg font-semibold"}>
                    {card.title}
                  </h3>
                  <p className={isLead ? "mt-3 text-base text-white/65" : "mt-2 text-sm text-white/65"}>
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/60">
            You do not need to solve all of this today. You need to know which one to fix first.
          </p>
          <button type="button" onClick={() => open()} className={`pointer-events-auto ${CTA.gold} ${CTA_RESPONSIVE} mt-4`}>
            Find My Missing R.I.S.E. Step
          </button>
        </div>
      </div>
    </section>
  );
}
