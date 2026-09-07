import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ClientHero } from "@/components/sections/clients/ClientHero";
import { WhatAreYouBuilding } from "@/components/sections/clients/WhatAreYouBuilding";
import { RisePyramid } from "@/components/sections/RisePyramid";
import { OutcomeTransformation } from "@/components/sections/OutcomeTransformation";
import { HowBallaCanHelp } from "@/components/sections/HowBallaCanHelp";
import { GatedCta } from "@/components/sections/GatedCta";
import { Consultation } from "@/components/sections/clients/Consultation";
import { SocialProof } from "@/components/sections/SocialProof";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { CLIENT_FAQ, CLIENT_FINAL_CTA, HOW_RISE_HELPS } from "@/lib/content/clients-content";

export const metadata: Metadata = {
  title: "Financial Planning | For Clients",
  description:
    "Financial clarity starts with knowing where you stand. Balla DK helps individuals and families in Malaysia protect what matters, organise cash flow and build wealth in the right order. Free R.I.S.E. Scorecard.",
};

/**
 * Client / financial guidance journey. Section order follows the structure brief's
 * "For Client" page. Solutions & Pricing is represented by the Consultation section
 * until verified pricing is supplied.
 */
export default function ClientsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1">
        <ClientHero />
        <WhatAreYouBuilding />
        <RisePyramid intro="The framework I use with every client. Four stages, in order. Select one to see what it solves." />
        <OutcomeTransformation heading={HOW_RISE_HELPS.headline} intro={HOW_RISE_HELPS.body} />
        <HowBallaCanHelp />
        <GatedCta path="financial" />
        <Consultation />
        <SocialProof heading="Client Stories" />
        <Faq items={CLIENT_FAQ} heading="Questions Clients Ask Me" />
        <FinalCta
          heading={CLIENT_FINAL_CTA.headline}
          supporting={CLIENT_FINAL_CTA.supporting}
          scorecardPath="financial"
          showAgencyLink={false}
          whatsappOpener="client"
        />
      </main>
      <Footer />
    </>
  );
}
