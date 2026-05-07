"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PersonalInfo } from "@/lib/types";

type AboutSectionProps = {
  personalInfo: PersonalInfo;
};

export function AboutSection({ personalInfo }: AboutSectionProps) {
  const socialLinks = [
    {
      label: "GitHub",
      href: personalInfo.socialLinks.github,
      icon: FiGithub,
    },
    {
      label: "LinkedIn",
      href: personalInfo.socialLinks.linkedin,
      icon: FiLinkedin,
    },
    {
      label: "Email",
      href: `mailto:${personalInfo.email}`,
      icon: FiMail,
    },
  ].filter((link) => link.href);

  return (
    <section
      id="about"
      className="section-shell mt-10 rounded-[2rem] px-6 py-20 sm:px-10 lg:px-16"
    >
      <SectionHeading
        eyebrow="About"
        title="AI & Full-Stack Developer Crafting Modern Digital Experiences"
        description="Passionate about building intelligent, scalable, and visually engaging applications using AI, modern web technologies, and creative problem-solving."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="glass-panel overflow-hidden rounded-[1.75rem] p-6"
        >
          <img
            src="/images/kalyan 2.jpeg"
            alt={personalInfo.name}
            className="h-80 w-full rounded-[1.25rem] object-cover"
          />

          <div className="mt-6 space-y-3">
            <h3 className="text-2xl font-semibold">
              {personalInfo.name}
            </h3>

            <p className="text-[color:var(--muted)] leading-7">
              I am a Computer Science student and passionate developer focused
              on creating modern web applications, AI-powered solutions, and
              interactive user experiences. I enjoy transforming ideas into
              real-world products using React, Express.js, Python, and machine
              learning technologies.
            </p>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          {/* What I Do */}
          <div className="glass-panel rounded-[1.75rem] p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--accent)]">
              What I Do
            </p>

            <p className="mt-4 text-lg leading-8 text-[color:var(--foreground)]">
              I specialize in full-stack development, AI/ML projects, and
              modern UI engineering. From responsive portfolio websites to
              intelligent applications and deployment-ready systems, I focus on
              building clean, high-performance digital experiences with strong
              attention to design and usability.
            </p>
          </div>

          {/* Social Links */}
          <div className="glass-panel rounded-[1.75rem] p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--accent)]">
              Social Links
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label === "Email" ? undefined : "_blank"}
                    rel={link.label === "Email" ? undefined : "noreferrer"}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-[color:var(--foreground)] transition-all duration-300 hover:bg-white/10 hover:scale-105"
                  >
                    <Icon className="text-base" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}