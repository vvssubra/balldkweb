import type { ScorecardConfig } from "./types";

const SCALE = [
  { label: "Not in place", score: 0 },
  { label: "Starting", score: 1 },
  { label: "Mostly in place", score: 2 },
  { label: "Strong and reviewed", score: 3 },
] as const;

export const careerGrowthConfig: ScorecardConfig = {
  path: "career",
  categories: [
    { key: "R", label: "Readiness" },
    { key: "I", label: "Income Skills" },
    { key: "S", label: "Sustainability" },
    { key: "E", label: "Empire Potential" },
  ],
  questions: [
    { id: "car-r-1", category: "R", text: "I can manage a learning period without relying on instant income.", options: SCALE },
    { id: "car-r-2", category: "R", text: "I understand that licensing, effort and compliance are required.", options: SCALE },
    { id: "car-r-3", category: "R", text: "My current financial commitments are visible and manageable.", options: SCALE },

    { id: "car-i-1", category: "I", text: "I am open to performance-based income.", options: SCALE },
    { id: "car-i-2", category: "I", text: "I am willing to learn communication, prospecting and service.", options: SCALE },
    { id: "car-i-3", category: "I", text: "I want a path where income can grow with skill and contribution.", options: SCALE },

    { id: "car-s-1", category: "S", text: "I can follow a weekly activity plan consistently.", options: SCALE },
    { id: "car-s-2", category: "S", text: "I respond constructively to coaching and feedback.", options: SCALE },
    { id: "car-s-3", category: "S", text: "I prefer long-term skill-building over quick-win hype.", options: SCALE },

    { id: "car-e-1", category: "E", text: "I want to help other people grow.", options: SCALE },
    { id: "car-e-2", category: "E", text: "I am interested in leadership and team systems.", options: SCALE },
    { id: "car-e-3", category: "E", text: "I want to build impact beyond my own personal production.", options: SCALE },
  ],
};
