import { AboutCards } from "@/components/about/AboutCards";
import { AboutCharacter } from "@/components/about/AboutCharacter";
import { AboutText } from "@/components/about/AboutText";
import styles from "@/styles/about.module.scss";

export function AboutSection() {
  return (
    <section id="about" className={`snap-section ${styles.aboutSection}`}>
      <div className={styles.sectionGlowTop} />
      <div className={styles.sectionGlowBottom} />

      <div className="section-shell">
        <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="order-1 relative z-[1] lg:order-1">
            <AboutText />
            <div className="lg:hidden">
              <AboutCharacter />
            </div>
            <AboutCards />
          </div>

          <div className="hidden lg:block lg:order-2">
            <AboutCharacter />
          </div>
        </div>
      </div>
    </section>
  );
}
