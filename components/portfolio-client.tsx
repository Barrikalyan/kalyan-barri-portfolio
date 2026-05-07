"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { EducationSection } from "@/components/sections/education-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { StrengthsSection } from "@/components/sections/strengths-section";
import { CertificatesSection } from "@/components/sections/certificates-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CursorTrail } from "@/components/ui/cursor-trail";
import type { PortfolioData } from "@/lib/site-data";

type PortfolioClientProps = {
  initialData: PortfolioData;
};

export function PortfolioClient({ initialData }: PortfolioClientProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    setIsDarkMode(nextTheme === "dark");
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    window.localStorage.setItem("portfolio-theme", nextTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextTheme);
  };

  return (
    <div className="relative overflow-hidden">
      <CursorTrail />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.18),_transparent_32%)]" />
      <Navbar onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <HeroSection personalInfo={initialData.personalInfo} />
        <AboutSection personalInfo={initialData.personalInfo} />
        <EducationSection />
        <ProjectsSection projects={initialData.projects} />
        <SkillsSection skills={initialData.skills} />
        <StrengthsSection skills={initialData.skills} />
        <CertificatesSection certificates={initialData.certificates} />
        <ContactSection email={initialData.personalInfo.email} />
      </main>
    </div>
  );
}