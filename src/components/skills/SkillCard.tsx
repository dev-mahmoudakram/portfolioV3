"use client";

import styles from "@/styles/skills.module.scss";
import { Icon } from "@/components/Icon";
import { SkillBrandIcon, type SkillBrand } from "@/components/skills/SkillBrandIcon";

interface SkillCardProps {
  name: string;
  icon: string;
  title?: string;
}

export function SkillCard({ name, icon, title }: SkillCardProps) {
  const isBrandIcon = icon.startsWith("brand:");
  const brand = isBrandIcon ? (icon.slice(6) as SkillBrand) : null;

  return (
    <article
      className={styles.skillCard}
      title={title ?? name}
      aria-label={title ?? name}
    >
      <div className={styles.skillCardGlow} />
      <div className={styles.skillIcon}>
        {isBrandIcon && brand ? (
          <SkillBrandIcon brand={brand} />
        ) : (
          <Icon name={icon} className={styles.skillIconGlyph} />
        )}
      </div>
      <h4 className={styles.skillName}>{name}</h4>
    </article>
  );
}
