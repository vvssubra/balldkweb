import { PROBLEM_CARDS } from "@/lib/site-content";

interface ProblemCardsProps {
  onFindStep: () => void;
}

export function ProblemCards({ onFindStep }: ProblemCardsProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="problem-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="problem-heading" className="text-3xl font-bold sm:text-4xl">
          What Is Missing From Your Financial Life?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Most people do not have a money problem alone. They have a missing-system problem.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {PROBLEM_CARDS.map((card) => (
          <div key={card.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-heading text-lg font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-muted-foreground">
          You do not need to solve everything today. You need to identify the correct next step.
        </p>
        <button
          type="button"
          onClick={onFindStep}
          className="mt-4 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          Find My Missing R.I.S.E. Step
        </button>
      </div>
    </section>
  );
}
