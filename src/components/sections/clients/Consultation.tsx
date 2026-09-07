import { CONSULTATION } from "@/lib/content/clients-content";
import { CTA } from "@/lib/cta-styles";
import { siteWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/layout/FloatingWhatsApp";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

/**
 * Transparency before consultation. Explains the process so a visitor knows what
 * messaging Balla leads to. Replaces a pricing table until real pricing is supplied.
 */
export function Consultation() {
  return (
    <section id="consultation" className="bg-secondary px-4 py-20 sm:px-6" aria-labelledby="consult-heading">
      <div className="mx-auto max-w-4xl">
        <Reveal variant="blur" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Before You Message Me</p>
          <h2 id="consult-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            {CONSULTATION.headline}
          </h2>
          <p className="mt-4 text-muted-foreground">{CONSULTATION.intro}</p>
        </Reveal>

        <RevealGroup as="ol" variant="sides" stagger={110} className="mt-12 grid gap-6 sm:grid-cols-2">
          {CONSULTATION.steps.map((step, index) => (
            <li key={step.title} className="rise-card flex gap-4 rounded-2xl p-6">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
                {index + 1}
              </span>
              <div>
                <h3 className="font-heading font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </RevealGroup>

        <Reveal variant="scale" delay={150} className="mt-10 text-center">
          <a href={siteWhatsAppLink("client")} target="_blank" rel="noopener noreferrer" className={CTA.whatsappSolid}>
            <WhatsAppIcon className="size-4" />
            Find the Right Option for Me
          </a>
          <p className="mt-3 text-xs text-muted-foreground">Opens WhatsApp. Free first conversation, no obligation.</p>
        </Reveal>
      </div>
    </section>
  );
}
