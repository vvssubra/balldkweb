"use client";

import { ArrowRight } from "lucide-react";
import { SubpageHero } from "@/components/sections/SubpageHero";
import { AGENT_HERO } from "@/lib/content/agents-content";
import { CTA, CTA_RESPONSIVE } from "@/lib/cta-styles";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";

export function AgentHero() {
  const { open } = useScorecard();

  return (
    <SubpageHero
      eyebrow={AGENT_HERO.eyebrow}
      headline={AGENT_HERO.headline}
      subheadline={AGENT_HERO.subheadline}
      note={AGENT_HERO.note}
      imageSrc="/images/balla-dk-path.jpg"
      imageAlt="Balla DK, agency leader and mentor"
      actions={
        <>
          <a href="#opportunity" className={`${CTA.gold} ${CTA_RESPONSIVE}`}>
            Explore the Opportunity
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <button type="button" onClick={() => open("career")} className={`${CTA.outlineLight} ${CTA_RESPONSIVE}`}>
            Take the Agency R.I.S.E. Assessment
          </button>
        </>
      }
    />
  );
}
