"use client";

import { useMemo, useState } from "react";
import { scoreScorecard } from "@/lib/scoring/engine";
import { financialHealthConfig } from "@/lib/scoring/financial-health-config";
import { careerGrowthConfig } from "@/lib/scoring/career-growth-config";
import type { Answers, ScorecardPath, ScoreValue } from "@/lib/scoring/types";
import type { ContactFormValues } from "@/lib/contact-schema";
import { PathSelection } from "./PathSelection";
import { QuestionScreen } from "./QuestionScreen";
import { ContactGate } from "./ContactGate";
import { ResultScreen } from "./ResultScreen";

type Step = "path" | "questions" | "contact" | "result";

interface ScorecardFlowProps {
  initialPath: ScorecardPath | null;
  onClose: () => void;
}

const CONFIG_BY_PATH = {
  financial: financialHealthConfig,
  career: careerGrowthConfig,
};

export function ScorecardFlow({ initialPath, onClose }: ScorecardFlowProps) {
  const [step, setStep] = useState<Step>(initialPath ? "questions" : "path");
  const [path, setPath] = useState<ScorecardPath | null>(initialPath);
  const [answers, setAnswers] = useState<Answers>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [contact, setContact] = useState<ContactFormValues | null>(null);

  const config = path ? CONFIG_BY_PATH[path] : null;
  const currentQuestion = config?.questions[questionIndex];

  const result = useMemo(() => {
    if (!config || !contact) return null;
    return scoreScorecard(config, answers);
  }, [config, contact, answers]);

  function handleSelectPath(selected: ScorecardPath) {
    setPath(selected);
    setQuestionIndex(0);
    setAnswers({});
    setStep("questions");
  }

  function handleAnswer(score: ScoreValue) {
    if (!config || !currentQuestion) return;

    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: score }));

    if (questionIndex < config.questions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setStep("contact");
    }
  }

  function handleQuestionBack() {
    if (questionIndex === 0) {
      setStep("path");
      return;
    }
    setQuestionIndex((i) => i - 1);
  }

  function handleContactSubmit(values: ContactFormValues) {
    setContact(values);
    setStep("result");
  }

  function handleRestart() {
    setPath(null);
    setAnswers({});
    setQuestionIndex(0);
    setContact(null);
    setStep("path");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="R.I.S.E. Scorecard"
      className="fixed inset-0 z-50 overflow-y-auto bg-background"
    >
      {step === "path" ? <PathSelection onSelect={handleSelectPath} onClose={onClose} /> : null}

      {step === "questions" && config && currentQuestion ? (
        <QuestionScreen
          question={currentQuestion}
          questionNumber={questionIndex + 1}
          totalQuestions={config.questions.length}
          selectedScore={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          onBack={handleQuestionBack}
          canGoBack
          onClose={onClose}
        />
      ) : null}

      {step === "contact" && path ? (
        <ContactGate
          path={path}
          onSubmit={handleContactSubmit}
          onBack={() => setStep("questions")}
          onClose={onClose}
        />
      ) : null}

      {step === "result" && result && contact && path ? (
        <ResultScreen
          firstName={contact.firstName}
          path={path}
          categoryResults={result.categoryResults}
          missingLetter={result.missingLetter}
          goal={contact.goal}
          onClose={onClose}
          onRestart={handleRestart}
        />
      ) : null}
    </div>
  );
}
