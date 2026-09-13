"use client";

import { OUTCOME_ROWS } from "@/lib/site-content";
import { CTA } from "@/lib/cta-styles";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

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
    <section id="how-rise-helps" className="bg-secondary px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="outcome-heading">
      <div className="mx-auto max-w-4xl">
        <Reveal variant="up" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">How R.I.S.E. Helps</p>
          <h2 id="outcome-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            {heading}
          </h2>
          {intro ? <p className="mt-4 text-muted-foreground">{intro}</p> : null}
        </Reveal>

        {/* Two columns of prose are unreadable under 640px, so the same pairs are
            stacked as before/after cards there. Only one of the two is ever in the
            accessibility tree because the other is display:none. */}
        <div className="rise-card mt-8 rounded-2xl px-5 py-1 sm:hidden">
          <RevealGroup as="dl" variant="up" stagger={70} className="divide-y divide-border/70">
            {OUTCOME_ROWS.map((row) => (
              <div key={row.before} className="py-4">
                <dt className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span aria-hidden="true" className="mt-px shrink-0 font-mono text-xs text-muted-foreground/60">
                    Before
                  </span>
                  <span>{row.before}</span>
                </dt>
                <dd className="mt-1.5 flex items-start gap-2 text-sm font-medium text-foreground">
                  <span aria-hidden="true" className="mt-px shrink-0 font-mono text-xs text-gold">
                    After
                  </span>
                  <span>{row.after}</span>
                </dd>
              </div>
            ))}
          </RevealGroup>
        </div>

        <Reveal variant="flip" delay={100} className="rise-card mt-10 hidden overflow-x-auto rounded-2xl sm:block">
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
            <RevealGroup as="tbody" variant="fade" stagger={70} delay={350}>
              {OUTCOME_ROWS.map((row) => (
                <tr key={row.before} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 text-muted-foreground">{row.before}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{row.after}</td>
                </tr>
              ))}
            </RevealGroup>
          </table>
        </Reveal>

        <Reveal variant="up" delay={150} className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Imagine knowing exactly which step deserves your attention first, and what to do about it.
          </p>
          <button type="button" onClick={() => open()} className={`${CTA.primary} mt-4`}>
            Discover My R.I.S.E. Stage
          </button>
        </Reveal>
      </div>
    </section>
  );
}
