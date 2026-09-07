"use client";

import { OUTCOME_ROWS } from "@/lib/site-content";
import { CTA } from "@/lib/cta-styles";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";

interface OutcomeTransformationProps {
  heading?: string;
  intro?: string;
}

export function OutcomeTransformation({
  heading = "What Changes When You Follow the Right Sequence?",
  intro,
}: OutcomeTransformationProps) {
  const { open } = useScorecard();

  return (
    <section id="how-rise-helps" className="bg-secondary px-4 py-20 sm:px-6" aria-labelledby="outcome-heading">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">How R.I.S.E. Helps</p>
          <h2 id="outcome-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            {heading}
          </h2>
          {intro ? <p className="mt-4 text-muted-foreground">{intro}</p> : null}
        </div>

        <div className="rise-card mt-10 overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-6 py-4 font-semibold text-muted-foreground">
                  Before R.I.S.E.
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-foreground">
                  After R.I.S.E.
                </th>
              </tr>
            </thead>
            <tbody>
              {OUTCOME_ROWS.map((row) => (
                <tr key={row.before} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 text-muted-foreground">{row.before}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Imagine knowing exactly which step deserves your attention first, and what to do about it.
          </p>
          <button type="button" onClick={() => open()} className={`${CTA.primary} mt-4`}>
            Discover My R.I.S.E. Stage
          </button>
        </div>
      </div>
    </section>
  );
}
