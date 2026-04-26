"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/scrollToSection";
import { Icon } from "@/components/Icon";

const links = [
  { label: "About", targetId: "about" },
  { label: "Skills", targetId: "skills" },
  { label: "Projects", targetId: "projects" },
  { label: "Services", targetId: "services" },
  { label: "Experience", targetId: "experience" },
  { label: "Contact", targetId: "contact" }
];

const sectionIds = links.map((item) => item.targetId);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(".scroll-container");
    const observerRoot = container ?? null;

    const setScrollbarWidth = () => {
      const scrollEl = document.querySelector<HTMLElement>(".scroll-container");
      const width = scrollEl ? scrollEl.offsetWidth - scrollEl.clientWidth : 0;
      document.documentElement.style.setProperty("--scrollbar-width", `${width}px`);
    };

    const readHeroVisibility = () => {
      const hero = document.getElementById("home");
      if (!hero) return;
      setHeroVisible(hero.getBoundingClientRect().bottom > window.innerHeight * 0.15);
    };

    setScrollbarWidth();
    readHeroVisibility();
    window.addEventListener("resize", setScrollbarWidth, { passive: true });

    const hero = document.getElementById("home");
    const heroObserver = hero
      ? new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
        root: observerRoot,
        threshold: 0.15
      })
      : null;
    heroObserver?.observe(hero as Element);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        readHeroVisibility();
        ticking = false;
      });
    };

    if (container) {
      container.addEventListener("scroll", onScroll, { passive: true });
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { root: observerRoot, rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("resize", setScrollbarWidth);
      if (container) {
        container.removeEventListener("scroll", onScroll);
      } else {
        window.removeEventListener("scroll", onScroll);
      }
      heroObserver?.disconnect();
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <header
      className={`fixed left-0 right-[var(--scrollbar-width,0px)] top-0 z-40 border-b border-white/[0.06] bg-[#04010d]/80 backdrop-blur-xl transition-all duration-500 ${
        heroVisible ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <nav className="section-shell flex items-center justify-between py-4" aria-label="Primary">
        <button
          type="button"
          onClick={() => scrollToSection("home", 0)}
          className="flex items-center transition hover:opacity-90"
          aria-label="Scroll to top"
        >
          <Image
            src="/images/akram%20logo/logo-11.png"
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
                {isActive ? (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 ring-1 ring-purple-500/30" />
                ) : null}
                <span className="relative">{link.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white backdrop-blur-xl transition-colors hover:border-white/20 lg:hidden"
        >
          <span className="inline-flex text-base">
            <Icon name={menuOpen ? "close" : "menu"} />
          </span>
        </button>
      </nav>

      {menuOpen ? (
        <div className="section-shell pb-3 lg:hidden">
          <div className="rounded-[24px] border border-white/10 bg-black/80 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="grid gap-2">
              {links.map((link) => {
                const isActive = activeId === link.targetId;
                return (
                  <button
                    key={link.targetId}
                    type="button"
                    onClick={() => {
                      scrollToSection(link.targetId);
                      setMenuOpen(false);
                    }}
                    className={`rounded-2xl px-4 py-3 text-left font-poppins text-sm font-medium transition-all ${
                      isActive
                        ? "bg-purple-600/20 text-white ring-1 ring-purple-500/30"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
