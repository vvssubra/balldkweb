import type { CategoryKey } from "@/lib/scoring/types";

/**
 * "How Balla Can Help" — the five areas of financial guidance, each framed as the
 * problem a visitor recognises and the outcome we work towards. No products listed,
 * no outcomes guaranteed.
 */
export interface HelpArea {
  id: string;
  title: string;
  stage: CategoryKey;
  problem: string;
  outcome: string;
}

export const HELP_AREAS: readonly HelpArea[] = [
  {
    id: "protection",
    title: "Protection",
    stage: "R",
    problem: "If something happened to you tomorrow, would your family be able to keep the house, pay the bills and stay on track?",
    outcome: "We look at what is covered, what is missing and what is over-insured, then put the right safety net in place for your situation.",
  },
  {
    id: "cash-flow",
    title: "Cash Flow and Debt",
    stage: "R",
    problem: "Money comes in and goes out, but you are never sure where it went or why savings never grow.",
    outcome: "We organise your income, commitments and debt into a plan you can actually follow, so you know what to pay first and what to keep.",
  },
  {
    id: "income",
    title: "Income Growth",
    stage: "I",
    problem: "Everything depends on one salary. If that stops or stalls, so does everything else.",
    outcome: "We map a realistic way to grow your earning power or add a second engine, whether inside your current career or through a new one.",
  },
  {
    id: "wealth",
    title: "Wealth and Retirement",
    stage: "S",
    problem: "You are saving, but it sits idle. You are not sure if it will be enough, or when you will be able to stop working.",
    outcome: "We set goals with real numbers and timelines, then build a consistent saving and investing plan that matches your risk profile.",
  },
  {
    id: "legacy",
    title: "Legacy",
    stage: "E",
    problem: "You have built something, but there is no plan for what happens to it, or who takes over.",
    outcome: "We document how your wealth, business or team continues without you, so what you built keeps working for the people you care about.",
  },
];
