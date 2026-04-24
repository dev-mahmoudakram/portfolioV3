import { SectionReveal } from "@/components/SectionReveal";

const services = [
  ["Landing Pages", "Launch pages engineered for clarity, trust, and conversion.", "fa-solid fa-rocket"],
  ["Portfolio Websites", "Personal brands with strong hierarchy and memorable motion.", "fa-solid fa-user-astronaut"],
  ["Company Websites", "Modern business sites with SEO-first architecture.", "fa-solid fa-building"],
  ["Admin Dashboards", "Dense, usable interfaces for internal operations.", "fa-solid fa-chart-line"],
  ["SEO & Performance", "Technical cleanup that improves speed, indexing, and UX.", "fa-solid fa-gauge"]
];

export function ServicesSection() {
  return (
    <SectionReveal>
      <section id="services" className="section-shell py-24">
        <span className="eyebrow">Services</span>
        <h2 className="section-title max-w-2xl">Web experiences that look premium and work hard.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {services.map(([title, text, icon]) => (
            <article key={title} className="glass-card p-5">
              <i className={`${icon} text-2xl text-soft`} />
              <h3 className="mt-5 font-fredoka text-xl text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
