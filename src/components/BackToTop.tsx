"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => scrollToSection("home", 0)}
          className="fixed bottom-8 right-8 z-50 hidden h-12 w-12 items-center justify-center rounded-full border border-purple-500/40 bg-[#04010d]/80 text-white shadow-[0_0_24px_rgba(113,72,212,0.35)] backdrop-blur-xl hover:border-purple-400/60 hover:shadow-[0_0_32px_rgba(113,72,212,0.55)] md:inline-flex"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          exit={{    scale: 0.6, opacity: 0 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.28 }}
        >
          <Icon name="arrow-up" className="text-sm" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
