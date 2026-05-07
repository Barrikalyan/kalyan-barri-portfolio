"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { FiCheckCircle, FiMail, FiSend, FiXCircle } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ChangeEvent, FormEvent } from "react";

type ContactSectionProps = {
  email: string;
};

type FormState = {
  name: string;
  email: string;
  message: string;
};

export function ContactSection({ email }: ContactSectionProps) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      // Use mailto: protocol since no EmailJS credentials are provided
      const subject = encodeURIComponent(`New message from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.location.href = `mailto:kalyanbarri4@gmail.com?subject=${subject}&body=${body}`;

      setStatus({ type: "success", message: "Opening your email client..." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({ type: "error", message: "Unable to send message right now. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-shell mt-10 rounded-[2rem] px-6 py-20 sm:px-10 lg:px-16">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build something polished and useful"
        description="Send a message through the form below and EmailJS will deliver it directly to my inbox."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="glass-panel rounded-[1.75rem] p-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-[color:var(--muted)]">
              <FiMail /> {email}
            </div>
            <p className="text-lg leading-8 text-[color:var(--muted)]">
              I’m open to freelance projects, internships, and full-time roles where I can contribute to modern,
              AI-enabled product experiences.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-500">Fast response for relevant opportunities.</div>
            <div className="rounded-2xl bg-blue-500/10 p-4 text-sm text-blue-500">Remote or hybrid collaboration preferred.</div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          onSubmit={handleSubmit}
          className="glass-panel space-y-5 rounded-[1.75rem] p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium">
              <span>Name</span>
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                className="w-full rounded-2xl border border-white/10 bg-white/50 px-4 py-3 outline-none ring-0 placeholder:text-[color:var(--muted)] dark:bg-white/5"
                placeholder="Your name"
                required
              />
            </label>
            <label className="space-y-2 text-sm font-medium">
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className="w-full rounded-2xl border border-white/10 bg-white/50 px-4 py-3 outline-none ring-0 placeholder:text-[color:var(--muted)] dark:bg-white/5"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium">
            <span>Message</span>
            <textarea
              value={form.message}
              onChange={handleChange("message")}
              rows={6}
              className="w-full rounded-2xl border border-white/10 bg-white/50 px-4 py-3 outline-none ring-0 placeholder:text-[color:var(--muted)] dark:bg-white/5"
              placeholder="Tell me about your project or opportunity"
              required
            />
          </label>

          {status.type !== "idle" && (
            <div
              className={`flex items-center gap-3 rounded-2xl p-4 text-sm ${
                status.type === "success"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {status.type === "success" ? <FiCheckCircle /> : <FiXCircle />}
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FiSend /> {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}