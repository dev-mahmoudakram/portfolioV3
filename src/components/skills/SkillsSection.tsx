"use client";

import Image from "next/image";
import type { Skill } from "@/types";
import { useMemo, useRef, useState } from "react";
import { SkillTabs } from "@/components/skills/SkillTabs";
import { SkillsBackgroundEffects } from "@/components/skills/SkillsBackgroundEffects";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import { RevealSection } from "@/components/RevealSection";
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

const categories: CategoryConfig[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "desktop",
    title: "Frontend Development",
    description: "Responsive, interactive interfaces built with modern component systems, state management, and performance-aware rendering.",
    note: "UI effects, reusable patterns, and production-grade interface thinking.",
    skills: [
      { name: "HTML", icon: "brand:html5" },
      { name: "CSS", icon: "brand:css" },
      { name: "SCSS", icon: "brand:sass" },
      { name: "Tailwind CSS", icon: "brand:tailwindcss" },
      { name: "Bootstrap", icon: "brand:bootstrap" },
      { name: "JS", title: "JavaScript", icon: "brand:javascript" },
      { name: "TS", title: "TypeScript", icon: "brand:typescript" },
      { name: "React", icon: "brand:react" },
      { name: "Next.js", icon: "brand:nextdotjs" },
      { name: "Redux Toolkit", icon: "brand:redux" },
      { name: "React Query", icon: "brand:reactquery" },
      { name: "Blazor Server", icon: "brand:blazor" }
    ]
  },
  {
    id: "backend",
    label: "Backend",
    icon: "branch",
    title: "Backend & APIs",
    description: "Structured server-side work with MVC thinking, REST APIs, secure auth flows, and clean integration boundaries.",
    note: "Application flow, access control, and connected system design.",
    skills: [
      { name: "PHP", icon: "brand:php" },
      { name: "Laravel", icon: "brand:laravel" },
      { name: "Livewire", icon: "brand:livewire" },
      { name: "MVC", title: "MVC Architecture", icon: "sitemap" },
      { name: "Node.js", title: "Node.js (Basics)", icon: "brand:nodedotjs" },
      { name: "REST APIs", icon: "plug" },
      { name: "Auth & Access", title: "Authentication & Authorization", icon: "shield" }
    ]
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    title: "Databases & ORM",
    description: "Reliable schema design, relational data modeling, and migration workflows built for maintainable systems.",
    note: "Storage strategy, structure, and data-layer clarity.",
    skills: [
      { name: "MySQL", icon: "brand:mysql" },
      { name: "PostgreSQL", icon: "brand:postgresql" },
      { name: "SQL Server", icon: "table" },
      { name: "Prisma ORM", icon: "brand:prisma" },
    ]
  },
  {
    id: "cms",
    label: "CMS",
    icon: "grid",
    title: "CMS & Platforms",
    description: "Flexible content-driven builds and storefront-ready implementations with practical customization and publishing workflows.",
    note: "Content blocks, commerce surfaces, and adaptable delivery.",
    skills: [
      { name: "WordPress", icon: "brand:wordpress" },
      { name: "Shopify", icon: "brand:shopify" }
    ]
  },
  {
    id: "animation",
    label: "Animation & 3D",
    icon: "wand",
    title: "Animation & 3D Motion",
    description: "Lightweight motion systems, interaction polish, and dimensional visual effects that support UX instead of slowing it down.",
    note: "Motion, particles, rhythm, and interaction depth.",
    skills: [
      { name: "Framer Motion", icon: "brand:framer" },
      { name: "GSAP", icon: "brand:gsap" },
      { name: "Three.js", icon: "brand:threedotjs" }
    ]
  },
  {
    id: "tools",
    label: "Tools & SEO",
    icon: "wrench",
    title: "Tools & SEO",
    description: "Practical workflow tools and search-focused optimization habits that keep products maintainable, visible, and launch-ready.",
    note: "Versioning, optimization, and real-world production habits.",
    skills: [
      { name: "Git", icon: "brand:git" },
      { name: "GitHub", icon: "brand:github" },
      { name: "SEO", icon: "search" },
      { name: "Yoast SEO", icon: "brand:yoast" },
      { name: "On-page SEO", icon: "chart" }
    ]
  }
];

