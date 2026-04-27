import Image from "next/image";
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
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <Image src="/images/char/404.png" alt="404 character illustration" fill className="object-contain" />
        </div>
      </div>
    </main>
  );
}
