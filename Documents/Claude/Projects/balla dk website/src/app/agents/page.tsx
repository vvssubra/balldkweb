import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { AgentHero } from "@/components/sections/agents/AgentHero";
import { Opportunity } from "@/components/sections/agents/Opportunity";
import { WhoIsItFor } from "@/components/sections/agents/WhoIsItFor";
import { WhyBalla } from "@/components/sections/agents/WhyBalla";
import { CareerPath } from "@/components/sections/agents/CareerPath";
import { RiseForAgents } from "@/components/sections/agents/RiseForAgents";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SocialProof } from "@/components/sections/SocialProof";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { AGENT_FAQ, AGENT_FINAL_CTA, AGENT_HOW_IT_WORKS } from "@/lib/content/agents-content";
import { CAREER_DISCLAIMER } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Build Your Career | Agency Opportunity",
  description:
    "Explore the agency opportunity with Balla DK: what the role involves, who it suits, the Start → Develop → Grow → Lead career path, and a free three-minute Career Growth Scorecard.",
};

/**
 * Agency / career journey: Explore → Understand → Assess → Talk.
 * Section order follows the structure brief's "For Agent" page.
 */
export default function AgentsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1">
        <AgentHero />
        <Opportunity />
        <WhoIsItFor />
        <WhyBalla />
        <CareerPath />
        <RiseForAgents />
        <HowItWorks steps={AGENT_HOW_IT_WORKS} heading="How It Works" />
        <SocialProof heading="Agent Stories" />
        <Faq items={AGENT_FAQ} heading="Questions People Ask Me About the Agency" />
        <FinalCta
          heading={AGENT_FINAL_CTA.headline}
          supporting={AGENT_FINAL_CTA.supporting}
          scorecardLabel="Take the Agency R.I.S.E. Assessment"
          scorecardPath="career"
          showAgencyLink={false}
          whatsappOpener="agency"
        />
        <p className="bg-navy px-4 pb-10 text-center text-xs text-white/40 sm:px-6">{CAREER_DISCLAIMER}</p>
      </main>
      <Footer />
    </>
  );
}
