"use client";

import Image from "next/image";
import type { Skill } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SkillTabs } from "@/components/skills/SkillTabs";
import { SkillsBackgroundEffects } from "@/components/skills/SkillsBackgroundEffects";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import styles from "@/styles/skills.module.scss";

type CategoryId = "frontend" | "backend" | "databases" | "cms" | "animation" | "tools";

interface SkillItem {
  name: string;
  icon: string;
  title?: string;
}

interface CategoryConfig {
  id: CategoryId;
  label: string;
  icon: string;
  title: string;
  description: string;
  note: string;
  skills: SkillItem[];
}

interface SkillsSectionProps {
  skills?: Skill[];
}

const brandIcon = (slug: string) => `https://cdn.simpleicons.org/${slug}/ffffff?viewbox=auto`;

const categories: CategoryConfig[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "fa-solid fa-desktop",
    title: "Frontend Development",
    description: "Responsive, interactive interfaces built with modern component systems, state management, and performance-aware rendering.",
    note: "UI effects, reusable patterns, and production-grade interface thinking.",
    skills: [
      { name: "HTML", icon: "fa-brands fa-html5" },
      { name: "CSS", icon: "fa-brands fa-css3-alt" },
      { name: "SCSS", icon: "fa-brands fa-sass" },
      { name: "Tailwind CSS", icon: brandIcon("tailwindcss") },
      { name: "Bootstrap", icon: "fa-brands fa-bootstrap" },
      { name: "JS", icon: "fa-brands fa-js" },
      { name: "TS", title: "TypeScript", icon: brandIcon("typescript") },
      { name: "React", icon: "fa-brands fa-react" },
      { name: "Next.js", icon: brandIcon("nextdotjs") },
      { name: "Redux Toolkit", icon: brandIcon("redux") },
      { name: "React Query", icon: brandIcon("reactquery") },
      { name: "Blazor Server", icon: brandIcon("blazor") }
    ]
  },
  {
    id: "backend",
    label: "Backend",
    icon: "fa-solid fa-code-branch",
    title: "Backend & APIs",
    description: "Structured server-side work with MVC thinking, REST APIs, secure auth flows, and clean integration boundaries.",
    note: "Application flow, access control, and connected system design.",
    skills: [
      { name: "Laravel", icon: "fa-brands fa-laravel" },
      { name: "Livewire", icon: "fa-solid fa-bolt-lightning" },
      { name: "MVC", title: "MVC Architecture", icon: "fa-solid fa-sitemap" },
      { name: "Node.js", title: "Node.js (Basics)", icon: "fa-brands fa-node-js" },
      { name: "REST APIs", icon: "fa-solid fa-plug-circle-bolt" },
      { name: "Auth & Access", title: "Authentication & Authorization", icon: "fa-solid fa-user-shield" }
    ]
  },
  {
    id: "databases",
    label: "Databases",
    icon: "fa-solid fa-database",
    title: "Databases & ORM",
    description: "Reliable schema design, relational data modeling, and migration workflows built for maintainable systems.",
    note: "Storage strategy, structure, and data-layer clarity.",
    skills: [
      { name: "MySQL", icon: brandIcon("mysql") },
      { name: "PostgreSQL", icon: brandIcon("postgresql") },
      { name: "SQL Server", icon: "fa-solid fa-table-columns" },
      { name: "Prisma ORM", icon: brandIcon("prisma") },
      { name: "Prisma Migrate", icon: "fa-solid fa-code-pull-request" }
    ]
  },
  {
    id: "cms",
    label: "CMS",
    icon: "fa-solid fa-table-cells-large",
    title: "CMS & Platforms",
    description: "Flexible content-driven builds and storefront-ready implementations with practical customization and publishing workflows.",
    note: "Content blocks, commerce surfaces, and adaptable delivery.",
    skills: [
      { name: "WordPress", icon: "fa-brands fa-wordpress" },
      { name: "Shopify", icon: "fa-brands fa-shopify" }
    ]
  },
  {
    id: "animation",
    label: "Animation & 3D",
    icon: "fa-solid fa-wand-magic-sparkles",
    title: "Animation & 3D Motion",
    description: "Lightweight motion systems, interaction polish, and dimensional visual effects that support UX instead of slowing it down.",
    note: "Motion, particles, rhythm, and interaction depth.",
    skills: [
      { name: "Framer Motion", icon: "fa-solid fa-wave-square" },
      { name: "GSAP", icon: "fa-solid fa-arrows-spin" },
      { name: "Three.js", icon: "fa-solid fa-cube" }
    ]
  },
  {
    id: "tools",
    label: "Tools & SEO",
    icon: "fa-solid fa-screwdriver-wrench",
    title: "Tools & SEO",
    description: "Practical workflow tools and search-focused optimization habits that keep products maintainable, visible, and launch-ready.",
    note: "Versioning, optimization, and real-world production habits.",
    skills: [
      { name: "Git", icon: "fa-brands fa-git-alt" },
      { name: "GitHub", icon: "fa-brands fa-github" },
      { name: "SEO", icon: "fa-solid fa-magnifying-glass-chart" },
      { name: "Yoast SEO", icon: "fa-solid fa-ranking-star" },
      { name: "On-page SEO", icon: "fa-solid fa-chart-line" }
    ]
  }
];

