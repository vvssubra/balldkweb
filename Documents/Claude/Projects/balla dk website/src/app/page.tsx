import ParticleEffectHero from "@/components/ui/particle-effect-for-hero";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { About } from "@/components/sections/About";
import { ProblemCards } from "@/components/sections/ProblemCards";
import { RisePyramid } from "@/components/sections/RisePyramid";
import { OutcomeTransformation } from "@/components/sections/OutcomeTransformation";
import { HowBallaCanHelp } from "@/components/sections/HowBallaCanHelp";
import { PathCards } from "@/components/sections/PathCards";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GatedCta } from "@/components/sections/GatedCta";
import { SocialProof } from "@/components/sections/SocialProof";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Homepage. Section order follows the structure brief:
 * Hero → Trust → About → What's Missing → What is R.I.S.E. → How R.I.S.E. Helps →
 * How Balla Can Help → Two Paths → Scorecard → Stories → FAQ → Final CTA
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1">
        <ParticleEffectHero />
        <CredibilityStrip />
        <About />
        <ProblemCards />
        <RisePyramid />
        <OutcomeTransformation />
        <HowBallaCanHelp />
        <PathCards />
        <HowItWorks />
        <GatedCta />
        <SocialProof />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
