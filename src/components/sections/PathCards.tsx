import { Check } from "lucide-react";
import { PATH_CARDS } from "@/lib/site-content";
import type { ScorecardPath } from "@/lib/scoring/types";
import Image from "next/image";

interface PathCardsProps {
  onSelectPath: (path: ScorecardPath) => void;
}

export function PathCards({ onSelectPath }: PathCardsProps) {
  return (
    <section id="clients" className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="paths-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="paths-heading" className="text-3xl font-bold sm:text-4xl">
          Two Paths. One Purpose.
        </h2>
        <p className="mt-4 text-muted-foreground">Choose the journey that matches where you are today.</p>
      </div>

      <div id="agents" className="mt-12 grid gap-8 md:grid-cols-2">
        {PATH_CARDS.map((card) => (
          <div key={card.path} className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
            {card.path === "career" ? (
              <div className="mb-6 flex justify-center">
                <Image
                  src="/images/balla-dk-path.jpg"
                  alt="Balla DK, agency leader and mentor"
                  width={180}
                  height={220}
                  className="rounded-xl object-cover"
                />
              </div>
            ) : null}
            <h3 className="font-heading text-xl font-bold">{card.heading}</h3>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
              {card.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onSelectPath(card.path)}
              className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              {card.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
