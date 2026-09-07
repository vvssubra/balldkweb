import { UserCheck } from "lucide-react";
import { AGENT_PROFILES, NOT_FOR } from "@/lib/content/agents-content";
import { CTA } from "@/lib/cta-styles";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

export function WhoIsItFor() {
  return (
    <section id="who" className="bg-secondary px-4 py-20 sm:px-6" aria-labelledby="who-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="blur" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Who Is It For?</p>
          <h2 id="who-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Does One of These Sound Like You?
          </h2>
        </Reveal>

        <RevealGroup as="ul" variant="scale" stagger={80} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AGENT_PROFILES.map((profile) => (
            <li key={profile.title} className="rise-card rounded-2xl p-6">
              <UserCheck className="size-5 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-heading text-lg font-semibold">{profile.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{profile.body}</p>
            </li>
          ))}
          <li className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            <p className="font-heading text-lg font-semibold text-foreground">Who it is not for</p>
            <p className="mt-2">{NOT_FOR}</p>
          </li>
        </RevealGroup>

        <Reveal variant="fade" delay={150} className="mt-10 text-center">
          <a href="#rise-for-agents" className={CTA.primary}>
            See If It&rsquo;s Right for Me
          </a>
        </Reveal>
      </div>
    </section>
  );
}
