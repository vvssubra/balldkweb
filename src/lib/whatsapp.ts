import type { CategoryKey, CategoryResult, ScorecardPath } from "./scoring/types";
import { TIER_LABEL } from "./site-content";

export interface WhatsAppMessageInput {
  firstName: string;
  path: ScorecardPath;
  categoryResults: readonly CategoryResult[];
  missingLetter: CategoryKey;
  goal?: string;
}

export function buildWhatsAppMessage(input: WhatsAppMessageInput): string {
  const pathLabel = input.path === "financial" ? "Financial Health" : "Career Growth";
  const scoreLines = input.categoryResults
    .map((r) => `${r.category}: ${TIER_LABEL[r.tier]} (${r.normalisedScore}%)`)
    .join(", ");

  const lines = [
    `Hi Balla DK, I just completed the R.I.S.E. ${pathLabel} Scorecard.`,
    `Name: ${input.firstName}`,
    `Scores: ${scoreLines}`,
    `My priority stage: ${input.missingLetter}`,
  ];

  if (input.goal) {
    lines.push(`My goal: ${input.goal}`);
  }

  lines.push("I'd like to discuss my next step.");

  return lines.join("\n");
}

export function buildWhatsAppLink(phoneNumber: string, message: string): string {
  const digitsOnly = phoneNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
