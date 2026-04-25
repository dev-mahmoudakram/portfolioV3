"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/styles/skills.module.scss";

interface SkillCardProps {
  name: string;
  icon: string;
  title?: string;
}

export function SkillCard({ name, icon, title }: SkillCardProps) {
  const isRemoteIcon = icon.startsWith("http");

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
        {isRemoteIcon ? (
          <Image
            src={icon}
            alt=""
            width={22}
            height={22}
            unoptimized
            className={styles.skillIconImg}
          />
        ) : (
          <i className={`${icon} ${styles.skillIconGlyph}`} aria-hidden="true" />
        )}
      </div>
      <h4 className={styles.skillName}>{name}</h4>
    </motion.article>
  );
}
