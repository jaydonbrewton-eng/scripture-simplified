import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const size = parseInt(request.nextUrl.searchParams.get("size") || "192");
  const s = Math.min(Math.max(size, 48), 1024);
  const fontSize = Math.round(s * 0.33);
  const radius = Math.round(s * 0.22);

  const image = new ImageResponse(
    (
      <div
        style={{
          width: s,
          height: s,
          borderRadius: radius,
          background: "linear-gradient(135deg, #1e3a5f, #2563eb)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: Math.round(fontSize * 0.06),
            display: "flex",
          }}
        >
          SS
        </div>
      </div>
    ),
    { width: s, height: s }
  );

  const buffer = await image.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
