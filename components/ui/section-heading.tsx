type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-[color:var(--muted)] sm:text-lg">{description}</p>
    </div>
  );
}