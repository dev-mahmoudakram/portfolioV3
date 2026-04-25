"use client";

import { motion } from "framer-motion";
import { AboutCard } from "@/components/about/AboutCard";

const cards = [
  {
    title: "Frontend Development",
    description: "React, Next.js, TypeScript",
    icon: "fa-solid fa-code"
  },
  {
    title: "Backend Development",
    description: "Laravel, Prisma, REST APIs",
    icon: "fa-solid fa-server"
  },
  {
    title: "Databases",
    description: "MySQL, PostgreSQL",
    icon: "fa-solid fa-database"
  },
  {
    title: "Performance & SEO",
    description: "Optimized and scalable apps",
    icon: "fa-solid fa-gauge-high"
  }
];

export function AboutCards() {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.22
          }
        }
      }}
      className="mt-6 grid gap-3 sm:grid-cols-2"
    >
      {cards.map((card) => (
        <AboutCard key={card.title} {...card} />
      ))}
    </motion.div>
  );
}
