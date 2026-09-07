"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS, type FaqItem } from "@/lib/site-content";
import { CTA } from "@/lib/cta-styles";
import { siteWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/layout/FloatingWhatsApp";

interface FaqProps {
  items?: readonly FaqItem[];
  heading?: string;
}

export function Faq({ items = FAQ_ITEMS, heading = "Frequently Asked Questions" }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-center text-3xl font-bold sm:text-4xl">
        {heading}
      </h2>

      <div className="rise-card mt-10 divide-y divide-border/60 rounded-2xl">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <div key={item.question}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium transition-colors hover:bg-accent"
                >
                  {item.question}
                  <ChevronDown
                    className={`size-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-4 text-sm text-muted-foreground">{item.answer}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <p className="font-heading text-lg font-semibold">Still have a question?</p>
        <p className="mt-1 text-sm text-muted-foreground">Ask me directly. I read and reply to these myself.</p>
        <a
          href={siteWhatsAppLink("faq")}
          target="_blank"
          rel="noopener noreferrer"
          className={`${CTA.whatsappSolid} mt-4`}
        >
          <WhatsAppIcon className="size-4" />
          Ask on WhatsApp
        </a>
      </div>
    </section>
  );
}
