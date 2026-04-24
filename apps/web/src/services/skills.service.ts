import type { Skill } from "@mahmoud-portfolio/types";
import { apiFetch } from "@/lib/api";

export function getSkills() {
  return apiFetch<Skill[]>("/skills");
}
