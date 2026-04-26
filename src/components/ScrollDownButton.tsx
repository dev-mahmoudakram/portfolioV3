"use client";

import styles from "./HeroSection.module.scss";
import { scrollToSection } from "@/lib/scrollToSection";
import { Icon } from "@/components/Icon";

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
        <Icon name="arrow-down" className="text-xs" />
        Scroll Down
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => scrollToSection(targetId)}
      aria-label="Scroll to next section"
      className={`${styles.scrollButton} ${styles.scrollButtonFloat}`}
    >
      <span className={styles.scrollCircle}>
        <Icon name="arrow-down" className="text-xl" />
      </span>
      <span className={styles.scrollLabel}>Scroll Down</span>
    </button>
  );
}
