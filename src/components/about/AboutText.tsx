import styles from "@/styles/about.module.scss";

export function AboutText() {
  return (
    <div>
      <div>
        <span className={styles.eyebrow}>About Me</span>
      </div>

      <h2 className="mt-4 font-fredoka text-4xl font-semibold leading-[0.92] text-white sm:text-5xl lg:text-[4.5rem]">
        Who I <span className={styles.gradientText}>Am</span>
      </h2>

      <div className={styles.titleBar} />

      <div className="mt-6 space-y-4">
        <p className={styles.bodyText}>
          I&apos;m <span className={styles.highlight}>Mahmoud Akram</span>, a Full-Stack Developer building modern web apps with <span className={styles.highlight}>React</span>, <span className={styles.highlight}>Next.js</span>, and <span className={styles.highlight}>TypeScript</span> - focused on scalable, high-performance interfaces.
        </p>

        <p className={styles.bodyText}>
          On the back end I work with <span className={styles.highlight}>Laravel</span>, <span className={styles.highlight}>Prisma</span>, <span className={styles.highlight}>REST APIs</span>, and databases like <span className={styles.highlight}>MySQL</span> &amp; <span className={styles.highlight}>PostgreSQL</span>, delivering complete, SEO-ready systems with clean, maintainable code.
        </p>
      </div>
    </div>
  );
}
