import { Injectable, NotFoundException } from "@nestjs/common";
import { Project } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

interface ProjectFilters {
  category?: string;
  tech?: string;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: ProjectFilters = {}) {
    const projects = await this.prisma.project.findMany({
      where: filters.category ? { category: filters.category } : undefined,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
    });

    if (!filters.tech) {
      return projects;
    }

    const tech = filters.tech.toLowerCase();
    return projects.filter((project: Project) =>
      Array.isArray(project.techStack)
        ? project.techStack.some((item: unknown) => String(item).toLowerCase() === tech)
        : false
    );
  }

  findFeatured() {
    return this.prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 6
    });
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({ where: { slug } });

    if (!project) {
      throw new NotFoundException(`Project "${slug}" was not found.`);
    }

    return project;
  }
}
