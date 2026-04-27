"use client";

import styles from "@/components/HeroSection.module.scss";
import { scrollToSection } from "@/lib/scrollToSection";
import { Icon } from "@/components/Icon";

export function HeroCTAs() {
  return (
    <div className={`mt-7 hidden flex-wrap gap-4 sm:flex ${styles.heroCtas}`}>
      <button
        type="button"
        onClick={() => scrollToSection("projects")}
        className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-fredoka text-lg font-medium text-white transition hover:-translate-y-0.5 ${styles.buttonPrimary}`}
      >
        View My Work
        <Icon name="arrow-right" />
      </button>
      <button
        type="button"
        onClick={() => scrollToSection("contact")}
        className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-fredoka text-lg font-medium text-white transition hover:-translate-y-0.5 ${styles.buttonSecondary}`}
      >
        <Icon name="envelope" />
        Contact Me
      </button>
      <a
        href="/docs/Mahmoud_Akram_CV.pdf"
        download
        className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-fredoka text-lg font-medium text-white transition hover:-translate-y-0.5 ${styles.buttonSecondary}`}
      >
        <Icon name="download" />
        Resume
      </a>
    </div>
  );
}
