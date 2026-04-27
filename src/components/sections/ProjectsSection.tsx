import type { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RevealSection } from "@/components/RevealSection";

interface ProjectsSectionProps {
  initialProjects: Project[];
}

export function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  const featuredProjects = initialProjects.filter((project) => project.featured).slice(0, 4);
  const visibleProjects = featuredProjects.length > 0 ? featuredProjects : initialProjects.slice(0, 4);

  return (
    <section id="projects" className="snap-section section-shell pb-24 pt-28">
      <RevealSection variant="up-sm" className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">Projects</span>
          <h2 className="section-title max-w-2xl">Featured projects and product builds.</h2>
        </div>
      </RevealSection>

      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project, i) => (
            <RevealSection key={project.id} as="article" variant="up" delay={i + 1} className="glass-card p-5">
              <div className="w-full space-y-5">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-deep/20">
                  <Image
                    src={project.image || "/images/project-placeholder.svg"}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {(project.categories?.length ? project.categories : [project.category]).map((category) => (
                      <span key={`${project.id}-${category}`} className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] text-soft">
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2 font-fredoka text-2xl text-white">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-white/68">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
          <div className="pt-1 md:col-span-2">
            <Link href="/projects" className="ghost-button !px-7 !py-3 text-base">
              Explore More
              <Icon name="arrow-right" />
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center gap-6">
          <div className="relative flex min-h-[420px] w-full items-end overflow-hidden">
            <Image
              src="/images/char/projects.png"
              alt="Projects illustration"
              fill
              sizes="22vw"
              className="object-contain object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
