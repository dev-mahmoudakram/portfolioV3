"use client";

import { motion } from "framer-motion";
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
    <motion.div
      className={styles.skillsGrid}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } }
      }}
      initial="hidden"
      animate="show"
    >
      {skills.map((skill) => (
        <motion.div
          key={skill.name}
          variants={{
            hidden: { opacity: 0, y: 18, scale: 0.96 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32 } }
          }}
        >
          <SkillCard name={skill.name} icon={skill.icon} title={skill.title} />
        </motion.div>
      ))}
    </motion.div>
  );
}
