"use client";

import { FormEvent, useRef, useState } from "react";
import { sendContactMessage } from "@/services/contact.service";
import { Icon } from "@/components/Icon";
import { RevealSection } from "@/components/RevealSection";
import { socialLinks } from "@/components/SocialRail";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fading, setFading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    try {
      await sendContactMessage({
        name:    String(form.get("name")),
        email:   String(form.get("email")),
        phone:   String(form.get("phone")   || ""),
        subject: String(form.get("subject") || ""),
        message: String(form.get("message"))
      });
      setFading(true);
      setTimeout(() => {
        formEl.reset();
        setStatus("success");
        setFading(false);
      }, 400);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="snap-section section-shell pb-0 pt-0 !justify-between">
      <div className="flex flex-1 items-center lg:py-28">
      <div className="grid w-full gap-8 lg:grid-cols-[0.85fr_1.15fr]">

        <RevealSection variant="left">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">Let&apos;s build something fast, sharp, and memorable.</h2>
          <div className="mt-8 grid gap-3 text-white/72">
            {socialLinks
              .filter((item) => ["GitHub", "LinkedIn", "WhatsApp", "Email"].includes(item.label))
              .map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto") ? undefined : "noreferrer"}
                  className="flex items-center gap-3 transition hover:translate-x-1 hover:text-white"
                >
                  <span className="text-soft text-[1.1rem]">{item.svg}</span>
                  {item.label}
                </a>
              ))}
          </div>
        </RevealSection>

        <RevealSection variant="right" delay={1}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`glass-card grid gap-4 p-6 sm:grid-cols-2 transition-opacity duration-400 ${fading ? "opacity-0" : "opacity-100"}`}
        >
          <input name="name"    required minLength={2} placeholder="Name"    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-soft" />
          <input name="email"   required type="email"  placeholder="Email"   className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-soft" />
          <input name="phone"                          placeholder="Phone"   className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-soft" />
          <input name="subject"                        placeholder="Subject" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-soft" />
          <textarea
            name="message"
            required
            minLength={10}
            placeholder="Tell me about your project"
            rows={6}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-soft sm:col-span-2"
          />
          <button
            disabled={status === "loading"}
            type="submit"
            className="neon-button sm:col-span-2 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Icon name="send" />
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && <p className="text-sm text-green-300 sm:col-span-2">Message sent successfully!</p>}
          {status === "error"   && <p className="text-sm text-red-300   sm:col-span-2">{errorMsg || "Something went wrong. Please try again."}</p>}
        </form>
        </RevealSection>

      </div>
      </div>

      <footer className="border-t border-white/10 py-8">
        <div className="flex flex-col gap-3 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} Mahmoud Akram. All rights reserved.</p>
          <p className="font-fredoka text-white/70">Built for Speed. Designed to Impress.</p>
        </div>
      </footer>
    </section>
  );
}
