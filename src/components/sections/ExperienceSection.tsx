import { RevealSection } from "@/components/RevealSection";
import Image from "next/image";
import styles from "@/styles/experience.module.scss";

const jobs = [
  {
    company: "NHC Innovation",
    role: "Software Engineer (Ruby on Rails)",
    period: "Oct 2025 – Present",
    bullets: [
      "Contributing to the Ejar app project for the Real Estate General Authority in KSA.",
      "Enhancing application performance and resolving critical bugs.",
      "Optimizing APIs and providing support to ensure a smooth user experience.",
      "Deepening expertise in Ruby on Rails, AWS, and modular software solutions.",
    ],
  },
  {
    company: "Damlag S.A.E",
    role: "Software Engineer (Ruby on Rails)",
    period: "Oct 2023 – Oct 2025",
    bullets: [
      "Developed and maintained elcinema.com, working with large-scale databases including an online booking system.",
      "Contributed to an internal cinematic booking system, ensuring accurate and efficient handling of financial transactions.",
      "Conducted hotfixes in production, especially during peak seasons for ticketing.",
      "Participated in code review processes to maintain high code quality and promote best practices among team members.",
    ],
  },
  {
    company: "Meem Digital Transformation",
    role: "Front-end Developer",
    period: "Mar 2023 – Jan 2024",
    bullets: [
      "Worked closely with UX/UI designers and back-end developers to ensure cohesive integration of front-end elements with server-side logic and APIs.",
      "Developed mobile-first designs that adapt seamlessly across various devices and screen sizes.",
      "Implemented interactive features using JavaScript to improve user engagement, including form validation and dynamic content updates.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="snap-section section-shell pb-24 pt-28">
      <RevealSection variant="up-sm">
        <span className="eyebrow">Experience</span>
        <h2 className="section-title max-w-2xl">Built in real environments, shipped to real users.</h2>
      </RevealSection>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto]">

        {/* Job cards */}
        <div className="space-y-5">
          {jobs.map((job, i) => (
            <RevealSection key={job.company} as="article" variant="left" delay={i + 1} className={styles.jobCard}>
              {/* Header */}
              <div className="flex items-start gap-3">
                <span className={styles.index}>{i + 1}</span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-fredoka text-[1.15rem] font-semibold leading-tight text-white">
                      {job.company}
                    </h3>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-3">
                    <span className={styles.role}>{job.role}</span>
                    <span className={styles.period}>{job.period}</span>
                  </div>
                </div>
              </div>

              <div className={styles.divider} />

              {/* Bullets */}
              <ul className="space-y-2.5">
                {job.bullets.map((b) => (
                  <li key={b} className={styles.bullet}>
                    <span className={styles.bulletDot} />
                    {b}
                  </li>
                ))}
              </ul>
            </RevealSection>
          ))}
        </div>

        {/* Decorative glow — desktop only, vertically centered */}
        <RevealSection variant="right" className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <div className={styles.imageGlow} />
            <Image
              src="/images/char/rails-exp.png"
              alt="Abdelrahman Yasser working at a laptop"
              width={1280}
              height={1280}
              className={styles.characterImage}
            />
          </div>
        </RevealSection>

      </div>
    </section>
  );
}