export function SkillsSection(_: SkillsSectionProps) {
  const [activeId, setActiveId] = useState<CategoryId>("frontend");

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeId) ?? categories[0],
    [activeId]
  );

  return (
    <section id="skills" className={`snap-section ${styles.skillsSection}`}>
      <div className={styles.sectionGlowLeft} />
      <div className={styles.sectionGlowRight} />

      <motion.div
        className="section-shell relative z-[1] grid h-full content-start gap-5 md:content-center xl:grid-cols-[20rem_minmax(0,1fr)] xl:gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.copyColumn}>
          <span className={styles.eyebrow}>Skills</span>
          <h2 className="mt-4 font-fredoka text-[2.7rem] font-semibold leading-[0.92] text-white sm:text-[4rem] xl:text-[4.7rem]">
            My<span className={`inline-block ${styles.gradientText}`}>Skills</span>
          </h2>
          <div className={styles.titleBar} />
          <div className={styles.skillsCharacterWrap}>
            <div className={styles.skillsCharacterGlow} />
            {/* <div className={styles.skillsCharacterOrbit} /> */}
            <motion.div
              className={styles.skillsCharacter}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/char/skills.png"
                alt="Mahmoud Akram character portrait for the skills section"
                width={520}
                height={620}
                className={styles.skillsCharacterImage}
                priority={false}
              />
            </motion.div>
          </div>
        </div>

        <div className={styles.panelWrap}>
          <SkillTabs items={categories} activeId={activeId} onSelect={(id) => setActiveId(id as CategoryId)} />

          <div className={styles.panel} id={`skills-panel-${activeCategory.id}`} role="tabpanel" aria-labelledby={`skills-tab-${activeCategory.id}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32 }}
                className="grid h-full min-h-0 gap-4 xl:grid-cols-[minmax(0,0.56fr)_minmax(21rem,0.44fr)]"
              >
                <div className="flex min-h-0 flex-col">
                  <div className="pr-2">
                    <p className={styles.panelLabel}>{activeCategory.label}</p>
                    <h3 className="mt-2 font-fredoka text-[1.9rem] font-medium leading-tight text-white xl:text-[2.1rem]">
                      {activeCategory.title}
                    </h3>
                    <div className={styles.panelBar} />
                    <p className={styles.panelDescription}>{activeCategory.description}</p>
                    <p className={`${styles.panelNote} hidden sm:block`}>{activeCategory.note}</p>
                  </div>

                  <div className="mt-5 min-h-0 flex-1">
                    <SkillsGrid skills={activeCategory.skills} />
                  </div>
                </div>

                <div className={`${styles.visualColumn} hidden xl:block`}>
                  <SkillsBackgroundEffects category={activeCategory.id} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
