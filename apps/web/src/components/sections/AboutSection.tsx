import { SectionReveal } from "@/components/SectionReveal";

const values = [
  ["Performance", "Interfaces that feel instant, with a clean rendering strategy behind the shine.", "fa-solid fa-gauge-high"],
  ["SEO", "Semantic pages, metadata, and structure built to be discovered from day one.", "fa-solid fa-magnifying-glass-chart"],
  ["Clean Code", "Typed, modular systems that stay readable after the launch excitement fades.", "fa-solid fa-code-branch"],
  ["Creative UI", "Motion, glass, glow, and spacing used with restraint so the brand feels custom.", "fa-solid fa-wand-magic-sparkles"]
];

export function AboutSection() {
  return (
    <SectionReveal>
      <section id="about" className="section-shell py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">About</span>
            <h2 className="section-title">Developer craft with brand-level polish.</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-white/72">
              I build fast, expressive web experiences for businesses, founders, and creators who want more than a page on the internet.
              My work blends front-end detail, scalable backend thinking, SEO structure, and UI motion that supports the story instead of
              distracting from it.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map(([title, text, icon]) => (
                <article key={title} className="glass-card p-6">
                  <i className={`${icon} text-2xl text-soft`} />
                  <h3 className="mt-5 font-fredoka text-2xl text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
