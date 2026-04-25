"use client";

import type { Skill } from "@mahmoud-portfolio/types";
import { motion } from "framer-motion";

interface SkillsSectionProps {
  skills: Skill[];
}

const labels: Record<string, string> = {
  frontend: "Frontend",
  backend:  "Backend",
  tools:    "Tools"
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const colVariant = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65 } }
};

const tagVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.35 } }
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const groups = ["frontend", "backend", "tools"].map((category) => ({
    category,
    items: skills.filter((skill) => skill.category === category)
  }));

  return (
    <section id="skills" className="snap-section section-shell pb-24 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65 }}
      >
        <span className="eyebrow">Skills</span>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="section-title max-w-2xl">Sharp tools for modern product builds.</h2>
          <p className="max-w-md text-white/62">A practical stack for premium interfaces, reliable APIs, and launch-ready web platforms.</p>
        </div>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-5 lg:grid-cols-3"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {groups.map((group) => (
          <motion.article
            key={group.category}
            variants={colVariant}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card p-6"
          >
            <h3 className="font-fredoka text-2xl text-white">{labels[group.category]}</h3>
            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              {group.items.map((skill) => (
                <motion.span
                  key={skill.id}
                  variants={tagVariant}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/78"
                >
                  {skill.icon ? <i className={`${skill.icon} mr-2 text-soft`} /> : null}
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
