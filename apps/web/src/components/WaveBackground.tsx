"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./WaveBackground.module.scss";

export function WaveBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.to(".wave-streak", {
        xPercent: 12,
        yPercent: -8,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 1.2
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.waves} aria-hidden="true">
      <div className={styles.grid} />
      <div className={`${styles.streak} ${styles.streakOne} wave-streak`} />
      <div className={`${styles.streak} ${styles.streakTwo} wave-streak`} />
    </div>
  );
}
