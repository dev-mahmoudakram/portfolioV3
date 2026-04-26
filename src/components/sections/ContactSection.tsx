"use client";

import { FormEvent, useState } from "react";
import { sendContactMessage } from "@/services/contact.service";
import { Icon } from "@/components/Icon";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    try {
      await sendContactMessage({
        name:    String(form.get("name")),
        email:   String(form.get("email")),
        phone:   String(form.get("phone")   || ""),
        subject: String(form.get("subject") || ""),
        message: String(form.get("message"))
      });
      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="snap-section section-shell pb-0 pt-0 !justify-between">
      <div className="flex flex-1 items-center lg:py-28">
      <div className="grid w-full gap-8 lg:grid-cols-[0.85fr_1.15fr]">

        <div>
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">Let&apos;s build something fast, sharp, and memorable.</h2>
          <div className="mt-8 grid gap-3 text-white/72">
            {[
              ["github",   "GitHub",   "https://github.com"],
              ["linkedin", "LinkedIn", "https://linkedin.com"],
              ["whatsapp", "WhatsApp", "https://wa.me/"],
              ["envelope", "Email",    "mailto:hello@example.com"]
            ].map(([icon, label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noreferrer"}
                className="flex items-center gap-3 transition hover:translate-x-1 hover:text-white"
              >
                <Icon name={icon} className="text-soft" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card grid gap-4 p-6 sm:grid-cols-2"
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
          {status === "success" && <p className="text-sm text-green-300 sm:col-span-2">Message saved successfully.</p>}
          {status === "error"   && <p className="text-sm text-red-300   sm:col-span-2">Something went wrong. Please try again.</p>}
        </form>

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
