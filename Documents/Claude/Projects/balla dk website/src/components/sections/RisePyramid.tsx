"use client";

import { useState } from "react";
import { PYRAMID_LEVELS, type PyramidLevel } from "@/lib/site-content";

const LEVEL_COLOR: Record<PyramidLevel["key"], string> = {
  R: "border-rise-r text-rise-r",
  I: "border-rise-i text-rise-i",
  S: "border-rise-s text-rise-s",
  E: "border-rise-e text-rise-e",
};

interface RisePyramidProps {
  onSelectPath: () => void;
}

export function RisePyramid({ onSelectPath }: RisePyramidProps) {
  const [activeKey, setActiveKey] = useState<PyramidLevel["key"]>("R");
  const active = PYRAMID_LEVELS.find((level) => level.key === activeKey) ?? PYRAMID_LEVELS[0];

  return (
    <section id="roadmap" className="bg-secondary px-4 py-20 sm:px-6" aria-labelledby="pyramid-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="pyramid-heading" className="text-3xl font-bold sm:text-4xl">
            The R.I.S.E. Roadmap
          </h2>
          <p className="mt-4 text-muted-foreground">
            Four stages. Select a level to see the problem it solves and the outcome it builds.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-3" role="tablist" aria-label="R.I.S.E. stages">
            {[...PYRAMID_LEVELS].reverse().map((level) => (
              <button
                key={level.key}
                type="button"
                role="tab"
                aria-selected={activeKey === level.key}
                onClick={() => setActiveKey(level.key)}
                className={`rounded-xl border-2 bg-card px-6 py-4 text-left transition-colors ${
                  activeKey === level.key ? LEVEL_COLOR[level.key] : "border-border"
                }`}
              >
                <span className="font-heading text-lg font-bold">{level.name}</span>
                <span className="ml-2 text-sm text-muted-foreground">{level.step}</span>
              </button>
            ))}
          </div>

          <div className={`rounded-2xl border-2 bg-card p-8 ${LEVEL_COLOR[active.key]}`}>
            <h3 className="font-heading text-2xl font-bold">{active.name}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{active.step}</p>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-foreground">The problem</dt>
                <dd className="mt-1 text-muted-foreground">{active.problem}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">The outcome</dt>
                <dd className="mt-1 text-muted-foreground">{active.outcome}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={onSelectPath}
              className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              Take the Scorecard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
