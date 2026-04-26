import Image from "next/image";
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
        <Image
          src="/images/char/about.png"
          alt="Mahmoud Akram thinking character illustration"
          width={371}
          height={371}
          className={styles.characterImage}
          priority={false}
        />
      </div>
    </div>
  );
}
