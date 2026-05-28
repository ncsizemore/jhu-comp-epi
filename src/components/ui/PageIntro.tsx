import type { ReactNode } from 'react';

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
};

export default function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.96] text-[color:var(--color-ink)] md:text-7xl">
          {title}
        </h1>
        <div className="mt-6 max-w-3xl text-xl leading-relaxed text-[color:var(--color-ink)]">
          {children}
        </div>
      </div>
    </section>
  );
}
