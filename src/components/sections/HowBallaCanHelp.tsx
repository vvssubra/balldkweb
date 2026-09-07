"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { HELP_AREAS } from "@/lib/content/help-content";
import type { CategoryKey } from "@/lib/scoring/types";
import { CTA } from "@/lib/cta-styles";
import { AntiGravityCanvas } from "@/components/ui/particle-effect-for-hero";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

const STAGE: Record<CategoryKey, { name: string; badge: string; spot: string }> = {
  R: { name: "Restore", badge: "bg-rise-r/20 text-rise-r", spot: "var(--rise-r)" },
  I: { name: "Income", badge: "bg-rise-i/20 text-rise-i", spot: "var(--rise-i)" },
  S: { name: "Sustain", badge: "bg-rise-s/20 text-rise-s", spot: "var(--rise-s)" },
  E: { name: "Empire", badge: "bg-rise-e/20 text-rise-e", spot: "var(--rise-e)" },
};

interface HowBallaCanHelpProps {
  ctaHref?: string;
  ctaLabel?: string;
}

/**
 * The five areas Balla works on with clients, each as problem → outcome.
 * Cards carry a cursor-following spotlight: the border and a soft fill light up
 * around the pointer, in the card's stage colour. One listener on the grid writes
 * --mx/--my to every card so the glow feels continuous across the layout.
 */
export function HowBallaCanHelp({ ctaHref = "#scorecard", ctaLabel = "Know Your Financial Stage" }: HowBallaCanHelpProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const grid = gridRef.current;
    if (!grid) return;
    for (const card of grid.querySelectorAll<HTMLElement>("[data-spot]")) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }
  }

  return (
    <section id="how-balla-helps" className="relative overflow-hidden bg-navy px-4 py-20 text-white sm:px-6" aria-labelledby="help-heading">
      <AntiGravityCanvas shootingStars />

      {/* Empty space lets the pointer reach the canvas; cards and CTA re-enable events. */}
      <div className="pointer-events-none relative z-10 mx-auto max-w-6xl">
        <Reveal variant="blur" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">How I Can Help</p>
          <h2 id="help-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            This Is What I Need. This Is How Balla Helps.
          </h2>
          <p className="mt-4 text-white/60">
            I do not start with products. I start with the stage you are at and the problem in front of you.
            These are the five areas I work on with clients, and what we aim for in each.
          </p>
        </Reveal>

        <RevealGroup
          ref={gridRef}
          variant="up"
          stagger={90}
          threshold={0.1}
          onPointerMove={handleMove}
          className="group/grid pointer-events-auto mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {HELP_AREAS.map((area) => {
            const stage = STAGE[area.stage];
            return (
              <article
                key={area.id}
                data-spot
                style={{ "--spot": stage.spot } as CSSProperties}
                className="spotlight-card pointer-events-auto relative flex flex-col rounded-2xl border-2 border-white/10 bg-navy/60 p-6 backdrop-blur-sm transition-colors duration-300"
              >
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-lg font-semibold">{area.title}</h3>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${stage.badge}`}>
                      {area.stage} · {stage.name}
                    </span>
                  </div>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold text-white/90">The problem</dt>
                      <dd className="mt-1 text-white/60">{area.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-white/90">What we work towards</dt>
                      <dd className="mt-1 text-white/60">{area.outcome}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            );
          })}

          <div className="pointer-events-auto flex flex-col justify-center rounded-2xl border-2 border-dashed border-gold/50 bg-gold/5 p-6 text-sm backdrop-blur-sm">
            <p className="font-heading text-lg font-semibold">Not sure which of these is you?</p>
            <p className="mt-2 text-white/60">
              That is what the scorecard is for. Three minutes, and you will know which stage to work on
              first.
            </p>
            <a href={ctaHref} className={`${CTA.gold} mt-4`}>
              {ctaLabel}
            </a>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
