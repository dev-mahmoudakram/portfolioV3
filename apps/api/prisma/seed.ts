import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const projects = [
  {
    title: "Neon SaaS Dashboard",
    slug: "neon-saas-dashboard",
    description: "A fast admin dashboard with analytics, auth-ready layouts, and polished responsive UI.",
    longDescription:
      "Built as a premium dashboard foundation with performance-first rendering, reusable cards, and conversion-aware data views.",
    image: "/images/project-placeholder.svg",
    techStack: ["Next.js", "TypeScript", "Tailwind", "NestJS", "Prisma"],
    category: "dashboard",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    title: "Velocity Landing Page",
    slug: "velocity-landing-page",
    description: "A conversion-focused landing page with motion, SEO metadata, and Lighthouse-friendly structure.",
    longDescription:
      "Designed for founders who need a premium launch page that feels quick, modern, and memorable.",
    image: "/images/project-placeholder.svg",
    techStack: ["Next.js", "GSAP", "SCSS", "Tailwind"],
    category: "landing-page",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    title: "Commerce API Platform",
    slug: "commerce-api-platform",
    description: "A modular NestJS API with Prisma, MySQL, clean modules, and scalable service boundaries.",
    longDescription:
      "Backend architecture focused on maintainable modules, typed DTOs, validation, and production-ready database access.",
    image: "/images/project-placeholder.svg",
    techStack: ["NestJS", "Prisma", "MySQL", "TypeScript"],
    category: "backend",
    liveUrl: null,
    githubUrl: "https://github.com",
    featured: false
  }
];

const skills = [
  ["Next.js", "frontend", "fa-brands fa-react", 1],
  ["React", "frontend", "fa-brands fa-react", 2],
  ["TypeScript", "frontend", "fa-solid fa-code", 3],
  ["JavaScript", "frontend", "fa-brands fa-js", 4],
  ["SCSS", "frontend", "fa-brands fa-sass", 5],
  ["Tailwind", "frontend", "fa-solid fa-wand-magic-sparkles", 6],
  ["Bootstrap", "frontend", "fa-brands fa-bootstrap", 7],
  ["NestJS", "backend", "fa-solid fa-server", 1],
  ["Laravel", "backend", "fa-brands fa-laravel", 2],
  ["Prisma", "backend", "fa-solid fa-database", 3],
  ["MySQL", "backend", "fa-solid fa-database", 4],
  ["Git", "tools", "fa-brands fa-git-alt", 1],
  ["GitHub", "tools", "fa-brands fa-github", 2],
  ["Vercel", "tools", "fa-solid fa-cloud", 3],
  ["Figma", "tools", "fa-brands fa-figma", 4],
  ["GSAP", "tools", "fa-solid fa-bolt", 5]
] as const;

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    });
  }

  for (const [name, category, icon, order] of skills) {
    const existing = await prisma.skill.findFirst({ where: { name, category } });

    if (existing) {
      await prisma.skill.update({
        where: { id: existing.id },
        data: { icon, order }
      });
      continue;
    }

    await prisma.skill.create({
      data: { name, category, icon, order }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
