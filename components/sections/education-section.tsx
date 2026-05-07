"use client";

import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/section-heading";

const education = [
  {
    degree: "BTech in Computer Science",
    institution: "JNTUGV College Of Engineering Vizianagaram",
    year: "2024 - 2027",
    details:
      "Pursuing Computer Science with a strong focus on full-stack development, artificial intelligence, machine learning, and modern software engineering. Actively building real-world projects using React, Python, AI tools, and cloud deployment technologies.",
  },
  {
    degree: "Diploma in Computer Engineering (CME)",
    institution: "Government Polytechnic Rebaka, Anakapalli",
    year: "2021 - 2024",
    details:
      "Built a strong foundation in programming, web development, databases, networking, and problem-solving. Developed academic and mini projects focused on software applications, responsive web design, and practical technology implementation.",
  },
];

export function EducationSection() {
  return (
    <section id="education" className="section-shell mt-10 rounded-[2rem] px-6 py-20 sm:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Education"
        title="A foundation in computer science and applied AI"
        description="My academic path blends core engineering with practical exploration in machine learning and product design."
      />

      <div className="mt-12 space-y-6 border-l border-white/10 pl-6 sm:pl-10">
        {education.map((item, index) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1 }}
            className="relative glass-panel rounded-[1.5rem] p-6"
          >
            <span className="absolute -left-[2.1rem] top-8 flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--accent)] text-white shadow-lg shadow-blue-500/20">
              <FiBookOpen />
            </span>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[color:var(--accent)]">{item.year}</p>
            <h3 className="mt-3 text-2xl font-semibold">{item.degree}</h3>
            <p className="mt-1 text-[color:var(--muted)]">{item.institution}</p>
            <p className="mt-4 leading-7 text-[color:var(--muted)]">{item.details}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}