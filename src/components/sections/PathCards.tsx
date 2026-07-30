import { Check } from "lucide-react";
import { PATH_CARDS } from "@/lib/site-content";
import type { ScorecardPath } from "@/lib/scoring/types";
import Image from "next/image";

interface PathCardsProps {
  onSelectPath: (path: ScorecardPath) => void;
}

export function PathCards({ onSelectPath }: PathCardsProps) {
  return (
    <section id="clients" className="relative mx-auto max-w-6xl overflow-hidden px-4 py-20 sm:px-6" aria-labelledby="paths-heading">
      <div className="pointer-events-none absolute -top-20 left-1/4 size-80 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 size-80 rounded-full bg-rise-i/15 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 id="paths-heading" className="text-3xl font-bold sm:text-4xl">
          Two Paths. One Purpose.
        </h2>
        <p className="mt-4 text-muted-foreground">Choose the journey that matches where you are today.</p>
      </div>

      <div id="agents" className="relative mt-12 grid items-start gap-8 md:grid-cols-[1.1fr_1fr]">
        {PATH_CARDS.map((card) => (
          <div
            key={card.path}
            className={
              card.path === "financial"
                ? "rise-card flex flex-col rounded-2xl border-t-2 border-t-rise-r p-8 transition-all hover:-translate-y-1 hover:shadow-md"
                : "rise-card flex flex-col rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-md"
            }
          >
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
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
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
              className="mt-8 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              {card.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
