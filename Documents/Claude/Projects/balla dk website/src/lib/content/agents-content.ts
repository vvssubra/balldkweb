import type { CategoryKey } from "@/lib/scoring/types";
import type { FaqItem, HowItWorksStep } from "@/lib/site-content";

/** Copy for the /agents (Build Your Career) page. First-person, Balla speaking. */

export const AGENT_HERO = {
  eyebrow: "Agency Opportunity",
  headline: "Build a Career That Grows With You.",
  subheadline:
    "I lead an agency in Malaysia's financial services industry. I am looking for people who want to build income, skills and leadership through a structured, mentored career. This page explains what the opportunity is, who it suits, and how to find out if it is right for you.",
  note: "Performance-based career. Licensing and training required. No income is guaranteed.",
} as const;

export interface OpportunityPoint {
  title: string;
  body: string;
}

export const OPPORTUNITY_POINTS: readonly OpportunityPoint[] = [
  {
    title: "What the opportunity is",
    body: "A licensed financial advisory career inside my agency. You help individuals and families protect what matters, organise their cash flow and build wealth. You are paid for the work you do and the clients you serve, not for the hours you sit at a desk.",
  },
  {
    title: "What the role involves",
    body: "Learning the products and the rules. Meeting people and understanding their situation. Recommending suitable protection and savings plans. Then serving those clients properly for years, not just at the point of sale.",
  },
  {
    title: "What makes it different here",
    body: "You do not build it alone. Every agent in my team works inside the same R.I.S.E. system I use with clients: a weekly activity plan, regular coaching and honest accountability. The system does the structuring so you can focus on the work.",
  },
  {
    title: "What you can build",
    body: "Skills in communication, finance and service that you keep for life. An income that grows with your skill and contribution. And if you want it, a team of your own that you lead and develop.",
  },
];

export interface AgentProfile {
  title: string;
  body: string;
}

export const AGENT_PROFILES: readonly AgentProfile[] = [
  { title: "Career switchers", body: "You are good at what you do, but the ceiling is fixed and the work no longer means much to you." },
  { title: "Aspiring entrepreneurs", body: "You want to build something of your own, but with a proven system and a mentor rather than starting from zero." },
  { title: "People who need a second income", body: "Your one salary is not enough for the life you are building. You want an engine that can grow alongside it." },
  { title: "Existing financial professionals", body: "You are already in the industry, but without the structure, coaching or leadership pathway you need to grow." },
  { title: "Future leaders", body: "You want to develop other people, not just produce for yourself. You are thinking about a team, not just a job." },
];

export const NOT_FOR =
  "This is not for you if you want a fixed salary, a quick win, or a way around the licensing and training. I would rather tell you that now than waste your time.";

export interface WhyPillar {
  title: string;
  body: string;
}

export const WHY_PILLARS: readonly WhyPillar[] = [
  {
    title: "Mentorship",
    body: "I coach my agents directly. Not a recorded course, not a manager you meet once a quarter. We review your week, your numbers and your next step together.",
  },
  {
    title: "System",
    body: "The R.I.S.E. Roadmap is not just for clients. Your career runs on it too: Restore your foundation, build your Income engine, Sustain consistent activity, then grow into Empire through leadership.",
  },
  {
    title: "Support",
    body: "Structured training when you start, a weekly activity plan you can actually follow, and a team around you who have been where you are. Nobody here is left to figure it out alone.",
  },
];

export interface CareerStage {
  key: CategoryKey;
  stage: string;
  riseName: string;
  focus: string;
  skills: string;
  responsibilities: string;
  development: string;
}

