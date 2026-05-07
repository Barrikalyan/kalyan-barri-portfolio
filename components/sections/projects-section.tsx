"use client";

import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Project } from "@/lib/types";

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="section-shell mt-10 rounded-[2rem] px-6 py-20 sm:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Projects"
        title="Innovative Projects Built with AI & Modern Web Technologies"
description="Explore a collection of real-world projects focused on AI, full-stack development, responsive design, and creating impactful digital experiences."   />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-panel overflow-hidden rounded-[1.5rem] group border border-transparent hover:border-[color:var(--accent)]/30 hover:shadow-[0_12px_40px_rgba(37,99,235,0.15)] transition-all duration-300 flex flex-col"
          >
            <div className="relative overflow-hidden shrink-0">
              {project.image?.asset?.url ? (
                <img src={project.image.asset.url} alt={project.title} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-neutral-100 text-sm text-neutral-600">No image available</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)] font-semibold">
                    {project.featured ? "Featured" : "Project"}
                  </p>
                  <h3 className="mt-1 text-xl font-bold line-clamp-1">{project.title}</h3>
                </div>
              </div>
              <p className="text-sm leading-6 text-[color:var(--muted)] mb-4 line-clamp-3 flex-1">{project.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                {project.technologies.slice(0, 4).map((technology) => (
                  <span key={technology} className="rounded-md bg-white/5 border border-white/10 px-2 py-1 text-[10px] font-medium text-[color:var(--foreground)]">
                    {technology}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="rounded-md bg-white/5 border border-white/10 px-2 py-1 text-[10px] font-medium text-[color:var(--foreground)]">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--accent)] px-3 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition-colors"
                >
                  <FiGithub /> Code
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 text-xs font-semibold transition-colors"
                >
                  <FiExternalLink /> Live
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}