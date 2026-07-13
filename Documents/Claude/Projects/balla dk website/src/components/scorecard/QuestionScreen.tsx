import type { Question, ScoreValue } from "@/lib/scoring/types";

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedScore: ScoreValue | undefined;
  onAnswer: (score: ScoreValue) => void;
  onBack: () => void;
  canGoBack: boolean;
  onClose: () => void;
}

export function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  selectedScore,
  onAnswer,
  onBack,
  canGoBack,
  onClose,
}: QuestionScreenProps) {
  const progress = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="mx-auto flex h-full max-w-lg flex-col px-4 py-10">
      <div className="-mx-2 flex items-center justify-between">
        {canGoBack ? (
          <button type="button" onClick={onBack} className="p-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Back
          </button>
        ) : (
          <span />
        )}
        <button type="button" onClick={onClose} className="p-2 text-sm text-muted-foreground hover:text-foreground">
          Close
        </button>
      </div>

      <div className="mt-6">
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Question ${questionNumber} of ${totalQuestions}`}
          className="h-2 w-full overflow-hidden rounded-full bg-secondary"
        >
          <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs font-medium text-muted-foreground">
          Question {questionNumber} of {totalQuestions}
        </p>
      </div>

      <div className="mt-10 flex-1">
        <h2 className="text-xl font-bold sm:text-2xl">{question.text}</h2>

        <div className="mt-8 flex flex-col gap-3" role="radiogroup" aria-label={question.text}>
          {question.options.map((option) => {
            const isSelected = selectedScore === option.score;
            return (
              <button
                key={option.score}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onAnswer(option.score)}
                className={`w-full rounded-xl border-2 px-6 py-4 text-left font-medium transition-colors ${
                  isSelected ? "border-gold bg-accent" : "border-border bg-card hover:border-gold/60"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
