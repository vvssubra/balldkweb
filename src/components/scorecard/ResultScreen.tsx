import Link from "next/link";
import { AlertTriangle, TrendingUp, CircleCheck, MessageCircle, Briefcase, ChevronRight, RotateCcw, ArrowLeft } from "lucide-react";
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
  const consultationLabel = resultCta(path, missingLetter);
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

      <div className="mt-8">
        <h3 className="font-heading font-semibold">Recommended next steps</h3>
        <div className="mt-3 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex w-full items-center gap-4 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 p-4 text-left transition-colors hover:bg-[#25D366]/10"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold">Want to understand your result better?</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                Talk to me directly on WhatsApp. Next step: {consultationLabel}.
              </span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </button>

          <Link
            href="/agents"
            onClick={onClose}
            className="flex w-full items-center gap-4 rounded-xl border border-border bg-secondary/40 p-4 text-left transition-colors hover:bg-secondary"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Briefcase className="size-5" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold">Interested in the Agency Opportunity?</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">Explore how you can build a career with me.</span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </Link>
        </div>

        <p className="my-4 text-center text-xs text-muted-foreground">Or</p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onRestart}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Retake the scorecard
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 px-6 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to website
          </button>
        </div>
      </div>
    </div>
  );
}
