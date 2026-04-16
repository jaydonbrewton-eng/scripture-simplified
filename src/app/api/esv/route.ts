import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get("book") || "";
  const chapter = searchParams.get("chapter") || "1";

  const apiKey = process.env.ESV_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "ESV API key not configured" },
      { status: 500 }
    );
  }

  const query = `${book} ${chapter}`;

  try {
    const res = await fetch(
      `https://api.esv.org/v3/passage/text/?q=${encodeURIComponent(query)}&include-passage-references=false&include-verse-numbers=true&include-first-verse-numbers=true&include-footnotes=false&include-footnote-body=false&include-headings=false&include-short-copyright=false&include-selahs=true&indent-using=space&indent-paragraphs=0&indent-poetry=false&indent-poetry-lines=0&indent-declares=0&indent-psalm-doxology=0&line-length=0`,
      {
        headers: { Authorization: `Token ${apiKey}` },
      }
    );

    if (!res.ok) {
      return Response.json(
        { error: `ESV API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const passageText = data.passages?.[0] || "";

    const verses = parseEsvText(passageText, book, parseInt(chapter));

    return Response.json({
      reference: data.canonical || `${book} ${chapter}`,
      verses,
      translation_id: "esv",
    });
  } catch {
    return Response.json(
      { error: "Failed to fetch from ESV API" },
      { status: 500 }
    );
  }
}

function parseEsvText(
  text: string,
  book: string,
  chapter: number
): { book_name: string; chapter: number; verse: number; text: string }[] {
  const verses: { book_name: string; chapter: number; verse: number; text: string }[] = [];

  // The ESV API returns text like: "[1] In the beginning... [2] The earth was..."
  // Split on verse number markers [N]
  const parts = text.split(/\[(\d+)\]/);

  // parts[0] is any text before the first verse marker (usually empty or whitespace)
  // Then alternating: parts[1]=verseNum, parts[2]=verseText, parts[3]=verseNum, parts[4]=verseText, etc.
  for (let i = 1; i < parts.length; i += 2) {
    const verseNum = parseInt(parts[i]);
    const verseText = (parts[i + 1] || "").replace(/\s+/g, " ").trim();

    if (verseNum > 0 && verseText.length > 0) {
      verses.push({
        book_name: book,
        chapter,
        verse: verseNum,
        text: verseText,
      });
    }
  }

  return verses;
}
