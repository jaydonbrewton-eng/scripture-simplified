import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "linear-gradient(135deg, #1e3a5f, #2563eb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: 1,
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
