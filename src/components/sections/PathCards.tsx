"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PATH_CARDS } from "@/lib/site-content";
import { CTA } from "@/lib/cta-styles";
import { siteWhatsAppLink } from "@/lib/whatsapp";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";

export function PathCards() {
  const { open } = useScorecard();

  return (
    <section id="paths" className="relative mx-auto max-w-6xl overflow-hidden px-4 py-20 sm:px-6" aria-labelledby="paths-heading">
      <div className="pointer-events-none absolute -top-20 left-1/4 size-80 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 size-80 rounded-full bg-rise-i/15 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 id="paths-heading" className="text-3xl font-bold sm:text-4xl">
          Two Paths. One Purpose.
        </h2>
        <p className="mt-4 text-muted-foreground">
          I work with two kinds of people. Pick the one that sounds like you and I will show you what the
          journey looks like.
        </p>
      </div>

      <div className="relative mt-12 grid items-start gap-8 md:grid-cols-2">
        {PATH_CARDS.map((card) => (
          <article
            key={card.path}
            className={`rise-card flex flex-col rounded-2xl border-t-2 p-8 transition-all hover:-translate-y-1 hover:shadow-md ${
              card.path === "financial" ? "border-t-rise-r" : "border-t-gold"
            }`}
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
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">{card.eyebrow}</p>
            <h3 className="mt-2 font-heading text-xl font-bold">{card.heading}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{card.intro}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {card.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
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
          </article>
        ))}
      </div>

      <p className="relative mt-10 text-center text-sm text-muted-foreground">
        Not sure which one you are?{" "}
        <a
          href={siteWhatsAppLink("notSure")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline underline-offset-4 hover:text-gold"
        >
          Message me and I will point you the right way.
        </a>
      </p>
    </section>
  );
}