export function SkillsSection(_: SkillsSectionProps) {
  const [activeId, setActiveId] = useState<CategoryId>("frontend");
  const panelRef = useRef<HTMLDivElement>(null);

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeId) ?? categories[0],
    [activeId]
  );

  function handleTabSelect(id: string) {
    setActiveId(id as CategoryId);
    if (window.matchMedia("(max-width: 1279px)").matches) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const panel = panelRef.current;
          if (!panel) return;
          const container = document.querySelector<HTMLElement>(".scroll-container") ?? document.documentElement;
          // Snap-stop any in-progress scroll so scrollTop is settled before we measure
          container.scrollTo({ top: container.scrollTop, behavior: "instant" as ScrollBehavior });
          const navbar = document.querySelector<HTMLElement>("header");
          const navbarVisible = navbar ? getComputedStyle(navbar).opacity !== "0" : false;
          const navbarH = navbarVisible ? (navbar?.offsetHeight ?? 0) : 0;
          const containerRect = container.getBoundingClientRect();
          const panelRect = panel.getBoundingClientRect();
          const target = container.scrollTop + (panelRect.top - containerRect.top) - navbarH - 180;
          container.scrollTo({ top: target, behavior: "smooth" });
        });
      });
    }
  }

  return (
    <section id="skills" className={`snap-section ${styles.skillsSection}`}>
      <div className={styles.sectionGlowLeft} />
      <div className={styles.sectionGlowRight} />

      <div className="section-shell relative z-[1] grid h-full content-start gap-5 md:content-center xl:grid-cols-[20rem_minmax(0,1fr)] xl:gap-8">
        <RevealSection variant="left" className={styles.copyColumn}>
          <span className={styles.eyebrow}>Skills</span>
          <h2 className="mt-4 font-fredoka text-[2.7rem] font-semibold leading-[0.92] text-white sm:text-[4rem] xl:text-[4.7rem]">
            My<span className={`inline-block ${styles.gradientText}`}>Skills</span>
          </h2>
          <div className={styles.titleBar} />
          <div className={`${styles.skillsCharacterWrap} hidden xl:block`}>
            <div className={styles.skillsCharacterGlow} />
            <div className={`${styles.skillsCharacter} ${styles.floatPrimary}`}>
              <Image
                src="/images/char/skills.png"
                alt="Mahmoud Akram character portrait for the skills section"
                width={370}
                height={370}
                sizes="370px"
                className={styles.skillsCharacterImage}
                priority={false}
              />
            </div>
          </div>
        </RevealSection>

        <RevealSection variant="right" delay={1} className={styles.panelWrap}>
          <SkillTabs items={categories} activeId={activeId} onSelect={handleTabSelect} />

          <div className={`${styles.skillsCharacterWrap} xl:hidden`}>
            <div className={styles.skillsCharacterGlow} />
            <div className={`${styles.skillsCharacter} ${styles.floatPrimary}`}>
              <Image
                src="/images/char/skills.png"
                alt="Mahmoud Akram character portrait for the skills section"
                width={370}
                height={370}
                sizes="(max-width: 639px) 240px, 370px"
                className={styles.skillsCharacterImage}
                priority={false}
              />
            </div>
          </div>

          <div ref={panelRef} className={styles.panel} id={`skills-panel-${activeCategory.id}`} role="tabpanel" aria-labelledby={`skills-tab-${activeCategory.id}`}>
            <div key={activeCategory.id} className={`grid h-full min-h-0 gap-4 xl:grid-cols-[minmax(0,0.56fr)_minmax(21rem,0.44fr)] ${styles.panelAnimate}`}>
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
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
