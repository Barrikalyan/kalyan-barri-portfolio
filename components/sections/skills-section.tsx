"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Skill } from "@/lib/types";
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, 
  SiPython, SiJavascript, SiTypescript, SiHtml5, 
  SiCss, SiMongodb, SiPostgresql, SiFirebase, 
  SiGit, SiDocker, SiFigma, SiSanity
} from "react-icons/si";
import { FiCode } from "react-icons/fi";

type SkillsSectionProps = {
  skills: Skill[];
};

// Map common skill names to their respective icons
const getSkillIcon = (skillName: string) => {
  const normalized = skillName.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  const iconMap: Record<string, React.ElementType> = {
    react: SiReact,
    reactjs: SiReact,
    nextjs: SiNextdotjs,
    next: SiNextdotjs,
    tailwind: SiTailwindcss,
    tailwindcss: SiTailwindcss,
    node: SiNodedotjs,
    nodejs: SiNodedotjs,
    python: SiPython,
    javascript: SiJavascript,
    js: SiJavascript,
    typescript: SiTypescript,
    ts: SiTypescript,
    html: SiHtml5,
    html5: SiHtml5,
    css: SiCss,
    css3: SiCss,
    mongodb: SiMongodb,
    postgres: SiPostgresql,
    postgresql: SiPostgresql,
    firebase: SiFirebase,
    git: SiGit,
    docker: SiDocker,
    figma: SiFigma,
    sanity: SiSanity,
    sanitycms: SiSanity,
  };

  return iconMap[normalized] || FiCode;
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="section-shell mt-10 rounded-[2rem] px-6 py-20 sm:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Skills"
        title="Balanced across design, engineering, and AI"
        description="A practical skill mix that supports shipping products end-to-end: user interfaces, APIs, and AI-assisted experiences."
      />

      {/* Skills Grid */}
      <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {skills.map((skill, index) => {
          const Icon = getSkillIcon(skill.name);
          return (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="glass-panel rounded-[1.25rem] p-6 flex flex-col items-center justify-center text-center group cursor-pointer border border-transparent hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)] transition-all duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/5 group-hover:bg-gradient-to-br from-blue-500 to-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mb-4 shadow-lg shadow-black/10 group-hover:shadow-blue-500/30">
                <Icon className="text-3xl text-[color:var(--muted)] group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {skill.name}
              </h4>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}