export const CAREER_STAGES: readonly CareerStage[] = [
  {
    key: "R",
    stage: "Start",
    riseName: "Restore",
    focus: "Get licensed, learn the fundamentals and build the habits that everything else depends on.",
    skills: "Product knowledge, compliance, basic client conversations.",
    responsibilities: "Complete training. Follow the weekly activity plan. Meet people and listen.",
    development: "Weekly coaching with me. Shadowing experienced agents in real appointments.",
  },
  {
    key: "I",
    stage: "Develop",
    riseName: "Income",
    focus: "Turn activity into results. Build your first client base and a consistent income.",
    skills: "Prospecting, fact-finding, presenting suitable solutions, handling objections honestly.",
    responsibilities: "Serve your own clients. Hit your activity targets. Keep learning.",
    development: "Case reviews, joint appointments, skills training on the areas your numbers show you need.",
  },
  {
    key: "S",
    stage: "Grow",
    riseName: "Sustain",
    focus: "Make results repeatable. Deepen client relationships and build referrals into your system.",
    skills: "Financial planning across protection, savings and wealth. Long-term client servicing.",
    responsibilities: "Manage a growing book of clients. Mentor newer agents informally.",
    development: "Advanced planning training. Leadership readiness conversations.",
  },
  {
    key: "E",
    stage: "Lead",
    riseName: "Empire",
    focus: "Build and develop a team. Your impact goes beyond your own production.",
    skills: "Recruiting, coaching, running team systems, building culture.",
    responsibilities: "Lead your own unit. Develop the next generation of agents.",
    development: "Direct leadership mentoring with me. Succession and legacy planning for your team.",
  },
];

export const RISE_FOR_AGENTS = {
  headline: "Find Out If This Is Right for You",
  body: "The Career Growth Scorecard is twelve honest questions across four areas: Readiness, Income Skills, Sustainability and Empire Potential. It takes three minutes. Your result shows where you are already strong and what to develop first. It is not a test you pass or fail. It is how we both find out whether this path fits you before either of us commits time.",
  categories: [
    { key: "R" as CategoryKey, label: "Readiness", description: "Can you manage a learning period and the commitments that come with a licensed career?" },
    { key: "I" as CategoryKey, label: "Income Skills", description: "Are you open to performance-based income and willing to learn prospecting and service?" },
    { key: "S" as CategoryKey, label: "Sustainability", description: "Can you follow a weekly plan and respond well to coaching over the long run?" },
    { key: "E" as CategoryKey, label: "Empire Potential", description: "Do you want to help other people grow and build impact beyond your own production?" },
  ],
} as const;

export const AGENT_HOW_IT_WORKS: readonly HowItWorksStep[] = [
  { title: "Answer the Career Growth Scorecard", description: "Twelve questions, about three minutes. Honest answers give you a useful result." },
  { title: "See your career R.I.S.E. result", description: "Where you are ready, what to develop first, and three practical actions." },
  { title: "Talk to me", description: "If the result looks like a fit, message me on WhatsApp. I will tell you straight whether I think this path is right for you." },
];

export const AGENT_FAQ: readonly FaqItem[] = [
  { question: "Do I need experience in finance or sales?", answer: "No. Most of my agents came from other industries. What matters is willingness to learn, to follow a weekly plan and to be coached. I will teach the rest." },
  { question: "Is the income guaranteed?", answer: "No. This is a performance-based career. Your income depends on your effort, skills, consistency and market conditions. I will show you what the path looks like, but I will never promise you a number." },
  { question: "What licensing is involved?", answer: "You must pass the required industry examinations and meet compliance requirements before you can advise clients. I will guide you through what is needed and support you while you prepare." },
  { question: "Can I start while still employed?", answer: "It depends on your current role, your commitments and your employer's rules. Tell me your situation and I will be honest with you about whether it can work." },
  { question: "How much time does it take?", answer: "In the Start stage, expect to commit real time to training and activity. This is a career, not a side hustle you touch once a week. If you can only give it a few hours, tell me and we will talk about whether the timing is right." },
  { question: "I am already an agent. Is this for me?", answer: "Yes. If you are producing but lack structure, coaching or a leadership pathway, take the scorecard and message me. We can talk about what growing here would look like." },
  { question: "What happens after the scorecard?", answer: "You see your result on screen immediately. If you want to go further, message me on WhatsApp and we arrange a conversation. No pressure, no automated sales sequence." },
];

export const AGENT_FINAL_CTA = {
  headline: "Ready to Find Out If This Is Your Next Step?",
  supporting: "Take the assessment, or message me directly. Either way, you get a straight answer.",
} as const;
