import type { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RevealSection } from "@/components/RevealSection";

interface ProjectsCatalogProps {
  projects: Project[];
}

export function ProjectsCatalog({ projects }: ProjectsCatalogProps) {
  return (
    <section className="section-shell pb-20 pt-28">
      <RevealSection variant="up-sm" className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Projects</span>
          <h1 className="section-title max-w-2xl">All projects</h1>
        </div>
        <Link href="/" className="ghost-button !px-5 !py-2.5 text-sm">
          <Icon name="arrow-left" />
          Back Home
        </Link>
      </RevealSection>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <RevealSection key={project.id} as="article" variant="up" delay={((i % 3) + 1) as 1 | 2 | 3} className="glass-card overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden bg-deep/20">
              <Image
                src={project.image || "/images/project-placeholder.svg"}
                alt={`${project.title} preview`}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              {project.featured ? (
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Featured
                </span>
              ) : null}
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {(project.categories?.length ? project.categories : [project.category]).map((category) => (
                  <span key={`${project.id}-${category}`} className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] text-soft">
                    {category}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 font-fredoka text-2xl text-white">{project.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/65">{project.description}</p>
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
    </section>
  );
}
