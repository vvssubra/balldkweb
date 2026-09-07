import type { CategoryKey, ScorecardPath, Tier } from "./scoring/types";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "R.I.S.E. Roadmap", href: "/#roadmap" },
  { label: "For Clients", href: "/clients" },
  { label: "For Agents", href: "/agents" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];

export interface ProblemCard {
  title: string;
  description: string;
  /** R.I.S.E. stage this gap belongs to. Drives the card's colour splash. */
  stage: CategoryKey;
}

export const PROBLEM_CARDS: readonly ProblemCard[] = [
  { title: "No Safety Net", description: "One emergency could damage years of progress.", stage: "R" },
  { title: "Messy Cash Flow", description: "Debt, expenses and priorities are not organised.", stage: "R" },
  { title: "No Income Engine", description: "Your income depends on one job or one source.", stage: "I" },
  { title: "No Money Machine", description: "Your savings are not growing fast enough.", stage: "S" },
  { title: "No Legacy System", description: "There is no clear plan for leadership, succession or wealth transfer.", stage: "E" },
];

export interface PyramidLevel {
  key: CategoryKey;
  name: string;
  step: string;
  problem: string;
  outcome: string;
}

export const PYRAMID_LEVELS: readonly PyramidLevel[] = [
  {
    key: "R",
    name: "RESTORE",
    step: "Safety Net & Clean Up",
    problem: "Your foundation — protection, savings and cash flow — may have gaps.",
    outcome: "A stable base: emergency buffer, clear protection and manageable cash flow.",
  },
  {
    key: "I",
    name: "INCOME",
    step: "New Engine",
    problem: "Your income may depend on one source with little room to grow.",
    outcome: "A realistic plan to grow income and build a second earning stream.",
  },
  {
    key: "S",
    name: "SUSTAIN",
    step: "Money Machine",
    problem: "Savings may be idle instead of compounding toward your goals.",
    outcome: "A structured, goal-based plan for saving and investing consistently.",
  },
  {
    key: "E",
    name: "EMPIRE",
    step: "Legacy",
    problem: "There may be no system for leadership, succession or long-term impact.",
    outcome: "A documented legacy, leadership or continuity plan.",
  },
];

export interface PathCard {
  path: ScorecardPath;
  eyebrow: string;
  heading: string;
  intro: string;
  bullets: readonly string[];
  href: string;
  cta: string;
  scorecardCta: string;
}

export const PATH_CARDS: readonly PathCard[] = [
  {
    path: "financial",
    eyebrow: "For clients",
    heading: "Build Financial Clarity",
    intro: "You want to protect your family, sort out your cash flow and grow what you have. I help you do it in the right order.",
    bullets: [
      "Identify financial blind spots",
      "Strengthen protection and emergency planning",
      "Improve cash flow",
      "Build a goal-based wealth plan",
      "Receive a personalised next-step recommendation",
    ],
    href: "/clients",
    cta: "Explore for Clients",
    scorecardCta: "Take the Financial Health Scorecard",
  },
  {
    path: "career",
    eyebrow: "For agents",
    heading: "Build Income, Skills and Leadership",
    intro: "You want a career where your income grows with your skill, and a mentor who holds you to it. That is what I build in my agency.",
    bullets: [
      "Assess career readiness",
      "Identify transferable strengths",
      "Explore a performance-based career",
      "Understand the mentorship system",
      "Discover your leadership potential",
    ],
    href: "/agents",
    cta: "Explore for Agents",
    scorecardCta: "Take the Career Growth Scorecard",
  },
];

export const OUTCOME_ROWS: readonly { before: string; after: string }[] = [
  { before: "Financial confusion", after: "Clear priorities" },
  { before: "Unstructured debt", after: "Stronger protection" },
  { before: "One income source", after: "Improved cash flow" },
  { before: "Idle savings", after: "A new income strategy" },
  { before: "No succession plan", after: "Structured wealth-building" },
  { before: "Reactive decision-making", after: "A plan for leadership and legacy" },
];

