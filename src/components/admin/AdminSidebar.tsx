"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Projects" },
  { href: "/admin/categories", label: "Categories" }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-6 top-6 z-30 hidden h-[calc(100vh-3rem)] w-[270px] rounded-[28px] border border-white/10 bg-[#120a2b]/85 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:flex lg:flex-col">
      <Link href="/" className="rounded-2xl border border-white/10 bg-black/25 p-3">
        <Image
          src="/images/akram%20logo/logo-11.png"
          alt="Mahmoud Akram logo"
          width={291}
          height={93}
          className="h-auto w-[185px] object-contain"
        />
      </Link>

      <nav className="mt-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-soft/70 bg-soft/20 text-white"
                  : "border-white/10 bg-black/20 text-white/80 hover:border-white/20 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2">
        <Link href="/" className="block rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/85 hover:border-white/20">
          Back Home
        </Link>
        <form action="/api/auth/logout" method="post">
          <button type="submit" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-left text-sm text-white/85 hover:border-white/20">
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
