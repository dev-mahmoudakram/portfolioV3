"use client";

import { motion } from "framer-motion";
import styles from "@/styles/skills.module.scss";
import { Icon } from "@/components/Icon";

interface SkillCardProps {
  name: string;
  icon: string;
  title?: string;
}

export function SkillCard({ name, icon, title }: SkillCardProps) {
  return (
    <motion.article
      layout
      whileHover={{ scale: 1.05, y: -3 }}
      transition={{ duration: 0.22 }}
      className={styles.skillCard}
      title={title ?? name}
      aria-label={title ?? name}
    >
      <div className={styles.skillCardGlow} />
      <div className={styles.skillIcon}>
        <Icon name={icon} className={styles.skillIconGlyph} />
      </div>
      <h4 className={styles.skillName}>{name}</h4>
    </motion.article>
  );
}
