"use client";

import { motion } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Certificate } from "@/lib/types";

type CertificatesSectionProps = {
  certificates: Certificate[];
};

export function CertificatesSection({
  certificates,
}: CertificatesSectionProps) {
  return (
    <section
      id="certificates"
      className="section-shell mt-10 rounded-[2rem] px-6 py-20 sm:px-10 lg:px-16"
    >
      <SectionHeading
        eyebrow="Certificates"
        title="Achievements, Certifications & Continuous Learning"
        description="A curated showcase of professional certifications, technical achievements, and industry-recognized credentials that reflect my dedication to continuous growth in AI, Full Stack Development, Cybersecurity, and emerging technologies."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((certificate, index) => {
          const imageUrl = certificate.image?.asset?.url;
          const href = certificate.certificateUrl?.trim() || imageUrl || undefined;
          const Wrapper: any = href ? motion.a : motion.div;

          return (
            <Wrapper
              key={certificate._id}
              {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-panel overflow-hidden rounded-[1.75rem] group border border-transparent hover:border-[color:var(--accent)]/30 hover:shadow-[0_12px_40px_rgba(124,58,237,0.15)] transition-all duration-300 block"
            >
              <div className="relative overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={certificate.title}
                    className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex h-56 w-full items-center justify-center bg-neutral-100 text-sm text-neutral-600">
                    No image available
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative z-10 space-y-4 p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)] group-hover:bg-[color:var(--accent)] group-hover:text-white transition-colors duration-300">
                  <FiAward />
                  Certificate
                </div>

                <h3 className="text-2xl font-semibold leading-snug">
                  {certificate.title}
                </h3>

                <p className="text-[color:var(--muted)]">Issued by {certificate.issuer}</p>

                <div className="flex items-center justify-between text-sm text-[color:var(--muted)]">
                  <span>{certificate.date}</span>

                  <span className="inline-flex items-center gap-2 text-[color:var(--foreground)] transition-transform duration-300 group-hover:translate-x-1">
                    View Credential
                    <FiExternalLink />
                  </span>
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}