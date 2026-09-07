"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { HOW_IT_WORKS_STEPS, type HowItWorksStep } from "@/lib/site-content";
import { Reveal } from "@/components/ui/reveal";

interface HowItWorksProps {
  steps?: readonly HowItWorksStep[];
  heading?: string;
}

/** Illustrative UI mocks, one per step position. Generic labels only, no invented data. */
const STEP_MOCKS: readonly (() => ReactNode)[] = [
  function QuestionMock() {
    return (
      <div className="w-full space-y-2.5 text-left">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Question 4 of 12</span>
          <span className="font-mono">33%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-border">
          <div className="mock-progress h-full rounded-full bg-gold" />
        </div>
        <div className="h-2.5 w-4/5 rounded bg-foreground/15" />
        <div className="space-y-1.5 pt-1">
          {["Not in place", "Starting", "Mostly in place", "Strong and reviewed"].map((label, i) => (
            <div
              key={label}
              className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] ${
                i === 2 ? "border-gold bg-gold/10 font-medium" : "border-border/70 bg-card text-muted-foreground"
              }`}
            >
              <span className={`size-2 rounded-full ${i === 2 ? "bg-gold" : "bg-border"}`} aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  },
  function ResultMock() {
    const bars = [
      { key: "R", color: "bg-rise-r", width: "42%" },
      { key: "I", color: "bg-rise-i", width: "78%" },
      { key: "S", color: "bg-rise-s", width: "61%" },
      { key: "E", color: "bg-rise-e", width: "55%" },
    ];
    return (
      <div className="w-full space-y-3 text-left">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-rise-r/15 px-2 py-0.5 text-[10px] font-semibold text-rise-r">Priority: R</span>
          <span className="text-[10px] text-muted-foreground">Your R.I.S.E. result</span>
        </div>
        <ul className="space-y-2">
          {bars.map((bar, i) => (
            <li key={bar.key} className="flex items-center gap-2">
              <span className="w-3 font-heading text-xs font-bold">{bar.key}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className={`mock-bar h-full rounded-full ${bar.color}`}
                  style={{ "--bar-target": bar.width, animationDelay: `${300 + i * 120}ms` } as React.CSSProperties}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-border/70 bg-card p-2.5">
          <div className="h-2 w-2/3 rounded bg-foreground/15" />
          <div className="mt-1.5 h-2 w-full rounded bg-foreground/10" />
          <div className="mt-1.5 h-2 w-5/6 rounded bg-foreground/10" />
        </div>
      </div>
    );
  },
  function WhatsAppMock() {
    return (
      <div className="w-full space-y-2 text-left text-[11px]">
        <div className="ml-auto w-[85%] rounded-2xl rounded-br-sm bg-[#d9fdd3] px-3 py-2 text-foreground shadow-sm">
          Hi Balla, I just completed the R.I.S.E. Scorecard. My priority stage is R. I&rsquo;d like to discuss my next step.
        </div>
        <div className="flex w-[85%] items-start gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">B</span>
          <div className="rounded-2xl rounded-bl-sm bg-card px-3 py-2 shadow-sm">
            Good. Restore first means the foundation. Tell me what you have in place today and we take it from there.
          </div>
        </div>
        <div className="flex items-center gap-1.5 pl-8 text-[10px] text-muted-foreground">
          <MessageCircle className="size-3" aria-hidden="true" />
          A real reply, not an auto-sequence.
        </div>
      </div>
    );
  },
];

export function HowItWorks({ steps = HOW_IT_WORKS_STEPS, heading = "How the Scorecard Works" }: HowItWorksProps) {
  const ref = useRef<HTMLOListElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="bg-secondary px-4 py-20 sm:px-6" aria-labelledby="how-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="up" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Three Steps</p>
          <h2 id="how-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            The scorecard is educational and does not replace personalised financial, investment, legal or
            tax advice.
          </p>
        </Reveal>

        <ol ref={ref} className={`steps-rail relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6 ${inView ? "in-view" : ""}`}>
          {/* Rail behind the numbered nodes. Fills gold left→right once in view. Desktop only. */}
          <div aria-hidden="true" className="absolute left-[16.67%] right-[16.67%] top-5 hidden h-0.5 bg-border sm:block">
            <div className="rail-fill h-full origin-left bg-gold" />
          </div>

          {steps.map((step, index) => {
            const Mock = STEP_MOCKS[index] ?? STEP_MOCKS[STEP_MOCKS.length - 1];
            return (
              <li key={step.title} className="step-item relative flex flex-col items-center text-center">
                <span className="step-node relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-gold font-heading text-sm font-bold text-navy">
                  {index + 1}
                </span>

                <div className="mt-6 flex w-full flex-1 flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex min-h-[188px] items-center rounded-xl bg-secondary/70 p-4">
                    <Mock />
                  </div>
                  <h3 className="mt-5 font-heading font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
