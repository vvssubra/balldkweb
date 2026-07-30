import { AlertTriangle, TrendingUp, CircleCheck } from "lucide-react";
import type { CategoryKey, CategoryResult, ScorecardPath, Tier } from "@/lib/scoring/types";
import {
  CAREER_DISCLAIMER,
  FINANCIAL_DISCLAIMER,
  MISSING_LETTER_CONTENT,
  TIER_LABEL,
  resultCta,
} from "@/lib/site-content";
import { buildWhatsAppLink, buildWhatsAppMessage } from "@/lib/whatsapp";

interface ResultScreenProps {
  firstName: string;
  path: ScorecardPath;
  categoryResults: readonly CategoryResult[];
  missingLetter: CategoryKey;
  goal?: string;
  onClose: () => void;
  onRestart: () => void;
}

const TIER_ICON: Record<Tier, typeof AlertTriangle> = {
  "needs-attention": AlertTriangle,
  developing: TrendingUp,
  strong: CircleCheck,
};

export function ResultScreen({ firstName, path, categoryResults, missingLetter, goal, onClose, onRestart }: ResultScreenProps) {
  const content = MISSING_LETTER_CONTENT[missingLetter];
  const disclaimer = path === "financial" ? FINANCIAL_DISCLAIMER : CAREER_DISCLAIMER;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  function handleWhatsAppClick() {
    const message = buildWhatsAppMessage({ firstName, path, categoryResults, missingLetter, goal });
    const link = buildWhatsAppLink(whatsappNumber, message);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto flex h-full max-w-lg flex-col px-4 py-10">
      <div className="-mx-2 -mt-2 flex justify-end">
        <button type="button" onClick={onClose} className="p-2 text-sm text-muted-foreground hover:text-foreground">
          Close
        </button>
      </div>

      <h2
        className="mt-4 text-2xl font-bold sm:text-3xl"
        style={{ animation: "fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        {firstName}, {content.headline}
      </h2>
      <p
        className="mt-3 text-sm text-muted-foreground"
        style={{ animation: "fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) 60ms both" }}
      >
        {content.message}
      </p>

      <ul className="mt-6 space-y-3" aria-label="Your R.I.S.E. category results">
        {categoryResults.map((result, index) => {
          const Icon = TIER_ICON[result.tier];
          return (
            <li
              key={result.category}
              className="rounded-xl border border-border bg-card p-4"
              style={{ animation: `fade-up 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${120 + index * 80}ms both` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-semibold">{result.category}</span>
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  <Icon className="size-4" aria-hidden="true" />
                  {TIER_LABEL[result.tier]} — {result.normalisedScore}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{
                    "--bar-target": `${result.normalisedScore}%`,
                    animation: `bar-fill 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${200 + index * 120}ms both`,
                  } as React.CSSProperties}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6">
        <h3 className="font-heading font-semibold">Recommended next actions</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
          {content.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">{disclaimer}</p>

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="w-full rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
        >
          {resultCta(path, missingLetter)} on WhatsApp
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="w-full rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground"
        >
          Retake the scorecard
        </button>
      </div>
    </div>
  );
}
