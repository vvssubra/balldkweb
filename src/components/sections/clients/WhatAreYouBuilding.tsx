"use client";

import { CLIENT_GOALS } from "@/lib/content/clients-content";
import type { CategoryKey } from "@/lib/scoring/types";
import { CTA } from "@/lib/cta-styles";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

const STAGE_BORDER: Record<CategoryKey, string> = {
  R: "border-t-rise-r",
  I: "border-t-rise-i",
  S: "border-t-rise-s",
  E: "border-t-rise-e",
};

export function WhatAreYouBuilding() {
  const { open } = useScorecard();

  return (
    <section id="build" className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="build-heading">
      <Reveal variant="up" className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Start Here</p>
        <h2 id="build-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
          What Are You Trying to Build?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Everyone I work with starts with one of these. Which one is closest to yours right now?
        </p>
      </Reveal>

      <RevealGroup as="ul" variant="flip" stagger={90} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {CLIENT_GOALS.map((goal) => (
          <li key={goal.title} className={`rise-card rounded-2xl border-t-2 p-6 ${STAGE_BORDER[goal.stage]}`}>
            <h3 className="font-heading text-lg font-semibold">{goal.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{goal.body}</p>
          </li>
        ))}
      </RevealGroup>

      <Reveal variant="fade" delay={150} className="mt-10 text-center">
        <button type="button" onClick={() => open("financial")} className={CTA.primary}>
          Explore My Financial Priorities
        </button>
      </Reveal>
    </section>
  );
}
