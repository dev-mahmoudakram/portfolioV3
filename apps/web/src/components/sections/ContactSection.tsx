"use client";

import { FormEvent, useState } from "react";
import { sendContactMessage } from "@/services/contact.service";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);

    try {
      await sendContactMessage({
        name: String(form.get("name")),
        email: String(form.get("email")),
        phone: String(form.get("phone") || ""),
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
    <section id="contact" className="section-shell py-24">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">Let&apos;s build something fast, sharp, and memorable.</h2>
          <div className="mt-8 grid gap-3 text-white/72">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-3">
              <i className="fa-brands fa-github text-soft" />
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3">
              <i className="fa-brands fa-linkedin text-soft" />
              LinkedIn
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="flex items-center gap-3">
              <i className="fa-brands fa-whatsapp text-soft" />
              WhatsApp
            </a>
            <a href="mailto:hello@example.com" className="flex items-center gap-3">
              <i className="fa-solid fa-envelope text-soft" />
              Email
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card grid gap-4 p-6 sm:grid-cols-2">
          <input name="name" required minLength={2} placeholder="Name" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-soft" />
          <input name="email" required type="email" placeholder="Email" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-soft" />
          <input name="phone" placeholder="Phone" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-soft" />
          <input name="subject" placeholder="Subject" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-soft" />
          <textarea
            name="message"
            required
            minLength={10}
            placeholder="Tell me about your project"
            rows={6}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-soft sm:col-span-2"
          />
          <button disabled={status === "loading"} type="submit" className="neon-button sm:col-span-2">
            <i className="fa-solid fa-paper-plane" />
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" ? <p className="text-sm text-green-300 sm:col-span-2">Message saved successfully.</p> : null}
          {status === "error" ? <p className="text-sm text-red-300 sm:col-span-2">Something went wrong. Please try again.</p> : null}
        </form>
      </div>
    </section>
  );
}
