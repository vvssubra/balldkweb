"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ScorecardFlow } from "./ScorecardFlow";
import type { ScorecardPath } from "@/lib/scoring/types";

interface ScorecardContextValue {
  /** Open the full-screen scorecard. Pass a path to skip path selection. */
  open: (path?: ScorecardPath) => void;
  close: () => void;
  isOpen: boolean;
}

const ScorecardContext = createContext<ScorecardContextValue | null>(null);

/**
 * Mounts the scorecard once at the app root so any page or section can open it
 * without prop-drilling state through the page tree.
 */
export function ScorecardProvider({ children }: { children: ReactNode }) {
  // undefined = closed; null = open on path selection; path = open on that path's questions
  const [scorecardPath, setScorecardPath] = useState<ScorecardPath | null | undefined>(undefined);

  const open = useCallback((path?: ScorecardPath) => setScorecardPath(path ?? null), []);
  const close = useCallback(() => setScorecardPath(undefined), []);
  const isOpen = scorecardPath !== undefined;

  // Lock the page behind the full-screen scorecard. Without this the body scrolls
  // under the fixed overlay on touch devices, which loses the visitor's place.
  useEffect(() => {
    if (!isOpen) return;
    const { body } = document;
    const scrollY = window.scrollY;
    body.classList.add("scorecard-open");
    body.style.top = `-${scrollY}px`;
    body.style.position = "fixed";
    body.style.width = "100%";
    return () => {
      body.classList.remove("scorecard-open");
      body.style.top = "";
      body.style.position = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <ScorecardContext.Provider value={value}>
      {children}
      {isOpen ? <ScorecardFlow initialPath={scorecardPath ?? null} onClose={close} /> : null}
    </ScorecardContext.Provider>
  );
}

export function useScorecard(): ScorecardContextValue {
  const ctx = useContext(ScorecardContext);
  if (!ctx) {
    throw new Error("useScorecard must be used inside <ScorecardProvider>");
  }
  return ctx;
}
