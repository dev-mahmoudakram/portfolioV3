"use client";

import { motion } from "framer-motion";
import styles from "@/styles/about.module.scss";
import { Icon } from "@/components/Icon";

interface AboutCardProps {
  title: string;
  description: string;
  icon: string;
}

export function AboutCard({ title, description, icon }: AboutCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55 }
        }
      }}
      whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
      className={styles.featureCard}
    >
      <div className={styles.cardGlow} />
      <div className={styles.iconBadge}>
        <Icon name={icon} />
      </div>
      <h3 className="mt-5 font-fredoka text-[1.45rem] font-medium leading-tight text-white">{title}</h3>
      <p className="mt-3 font-poppins text-base leading-7 text-white/70">{description}</p>
    </motion.article>
  );
}
