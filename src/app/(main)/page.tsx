import type { Project } from "@/types";
import nextDynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { listProjects } from "@/server/portfolio-data";

const SkillsSection    = nextDynamic(() => import("@/components/sections/SkillsSection").then(m => m.SkillsSection));
const ProjectsSection  = nextDynamic(() => import("@/components/sections/ProjectsSection").then(m => m.ProjectsSection));
const ContactSection   = nextDynamic(() => import("@/components/sections/ContactSection").then(m => m.ContactSection));
const BackToTop        = nextDynamic(() => import("@/components/BackToTop").then(m => m.BackToTop));

export const dynamic = "force-dynamic";

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Neon SaaS Dashboard",
    slug: "neon-saas-dashboard",
    description: "A fast admin dashboard with analytics, auth-ready layouts, and polished responsive UI.",
    image: "/images/project-placeholder.svg",
    techStack: ["Next.js", "TypeScript", "Tailwind", "NestJS"],
    category: "dashboard",
    categories: ["dashboard", "fullstack"],
    sortOrder: 0,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Velocity Landing Page",
    slug: "velocity-landing-page",
    description: "A conversion-focused landing page with motion, SEO metadata, and Lighthouse-friendly structure.",
    image: "/images/project-placeholder.svg",
    techStack: ["Next.js", "GSAP", "SCSS", "Tailwind"],
    category: "landing-page",
    categories: ["landing-page", "frontend"],
    sortOrder: 1,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default async function HomePage() {
  const projects = await listProjects().catch(() => fallbackProjects);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mahmoud Akram",
    jobTitle: "Web Developer",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    sameAs: ["https://github.com", "https://linkedin.com"]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection initialProjects={projects} />
      <ServicesSection />
      <ExperienceSection />
      <ContactSection />
      <BackToTop />
    </main>
  );
}
