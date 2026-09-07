"use client";

import { ArrowRight } from "lucide-react";
import { SubpageHero } from "@/components/sections/SubpageHero";
import { CLIENT_HERO } from "@/lib/content/clients-content";
import { CTA, CTA_RESPONSIVE } from "@/lib/cta-styles";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";

export function ClientHero() {
  const { open } = useScorecard();

  return (
    <SubpageHero
      eyebrow={CLIENT_HERO.eyebrow}
      headline={CLIENT_HERO.headline}
      subheadline={CLIENT_HERO.subheadline}
      note={CLIENT_HERO.note}
      imageSrc="/images/balla-dk-about.jpg"
      imageAlt="Balla DK, financial mentor"
      actions={
        <>
          <button type="button" onClick={() => open("financial")} className={`${CTA.gold} ${CTA_RESPONSIVE}`}>
            Take the R.I.S.E. Scorecard
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <a href="#build" className={`${CTA.outlineLight} ${CTA_RESPONSIVE}`}>
            Explore the R.I.S.E. Roadmap
          </a>
        </>
      }
    />
  );
}
