/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "prisma"],
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"]
  }
};

export default nextConfig;
