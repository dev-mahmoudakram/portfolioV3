/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "prisma"],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    browsersListForSwc: true,
    optimizePackageImports: ["simple-icons"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc"
      }
    ]
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"]
  }
};

export default nextConfig;
