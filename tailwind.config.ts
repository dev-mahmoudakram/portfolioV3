import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2607DC",
        deep: "#3E2193",
        soft: "#7148D4",
        night: "#05020F"
      },
      fontFamily: {
        fredoka: ["var(--font-fredoka)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 32px rgba(113, 72, 212, 0.42)",
        glass: "0 24px 80px rgba(38, 7, 220, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
