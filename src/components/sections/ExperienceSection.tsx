const experience = [
  ["2026", "Full-Stack Portfolio System",  "Next.js, NestJS, Prisma, and MySQL architecture for a scalable personal brand platform."],
  ["2025", "Premium Web Interfaces",       "Landing pages, company websites, dashboards, and SEO-focused frontend builds."],
  ["2024", "Developer Foundation",         "Focused on clean code, reusable UI systems, responsive layouts, and backend fundamentals."]
];

export function ExperienceSection() {
  return (
    <section id="experience" className="snap-section section-shell pb-24 pt-28">
      <div>
        <span className="eyebrow">Experience</span>
        <h2 className="section-title max-w-2xl">A timeline shaped by speed, taste, and system thinking.</h2>
      </div>

      <div className="mt-12 space-y-5 border-l border-white/12 pl-6">
        {experience.map(([year, title, text], i) => (
          <article
            key={title}
            className="glass-card relative p-6 transition-transform duration-200 hover:-translate-y-1"
          >
            <span className={`absolute -left-[35px] top-7 h-4 w-4 rounded-full bg-soft shadow-neon ${i > 0 ? "opacity-85" : "opacity-100"}`} />
            <p className="font-fredoka text-sm text-soft">{year}</p>
            <h3 className="mt-2 font-fredoka text-2xl text-white">{title}</h3>
            <p className="mt-3 text-white/65">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
