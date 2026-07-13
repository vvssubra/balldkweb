import { PROBLEM_CARDS } from "@/lib/site-content";

interface ProblemCardsProps {
  onFindStep: () => void;
}

export function ProblemCards({ onFindStep }: ProblemCardsProps) {
  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-20 sm:px-6" aria-labelledby="problem-heading">
      <div className="pointer-events-none absolute -top-16 right-0 size-72 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 left-0 size-72 rounded-full bg-rise-r/15 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 id="problem-heading" className="text-3xl font-bold sm:text-4xl">
          What Is Missing From Your Financial Life?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Most people do not have a money problem alone. They have a missing-system problem.
        </p>
      </div>

      <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEM_CARDS.map((card, index) => (
          <div
            key={card.title}
            className={
              index === 0
                ? "rise-card rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-md sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-center"
                : "rise-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md"
            }
          >
            <h3 className={index === 0 ? "font-heading text-xl font-semibold" : "font-heading text-lg font-semibold"}>
              {card.title}
            </h3>
            <p className={index === 0 ? "mt-3 text-base text-muted-foreground" : "mt-2 text-sm text-muted-foreground"}>
              {card.description}
            </p>
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
