import { SOCIAL_PROOF_PLACEHOLDERS } from "@/lib/site-content";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

interface SocialProofProps {
  heading?: string;
}

export function SocialProof({ heading = "Client and Agent Stories" }: SocialProofProps) {
  return (
    <section id="stories" className="bg-secondary px-4 py-20 sm:px-6" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="up" className="mx-auto max-w-2xl text-center">
          <h2 id="proof-heading" className="text-3xl font-bold sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            I only publish stories from real clients and agents, with their permission. Verified stories
            will appear here as they are confirmed.
          </p>
        </Reveal>

        <RevealGroup variant="flip" stagger={120} className="mt-12 grid gap-6 sm:grid-cols-3">
          {SOCIAL_PROOF_PLACEHOLDERS.map((item, index) => (
            <div key={index} className="rise-card rounded-2xl border-dashed border-gold/40 p-6 text-sm">
              <p className="font-semibold text-foreground">{item.name}</p>
              <p className="mt-2 text-muted-foreground">{item.role}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
