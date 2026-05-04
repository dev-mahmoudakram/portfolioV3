"use client";

import type { Project } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { RevealSection } from "@/components/RevealSection";

const PAGE_SIZE = 6;

interface ProjectsFilterProps {
  projects: Project[];
  categories: string[];
}

export function ProjectsFilter({ projects, categories }: ProjectsFilterProps) {
  const [active, setActive] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) =>
          (p.categories?.length ? p.categories : [p.category]).includes(active)
        );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilter(cat: string) {
    setActive(cat);
    setPage(1);
  }

  return (
    <>
      <RevealSection variant="up-sm" className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilter("all")}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            active === "all"
              ? "border-primary bg-primary text-white"
              : "border-white/10 bg-white/[0.05] text-soft hover:border-white/20 hover:text-white"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
              active === cat
                ? "border-primary bg-primary text-white"
                : "border-white/10 bg-white/[0.05] text-soft hover:border-white/20 hover:text-white"
            }`}
          >
            {cat.replace(/-/g, " ")}
          </button>
        ))}
      </RevealSection>

      {filtered.length === 0 ? (
        <p className="text-white/50">No projects in this category yet.</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginated.map((project, i) => (
              <RevealSection key={project.id} as="article" variant="up" delay={((i % 3) + 1) as 1 | 2 | 3} className="glass-card flex flex-col overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden bg-deep/20">
                  <Image
                    src={project.image || "/images/project-placeholder.svg"}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                  {project.featured ? (
                    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2">
                    {(project.categories?.length ? project.categories : [project.category]).map((category) => (
                      <span key={`${project.id}-${category}`} className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] text-soft">
                        {category}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 font-fredoka text-2xl text-white">{project.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-white/65">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-white/68">
                        {tech}
                      </span>
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
              </RevealSection>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="ghost-button !px-4 !py-2 text-sm disabled:pointer-events-none disabled:opacity-30"
              >
                <Icon name="arrow-left" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`h-9 w-9 rounded-full border text-sm transition-colors ${
                    n === page
                      ? "border-primary bg-primary text-white"
                      : "border-white/10 bg-white/[0.05] text-soft hover:border-white/20 hover:text-white"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                aria-label="Next page"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="ghost-button !px-4 !py-2 text-sm disabled:pointer-events-none disabled:opacity-30"
              >
                <Icon name="arrow-right" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
