"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12
      });
      gsap.to(".character-float", {
        y: -18,
        rotate: 1.5,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={rootRef} className="section-shell flex min-h-[92vh] items-center pb-20 pt-28">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <span className="eyebrow hero-reveal">
            <i className="fa-solid fa-code" />
            Premium developer portfolio
          </span>
          <h1 className="hero-reveal font-fredoka text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="text-gradient">Mahmoud Akram</span>
          </h1>
          <p className="hero-reveal mt-5 font-fredoka text-3xl font-medium text-purple-100 sm:text-4xl">
            Web Developer
          </p>
          <p className="hero-reveal mt-6 max-w-2xl text-lg leading-8 text-white/72">
            Built for Speed. Designed to Impress.
          </p>
          <div className="hero-reveal mt-9 flex flex-wrap gap-4">
            <a className="neon-button" href="#projects">
              <i className="fa-solid fa-layer-group" />
              View Projects
            </a>
            <a className="ghost-button" href="#contact">
              <i className="fa-solid fa-paper-plane" />
              Contact Me
            </a>
          </div>
        </div>

        <div className="character-float relative mx-auto aspect-[0.82] w-full max-w-[440px]">
          <div className="absolute inset-4 rounded-[36px] bg-primary/30 blur-3xl" />
          <div className="glass-card relative flex h-full items-center justify-center overflow-hidden p-8">
            <div className="absolute inset-x-8 top-8 h-28 rounded-full bg-soft/30 blur-2xl" />
            <Image
              src="/images/character-placeholder.svg"
              alt="Mahmoud Akram character placeholder"
              width={420}
              height={520}
              priority
              className="relative h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
