"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/styles/about.module.scss";

export function AboutCharacter() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className={styles.characterWrap}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className={styles.characterFrame}
      >
        <div className={styles.characterGlow} />
        <div className={styles.orbitRing} />
        <div className={styles.orbitDotPrimary} />
        <div className={styles.orbitDotSecondary} />
        <div className={styles.sparkOne} />
        <div className={styles.sparkTwo} />
        <Image
          src="/images/char/about.png"
          alt="Mahmoud Akram thinking character illustration"
          width={586}
          height={760}
          className={styles.characterImage}
          priority={false}
        />
      </motion.div>
    </motion.div>
  );
}
