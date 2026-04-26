"use client";

import { motion } from "framer-motion";
import styles from "@/styles/skills.module.scss";
import { Icon } from "@/components/Icon";

interface TabItem {
  id: string;
  label: string;
  icon: string;
}

interface SkillTabsProps {
  items: TabItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function SkillTabs({ items, activeId, onSelect }: SkillTabsProps) {
  return (
    <div className={styles.tabsWrap} role="tablist" aria-label="Skill categories">
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`skills-panel-${item.id}`}
            id={`skills-tab-${item.id}`}
            onClick={() => onSelect(item.id)}
            className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`}
          >
            {isActive ? (
              <motion.span
                layoutId="skills-active-tab"
                className={styles.tabActiveBackground}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            ) : null}

            <span className="relative z-[1] inline-flex items-center gap-2">
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
