import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Mahmoud Akram | Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoBase64 = `data:image/webp;base64,${readFileSync(
  path.join(process.cwd(), "public/images/akram logo/logo-11.webp")
).toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 86px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Top-right purple glow */}
        <div
          style={{
            position: "absolute",
            top: -178,
            right: -92,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(38, 7, 220, 0.28)",
            filter: "blur(60px)",
          }}
        />
        {/* Bottom-left purple glow */}
        <div
          style={{
            position: "absolute",
            bottom: -178,
            left: -84,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(113, 72, 212, 0.24)",
            filter: "blur(60px)",
          }}
        />

        {/* Logo + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 16 }}>
          <img
            src={logoBase64}
            alt="Mahmoud Akram logo"
            width={90}
            height={90}
            style={{ objectFit: "contain" }}
          />
          <span style={{ color: "white", fontSize: 76, fontWeight: 800, lineHeight: 1 }}>
            Mahmoud Akram
          </span>
        </div>

        <div style={{ color: "#C9B8FF", fontSize: 42, fontWeight: 700, marginBottom: 24 }}>
          Web Developer
        </div>
        <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 30 }}>
          Built for Speed. Designed to Impress.
        </div>

        {/* Gradient wave bar at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 86,
            right: 86,
            height: 6,
            borderRadius: 3,
            background: "linear-gradient(90deg, #2607DC 0%, #ffffff 50%, #7148D4 100%)",
            opacity: 0.82,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
