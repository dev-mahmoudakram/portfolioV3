"use client";

import type { Project } from "@mahmoud-portfolio/types";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsSectionProps {
  initialProjects: Project[];
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.55 } },
  exit:   { opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.3 } }
};

export function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  const [projects] = useState(initialProjects);
  const categories = useMemo(() => ["all", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="snap-section section-shell pb-24 pt-28">
      <motion.div
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65 }}
      >
        <div>
          <span className="eyebrow">Projects</span>
          <h2 className="section-title max-w-2xl">Selected builds with a neon edge.</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize transition ${
                activeCategory === category
                  ? "border-soft bg-soft text-white"
                  : "border-white/10 bg-white/5 text-white/65 hover:text-white"
              }`}
            >
              {category.replace("-", " ")}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariant}
              layout
              whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.22 } }}
              className="glass-card group overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-deep/20">
                <Image
                  src={project.image || "/images/project-placeholder.svg"}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {project.featured ? (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Featured</span>
                ) : null}
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">{project.category}</p>
                <h3 className="mt-3 font-fredoka text-2xl text-white">{project.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/65">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-white/68">{tech}</span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  {project.liveUrl ? (
                    <a href={project.liveUrl} className="ghost-button !px-4 !py-2 text-sm" target="_blank" rel="noreferrer">
                      <i className="fa-solid fa-arrow-up-right-from-square" /> Live
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a href={project.githubUrl} className="ghost-button !px-4 !py-2 text-sm" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-github" /> Code
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
