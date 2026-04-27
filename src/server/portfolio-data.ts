import "server-only";
import type { Category, ContactMessage, ContactPayload, Project, Skill } from "@/types";
import { prisma } from "@/lib/prisma";

interface ProjectFilters {
  category?: string;
  tech?: string;
}

interface ProjectWriteInput {
  title: string;
  description: string;
  longDescription?: string | null;
  image?: string | null;
  techStack: string[];
  categories: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured?: boolean;
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

function normalizeProjectImage(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return null;
}

function normalizeCategories(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .map((item) => String(item).trim())
        .filter(Boolean)
    )
  );
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
  categories: string[];
  sortOrder: number;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}): Project {
  const categories = normalizeCategories(project.categories);

  return {
    ...project,
    image: normalizeProjectImage(project.image),
    techStack: normalizeTechStack(project.techStack),
    categories,
    category: categories[0] ?? project.category,
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

function serializeCategory(category: {
  id: number;
  name: string;
  createdAt: Date;
}): Category {
  return {
    ...category,
    createdAt: category.createdAt.toISOString()
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
    where: filters.category
      ? {
          OR: [{ category: filters.category }, { categories: { has: filters.category } }]
        }
      : undefined,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
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
    orderBy: { sortOrder: "asc" },
    take: 4
  });

  return projects.map(serializeProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  assertDatabaseUrl();
  const project = await prisma.project.findUnique({ where: { slug } });
  return project ? serializeProject(project) : null;
}

function slugifyProjectTitle(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function createUniqueSlug(baseTitle: string, currentId?: number) {
  const baseSlug = slugifyProjectTitle(baseTitle) || `project-${Date.now()}`;
  let slug = baseSlug;
  let index = 2;

  while (true) {
    const existing = await prisma.project.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === currentId) {
      return slug;
    }
    slug = `${baseSlug}-${index}`;
    index += 1;
  }
}

export async function createProject(input: ProjectWriteInput): Promise<Project> {
  assertDatabaseUrl();
  const slug = await createUniqueSlug(input.title);
  const categories = normalizeCategories(input.categories);
  const primaryCategory = categories[0] ?? "uncategorized";
  const maxSortOrder = await prisma.project.aggregate({
    _max: { sortOrder: true }
  });
  const nextSortOrder = (maxSortOrder._max.sortOrder ?? -1) + 1;

  const project = await prisma.project.create({
    data: {
      slug,
      title: input.title.trim(),
      description: input.description.trim(),
      longDescription: input.longDescription?.trim() || null,
      image: normalizeProjectImage(input.image),
      techStack: input.techStack,
      category: primaryCategory,
      categories,
      sortOrder: nextSortOrder,
      liveUrl: input.liveUrl?.trim() || null,
      githubUrl: input.githubUrl?.trim() || null,
      featured: Boolean(input.featured)
    }
  });

  return serializeProject(project);
}

export async function updateProjectBySlug(slug: string, input: ProjectWriteInput): Promise<Project | null> {
  assertDatabaseUrl();
  const existing = await prisma.project.findUnique({ where: { slug } });
  if (!existing) {
    return null;
  }

  const nextSlug = await createUniqueSlug(input.title, existing.id);
  const categories = normalizeCategories(input.categories);
  const primaryCategory = categories[0] ?? existing.category ?? "uncategorized";

  const project = await prisma.project.update({
    where: { id: existing.id },
    data: {
      slug: nextSlug,
      title: input.title.trim(),
      description: input.description.trim(),
      longDescription: input.longDescription?.trim() || null,
      image: normalizeProjectImage(input.image),
      techStack: input.techStack,
      category: primaryCategory,
      categories,
      liveUrl: input.liveUrl?.trim() || null,
      githubUrl: input.githubUrl?.trim() || null,
      featured: Boolean(input.featured)
    }
  });

  return serializeProject(project);
}

export async function deleteProjectBySlug(slug: string): Promise<boolean> {
  assertDatabaseUrl();
  const existing = await prisma.project.findUnique({ where: { slug }, select: { id: true } });
  if (!existing) {
    return false;
  }

  await prisma.project.delete({ where: { id: existing.id } });
  return true;
}

export async function setFeaturedProjects(projectIds: number[]): Promise<Project[]> {
  assertDatabaseUrl();
  await prisma.$transaction([
    prisma.project.updateMany({ data: { featured: false } }),
    prisma.project.updateMany({
      where: {
        id: {
          in: projectIds
        }
      },
      data: { featured: true }
    })
  ]);

  return listFeaturedProjects();
}

export async function reorderProjects(projectIds: number[]): Promise<Project[]> {
  assertDatabaseUrl();
  await prisma.$transaction(
    projectIds.map((projectId, index) =>
      prisma.project.update({
        where: { id: projectId },
        data: { sortOrder: index }
      })
    )
  );

  return listProjects();
}

export async function listSkills(category?: string): Promise<Skill[]> {
  assertDatabaseUrl();
  const skills = await prisma.skill.findMany({
    where: category ? { category } : undefined,
    orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }]
  });

  return skills.map(serializeSkill);
}

export async function listCategories(): Promise<Category[]> {
  assertDatabaseUrl();
  const categories = await prisma.category.findMany({
    orderBy: [{ name: "asc" }]
  });

  return categories.map(serializeCategory);
}

export async function createCategory(name: string): Promise<Category> {
  assertDatabaseUrl();
  const normalized = name.trim();
  const category = await prisma.category.create({
    data: { name: normalized }
  });

  return serializeCategory(category);
}

export async function updateCategory(id: number, name: string): Promise<Category | null> {
  assertDatabaseUrl();
  const normalized = name.trim();
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) {
    return null;
  }

  const updated = await prisma.$transaction(async (tx) => {
    const category = await tx.category.update({
      where: { id },
      data: { name: normalized }
    });

    const projects = await tx.project.findMany({
      where: { categories: { has: existing.name } },
      select: { id: true, categories: true, category: true }
    });

    for (const project of projects) {
      const nextCategories = Array.from(
        new Set(project.categories.map((item) => (item === existing.name ? normalized : item)))
      );
      await tx.project.update({
        where: { id: project.id },
        data: {
          categories: nextCategories,
          category: nextCategories[0] ?? normalized
        }
      });
    }

    return category;
  });

  return serializeCategory(updated);
}

export async function deleteCategory(id: number): Promise<boolean> {
  assertDatabaseUrl();
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) {
    return false;
  }

  await prisma.$transaction(async (tx) => {
    const projects = await tx.project.findMany({
      where: { categories: { has: existing.name } },
      select: { id: true, categories: true, category: true }
    });

    for (const project of projects) {
      const nextCategories = project.categories.filter((item) => item !== existing.name);
      await tx.project.update({
        where: { id: project.id },
        data: {
          categories: nextCategories,
          category: nextCategories[0] ?? "uncategorized"
        }
      });
    }

    await tx.category.delete({ where: { id } });
  });

  return true;
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
