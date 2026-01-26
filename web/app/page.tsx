"use client";

import { Header } from "./_shared/Header";
import Hero from "./_shared/Hero";
import { FeaturesSection } from "@/components/pages/features";
import ProjectList from "./_shared/ProjectList";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <ProjectList />
      <FeaturesSection />
    </>
  );
}
