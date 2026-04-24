import type { Metadata } from "next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.scss";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WaveBackground } from "@/components/WaveBackground";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mahmoud Akram | Web Developer",
    template: "%s | Mahmoud Akram"
  },
  description: "Premium portfolio for Mahmoud Akram, a web developer building fast, SEO-friendly, visually polished websites and dashboards.",
  keywords: ["Mahmoud Akram", "Web Developer", "Next.js", "NestJS", "Portfolio", "SEO", "Frontend Developer"],
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
        <WaveBackground />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
