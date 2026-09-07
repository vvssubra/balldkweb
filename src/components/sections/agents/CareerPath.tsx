"use client";

import { useState } from "react";
import { CAREER_STAGES, type CareerStage } from "@/lib/content/agents-content";
import type { CategoryKey } from "@/lib/scoring/types";
import { CTA } from "@/lib/cta-styles";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

const STAGE_COLOR: Record<CategoryKey, string> = {
  R: "border-rise-r text-rise-r",
  I: "border-rise-i text-rise-i",
  S: "border-rise-s text-rise-s",
  E: "border-rise-e text-rise-e",
};

const DETAIL_ROWS: readonly { key: keyof Pick<CareerStage, "skills" | "responsibilities" | "development">; label: string }[] = [
  { key: "skills", label: "Skills you build" },
  { key: "responsibilities", label: "What you are responsible for" },
  { key: "development", label: "How I develop you" },
];

export function CareerPath() {
  const [activeKey, setActiveKey] = useState<CategoryKey>("R");
  const active = CAREER_STAGES.find((stage) => stage.key === activeKey) ?? CAREER_STAGES[0];

  return (
    <section id="career-path" className="bg-navy px-4 py-20 text-white sm:px-6" aria-labelledby="career-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="up" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Career and Growth Path</p>
          <h2 id="career-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Start. Develop. Grow. Lead.
          </h2>
          <p className="mt-4 text-white/70">
            Your career follows the same R.I.S.E. sequence I use with clients. Select a stage to see what
            you focus on, what you learn and how I support you there.
          </p>
        </Reveal>

        <RevealGroup as="ol" variant="up" stagger={100} className="mt-12 grid gap-3 sm:grid-cols-4" role="tablist" aria-label="Career stages">
          {CAREER_STAGES.map((stage, index) => {
            const isActive = stage.key === activeKey;
            return (
              <li key={stage.key}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveKey(stage.key)}
                  className={`w-full rounded-xl border-2 px-4 py-4 text-left transition-colors ${
                    isActive ? `bg-white/5 ${STAGE_COLOR[stage.key]}` : "border-white/10 text-white/70 hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono text-xs opacity-70">Stage {index + 1}</span>
                  <span className="mt-1 block font-heading text-lg font-bold">{stage.stage}</span>
                  <span className="text-xs uppercase tracking-wide opacity-70">{stage.riseName}</span>
                </button>
              </li>
            );
          })}
        </RevealGroup>

        <Reveal variant="blur" delay={350} className="mt-6">
        <div
          key={active.key}
          className={`rounded-2xl border-2 bg-white/5 p-8 ${STAGE_COLOR[active.key]}`}
          style={{ animation: "panel-fade-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) both" }}
        >
          <h3 className="font-heading text-2xl font-bold">
            {active.stage} <span className="text-white/50">· {active.riseName}</span>
          </h3>
          <p className="mt-3 text-white/80">{active.focus}</p>
          <dl className="mt-6 grid gap-6 text-sm sm:grid-cols-3">
            {DETAIL_ROWS.map((row) => (
              <div key={row.key}>
                <dt className="font-semibold text-white">{row.label}</dt>
                <dd className="mt-1 text-white/70">{active[row.key]}</dd>
              </div>
            ))}
          </dl>
        </div>
        </Reveal>

        <Reveal variant="fade" delay={150} className="mt-10 text-center">
          <a href="#rise-for-agents" className={CTA.gold}>
            Explore Your Growth Potential
          </a>
        </Reveal>
      </div>
    </section>
  );
}
