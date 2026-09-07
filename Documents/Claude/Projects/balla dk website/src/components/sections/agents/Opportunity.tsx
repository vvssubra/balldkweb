import { OPPORTUNITY_POINTS } from "@/lib/content/agents-content";
import { CTA } from "@/lib/cta-styles";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

export function Opportunity() {
  return (
    <section id="opportunity" className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="opportunity-heading">
      <Reveal variant="up" className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">The Opportunity</p>
        <h2 id="opportunity-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
          What the Agency Opportunity Actually Is
        </h2>
        <p className="mt-4 text-muted-foreground">
          People hear &ldquo;agency&rdquo; and picture a sales job. Here is what it really involves, in plain terms.
        </p>
      </Reveal>

      <RevealGroup variant="sides" stagger={110} className="mt-12 grid gap-6 md:grid-cols-2">
        {OPPORTUNITY_POINTS.map((point, index) => (
          <article key={point.title} className="rise-card rounded-2xl p-8">
            <span className="font-mono text-xs text-gold">0{index + 1}</span>
            <h3 className="mt-2 font-heading text-xl font-semibold">{point.title}</h3>
            <p className="mt-3 text-muted-foreground">{point.body}</p>
          </article>
        ))}
      </RevealGroup>

      <Reveal variant="fade" delay={150} className="mt-10 text-center">
        <a href="#career-path" className={CTA.primary}>
          See How It Works
        </a>
      </Reveal>
    </section>
  );
}
