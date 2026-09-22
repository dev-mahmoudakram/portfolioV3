import { Icon } from "@/components/Icon";
import styles from "@/styles/about.module.scss";

export function AboutCharacter() {
  return (
    <div className={styles.characterWrap}>
      <div className={`${styles.characterFrame} ${styles.characterFloat}`}>
        <div className={styles.characterGlow} />
        <div className={styles.orbitRing} />
        <div className={styles.orbitDotPrimary} />
        <div className={styles.orbitDotSecondary} />
        <div className={styles.sparkOne} />
        <div className={styles.sparkTwo} />
        <div className={styles.orbGlyph} aria-hidden="true">
          <Icon name="server" />
        </div>
      </div>
    </div>
  );
}
