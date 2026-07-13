import type { CategoryKey, ScorecardPath, Tier } from "./scoring/types";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "R.I.S.E. Roadmap", href: "#roadmap" },
  { label: "For Clients", href: "#clients" },
  { label: "For Agents", href: "#agents" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export interface ProblemCard {
  title: string;
  description: string;
}

export const PROBLEM_CARDS: readonly ProblemCard[] = [
  { title: "No Safety Net", description: "One emergency could damage years of progress." },
  { title: "Messy Cash Flow", description: "Debt, expenses and priorities are not organised." },
  { title: "No Income Engine", description: "Your income depends on one job or one source." },
  { title: "No Money Machine", description: "Your savings are not growing fast enough." },
  { title: "No Legacy System", description: "There is no clear plan for leadership, succession or wealth transfer." },
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
  heading: string;
  bullets: readonly string[];
  cta: string;
}

export const PATH_CARDS: readonly PathCard[] = [
  {
    path: "financial",
    heading: "Build Financial Clarity",
    bullets: [
      "Identify financial blind spots",
      "Strengthen protection and emergency planning",
      "Improve cash flow",
      "Build a goal-based wealth plan",
      "Receive a personalised next-step recommendation",
    ],
    cta: "Take the Financial Health Scorecard",
  },
  {
    path: "career",
    heading: "Build Income, Skills and Leadership",
    bullets: [
      "Assess career readiness",
      "Identify transferable strengths",
      "Explore a performance-based career",
      "Understand the mentorship system",
      "Discover your leadership potential",
    ],
    cta: "Take the Career Growth Scorecard",
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

export const HOW_IT_WORKS_STEPS: readonly { title: string; description: string }[] = [
  { title: "Answer a few practical questions", description: "One question per screen. Takes a few minutes." },
  { title: "Receive your personalised R.I.S.E. result", description: "See your score across Restore, Income, Sustain and Empire." },
  { title: "Follow the recommended next-step plan", description: "A clear, practical action for your priority stage." },
];

export const FAQ_ITEMS: readonly { question: string; answer: string }[] = [
  { question: "What is the R.I.S.E. Roadmap?", answer: "A four-stage framework — Restore, Income, Sustain, Empire — that helps you identify your next financial or career priority." },
  { question: "Is the scorecard free?", answer: "Yes. The scorecard is completely free with no obligation." },
  { question: "How long does it take?", answer: "About 3–5 minutes to answer 12 questions." },
  { question: "Will I receive personalised advice?", answer: "You receive a personalised result and recommended next step. This is educational, not individualised financial, investment, legal or tax advice." },
  { question: "Is this suitable for beginners?", answer: "Yes, the scorecard is designed for people at any stage." },
  { question: "Is this only for insurance clients?", answer: "No. The Financial Health path is for anyone who wants clarity on protection, cash flow, income or wealth." },
  { question: "How does the agency opportunity work?", answer: "The Career Growth path introduces a performance-based career with mentorship and structured training." },
  { question: "Do I need sales experience?", answer: "No prior sales experience is required — willingness to learn matters most." },
  { question: "Can existing agents apply?", answer: "Yes, existing agents and leaders can take the Career Growth scorecard with leadership-focused questions." },
  { question: "How will my information be used?", answer: "Only to share your result and relevant follow-up by email or WhatsApp. You can unsubscribe at any time." },
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
