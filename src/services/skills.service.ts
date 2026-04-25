import type { Skill } from "@/types";
import { apiFetch } from "@/lib/api";

export function getSkills() {
  return apiFetch<Skill[]>("/skills");
}
