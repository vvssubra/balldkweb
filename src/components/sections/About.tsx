import Image from "next/image";
import { CTA } from "@/lib/cta-styles";
import { TiltCard } from "@/components/ui/tilt-card";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="about-heading">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
        <TiltCard className="mx-auto w-full max-w-xs">
          <Image
            src="/images/balla-dk-about.jpg"
            alt="Portrait of Balla DK, financial mentor and agency leader"
            width={640}
            height={800}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-4">
            <p className="font-heading text-sm font-semibold text-white">Balla DK</p>
            <p className="text-xs text-white/70">Financial Mentor &amp; Agency Leader</p>
          </div>
        </TiltCard>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">About Balla</p>
          <h2 id="about-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Mentor. Guide. Leader.
          </h2>
          <p className="mt-4 text-muted-foreground">
            I created the R.I.S.E. Roadmap because I kept meeting people who were working hard but had
            no idea which financial problem to fix first. They were investing before they had a safety
            net, or clearing debt while their income was stuck. R.I.S.E. puts the steps in order.
          </p>
          <p className="mt-4 text-muted-foreground">
            Today I use it in two ways. I guide individuals and families to protect what matters,
            organise their cash flow and build wealth. And I mentor people building a career in my
            agency, with the same focus on systems, clarity, action and accountability.
          </p>
          <blockquote className="mt-8 rounded-xl bg-secondary p-6 font-heading text-lg italic text-foreground">
            It is not only about earning more. It is about building the right plan, taking the right
            actions and surrounding yourself with the right people.
          </blockquote>
          <a href="#how-balla-helps" className={`${CTA.primary} mt-8`}>
            See How I Can Help
          </a>
        </div>
      </div>
    </section>
  );
}
