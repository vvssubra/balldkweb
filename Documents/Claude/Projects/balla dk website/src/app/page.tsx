"use client";

import { useState } from "react";
import ParticleEffectHero from "@/components/ui/particle-effect-for-hero";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { ProblemCards } from "@/components/sections/ProblemCards";
import { RisePyramid } from "@/components/sections/RisePyramid";
import { PathCards } from "@/components/sections/PathCards";
import { OutcomeTransformation } from "@/components/sections/OutcomeTransformation";
import { About } from "@/components/sections/About";
import { SocialProof } from "@/components/sections/SocialProof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GatedCta } from "@/components/sections/GatedCta";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { ScorecardFlow } from "@/components/scorecard/ScorecardFlow";
import type { ScorecardPath } from "@/lib/scoring/types";

export default function Home() {
  const [scorecardPath, setScorecardPath] = useState<ScorecardPath | null | undefined>(undefined);

  const isOpen = scorecardPath !== undefined;

  function openScorecard(path: ScorecardPath | null = null) {
    setScorecardPath(path);
  }

  function closeScorecard() {
    setScorecardPath(undefined);
  }

  return (
    <>
      <Nav onStartScorecard={() => openScorecard(null)} />

      <main id="main-content" className="flex-1">
        <ParticleEffectHero
          onStartScorecard={() => openScorecard(null)}
          onExploreAgency={() => openScorecard("career")}
        />
        <CredibilityStrip />
        <ProblemCards onFindStep={() => openScorecard(null)} />
        <RisePyramid onSelectPath={() => openScorecard(null)} />
        <PathCards onSelectPath={(path) => openScorecard(path)} />
        <OutcomeTransformation />
        <About onDiscoverStage={() => openScorecard(null)} />
        <SocialProof />
        <HowItWorks />
        <GatedCta onSelectPath={(path) => openScorecard(path)} />
        <Faq />
        <FinalCta onStartScorecard={() => openScorecard(null)} />
      </main>

      <Footer />

      {isOpen ? <ScorecardFlow initialPath={scorecardPath ?? null} onClose={closeScorecard} /> : null}
    </>
  );
}
