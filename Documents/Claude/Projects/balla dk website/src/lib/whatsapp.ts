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

/**
 * Pre-filled openers for direct-to-WhatsApp entry points around the site.
 * Each tells Balla where the visitor came from so the conversation starts with context.
 */
export const WHATSAPP_OPENERS = {
  general: "Hi Balla, I visited your website and would like to find out more.",
  notSure: "Hi Balla, I am on your website but not sure where to start. Can you point me in the right direction?",
  faq: "Hi Balla, I have a question that the website FAQ did not answer.",
  agency: "Hi Balla, I am interested in the agency opportunity and would like to know more.",
  client: "Hi Balla, I would like to talk about my financial situation and find the right option for me.",
} as const;

export type WhatsAppOpener = keyof typeof WHATSAPP_OPENERS;

/** Site-wide WhatsApp deep link using the configured business number. */
export function siteWhatsAppLink(opener: WhatsAppOpener = "general"): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  return buildWhatsAppLink(number, WHATSAPP_OPENERS[opener]);
}
