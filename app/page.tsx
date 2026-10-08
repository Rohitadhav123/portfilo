"use client";

import React, { useState } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { PERSONAL_INFO } from "@/data/content";

export default function Home() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.role,
    url: "https://rohitadhav.vercel.app",
    sameAs: [PERSONAL_INFO.contact.github, PERSONAL_INFO.contact.linkedin],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: PERSONAL_INFO.education.institution,
    },
    knowsAbout: PERSONAL_INFO.techBadges,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Preloader onComplete={() => setIsIntroComplete(true)} />

      <div className="relative min-h-screen w-full bg-[#07070A] text-[#F4F4F8] selection:bg-[#8B5CF6]/30 selection:text-white overflow-hidden">
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <TechStackSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
