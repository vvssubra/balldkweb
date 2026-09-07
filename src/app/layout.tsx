import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ScorecardProvider } from "@/components/scorecard/ScorecardProvider";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Balla DK | Know Where You Stand. Know Where to Go Next.",
    template: "%s | Balla DK",
  },
  description:
    "I help you understand your financial position through the R.I.S.E. framework, then find the right next step. Free three-minute scorecard, personalised result, direct WhatsApp follow-up.",
  openGraph: {
    title: "Balla DK | Know Where You Stand. Know Where to Go Next.",
    description:
      "Free R.I.S.E. Scorecard. Understand your financial or career position and find your next step with Balla DK.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ScorecardProvider>
          {children}
          <FloatingWhatsApp />
        </ScorecardProvider>
      </body>
    </html>
  );
}