export interface HowItWorksStep {
  title: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  { title: "Answer 12 practical questions", description: "One question per screen. About three minutes. No jargon." },
  { title: "See your R.I.S.E. result straight away", description: "Your score across Restore, Income, Sustain and Empire, and the stage that needs attention first." },
  { title: "Take the next step with me", description: "Your result comes with three practical actions. If you want to talk it through, I am one WhatsApp message away." },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  { question: "What is the R.I.S.E. Roadmap?", answer: "It is the four-stage framework I use with every client and every agent: Restore, Income, Sustain, Empire. It tells you which financial or career priority to work on first, so you stop trying to fix everything at once." },
  { question: "Is the scorecard free?", answer: "Yes. Completely free, no obligation. You get your result on screen the moment you finish." },
  { question: "How long does it take?", answer: "About three minutes. Twelve questions, one per screen." },
  { question: "Will I receive personalised advice?", answer: "You receive a personalised result and a recommended next step based on your answers. It is educational, not individual financial, investment, legal or tax advice. That part happens when we talk." },
  { question: "Is this suitable for beginners?", answer: "Yes. Most people I meet have never had a clear financial roadmap. The scorecard is built for exactly that starting point." },
  { question: "Is this only for insurance clients?", answer: "No. The Financial Health path is for anyone who wants clarity on protection, cash flow, income or wealth, whether or not they ever buy anything from me." },
  { question: "How does the agency opportunity work?", answer: "I lead an agency in the financial services industry and I mentor people who want to build a performance-based career with structured training and support. The For Agents page explains the role, who it suits and what the career path looks like." },
  { question: "Do I need sales experience?", answer: "No. Willingness to learn and to follow a weekly plan matters far more than experience. I will teach the rest." },
  { question: "Can existing agents apply?", answer: "Yes. If you are already an agent or leader, take the Career Growth scorecard and tell me your situation. The questions cover leadership and team-building too." },
  { question: "What happens after I get my result?", answer: "Nothing, unless you want it to. You can message me on WhatsApp to talk through your result, explore the agency opportunity, or simply keep the result for yourself." },
  { question: "How will my information be used?", answer: "Only to share your result and follow up with you by email or WhatsApp. I do not sell or share your details. You can unsubscribe at any time." },
];

export const FINANCIAL_DISCLAIMER =
  "The R.I.S.E. Scorecard and website content are provided for general education and initial assessment only. They do not constitute personalised financial, investment, insurance, legal or tax advice. Any recommendation should be reviewed according to your individual circumstances, goals and risk profile.";

export const CAREER_DISCLAIMER =
  "Career and income outcomes depend on individual effort, skills, market conditions, training, consistency and other factors. No income result is guaranteed.";

export const CONSENT_MICROCOPY =
  "I agree to receive my personalised R.I.S.E. result and relevant follow-up by email or WhatsApp. I can unsubscribe at any time.";

export interface MissingLetterContent {
  headline: string;
  message: string;
  actions: readonly string[];
}

export const MISSING_LETTER_CONTENT: Record<CategoryKey, MissingLetterContent> = {
  R: {
    headline: "Your Priority Is RESTORE",
    message: "Your next step is to strengthen the foundation before taking on more financial or career complexity.",
    actions: [
      "Build or improve your emergency buffer",
      "Review protection, debt or financial commitments",
      "Create a 30-day stabilisation plan",
    ],
  },
  I: {
    headline: "Your Priority Is INCOME",
    message: "Your foundation may be developing, but your income engine needs more attention.",
    actions: [
      "Identify an income-growth target",
      "Build one valuable and marketable skill",
      "Explore a realistic second-income or career-development pathway",
    ],
  },
  S: {
    headline: "Your Priority Is SUSTAIN",
    message: "You are earning, but your money or professional momentum may not be compounding effectively.",
    actions: [
      "Define long-term goals",
      "Automate regular savings or development activity",
      "Build a structured growth plan based on time horizon and risk",
    ],
  },
  E: {
    headline: "Your Priority Is EMPIRE",
    message: "You have progress, but the next level requires systems, leadership and a long-term legacy plan.",
    actions: [
      "Build repeatable systems",
      "Develop leadership or succession capacity",
      "Document a long-term wealth, team or legacy strategy",
    ],
  },
};

export const TIER_LABEL: Record<Tier, string> = {
  "needs-attention": "Needs Attention",
  developing: "Developing",
  strong: "Strong",
};

const RESULT_CTA_BY_LETTER: Record<CategoryKey, Record<ScorecardPath, string>> = {
  R: { financial: "Book My Financial Foundation Review", career: "Book My Financial Foundation Review" },
  I: { financial: "Build My Income Strategy", career: "Explore the Agency Opportunity" },
  S: { financial: "Book My Wealth-Building Review", career: "Book My Wealth-Building Review" },
  E: { financial: "Plan My Legacy Strategy", career: "Apply for a Leadership Strategy Session" },
};

export function resultCta(path: ScorecardPath, missingLetter: CategoryKey): string {
  return RESULT_CTA_BY_LETTER[missingLetter][path];
}

export const SOCIAL_PROOF_PLACEHOLDERS: readonly { name: string; role: string }[] = [
  { name: "[INSERT VERIFIED CLIENT NAME]", role: "[INSERT VERIFIED TESTIMONIAL]" },
  { name: "[INSERT VERIFIED AGENT NAME]", role: "[INSERT VERIFIED TESTIMONIAL]" },
  { name: "[INSERT VERIFIED CLIENT NAME]", role: "[INSERT VERIFIED TESTIMONIAL]" },
];
