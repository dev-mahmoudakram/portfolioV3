import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  name: string;
};

const paths: Record<string, string[]> = {
  "arrow-left": ["M19 12H5", "m12 19-7-7 7-7"],
  "arrow-right": ["M5 12h14", "m12 5 7 7-7 7"],
  "arrow-up": ["M12 19V5", "m5 12 7-7 7 7"],
  "arrow-down": ["M12 5v14", "m19 12-7 7-7-7"],
  "external-link": ["M15 3h6v6", "M10 14 21 3", "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"],
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
  close: ["M18 6 6 18", "m6 6 12 12"],
  envelope: ["M4 6h16v12H4z", "m4 8 8 5 8-5"],
  send: ["M22 2 11 13", "m22 2-7 20-4-9-9-4 20-7Z"],
  github: ["M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6.5A5.2 5.2 0 0 0 18.5 4 4.7 4.7 0 0 0 18 1s-1.4 0-4 1.5a13.5 13.5 0 0 0-7 0C4.4 1 3 1 3 1a4.7 4.7 0 0 0-.5 3A5.2 5.2 0 0 0 1 8c0 5 3 6.5 6 6.5A4.8 4.8 0 0 0 6 18v4", "M9 18c-4.5 2-4.5-2-6-2"],
  linkedin: ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z", "M2 9h4v12H2z", "M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"],
  instagram: ["M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z", "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z", "M17.5 6.5h.01"],
  facebook: ["M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"],
  whatsapp: ["M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z", "M9.1 9a.57.57 0 0 0-.5.3l-.3.6a4.6 4.6 0 0 0 2 4.4 4.6 4.6 0 0 0 4.4 2l.6-.3a.57.57 0 0 0 .3-.5v-1.5l-1.9-.5-.5.9a3.1 3.1 0 0 1-2.9-2.9l.9-.5L10.6 9Z"],
  code: ["m16 18 6-6-6-6", "m8 6-6 6 6 6"],
  server: ["M4 4h16v6H4z", "M4 14h16v6H4z", "M8 7h.01", "M8 17h.01"],
  database: ["M4 6c0 2 3.6 3.5 8 3.5S20 8 20 6s-3.6-3.5-8-3.5S4 4 4 6Z", "M4 6v12c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5V6", "M4 12c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5"],
  gauge: ["M20 13a8 8 0 1 0-16 0", "M12 13l4-4", "M4 17h16"],
  rocket: ["M5 15c-1 1-2 4-2 6 2 0 5-1 6-2", "M9 15 4 10s3-6 8-6c1.5-2 4-3 8-3 0 4-1 6.5-3 8 0 5-6 8-6 8Z", "M15 9h.01"],
  user: ["M20 21a8 8 0 0 0-16 0", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"],
  building: ["M4 21V5a2 2 0 0 1 2-2h9v18", "M15 9h3a2 2 0 0 1 2 2v10", "M8 7h3", "M8 11h3", "M8 15h3", "M3 21h18"],
  chart: ["M3 3v18h18", "M7 15l4-4 3 3 5-7"],
  desktop: ["M3 4h18v12H3z", "M8 20h8", "M12 16v4"],
  branch: ["M6 3v12", "M18 9a3 3 0 1 0-3-3", "M6 21a3 3 0 1 0 0-6", "M18 9c0 4-3 6-6 6H6"],
  grid: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M3 14h7v7H3z", "M14 14h7v7h-7z"],
  wand: ["M15 4V2", "M15 16v-2", "M8 9H6", "M20 9h-2", "M17.8 6.2 19 5", "M11 13l-8 8", "M14 10l-4-4"],
  wrench: ["M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-3 3-2-2Z"],
  bolt: ["M13 2 3 14h8l-1 8 11-14h-8z"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"],
  sitemap: ["M12 3v6", "M6 15v6", "M18 15v6", "M6 15h12", "M12 9v3", "M4 21h4", "M10 3h4", "M16 21h4"],
  plug: ["M12 22v-5", "M9 8V2", "M15 8V2", "M6 8h12v4a6 6 0 0 1-12 0Z"],
  table: ["M3 5h18v14H3z", "M3 10h18", "M9 5v14", "M15 5v14"],
  git: ["M15 6a3 3 0 1 0-3 3", "M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z", "M6 9v6a3 3 0 1 0 3 3", "M9 6h3"],
  search: ["M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z", "m21 21-4.3-4.3"],
  download: ["M12 3v13", "m7 11 5 5 5-5", "M5 21h14"]
};

function normalizeIconName(name: string) {
  if (name.includes("arrow-left")) return "arrow-left";
  if (name.includes("arrow-right")) return "arrow-right";
  if (name.includes("arrow-up-right")) return "external-link";
  if (name.includes("arrow-up")) return "arrow-up";
  if (name.includes("arrow-down")) return "arrow-down";
  if (name.includes("xmark")) return "close";
  if (name.includes("bars")) return "menu";
  if (name.includes("paper-plane")) return "send";
  if (name.includes("envelope")) return "envelope";
  if (name.includes("github")) return "github";
  if (name.includes("linkedin")) return "linkedin";
  if (name.includes("instagram")) return "instagram";
  if (name.includes("facebook")) return "facebook";
  if (name.includes("whatsapp")) return "whatsapp";
  if (name.includes("server")) return "server";
  if (name.includes("database")) return "database";
  if (name.includes("gauge")) return "gauge";
  if (name.includes("rocket")) return "rocket";
  if (name.includes("user")) return "user";
  if (name.includes("building")) return "building";
  if (name.includes("chart") || name.includes("ranking")) return "chart";
  if (name.includes("desktop")) return "desktop";
  if (name.includes("branch")) return "branch";
  if (name.includes("table-cells")) return "grid";
  if (name.includes("wand") || name.includes("magic")) return "wand";
  if (name.includes("wrench") || name.includes("screwdriver")) return "wrench";
  if (name.includes("bolt")) return "bolt";
  if (name.includes("shield")) return "shield";
  if (name.includes("sitemap")) return "sitemap";
  if (name.includes("plug")) return "plug";
  if (name.includes("table-columns")) return "table";
  if (name.includes("git")) return "git";
  if (name.includes("magnifying")) return "search";
  if (name.includes("download")) return "download";
  if (paths[name]) return name;
  return "code";
}

export function Icon({ name, className, ...props }: IconProps) {
  const iconName = normalizeIconName(name);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {paths[iconName].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
