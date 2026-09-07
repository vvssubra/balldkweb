import type { CategoryKey } from "@/lib/scoring/types";
import type { FaqItem } from "@/lib/site-content";

/** Copy for the /clients (Financial Planning) page. First-person, Balla speaking. */

export const CLIENT_HERO = {
  eyebrow: "Financial Guidance",
  headline: "Financial Clarity Starts With Knowing Where You Stand.",
  subheadline:
    "I help individuals and families in Malaysia protect what matters, organise their cash flow and build wealth in the right order. You do not need to be wealthy or have it all figured out. You need a clear next step. That is what I give you.",
  note: "Free scorecard. Personalised result. No obligation.",
} as const;

export interface ClientGoal {
  title: string;
  stage: CategoryKey;
  body: string;
}

export const CLIENT_GOALS: readonly ClientGoal[] = [
  { title: "Protect Your Family", stage: "R", body: "Make sure one illness, accident or loss does not undo years of effort." },
  { title: "Strengthen Your Income", stage: "I", body: "Stop depending on a single salary. Build an engine that can grow." },
  { title: "Build Your Wealth", stage: "S", body: "Turn idle savings into a plan that compounds towards real goals." },
  { title: "Prepare for Retirement", stage: "S", body: "Know the number you need, and the date you can stop, with a plan to get there." },
  { title: "Build Your Legacy", stage: "E", body: "Decide what happens to what you built, and who it protects when you are not there." },
];

export const HOW_RISE_HELPS = {
  headline: "You Do Not Need to Solve Everything at Once",
  body: "Most people try to invest before they have protection, or clear debt while their income is stuck. R.I.S.E. puts the steps in order. Restore your foundation. Build your Income. Sustain your growth. Then build your Empire. When you work on the right stage, the others get easier.",
} as const;

export const CONSULTATION = {
  headline: "What Happens When We Talk",
  intro: "I want you to know exactly what you are walking into before you message me. No surprises, no pressure.",
  steps: [
    { title: "A conversation, not a pitch", body: "The first conversation is on WhatsApp or a call. It is free. I ask about your situation, your goals and what is worrying you. You ask me anything you want." },
    { title: "Your R.I.S.E. picture", body: "If you have done the scorecard, we start from your result. If not, we work it out together. Either way you leave knowing which stage to focus on first." },
    { title: "Options, explained plainly", body: "If a solution makes sense for your stage, I explain what it does, what it costs and what it does not do. If nothing makes sense yet, I tell you that too." },
    { title: "You decide", body: "You take the time you need. I am here when you are ready, and I will follow up only as agreed." },
  ],
} as const;

export const CLIENT_FAQ: readonly FaqItem[] = [
  { question: "Do I need a lot of money to work with you?", answer: "No. Most people I meet are starting from a messy cash flow and no safety net. That is exactly where R.I.S.E. begins. The plan grows as you do." },
  { question: "Is the first conversation really free?", answer: "Yes. The scorecard is free and the first conversation is free. You pay nothing to find out where you stand and what to work on first." },
  { question: "Will you try to sell me insurance?", answer: "I am a licensed adviser, so protection is one of the tools I can recommend when your situation needs it. But I start with your R.I.S.E. stage, not with a product. If protection is not your priority, I will say so." },
  { question: "What if I already have a financial adviser or policies?", answer: "Good. Bring what you have. Many people have policies they do not understand or gaps they do not know about. A second look costs you nothing." },
  { question: "How is the scorecard different from a financial plan?", answer: "The scorecard is a three-minute self-assessment that shows you which R.I.S.E. stage needs attention first. A financial plan is what we build together afterwards, with your real numbers." },
  { question: "How will my information be used?", answer: "Only to share your result and follow up with you by email or WhatsApp. I do not sell or share your details. You can unsubscribe at any time." },
];

export const CLIENT_FINAL_CTA = {
  headline: "Know Where You Stand. Then Take One Step.",
  supporting: "Start with the free scorecard, or message me directly if you would rather just talk.",
} as const;
