"use client";

import { motion } from "framer-motion";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Skill } from "@/lib/types";

type StrengthsSectionProps = {
  skills: Skill[];
};

export function StrengthsSection({ skills }: StrengthsSectionProps) {
  // Group skills by category and calculate average proficiency
  const categoryStats = skills.reduce(
    (acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = { name: category, proficiency: 0, count: 0 };
      }
      acc[category].proficiency += skill.proficiency || 0;
      acc[category].count += 1;
      return acc;
    },
    {} as Record<string, { name: string; proficiency: number; count: number }>
  );

  // Calculate average proficiency per category
  const chartData = Object.values(categoryStats).map((cat) => ({
    name: cat.name,
    proficiency: Math.round(cat.proficiency / cat.count),
  }));

  // Top skills
  const topSkills = skills
    .filter((s) => s.proficiency)
    .sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0))
    .slice(0, 8)
    .map((s) => ({
      name: s.name,
      proficiency: s.proficiency || 0,
    }));

  return (
    <section id="strengths" className="section-shell mt-10 rounded-[2rem] px-6 py-20 sm:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Strengths"
        title="Proficiency across domains"
        description="Visual representation of expertise levels in different technical areas."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-[1.75rem] p-6 flex items-center justify-center"
        >
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid stroke="rgba(59, 130, 246, 0.1)" />
              <PolarAngleAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "currentColor", fontSize: 12 }} />
              <Radar
                name="Proficiency"
                dataKey="proficiency"
                stroke="rgb(59, 130, 246)"
                fill="rgb(59, 130, 246)"
                fillOpacity={0.25}
                isAnimationActive={true}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-[1.75rem] p-6 flex items-center justify-center"
        >
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={topSkills}
              margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: "currentColor", fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "currentColor", fontSize: 12 }} width={120} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "0.75rem",
                }}
                cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
              />
              <Bar
                dataKey="proficiency"
                fill="url(#colorGradient)"
                radius={[0, 8, 8, 0]}
                animationDuration={800}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                  <stop offset="50%" stopColor="rgb(34, 211, 238)" />
                  <stop offset="100%" stopColor="rgb(168, 85, 247)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Category Stats Grid */}
      <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {chartData.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel rounded-[1rem] p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">{category.name}</h4>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{category.proficiency}%</span>
            </div>
            <div className="w-full h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${category.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 + 0.2 }}
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-fuchsia-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
