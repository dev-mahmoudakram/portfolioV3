"use client";

import { SkillCard } from "@/components/skills/SkillCard";
import styles from "@/styles/skills.module.scss";

interface SkillItem {
  name: string;
  icon: string;
  title?: string;
}

interface SkillsGridProps {
  skills: SkillItem[];
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <div className={styles.skillsGrid}>
      {skills.map((skill) => (
        <div key={skill.name}>
          <SkillCard name={skill.name} icon={skill.icon} title={skill.title} />
        </div>
      ))}
    </div>
  );
}
