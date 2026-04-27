"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  variant?: "up" | "up-sm" | "fade" | "left" | "right";
  threshold?: number;
  rootMargin?: string;
}

export function RevealSection({
  children,
  className,
  as: Tag = "div",
  delay,
  variant = "up",
  threshold = 0.1,
  rootMargin = "0px 0px -56px 0px",
}: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = "true";
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={variant}
      {...(delay != null ? { "data-reveal-delay": String(delay) } : {})}
    >
      {children}
    </Tag>
  );
}
