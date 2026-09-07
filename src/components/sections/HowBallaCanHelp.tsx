import { HELP_AREAS } from "@/lib/content/help-content";
import type { CategoryKey } from "@/lib/scoring/types";

const STAGE_BADGE: Record<CategoryKey, string> = {
  R: "bg-rise-r/10 text-rise-r",
  I: "bg-rise-i/15 text-rise-i",
  S: "bg-rise-s/10 text-rise-s",
  E: "bg-rise-e/10 text-rise-e",
};

const STAGE_NAME: Record<CategoryKey, string> = {
  R: "Restore",
  I: "Income",
  S: "Sustain",
  E: "Empire",
};

interface HowBallaCanHelpProps {
  ctaHref?: string;
  ctaLabel?: string;
}

/**
 * The five areas Balla works on with clients, each as problem → outcome.
 * Sits between "How R.I.S.E. helps" and "Two paths" so visitors connect their
 * situation to a concrete kind of help before choosing a journey.
 */
export function HowBallaCanHelp({ ctaHref = "#scorecard", ctaLabel = "Know Your Financial Stage" }: HowBallaCanHelpProps) {
  return (
    <section id="how-balla-helps" className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="help-heading">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">How I Can Help</p>
        <h2 id="help-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
          This Is What I Need. This Is How Balla Helps.
        </h2>
        <p className="mt-4 text-muted-foreground">
          I do not start with products. I start with the stage you are at and the problem in front of you.
          These are the five areas I work on with clients, and what we aim for in each.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {HELP_AREAS.map((area) => (
          <article key={area.id} className="rise-card flex flex-col rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-heading text-lg font-semibold">{area.title}</h3>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STAGE_BADGE[area.stage]}`}>
                {area.stage} · {STAGE_NAME[area.stage]}
              </span>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-foreground">The problem</dt>
                <dd className="mt-1 text-muted-foreground">{area.problem}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What we work towards</dt>
                <dd className="mt-1 text-muted-foreground">{area.outcome}</dd>
              </div>
            </dl>
          </article>
        ))}

        <div className="flex flex-col justify-center rounded-2xl border border-dashed border-gold/50 bg-accent p-6 text-sm">
          <p className="font-heading text-lg font-semibold">Not sure which of these is you?</p>
          <p className="mt-2 text-muted-foreground">
            That is what the scorecard is for. Three minutes, and you will know which stage to work on
            first.
          </p>
          <a
            href={ctaHref}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
