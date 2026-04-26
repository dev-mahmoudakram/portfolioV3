"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/scrollToSection";
import { Icon } from "@/components/Icon";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const container = document.querySelector(".scroll-container") ?? undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { root: container as Element, threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => scrollToSection("home", 0)}
      className={`fixed bottom-8 right-8 z-50 hidden h-12 w-12 items-center justify-center rounded-full border border-purple-500/40 bg-[#04010d]/80 text-white shadow-[0_0_24px_rgba(113,72,212,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:shadow-[0_0_32px_rgba(113,72,212,0.55)] md:inline-flex ${
        visible ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
      }`}
    >
      <Icon name="arrow-up" className="text-sm" />
    </button>
  );
}
