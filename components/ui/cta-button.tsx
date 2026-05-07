import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export function CtaButton({ href, children, variant = "primary", external = false }: CtaButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
  const variants = {
    primary:
      "bg-[color:var(--accent)] text-white shadow-lg shadow-blue-500/20 hover:translate-y-[-1px] hover:shadow-xl hover:shadow-blue-500/25",
    secondary:
      "glass-panel text-[color:var(--foreground)] hover:-translate-y-0.5 hover:bg-white/80 dark:hover:bg-white/10",
  } as const;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${baseClasses} ${variants[variant]}`}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </a>
  );
}