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
          I&apos;m <span className={styles.highlight}>Abdelrahman Yasser</span>, a Software Engineer building reliable web applications and backend systems with <span className={styles.highlight}>Ruby on Rails</span> - focused on clean, scalable, and maintainable solutions.
        </p>

        <p className={styles.bodyText}>
          I work with <span className={styles.highlight}>REST APIs</span>, <span className={styles.highlight}>Sidekiq</span> &amp; <span className={styles.highlight}>ActiveJob</span> background processing, and databases like <span className={styles.highlight}>PostgreSQL</span> &amp; <span className={styles.highlight}>MySQL</span> via ActiveRecord, and pair them with <span className={styles.highlight}>React</span> and <span className={styles.highlight}>Next.js</span> on the front end to deliver complete, production-ready systems.
        </p>
      </div>
    </div>
  );
}
