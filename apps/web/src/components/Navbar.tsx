"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/scrollToSection";

const links = [
  { label: "About",      targetId: "about" },
  { label: "Skills",     targetId: "skills" },
  { label: "Projects",   targetId: "projects" },
  { label: "Services",   targetId: "services" },
  { label: "Experience", targetId: "experience" },
  { label: "Contact",    targetId: "contact" }
];

const sectionIds = links.map((l) => l.targetId);

export function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeId, setActiveId]   = useState<string>("");
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const container = document.querySelector(".scroll-container") ?? undefined;

    const setScrollbarWidth = () => {
      const scrollEl = document.querySelector<HTMLElement>(".scroll-container");
      const width = scrollEl ? scrollEl.offsetWidth - scrollEl.clientWidth : 0;
      document.documentElement.style.setProperty("--scrollbar-width", `${width}px`);
    };
    setScrollbarWidth();
    window.addEventListener("resize", setScrollbarWidth);

    const hero = document.getElementById("home");
    if (hero) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => setHeroVisible(entry.isIntersecting),
        { root: container as Element, threshold: 0.1 }
      );
      heroObserver.observe(hero);
    }

    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { root: container as Element, rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => {
      window.removeEventListener("resize", setScrollbarWidth);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <motion.header
      className="navbar-hidden fixed left-0 right-[var(--scrollbar-width,0px)] top-0 z-40 border-b border-white/[0.06] bg-[#04010d]/80 backdrop-blur-xl"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: heroVisible ? -80 : 0, opacity: heroVisible ? 0 : 1 }}
      transition={{ duration: 0.45 }}
    >
      <nav className="section-shell flex items-center justify-between py-4" aria-label="Primary">
        <button
          type="button"
          onClick={() => scrollToSection("home", 0)}
          className="flex items-center transition hover:opacity-90"
          aria-label="Scroll to top"
        >
          <Image
            src="/images/akram%20logo/logo-08.png"
            alt="Mahmoud Akram logo"
            width={291}
            height={93}
            priority
            className="h-auto w-[170px] object-contain sm:w-[210px]"
          />
        </button>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl lg:flex">
          {links.map((link) => {
            const isActive = activeId === link.targetId;
            return (
              <button
                key={link.targetId}
                type="button"
                onClick={() => scrollToSection(link.targetId)}
                className={`relative rounded-full px-4 py-1.5 font-poppins text-[0.96rem] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 text-white shadow-[0_0_12px_rgba(113,72,212,0.35)]"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 ring-1 ring-purple-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={String(menuOpen) as "true" | "false"}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white backdrop-blur-xl lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.i
              key={menuOpen ? "close" : "open"}
              className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-base`}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{    rotate:  90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="section-shell pb-3 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{    opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            style={{ overflow: "hidden" }}
          >
            <div className="rounded-[24px] border border-white/10 bg-black/80 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <div className="grid gap-2">
                {links.map((link, i) => {
                  const isActive = activeId === link.targetId;
                  return (
                    <motion.button
                      key={link.targetId}
                      type="button"
                      onClick={() => { scrollToSection(link.targetId); setMenuOpen(false); }}
                      className={`rounded-2xl px-4 py-3 text-left font-poppins text-sm font-medium transition-all ${
                        isActive
                          ? "bg-purple-600/20 text-white ring-1 ring-purple-500/30"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, delay: i * 0.05 }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
