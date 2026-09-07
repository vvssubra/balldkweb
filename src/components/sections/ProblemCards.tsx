"use client";

import { PROBLEM_CARDS } from "@/lib/site-content";
import type { CategoryKey } from "@/lib/scoring/types";
import { CTA } from "@/lib/cta-styles";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";

/** Per-stage tint: 2px border, corner glow, and the small stage badge. */
const STAGE_STYLE: Record<CategoryKey, { border: string; glow: string; badge: string; name: string }> = {
  R: { border: "border-rise-r/45 hover:border-rise-r/80", glow: "bg-rise-r/35", badge: "bg-rise-r/15 text-rise-r", name: "Restore" },
  I: { border: "border-rise-i/55 hover:border-rise-i/90", glow: "bg-rise-i/40", badge: "bg-rise-i/20 text-rise-i", name: "Income" },
  S: { border: "border-rise-s/45 hover:border-rise-s/80", glow: "bg-rise-s/35", badge: "bg-rise-s/15 text-rise-s", name: "Sustain" },
  E: { border: "border-rise-e/45 hover:border-rise-e/80", glow: "bg-rise-e/35", badge: "bg-rise-e/15 text-rise-e", name: "Empire" },
};

const GLASS =
  "relative overflow-hidden rounded-2xl border-2 bg-white/55 shadow-[0_8px_32px_rgba(10,14,26,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_16px_40px_rgba(10,14,26,0.14)]";

export function ProblemCards() {
  const { open } = useScorecard();

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6" aria-labelledby="problem-heading">
      {/* Colour field behind the glass. Stage colours plus gold, blurred hard. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-[8%] size-96 rounded-full bg-rise-r/40 blur-3xl" />
        <div className="absolute top-1/3 -right-20 size-[28rem] rounded-full bg-rise-i/45 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 size-96 rounded-full bg-rise-s/35 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 size-72 rounded-full bg-rise-e/40 blur-3xl" />
        <div className="absolute top-10 left-1/2 size-64 -translate-x-1/2 rounded-full bg-gold/35 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="problem-heading" className="text-3xl font-bold sm:text-4xl">
            What Is Missing From Your Financial Life?
          </h2>
          <p className="mt-4 text-muted-foreground">
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
                className={`${GLASS} ${style.border} ${
                  isLead ? "p-8 sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-center" : "p-6"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-10 -top-10 size-40 rounded-full blur-2xl ${style.glow}`}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
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
                  <p className={isLead ? "mt-3 text-base text-foreground/70" : "mt-2 text-sm text-foreground/70"}>
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground">
            You do not need to solve all of this today. You need to know which one to fix first.
          </p>
          <button type="button" onClick={() => open()} className={`${CTA.primary} mt-4`}>
            Find My Missing R.I.S.E. Step
          </button>
        </div>
      </div>
    </section>
  );
}
