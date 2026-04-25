"use client";

import { motion } from "framer-motion";
import styles from "./HeroSection.module.scss";
import { scrollToSection } from "@/lib/scrollToSection";

interface ScrollDownButtonProps {
  targetId: string;
  mobile?: boolean;
}

export function ScrollDownButton({ targetId, mobile = false }: ScrollDownButtonProps) {
  if (mobile) {
    return (
      <button
        type="button"
        onClick={() => scrollToSection(targetId)}
        aria-label="Scroll to next section"
        className={`inline-flex items-center gap-2.5 rounded-full border border-purple-500/40 bg-white/5 px-6 py-3 font-poppins text-sm font-medium text-white/80 backdrop-blur-sm transition hover:border-purple-400/60 hover:text-white ${styles.buttonSecondary}`}
      >
        <i className="fa-solid fa-arrow-down text-xs" />
        Scroll Down
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => scrollToSection(targetId)}
      aria-label="Scroll to next section"
      className={styles.scrollButton}
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
    >
      <span className={styles.scrollCircle}>
        <i className="fa-solid fa-arrow-down text-xl" />
      </span>
      <span className={styles.scrollLabel}>Scroll Down</span>
    </motion.button>
  );
}
