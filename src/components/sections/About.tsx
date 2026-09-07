import Image from "next/image";

interface AboutProps {
  onDiscoverStage: () => void;
}

export function About({ onDiscoverStage }: AboutProps) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="about-heading">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-border shadow-sm">
          <Image
            src="/images/balla-dk-about.jpg"
            alt="Portrait of Balla DK, financial mentor and agency leader"
            width={640}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 id="about-heading" className="text-3xl font-bold sm:text-4xl">
            Mentor. Guide. Leader.
          </h2>
          <p className="mt-4 text-muted-foreground">
            I created the R.I.S.E. Roadmap to help you understand where you are today, strengthen
            your income, and build a better financial future — whether that means protecting your
            family, growing your wealth, or building a legacy that lasts. I also mentor ambitious
            people building a purpose-driven career through the agency model, with a focus on
            systems, clarity, action and accountability.
          </p>
          <blockquote className="mt-8 rounded-xl bg-secondary p-6 font-heading text-lg italic text-foreground">
            It is not only about earning more. It is about building the right plan, taking the right
            actions and surrounding yourself with the right people.
          </blockquote>
          <button
            type="button"
            onClick={onDiscoverStage}
            className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Discover My R.I.S.E. Stage
          </button>
        </div>
      </div>
    </section>
  );
}
