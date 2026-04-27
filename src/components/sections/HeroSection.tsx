"use client";

import Image from "next/image";
import styles from "@/components/HeroSection.module.scss";
import { ScrollDownButton } from "@/components/ScrollDownButton";
import { SocialRail, socialLinks } from "@/components/SocialRail";
import { HeroScrollHijack } from "@/components/HeroScrollHijack";
import { scrollToSection } from "@/lib/scrollToSection";
import { Icon } from "@/components/Icon";

export function HeroSection() {
  return (
    <section id="home" className={styles.hero}>
      <HeroScrollHijack />
      <div className={`${styles.waveLayer} ${styles.waveLayerAnimated}`} aria-hidden="true">
        <div className={styles.wavePattern} />
      </div>
      <div className={styles.waveLayerSecondary} />
      <div className={styles.waveGlow} />
      <SocialRail />

      <div className={`section-shell ${styles.content}`}>
        <div className="grid min-h-[100svh] items-center gap-6 pb-10 pt-6 sm:pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:pb-14 lg:pt-12 xl:pb-16 xl:pt-14">
          <div className="max-w-2xl">
            <p className={`font-poppins text-xl font-medium leading-tight text-white/86 md:text-[1.6rem] ${styles.heroGreeting}`}>
              Hi, I&apos;m <span className={styles.gradientName}>Mahmoud Akram</span>
            </p>

            <h1 className={`mt-3 font-fredoka text-[3.4rem] font-semibold leading-[0.88] text-white sm:text-[4.4rem] md:text-[5.2rem] lg:text-[5.6rem] xl:text-[6.2rem] ${styles.heroTitle}`}>
              <span className="block text-white">Web</span>
              <span className={`block ${styles.titleGradient}`}>Developer</span>
            </h1>

            <p className={`mt-3 font-fredoka text-xl font-medium leading-tight text-white md:text-[1.75rem] ${styles.heroTagline}`}>
              Built for Speed. <span className={styles.titleGradient}>Designed to Impress.</span>
            </p>

            <p className={`${styles.description} ${styles.heroDescription} mt-4 max-w-xl font-poppins text-base leading-7 text-white/64 md:text-lg`}>
              I build modern, high-performance web experiences using Next.js, NestJS, and clean scalable architecture.
            </p>

            <div className={`mt-7 hidden flex-wrap gap-4 sm:flex ${styles.heroCtas}`}>
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-fredoka text-lg font-medium text-white transition hover:-translate-y-0.5 ${styles.buttonPrimary}`}
              >
                View My Work
                <Icon name="arrow-right" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-fredoka text-lg font-medium text-white transition hover:-translate-y-0.5 ${styles.buttonSecondary}`}
              >
                <Icon name="envelope" />
                Contact Me
              </button>
            </div>
          </div>

          <div className={`${styles.visualWrap} ${styles.heroCharacterEntrance}`}>
            <div className="mb-5 flex items-center justify-center gap-3 lg:hidden">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={item.label}
                  className={styles.socialLink}
                >
                  <Icon name={item.icon} />
                </a>
              ))}
            </div>

            <div className={`${styles.characterShell} ${styles.floatY}`}>
              <div className={styles.characterGlow} />
              <Image
                src="/images/char/hi.png"
                alt="Mahmoud Akram waving character illustration"
                width={533}
                height={600}
                sizes="(max-width: 1023px) 60vw, 533px"
                priority
                fetchPriority="high"
                loading="eager"
                className={styles.character}
              />
            </div>
            <div className="mt-4 flex justify-center sm:hidden">
              <ScrollDownButton targetId="about" mobile />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.scrollDock} ${styles.heroScrollEntrance}`}>
        <ScrollDownButton targetId="about" />
      </div>
    </section>
  );
}
