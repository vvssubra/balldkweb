"use client";

import { RISE_FOR_AGENTS } from "@/lib/content/agents-content";
import type { CategoryKey } from "@/lib/scoring/types";
import { CTA } from "@/lib/cta-styles";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";
import { RevealGroup } from "@/components/ui/reveal";

const LETTER_STYLE: Record<CategoryKey, string> = {
  R: "bg-rise-r/10 text-rise-r",
  I: "bg-rise-i/15 text-rise-i",
  S: "bg-rise-s/10 text-rise-s",
  E: "bg-rise-e/10 text-rise-e",
};

export function RiseForAgents() {
  const { open } = useScorecard();

  return (
    <section id="rise-for-agents" className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="rfa-heading">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <RevealGroup variant="left" stagger={100}>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">R.I.S.E. for Agents</p>
          <h2 id="rfa-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            {RISE_FOR_AGENTS.headline}
          </h2>
          <p className="mt-4 text-muted-foreground">{RISE_FOR_AGENTS.body}</p>
          <button type="button" onClick={() => open("career")} className={`${CTA.primary} mt-8`}>
            Take the Agency R.I.S.E. Assessment
          </button>
          <p className="mt-3 text-xs text-muted-foreground">Free. Three minutes. Result on screen immediately.</p>
        </RevealGroup>

        <RevealGroup as="ul" variant="scale" stagger={110} delay={150} className="grid gap-4 sm:grid-cols-2">
          {RISE_FOR_AGENTS.categories.map((category) => (
            <li key={category.key} className="rise-card rounded-2xl p-5">
              <span className={`inline-flex size-9 items-center justify-center rounded-full font-heading text-lg font-bold ${LETTER_STYLE[category.key]}`}>
                {category.key}
              </span>
              <h3 className="mt-3 font-heading font-semibold">{category.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
