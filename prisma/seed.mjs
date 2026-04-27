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
    techStack: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL"],
    category: "dashboard",
    categories: ["dashboard", "fullstack"],
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
    categories: ["landing-page", "frontend"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    title: "Portfolio CMS Platform",
    slug: "portfolio-cms-platform",
    description: "A content-driven portfolio stack with App Router route handlers, Prisma, and a production-ready data model.",
    longDescription:
      "Built as a single deployment target with clean data access, typed API routes, and a maintainable content workflow.",
    image: "/images/project-placeholder.svg",
    techStack: ["Next.js", "App Router", "Prisma", "Supabase", "PostgreSQL"],
    category: "full-stack",
    categories: ["full-stack", "dashboard"],
    liveUrl: null,
    githubUrl: "https://github.com",
    featured: false
  }
];

const skills = [
  ["HTML", "frontend", "fa-brands fa-html5", 1],
  ["CSS", "frontend", "fa-brands fa-css3-alt", 2],
  ["SCSS", "frontend", "fa-brands fa-sass", 3],
  ["Bootstrap", "frontend", "fa-brands fa-bootstrap", 4],
  ["Tailwind CSS", "frontend", "fa-solid fa-wind", 5],
  ["JavaScript", "frontend", "fa-brands fa-js", 6],
  ["TypeScript", "frontend", "fa-solid fa-code", 7],
  ["React", "frontend", "fa-brands fa-react", 8],
  ["Next.js", "frontend", "fa-solid fa-bolt", 9],
  ["Redux Toolkit", "frontend", "fa-solid fa-layer-group", 10],
  ["React Query", "frontend", "fa-solid fa-rotate", 11],
  ["Blazor Server", "frontend", "fa-solid fa-server", 12],
  ["REST APIs", "backend", "fa-solid fa-network-wired", 1],
  ["Authentication & Authorization", "backend", "fa-solid fa-user-shield", 2],
  ["PHP", "backend", "fa-brands fa-php", 3],
  ["Laravel", "backend", "fa-brands fa-laravel", 4],
  ["Livewire", "backend", "fa-solid fa-bolt", 5],
  ["MVC Architecture", "backend", "fa-solid fa-sitemap", 6],
  ["Node.js (Basics)", "backend", "fa-brands fa-node-js", 7],
  ["Prisma ORM", "database", "fa-solid fa-database", 1],
  ["Prisma Migrate", "database", "fa-solid fa-database", 2],
  ["MySQL", "database", "fa-solid fa-database", 3],
  ["PostgreSQL", "database", "fa-solid fa-database", 4],
  ["SQL Server", "database", "fa-solid fa-database", 5],
  ["WordPress", "cms", "fa-brands fa-wordpress", 1],
  ["Shopify", "cms", "fa-brands fa-shopify", 2],
  ["Framer Motion", "animation", "fa-solid fa-cubes", 1],
  ["GSAP", "animation", "fa-solid fa-wand-magic-sparkles", 2],
  ["Three.js", "animation", "fa-solid fa-cube", 3],
  ["Git", "tools", "fa-brands fa-git-alt", 1],
  ["GitHub", "tools", "fa-brands fa-github", 2],
  ["SEO", "tools", "fa-solid fa-magnifying-glass-chart", 3],
  ["Yoast SEO", "tools", "fa-solid fa-chart-line", 4],
  ["On-page SEO", "tools", "fa-solid fa-chart-pie", 5]
];

async function main() {
  const categoryNames = new Set(projects.flatMap((project) => project.categories));

  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

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
