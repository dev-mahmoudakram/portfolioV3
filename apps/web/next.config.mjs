/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  transpilePackages: ["@mahmoud-portfolio/types"],
  serverExternalPackages: ["@prisma/client", "prisma"],
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;
