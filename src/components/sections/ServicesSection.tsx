"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";

const services = [
  ["Landing Pages",     "Launch pages engineered for clarity, trust, and conversion.",   "rocket"],
  ["Portfolio Websites","Personal brands with strong hierarchy and memorable motion.",    "user"],
  ["Company Websites",  "Modern business sites with SEO-first architecture.",             "building"],
  ["Admin Dashboards",  "Dense, usable interfaces for internal operations.",              "chart"],
  ["SEO & Performance", "Technical cleanup that improves speed, indexing, and UX.",       "gauge"]
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } }
};

const card = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function ServicesSection() {
  return (
    <section id="services" className="snap-section section-shell pb-24 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65 }}
      >
        <span className="eyebrow">Services</span>
        <h2 className="section-title max-w-2xl">Web experiences that look premium and work hard.</h2>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {services.map(([title, text, icon]) => (
          <motion.article
            key={title}
            variants={card}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="glass-card p-5"
          >
            <motion.span
              className="inline-flex text-2xl text-soft"
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "backOut", delay: 0.2 }}
            >
              <Icon name={icon} />
            </motion.span>
            <h3 className="mt-5 font-fredoka text-xl text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
