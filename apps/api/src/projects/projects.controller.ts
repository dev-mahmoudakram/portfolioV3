import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(@Query("category") category?: string, @Query("tech") tech?: string) {
    return this.projectsService.findAll({ category, tech });
  }

  @Get("featured")
  findFeatured() {
    return this.projectsService.findFeatured();
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.projectsService.findBySlug(slug);
  }
}
