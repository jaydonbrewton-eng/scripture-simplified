import { ImageResponse } from "next/og";

export const alt = "Scripture Simplified - The Bible made digestible";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1120 0%, #0f1a2e 50%, #0b1525 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)",
            top: 80,
            display: "flex",
          }}
        />

        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(96, 165, 250, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            border: "1px solid rgba(96, 165, 250, 0.2)",
          }}
        >
          <div
            style={{
              color: "#60a5fa",
              fontSize: 36,
              fontWeight: 700,
              display: "flex",
            }}
          >
            SS
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 0,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#e2e8f0",
              letterSpacing: -1,
            }}
          >
            Scripture
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#60a5fa",
              letterSpacing: -1,
            }}
          >
            Simplified
          </span>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#7a8ba0",
            marginTop: 16,
            display: "flex",
          }}
        >
          The Bible made digestible. Read it, understand it, live it.
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 40,
          }}
        >
          {["17 Translations", "AI Breakdowns", "Reading Plans", "Free Forever"].map((text) => (
            <div
              key={text}
              style={{
                padding: "8px 20px",
                borderRadius: 12,
                background: "rgba(96, 165, 250, 0.08)",
                border: "1px solid rgba(96, 165, 250, 0.15)",
                color: "#60a5fa",
                fontSize: 15,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {text}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 16,
            color: "#4a5568",
            display: "flex",
          }}
        >
          scripturesimplified.com
        </div>
      </div>
    ),
    { ...size }
  );
}
