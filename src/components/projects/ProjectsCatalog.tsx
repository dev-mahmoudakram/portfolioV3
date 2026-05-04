import type { Project } from "@/types";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RevealSection } from "@/components/RevealSection";
import { ProjectsFilter } from "./ProjectsFilter";

interface ProjectsCatalogProps {
  projects: Project[];
  categories: string[];
}

export function ProjectsCatalog({ projects, categories }: ProjectsCatalogProps) {
  return (
    <section className="section-shell pb-20 pt-40">
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

      <ProjectsFilter projects={projects} categories={categories} />
    </section>
  );
}
