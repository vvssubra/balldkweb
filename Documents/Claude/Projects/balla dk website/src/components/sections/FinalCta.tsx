"use client";

import Image from "next/image";

interface FinalCtaProps {
  onStartScorecard: () => void;
}

export function FinalCta({ onStartScorecard }: FinalCtaProps) {
  return (
    <section className="relative overflow-hidden bg-navy px-4 py-20 text-white sm:px-6">
      <Image
        src="/images/balla-dk-cta.jpg"
        alt=""
        fill
        className="object-cover object-top opacity-25"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">You Do Not Need to Fix Everything Today.</h2>
        <p className="mt-4 text-white/70">You only need to identify your next R.I.S.E. step. I am here to help you find it.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={onStartScorecard}
            className="w-full rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy transition-transform hover:scale-105 active:scale-95 sm:w-auto"
          >
            Take the Free R.I.S.E. Scorecard
          </button>
          <a
            href="#agents"
            className="w-full rounded-full border border-white/30 px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:border-gold hover:text-gold sm:w-auto"
          >
            Explore the Agency Opportunity
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=${encodeURIComponent("Hi Balla, I visited your website and would like to find out more.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border border-[#25D366]/50 px-6 py-3 text-center text-sm font-bold text-[#25D366] transition-colors hover:border-[#25D366] hover:bg-[#25D366]/10 sm:w-auto"
          >
            Talk to Balla
          </a>
        </div>
      </div>
    </section>
  );
}
