"use client";

import Image from "next/image";
import Link from "next/link";
import type { ScorecardPath } from "@/lib/scoring/types";
import { CTA, CTA_RESPONSIVE } from "@/lib/cta-styles";
import { siteWhatsAppLink, type WhatsAppOpener } from "@/lib/whatsapp";
import { useScorecard } from "@/components/scorecard/ScorecardProvider";

interface FinalCtaProps {
  heading?: string;
  supporting?: string;
  scorecardLabel?: string;
  /** Which scorecard the primary button opens. Omit for path selection. */
  scorecardPath?: ScorecardPath;
  /** Show the "Explore the Agency Opportunity" link. Off on the agents page itself. */
  showAgencyLink?: boolean;
  whatsappOpener?: WhatsAppOpener;
}

export function FinalCta({
  heading = "You Do Not Need to Fix Everything Today.",
  supporting = "You only need to identify your next R.I.S.E. step. I am here to help you find it.",
  scorecardLabel = "Take the Free R.I.S.E. Scorecard",
  scorecardPath,
  showAgencyLink = true,
  whatsappOpener = "general",
}: FinalCtaProps) {
  const { open } = useScorecard();

  return (
    <section className="relative overflow-hidden bg-navy px-4 py-20 text-white sm:px-6" aria-labelledby="final-heading">
      <Image
        src="/images/balla-dk-cta.jpg"
        alt=""
        fill
        className="object-cover object-top opacity-25"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 id="final-heading" className="text-3xl font-bold sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-white/70">{supporting}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={() => open(scorecardPath)} className={`${CTA.gold} ${CTA_RESPONSIVE}`}>
            {scorecardLabel}
          </button>
          {showAgencyLink ? (
            <Link href="/agents" className={`${CTA.outlineLight} ${CTA_RESPONSIVE}`}>
              Explore the Agency Opportunity
            </Link>
          ) : null}
          <a
            href={siteWhatsAppLink(whatsappOpener)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${CTA.whatsapp} ${CTA_RESPONSIVE}`}
          >
            Talk to Balla
          </a>
        </div>
      </div>
    </section>
  );
}
