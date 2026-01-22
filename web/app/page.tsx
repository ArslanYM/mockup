"use client";

import { Pricing } from "@/components/pages/pricing";
import { Header } from "./_shared/Header";
import Hero from "./_shared/Hero";
import { FeaturesSection } from "@/components/pages/features";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturesSection />
      <Pricing />
    </>
  );
}
