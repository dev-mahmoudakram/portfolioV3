"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  ["2026", "Full-Stack Portfolio System", "Next.js, NestJS, Prisma, and MySQL architecture for a scalable personal brand platform."],
  ["2025", "Premium Web Interfaces", "Landing pages, company websites, dashboards, and SEO-focused frontend builds."],
  ["2024", "Developer Foundation", "Focused on clean code, reusable UI systems, responsive layouts, and backend fundamentals."]
];

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".timeline-item", {
        opacity: 0,
        x: -28,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%"
        }
      });
    }, ref);

    return () => context.revert();
  }, []);

  return (
    <section id="experience" ref={ref} className="section-shell py-24">
      <span className="eyebrow">Experience</span>
      <h2 className="section-title max-w-2xl">A timeline shaped by speed, taste, and system thinking.</h2>
      <div className="mt-12 space-y-5 border-l border-white/12 pl-6">
        {experience.map(([year, title, text]) => (
          <article key={title} className="timeline-item glass-card relative p-6">
            <span className="absolute -left-[35px] top-7 h-4 w-4 rounded-full bg-soft shadow-neon" />
            <p className="font-fredoka text-sm text-soft">{year}</p>
            <h3 className="mt-2 font-fredoka text-2xl text-white">{title}</h3>
            <p className="mt-3 text-white/65">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
