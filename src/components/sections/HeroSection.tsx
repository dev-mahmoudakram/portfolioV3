"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "@/components/HeroSection.module.scss";
import { ScrollDownButton } from "@/components/ScrollDownButton";
import { SocialRail, socialLinks } from "@/components/SocialRail";
import { scrollToSection } from "@/lib/scrollToSection";
import { Icon } from "@/components/Icon";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay }
});

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let touchStartY = 0;
    let locked = false;

    const goToNext = () => {
      if (locked) return;
      locked = true;
      scrollToSection("about");
      setTimeout(() => { locked = false; }, 1000);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) goToNext();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY - e.changedTouches[0].clientY > 40) goToNext();
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section id="home" ref={rootRef} className={styles.hero}>
      <motion.div
        className={`${styles.waveLayer}`}
        animate={{ scale: 1.05, x: "1.4%" }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.waveVideo}
        >
          <source src="/images/akram logo/animated-wave.webm" type="video/webm" />
        </video>
      </motion.div>
      <div className={styles.waveLayerSecondary} />
      <div className={styles.waveGlow} />
      <SocialRail />

      <div className={`section-shell ${styles.content}`}>
        <div className="grid min-h-[100svh] items-center gap-6 pb-10 pt-6 sm:pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:pb-14 lg:pt-12 xl:pb-16 xl:pt-14">
          <div className="max-w-2xl">
            <motion.p
              className="font-poppins text-xl font-medium leading-tight text-white/86 md:text-[1.6rem]"
              {...fadeUp(0.1)}
            >
              Hi, I&apos;m <span className={styles.gradientName}>Mahmoud Akram</span>
            </motion.p>

            <h1 className="mt-3 font-fredoka text-[3.4rem] font-semibold leading-[0.88] text-white sm:text-[4.4rem] md:text-[5.2rem] lg:text-[5.6rem] xl:text-[6.2rem]">
              <motion.span className="block text-white" {...fadeUp(0.2)}>Web</motion.span>
              <motion.span className={`block ${styles.titleGradient}`} {...fadeUp(0.32)}>Developer</motion.span>
            </h1>

            <motion.p
              className="mt-3 font-fredoka text-xl font-medium leading-tight text-white md:text-[1.75rem]"
              {...fadeUp(0.44)}
            >
              Built for Speed. <span className={styles.titleGradient}>Designed to Impress.</span>
            </motion.p>

            <motion.p
              className={`${styles.description} mt-4 max-w-xl font-poppins text-base leading-7 text-white/64 md:text-lg`}
              {...fadeUp(0.54)}
            >
              I build modern, high-performance web experiences using Next.js, NestJS, and clean scalable architecture.
            </motion.p>

            <motion.div className="mt-7 hidden flex-wrap gap-4 sm:flex" {...fadeUp(0.64)}>
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
            </motion.div>
          </div>

          <motion.div
            className={styles.visualWrap}
            initial={{ opacity: 0, x: 56 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
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

            <motion.div
              className={styles.characterShell}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.4, ease: "easeInOut", repeat: Infinity }}
            >
              <div className={styles.characterGlow} />
              <Image
                src="/images/char/hi.png"
                alt="Mahmoud Akram waving character illustration"
                width={533}
                height={600}
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
