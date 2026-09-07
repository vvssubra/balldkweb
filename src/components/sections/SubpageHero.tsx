import Image from "next/image";
import type { ReactNode } from "react";

interface SubpageHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  note: string;
  imageSrc: string;
  imageAlt: string;
  /** CTA buttons/links, already styled. */
  actions: ReactNode;
}

/** Dark hero for /agents and /clients. Copy left, portrait right, no particle canvas. */
export function SubpageHero({ eyebrow, headline, subheadline, note, imageSrc, imageAlt, actions }: SubpageHeroProps) {
  return (
    <section id="top" className="relative overflow-hidden bg-navy px-4 py-20 text-white sm:px-6 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 30%, color-mix(in oklch, var(--gold) 14%, transparent), transparent 50%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-gold">
            {eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{headline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{subheadline}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">{actions}</div>
          <p className="mt-6 text-sm text-white/40">{note}</p>
        </div>
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 shadow-2xl lg:max-w-none">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={640}
            height={800}
            priority
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
