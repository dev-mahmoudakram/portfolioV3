"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import styles from "@/components/HeroSection.module.scss";
import { ScrollDownButton } from "@/components/ScrollDownButton";
import { SocialRail } from "@/components/SocialRail";
import { scrollToSection } from "@/lib/scrollToSection";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay }
});

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  return (
    <section id="home" ref={rootRef} className={styles.hero}>
      <motion.div
        className={`${styles.waveLayer}`}
        animate={{ scale: 1.05, x: "1.4%" }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          src="/images/akram%20logo/animated-wave.gif"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className={styles.waveImage}
        />
      </motion.div>
      <div className={styles.waveLayerSecondary} />
      <div className={styles.waveGlow} />
      <SocialRail />

      <div className={`section-shell ${styles.content}`}>
        <div className="grid min-h-[100svh] items-center gap-10 pb-12 pt-8 sm:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:pb-24 lg:pt-32">
          <div className="max-w-2xl">
            <motion.p
              className="font-poppins text-2xl font-medium leading-tight text-white/86 md:text-[2rem]"
              {...fadeUp(0.1)}
            >
              Hi, I&apos;m <span className={styles.gradientName}>Mahmoud Akram</span>
            </motion.p>

            <h1 className="mt-5 font-fredoka text-[4.25rem] font-semibold leading-[0.88] text-white sm:text-[5.7rem] md:text-[7rem] lg:text-[7.7rem] xl:text-[8.5rem]">
              <motion.span className="block text-white" {...fadeUp(0.2)}>Web</motion.span>
              <motion.span className={`block ${styles.titleGradient}`} {...fadeUp(0.32)}>Developer</motion.span>
            </h1>

            <motion.p
              className="mt-5 font-fredoka text-2xl font-medium leading-tight text-white md:text-[2.2rem]"
              {...fadeUp(0.44)}
            >
              Built for Speed. <span className={styles.titleGradient}>Designed to Impress.</span>
            </motion.p>

            <motion.p
              className={`${styles.description} mt-6 max-w-xl font-poppins text-lg leading-8 text-white/64 md:text-xl`}
              {...fadeUp(0.54)}
            >
              I build modern, high-performance web experiences using Next.js, NestJS, and clean scalable architecture.
            </motion.p>

            <motion.div className="mt-10 hidden flex-wrap gap-4 sm:flex" {...fadeUp(0.64)}>
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-fredoka text-lg font-medium text-white transition hover:-translate-y-0.5 ${styles.buttonPrimary}`}
              >
                View My Work
                <i className="fa-solid fa-arrow-right" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-fredoka text-lg font-medium text-white transition hover:-translate-y-0.5 ${styles.buttonSecondary}`}
              >
                <i className="fa-regular fa-envelope" />
                Contact Me
              </button>
            </motion.div>
          </div>

          <motion.div
            className={styles.visualWrap}
            initial={{ opacity: 0, x: 56 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <motion.div
              className={styles.characterShell}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.4, ease: "easeInOut", repeat: Infinity }}
            >
              <div className={styles.characterGlow} />
              <Image
                src="/images/char/hi.png"
                alt="Mahmoud Akram waving character illustration"
                width={910}
                height={1213}
                priority
                className={styles.character}
              />
            </motion.div>
            <div className="mt-4 flex justify-center sm:hidden">
              <ScrollDownButton targetId="about" mobile />
            </div>
          </motion.div>
        </div>
      </div>

      <div className={styles.scrollDock}>
        <ScrollDownButton targetId="about" />
      </div>
    </section>
  );
}
