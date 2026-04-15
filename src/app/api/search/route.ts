import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  if (!query) {
    return Response.json({ results: [] });
  }

  try {
    const response = await fetch(
      `https://bible-api.com/${encodeURIComponent(query)}?translation=kjv`
    );

    if (!response.ok) {
      // If direct reference fails, try a keyword search via a fallback
      return Response.json({ results: [], query });
    }

    const data = await response.json();

    if (data.verses) {
      return Response.json({
        reference: data.reference,
        results: data.verses.map((v: { book_name: string; chapter: number; verse: number; text: string }) => ({
          book_name: v.book_name,
          chapter: v.chapter,
          verse: v.verse,
          text: v.text?.trim(),
        })),
      });
    }

    return Response.json({ results: [], query });
  } catch {
    return Response.json({ results: [], query });
  }
}
