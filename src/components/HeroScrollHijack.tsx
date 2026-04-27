"use client";

import { useEffect, useRef } from "react";
import { scrollToSection } from "@/lib/scrollToSection";

export function HeroScrollHijack() {
  const cooldownRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    function isHeroVisible() {
      const container = document.querySelector<HTMLElement>(".scroll-container") ?? document.documentElement;
      return container.scrollTop < hero!.offsetHeight * 0.5;
    }

    function navigate() {
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      scrollToSection("about");
      setTimeout(() => { cooldownRef.current = false; }, 800);
    }

    function onWheel(e: WheelEvent) {
      if (!isHeroVisible()) return;
      if (e.deltaY > 0) {
        e.preventDefault();
        navigate();
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartYRef.current = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      if (!isHeroVisible() || touchStartYRef.current === null) return;
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      if (deltaY > 30) navigate();
      touchStartYRef.current = null;
    }

    hero.addEventListener("wheel", onWheel, { passive: false });
    hero.addEventListener("touchstart", onTouchStart, { passive: true });
    hero.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      hero.removeEventListener("wheel", onWheel);
      hero.removeEventListener("touchstart", onTouchStart);
      hero.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return null;
}
