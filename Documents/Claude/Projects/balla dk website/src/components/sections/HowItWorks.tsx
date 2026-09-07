import { HOW_IT_WORKS_STEPS, type HowItWorksStep } from "@/lib/site-content";

interface HowItWorksProps {
  steps?: readonly HowItWorksStep[];
  heading?: string;
}

export function HowItWorks({ steps = HOW_IT_WORKS_STEPS, heading = "How the Scorecard Works" }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="how-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="how-heading" className="text-3xl font-bold sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          The scorecard is educational and does not replace personalised financial, investment, legal or
          tax advice.
        </p>
      </div>

      <ol className="mt-12 grid gap-8 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="rise-card rounded-2xl p-6">
            <span className="flex size-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-primary">
              {index + 1}
            </span>
            <h3 className="mt-4 font-heading font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
