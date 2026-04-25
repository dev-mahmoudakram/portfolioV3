import "server-only";
import type { ContactMessage, ContactPayload, Project, Skill } from "@/types";
import { prisma } from "@/lib/prisma";

interface ProjectFilters {
  category?: string;
  tech?: string;
}

function assertDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }
}

function normalizeTechStack(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item));
}

function serializeProject(project: {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription: string | null;
  image: string | null;
  techStack: unknown;
  category: string;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}): Project {
  return {
    ...project,
    techStack: normalizeTechStack(project.techStack),
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString()
  };
}

function serializeSkill(skill: {
  id: number;
  name: string;
  category: string;
  icon: string | null;
  order: number;
  createdAt: Date;
}): Skill {
  return {
    ...skill,
    createdAt: skill.createdAt.toISOString()
  };
}

function serializeContactMessage(message: {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: Date;
}): ContactMessage {
  return {
    ...message,
    phone: message.phone ?? undefined,
    subject: message.subject ?? undefined,
    createdAt: message.createdAt.toISOString()
  };
}

export async function listProjects(filters: ProjectFilters = {}): Promise<Project[]> {
  assertDatabaseUrl();
  const projects = await prisma.project.findMany({
    where: filters.category ? { category: filters.category } : undefined,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  });

  const normalized = projects.map(serializeProject);

  if (!filters.tech) {
    return normalized;
  }

  const tech = filters.tech.toLowerCase();
  return normalized.filter((project) => project.techStack.some((item) => item.toLowerCase() === tech));
}

export async function listFeaturedProjects(): Promise<Project[]> {
  assertDatabaseUrl();
  const projects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 6
  });

  return projects.map(serializeProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  assertDatabaseUrl();
  const project = await prisma.project.findUnique({ where: { slug } });
  return project ? serializeProject(project) : null;
}

export async function listSkills(category?: string): Promise<Skill[]> {
  assertDatabaseUrl();
  const skills = await prisma.skill.findMany({
    where: category ? { category } : undefined,
    orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }]
  });

  return skills.map(serializeSkill);
}

export function validateContactPayload(payload: ContactPayload) {
  const errors: string[] = [];
  const normalized = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || undefined,
    subject: payload.subject?.trim() || undefined,
    message: payload.message.trim()
  };

  if (normalized.name.length < 2 || normalized.name.length > 80) {
    errors.push("Name must be between 2 and 80 characters.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email) || normalized.email.length > 120) {
    errors.push("Email must be valid and 120 characters or fewer.");
  }

  if (normalized.phone && normalized.phone.length > 30) {
    errors.push("Phone must be 30 characters or fewer.");
  }

  if (normalized.subject && normalized.subject.length > 120) {
    errors.push("Subject must be 120 characters or fewer.");
  }

  if (normalized.message.length < 10 || normalized.message.length > 2000) {
    errors.push("Message must be between 10 and 2000 characters.");
  }

  return {
    data: normalized,
    errors
  };
}

export async function createContactMessage(payload: ContactPayload) {
  assertDatabaseUrl();
  const result = validateContactPayload(payload);

  if (result.errors.length > 0) {
    return result;
  }

  const message = await prisma.contactMessage.create({
    data: result.data
  });

  return {
    data: {
      ok: true,
      message: "Thanks Mahmoud will reply soon.",
      data: serializeContactMessage(message)
    },
    errors: []
  };
}
