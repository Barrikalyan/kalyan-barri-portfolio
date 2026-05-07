"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const sections = ["home", "about", "education", "projects", "skills", "certificates", "contact"];

type NavbarProps = {
  onThemeToggle: () => void;
  isDarkMode: boolean;
};

export function Navbar({ onThemeToggle, isDarkMode }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[color:var(--background)]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="text-sm font-semibold tracking-[0.3em] text-[color:var(--foreground)]">
          KALYAN BARRI
        </a>

        <nav className="hidden items-center gap-1 rounded-full glass-panel px-2 py-2 md:flex">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                activeSection === section
                  ? "bg-[color:var(--accent)] text-white shadow-lg shadow-blue-500/20"
                  : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
              }`}
            >
              {section}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onThemeToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full glass-panel text-[color:var(--foreground)] hover:-translate-y-0.5"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  );
}