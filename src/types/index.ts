export type ProjectCategory =
  | "frontend"
  | "backend"
  | "fullstack"
  | "dashboard"
  | "landing-page";

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  image?: string | null;
  techStack: string[];
  category: ProjectCategory | string;
  categories: string[];
  sortOrder: number;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
}

export interface Skill {
  id: number;
  name: string;
  category: "frontend" | "backend" | "tools" | string;
  icon?: string | null;
  order: number;
  createdAt: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactMessage extends ContactPayload {
  id: number;
  status: "NEW" | "READ" | "ARCHIVED" | string;
  createdAt: string;
}
