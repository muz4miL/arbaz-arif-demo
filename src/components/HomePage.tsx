"use client";

import { ClientGate } from "@/components/ClientGate";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { MethodSection } from "@/components/MethodSection";
import { Navbar } from "@/components/Navbar";
import { PlansSection } from "@/components/PlansSection";
import { PrestigeSection } from "@/components/PrestigeSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ResultsSection } from "@/components/ResultsSection";
import { SiteEffects } from "@/components/SiteEffects";
import { SubscribeSection } from "@/components/SubscribeSection";

export function HomePage() {
  return (
    <ClientGate>
      <SiteEffects />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Marquee />
        <MethodSection />
        <PlansSection />
        <PrestigeSection />
        <ResultsSection />
        <ProcessSection />
        <SubscribeSection />
        <CtaSection />
      </main>
      <Footer />
    </ClientGate>
  );
}
