"use client";

import { motion } from "framer-motion";

const experience = [
  ["2026", "Full-Stack Portfolio System",  "Next.js, NestJS, Prisma, and MySQL architecture for a scalable personal brand platform."],
  ["2025", "Premium Web Interfaces",       "Landing pages, company websites, dashboards, and SEO-focused frontend builds."],
  ["2024", "Developer Foundation",         "Focused on clean code, reusable UI systems, responsive layouts, and backend fundamentals."]
];

export function ExperienceSection() {
  return (
    <section id="experience" className="snap-section section-shell pb-24 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65 }}
      >
        <span className="eyebrow">Experience</span>
        <h2 className="section-title max-w-2xl">A timeline shaped by speed, taste, and system thinking.</h2>
      </motion.div>

      <div className="mt-12 space-y-5 border-l border-white/12 pl-6">
        {experience.map(([year, title, text], i) => (
          <motion.article
            key={title}
            className="glass-card relative p-6"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.14 }}
          >
            <motion.span
              className="absolute -left-[35px] top-7 h-4 w-4 rounded-full bg-soft shadow-neon"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "backOut", delay: i * 0.14 + 0.2 }}
            />
            <p className="font-fredoka text-sm text-soft">{year}</p>
            <h3 className="mt-2 font-fredoka text-2xl text-white">{title}</h3>
            <p className="mt-3 text-white/65">{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
