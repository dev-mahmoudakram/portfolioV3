"use client";

import { motion } from "framer-motion";
import styles from "@/styles/about.module.scss";

const textItem = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58 }
  }
};

export function AboutText() {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      <motion.div variants={textItem}>
        <span className={styles.eyebrow}>About Me</span>
      </motion.div>

      <motion.h2 variants={textItem} className="mt-4 font-fredoka text-4xl font-semibold leading-[0.92] text-white sm:text-5xl lg:text-[4.5rem]">
        Who I <span className={styles.gradientText}>Am</span>
      </motion.h2>

      <motion.div variants={textItem} className={styles.titleBar} />

      <div className="mt-6 space-y-4">
        <motion.p variants={textItem} className={styles.bodyText}>
          I&apos;m <span className={styles.highlight}>Mahmoud Akram</span>, a Full-Stack Developer building modern web apps with <span className={styles.highlight}>React</span>, <span className={styles.highlight}>Next.js</span>, and <span className={styles.highlight}>TypeScript</span> — focused on scalable, high-performance interfaces.
        </motion.p>

        <motion.p variants={textItem} className={styles.bodyText}>
          On the back end I work with <span className={styles.highlight}>Laravel</span>, <span className={styles.highlight}>Prisma</span>, <span className={styles.highlight}>REST APIs</span>, and databases like <span className={styles.highlight}>MySQL</span> &amp; <span className={styles.highlight}>PostgreSQL</span>, delivering complete, SEO-ready systems with clean, maintainable code.
        </motion.p>
      </div>
    </motion.div>
  );
}
