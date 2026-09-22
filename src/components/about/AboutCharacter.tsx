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
          src="/images/char/rails-about.png"
          alt="Abdelrahman Yasser character illustration"
          width={1280}
          height={1280}
          className={styles.characterImage}
        />
      </div>
    </div>
  );
}
