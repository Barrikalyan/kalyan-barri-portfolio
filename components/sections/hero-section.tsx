"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { CtaButton } from "@/components/ui/cta-button";
import type { PersonalInfo } from "@/lib/types";

type HeroSectionProps = {
  personalInfo: PersonalInfo;
};

export function HeroSection({ personalInfo }: HeroSectionProps) {
  return (
    <section id="home" className="section-shell relative overflow-hidden rounded-[2rem] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="absolute inset-0 -z-10 animate-shimmer bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(124,58,237,0.12),rgba(56,189,248,0.12))]" />
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center rounded-full glass-panel px-4 py-2 text-sm text-[color:var(--muted)]">
            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400" />
            Available for freelance and full-time roles
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
              Full Stack Developer with AI/ML Focus
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-6xl lg:text-7xl">
              {personalInfo.name}
              <span className="mt-2 block text-[color:var(--muted)]">{personalInfo.role}</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
              {personalInfo.bio}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <CtaButton href="#projects">
              View Projects <FiArrowRight className="ml-2" />
            </CtaButton>
            <CtaButton href="./public/kalyan resume.pdf" variant="secondary">
              Download Resume <FiDownload className="ml-2" />
            </CtaButton>
          </div>

      
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[2.5rem] bg-gradient-to-br from-blue-500/30 to-fuchsia-500/20 blur-3xl" />
          <div className="glass-panel animate-float overflow-hidden rounded-[2rem] p-4 shadow-2xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
                <span>Profile</span>
                <span>2026</span>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <div className="relative h-64 w-64 rounded-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.45),_rgba(15,23,42,0.1))] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                  <img
                    src={personalInfo.image.asset.url}
                    alt={personalInfo.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="glass-panel rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">Focus</p>
                  <p className="mt-2 text-lg font-medium">AI products, interfaces, systems</p>
                </div>
                <div className="glass-panel rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">Location</p>
                  <p className="mt-2 text-lg font-medium">Open to remote collaboration</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}