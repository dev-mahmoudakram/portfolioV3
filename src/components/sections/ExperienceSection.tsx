import Image from "next/image";
import { RevealSection } from "@/components/RevealSection";
import styles from "@/styles/experience.module.scss";

const jobs = [
  {
    company: "Meem Digital Transformation",
    role: "Full-Stack Developer",
    period: "Jan 2024 – Present",
    bullets: [
      "Developed web interfaces using Laravel Blade templates for front-end rendering.",
      "Collaborated with back-end teams to integrate REST APIs and dynamic data.",
      "Focused on performance optimization and clean, maintainable code.",
      "Worked on real-world business systems with emphasis on user experience and scalability.",
    ],
  },
  {
    company: "North Studios",
    role: "Full-Stack & WordPress Developer",
    badge: "Part-time",
    period: "May 2024 – Aug 2025",
    bullets: [
      "Developed full-stack web solutions using PHP, Laravel-style MVC patterns, and MySQL.",
      "Built, customized, and maintained WordPress websites including custom themes and plugins.",
      "Implemented REST API integrations and dynamic features across front-end and back-end.",
      "Worked on both client-facing UIs and server-side logic, ensuring performance and security.",
      "Collaborated with designers and stakeholders to deliver scalable, SEO-friendly solutions.",
    ],
  },
  {
    company: "Tarek Nour Communications",
    role: "Web Developer Intern",
    period: "Sep 2023 – Nov 2023",
    bullets: [
      "Completed a 2-month training program focused on web development fundamentals.",
      "Assisted in building and updating web pages using HTML, CSS, and JavaScript.",
      "Gained hands-on experience working in a professional agency environment.",
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
                    {job.badge && <span className={styles.badge}>{job.badge}</span>}
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

        {/* Character — desktop only, vertically centered */}
        <RevealSection variant="right" className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <div className={styles.imageGlow} />
            <Image
              src="/images/char/exp.webp"
              alt="Mahmoud Akram experience illustration"
              width={280}
              height={380}
              sizes="280px"
              className={styles.image}
              style={{ width: "280px", height: "380px" }}
              priority={false}
            />
          </div>
        </RevealSection>

      </div>
    </section>
  );
}
