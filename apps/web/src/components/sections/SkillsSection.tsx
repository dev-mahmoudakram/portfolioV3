"use client";

import type { Skill } from "@mahmoud-portfolio/types";
import { useEffect, useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { getSkills } from "@/services/skills.service";

interface SkillsSectionProps {
  initialSkills: Skill[];
}

const labels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools"
};

export function SkillsSection({ initialSkills }: SkillsSectionProps) {
  const [skills, setSkills] = useState(initialSkills);
  const groups = ["frontend", "backend", "tools"].map((category) => ({
    category,
    items: skills.filter((skill) => skill.category === category)
  }));

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch(() => setSkills(initialSkills));
  }, [initialSkills]);

  return (
    <SectionReveal>
      <section id="skills" className="section-shell py-24">
        <span className="eyebrow">Skills</span>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="section-title max-w-2xl">Sharp tools for modern product builds.</h2>
          <p className="max-w-md text-white/62">A practical stack for premium interfaces, reliable APIs, and launch-ready web platforms.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {groups.map((group) => (
            <article key={group.category} className="glass-card p-6">
              <h3 className="font-fredoka text-2xl text-white">{labels[group.category]}</h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.items.map((skill) => (
                  <span key={skill.id} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/78">
                    {skill.icon ? <i className={`${skill.icon} mr-2 text-soft`} /> : null}
                    {skill.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
