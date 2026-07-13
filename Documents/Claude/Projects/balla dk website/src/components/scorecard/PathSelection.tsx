import type { ScorecardPath } from "@/lib/scoring/types";

interface PathSelectionProps {
  onSelect: (path: ScorecardPath) => void;
  onClose: () => void;
}

const CHOICES: readonly { label: string; path: ScorecardPath }[] = [
  { label: "My personal finances", path: "financial" },
  { label: "My income or career", path: "career" },
  { label: "My leadership or agency business", path: "career" },
];

export function PathSelection({ onSelect, onClose }: PathSelectionProps) {
  return (
    <div className="mx-auto flex h-full max-w-lg flex-col justify-center px-4 py-12 text-center">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-sm text-muted-foreground hover:text-foreground"
      >
        Close
      </button>

      <h2 className="text-2xl font-bold sm:text-3xl">What would you like to improve first?</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Answer a few practical questions to receive your personalised R.I.S.E. result.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {CHOICES.map((choice) => (
          <button
            key={choice.label}
            type="button"
            onClick={() => onSelect(choice.path)}
            className="rounded-xl border border-border bg-card px-6 py-4 text-left font-medium transition-colors hover:border-gold"
          >
            {choice.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onSelect("financial")}
          className="rounded-xl border border-dashed border-border px-6 py-4 text-left text-sm text-muted-foreground transition-colors hover:border-gold"
        >
          I am not sure yet — start with Financial Health
        </button>
      </div>
    </div>
  );
}
