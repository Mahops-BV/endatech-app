import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EndaTech - Betaalbare airco's, snel geplaatst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        {/* White card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            borderRadius: 32,
            padding: "60px 80px",
            width: 1000,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Snowflake + fire icon */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <span style={{ fontSize: 56 }}>❄️</span>
            <span style={{ fontSize: 56 }}>🔥</span>
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: "#1e3a8a",
              letterSpacing: -2,
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            EndaTech
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: "#4b5563",
              fontWeight: 500,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Betaalbare airco&apos;s · Snel geplaatst · F-Gassen gecertificeerd
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 4,
              background: "#2563eb",
              borderRadius: 2,
              marginBottom: 28,
            }}
          />

          {/* Contact */}
          <div style={{ display: "flex", gap: 48, color: "#6b7280", fontSize: 24 }}>
            <span>📞 06-41088447</span>
            <span>🌐 endatech.nl</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
