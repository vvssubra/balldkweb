"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PATH_CARDS, type PathCard } from "@/lib/site-content";
import { CTA } from "@/lib/cta-styles";
import { siteWhatsAppLink } from "@/lib/whatsapp";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

/** Visual treatment per path: header band gradient, accent text, big ghost numeral. */
const PATH_THEME: Record<PathCard["path"], { band: string; accent: string; index: string; who: string }> = {
  financial: {
    band: "from-rise-r via-rise-r/70 to-navy",
    accent: "text-rise-r",
    index: "01",
    who: "I want to sort out my money.",
  },
  career: {
    band: "from-gold via-gold/70 to-navy",
    accent: "text-gold",
    index: "02",
    who: "I want to build a career.",
  },
};

export function PathCards() {
  const { open } = useScorecard();
  const forkRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = forkRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="paths" className="relative overflow-hidden bg-background px-4 py-20 sm:px-6" aria-labelledby="paths-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="up" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Choose Your Path</p>
          <h2 id="paths-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Two Paths. One Purpose.
          </h2>
          <p className="mt-4 text-muted-foreground">
            I work with two kinds of people. Pick the one that sounds like you and I will show you what the
            journey looks like.
          </p>
        </Reveal>

        <div ref={forkRef} className={`path-fork mt-8 ${inView ? "in-view" : ""}`}>
          {/* Fork connector. Single stem from the heading splits to each card. Desktop only. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            className="mx-auto hidden h-28 w-full max-w-4xl md:block"
          >
            <defs>
              <linearGradient id="fork-l" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--gold)" />
                <stop offset="1" stopColor="var(--rise-r)" />
              </linearGradient>
              <linearGradient id="fork-r" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--gold)" />
                <stop offset="1" stopColor="var(--gold)" />
              </linearGradient>
            </defs>
            <path
              d="M500 0 V30 C500 70 250 60 250 120"
              fill="none"
              stroke="url(#fork-l)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength="1"
              className="fork-line"
            />
            <path
              d="M500 0 V30 C500 70 750 60 750 120"
              fill="none"
              stroke="url(#fork-r)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength="1"
              className="fork-line fork-line-right"
            />
            <circle cx="500" cy="30" r="5" fill="var(--gold)" />
          </svg>

          <RevealGroup variant="sides" stagger={140} threshold={0.1} className="flex flex-col gap-6 md:flex-row md:items-stretch">
            {PATH_CARDS.map((card) => {
              const theme = PATH_THEME[card.path];
              return (
                <article
                  key={card.path}
                  className="path-card relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
                >
                  <div className={`relative overflow-hidden bg-gradient-to-br ${theme.band} px-8 pb-8 pt-7 text-white`}>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 -top-6 select-none font-heading text-[9rem] font-bold leading-none text-white/10"
                    >
                      {theme.index}
                    </span>
                    <div className="relative flex items-end justify-between gap-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{card.eyebrow}</p>
                        <p className="mt-2 font-heading text-2xl font-bold leading-tight sm:text-3xl">{theme.who}</p>
                      </div>
                      {card.path === "career" ? (
                        <Image
                          src="/images/balla-dk-path.jpg"
                          alt="Balla DK, agency leader and mentor"
                          width={112}
                          height={136}
                          className="hidden h-[136px] w-28 shrink-0 rounded-2xl border-2 border-white/40 object-cover object-top shadow-lg sm:block"
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <h3 className={`font-heading text-xl font-bold ${theme.accent}`}>{card.heading}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{card.intro}</p>
                    <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <Check className={`mt-0.5 size-4 shrink-0 ${theme.accent}`} aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-col gap-3 pt-8">
                      <Link href={card.href} className={CTA.primary}>
                        {card.cta}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => open(card.path)}
                        className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      >
                        {card.scorecardCta}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </RevealGroup>
        </div>

        <Reveal as="p" variant="fade" delay={200} className="mt-10 text-center text-sm text-muted-foreground">
          Not sure which one you are?{" "}
          <a
            href={siteWhatsAppLink("notSure")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 hover:text-gold"
          >
            Message me and I will point you the right way.
          </a>
        </Reveal>
      </div>
    </section>
  );
}
