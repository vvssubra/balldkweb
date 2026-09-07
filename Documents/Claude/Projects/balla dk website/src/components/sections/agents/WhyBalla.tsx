import Image from "next/image";
import { WHY_PILLARS } from "@/lib/content/agents-content";
import { CTA } from "@/lib/cta-styles";

export function WhyBalla() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="why-heading">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-border shadow-sm lg:max-w-none">
          <Image
            src="/images/balla-dk-about.jpg"
            alt="Portrait of Balla DK"
            width={640}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Why Balla</p>
          <h2 id="why-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Why Build Your Career Here?
          </h2>
          <p className="mt-4 text-muted-foreground">
            You could join any agency. The question is what happens after you sign up. This is what you
            get with me, and I hold myself to it.
          </p>

          <dl className="mt-8 space-y-6">
            {WHY_PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-l-2 border-gold pl-5">
                <dt className="font-heading text-lg font-semibold">{pillar.title}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{pillar.body}</dd>
              </div>
            ))}
          </dl>

          <a href="#career-path" className={`${CTA.primary} mt-8`}>
            Discover the Support System
          </a>
        </div>
      </div>
    </section>
  );
}
