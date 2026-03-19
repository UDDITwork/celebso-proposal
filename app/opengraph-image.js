import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Celebso — Technical Proposal & Development Partnership";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#1e40af",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#0f172a" }}>
              CELEBSO
            </span>
            <span
              style={{
                fontSize: 14,
                color: "#94a3b8",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginLeft: 12,
              }}
            >
              Technical Proposal
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 300,
              color: "#0f172a",
              lineHeight: 1.15,
              letterSpacing: "-2px",
            }}
          >
            Building India's Stage for
          </span>
          <div style={{ display: "flex", gap: "12px" }}>
            <span
              style={{
                fontSize: 52,
                fontWeight: 300,
                color: "#0f172a",
                lineHeight: 1.15,
                letterSpacing: "-2px",
              }}
            >
              100 Million+
            </span>
            <span
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: "#1e40af",
                lineHeight: 1.15,
                letterSpacing: "-2px",
              }}
            >
              Dreamers
            </span>
          </div>
        </div>
        <span
          style={{
            fontSize: 20,
            color: "#475569",
            lineHeight: 1.6,
          }}
        >
          Where LinkedIn meets Instagram — purpose-built for India's creator
          and startup ecosystem.
        </span>
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "auto",
            paddingTop: 32,
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <span style={{ fontSize: 14, color: "#94a3b8" }}>
            Prepared by Uddit
          </span>
          <span style={{ fontSize: 14, color: "#94a3b8" }}>
            18 March 2026
          </span>
          <span style={{ fontSize: 14, color: "#94a3b8" }}>celebso.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
