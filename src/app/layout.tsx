import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import "@/styles/globals.scss";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fredoka",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "dev-Yasser",
  title: {
    default: "Abdelrahman Yasser | Software Engineer",
    template: "%s | Abdelrahman Yasser"
  },
  description: "Portfolio for Abdelrahman Yasser, a software engineer building reliable Ruby on Rails backends and modern React/Next.js frontends.",
  keywords: ["Abdelrahman Yasser", "Software Engineer", "Ruby on Rails", "React", "Next.js", "Portfolio", "Backend Developer"],
  manifest: "/images/favicon/manifest.json",
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico", sizes: "any" },
      { url: "/images/favicon/icon0.svg", type: "image/svg+xml" },
      { url: "/images/favicon/icon1.png", sizes: "96x96", type: "image/png" }
    ],
    apple: [{ url: "/images/favicon/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/images/favicon/favicon.ico"]
  },
  openGraph: {
    title: "Abdelrahman Yasser | Software Engineer",
    description: "Built for Speed. Designed to Impress.",
    url: siteUrl,
    siteName: "Abdelrahman Yasser Portfolio",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Abdelrahman Yasser portfolio preview" }],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Preload LCP hero image — must match the exact srcset Next.js Image generates */}
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fimages%2Fchar%2Fhi.webp&w=828&q=75"
          imageSrcSet="/_next/image?url=%2Fimages%2Fchar%2Fhi.webp&w=384&q=75 384w, /_next/image?url=%2Fimages%2Fchar%2Fhi.webp&w=640&q=75 640w, /_next/image?url=%2Fimages%2Fchar%2Fhi.webp&w=828&q=75 828w, /_next/image?url=%2Fimages%2Fchar%2Fhi.webp&w=1080&q=75 1080w"
          imageSizes="(max-width: 1023px) 60vw, 533px"
          fetchPriority="high"
        />
      </head>
      <body className={`${fredoka.variable} ${poppins.variable}`}>
        <div className="scroll-container">
          {children}
        </div>
      </body>
    </html>
  );
}
