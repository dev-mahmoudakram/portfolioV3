/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "prisma"],
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
