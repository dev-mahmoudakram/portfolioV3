import type { Project } from "@/types";
import { apiFetch } from "@/lib/api";

export function getProjects() {
  return apiFetch<Project[]>("/projects");
}

export function getFeaturedProjects() {
  return apiFetch<Project[]>("/projects/featured");
}

export function getProjectBySlug(slug: string) {
  return apiFetch<Project>(`/projects/${slug}`);
}
