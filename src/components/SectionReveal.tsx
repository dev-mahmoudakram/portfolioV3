"use client";

import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
