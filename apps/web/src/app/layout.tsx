import type { Metadata } from "next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.scss";
import { Navbar } from "@/components/Navbar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "dev-Akram",
  title: {
    default: "Mahmoud Akram | Web Developer",
    template: "%s | Mahmoud Akram"
  },
  description: "Premium portfolio for Mahmoud Akram, a web developer building fast, SEO-friendly, visually polished websites and dashboards.",
  keywords: ["Mahmoud Akram", "Web Developer", "Next.js", "NestJS", "Portfolio", "SEO", "Frontend Developer"],
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
  appleWebApp: {
    capable: true,
    title: "dev-Akram",
    statusBarStyle: "black-translucent"
  },
  openGraph: {
    title: "Mahmoud Akram | Web Developer",
    description: "Built for Speed. Designed to Impress.",
    url: siteUrl,
    siteName: "Mahmoud Akram Portfolio",
    images: [{ url: "/images/og-placeholder.svg", width: 1200, height: 630, alt: "Mahmoud Akram portfolio preview" }],
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="scroll-container">
          {children}
        </div>
        <Navbar />
      </body>
    </html>
  );
}
