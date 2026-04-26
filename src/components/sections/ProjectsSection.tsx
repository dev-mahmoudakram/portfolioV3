"use client";

import type { Project } from "@/types";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

interface ProjectsSectionProps {
  initialProjects: Project[];
}

export function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  const [projects] = useState(initialProjects);
  const categories = useMemo(() => ["all", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="snap-section section-shell pb-24 pt-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <article
            key={project.id}
            className="glass-card group overflow-hidden transition-transform duration-200 hover:-translate-y-2 hover:scale-[1.015]"
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
                    <Icon name="external-link" /> Live
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a href={project.githubUrl} className="ghost-button !px-4 !py-2 text-sm" target="_blank" rel="noreferrer">
                    <Icon name="github" /> Code
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
