import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <main className="section-shell flex min-h-screen items-center py-24">
      <div className="grid w-full items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow">404</span>
          <h1 className="font-fredoka text-6xl font-semibold text-white md:text-8xl">Lost in the neon.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">The page you requested does not exist, but the portfolio is still glowing nearby.</p>
          <Link href="/" className="neon-button mt-8">
            <Icon name="arrow-left" />
            Back Home
          </Link>
        </div>
        <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center">
          <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_center,rgba(113,72,212,0.42),rgba(38,7,220,0.18)_46%,transparent_72%)] blur-2xl" aria-hidden="true" />
          <div
            className="relative z-10 flex h-52 w-52 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-5xl text-white/85 backdrop-blur-sm"
            style={{ filter: "drop-shadow(0 0 28px rgba(87, 46, 220, 0.55))" }}
            aria-hidden="true"
          >
            <Icon name="search" />
          </div>
        </div>
      </div>
    </main>
  );
}
