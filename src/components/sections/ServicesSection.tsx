import { Icon } from "@/components/Icon";
import { RevealSection } from "@/components/RevealSection";

const services = [
  ["Landing Pages",     "Launch pages engineered for clarity, trust, and conversion.",   "rocket"],
  ["Portfolio Websites","Personal brands with strong hierarchy and memorable motion.",    "user"],
  ["Company Websites",  "Modern business sites with SEO-first architecture.",             "building"],
  ["Admin Dashboards",  "Dense, usable interfaces for internal operations.",              "chart"],
  ["SEO & Performance", "Technical cleanup that improves speed, indexing, and UX.",       "gauge"]
];

export function ServicesSection() {
  return (
    <section id="services" className="snap-section section-shell pb-24 pt-28">
      <RevealSection variant="up-sm">
        <span className="eyebrow">Services</span>
        <h2 className="section-title max-w-2xl">Web experiences that look premium and work hard.</h2>
      </RevealSection>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {services.map(([title, text, icon], i) => (
          <RevealSection
            key={title}
            as="article"
            variant="up"
            delay={(i % 5) + 1}
            className="glass-card p-5"
          >
            <span className="inline-flex text-2xl text-soft">
              <Icon name={icon} />
            </span>
            <h3 className="mt-5 font-fredoka text-xl text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
