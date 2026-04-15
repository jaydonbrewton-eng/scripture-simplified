import { NextRequest } from "next/server";

// API.Bible translation IDs
const API_BIBLE_IDS: Record<string, string> = {
  "niv": "78a9f6124f344018-01",       // New International Version 2011
  "nlt": "d6e14a625393b4da-01",       // New Living Translation
  "csb": "a556c5305ee15c3f-01",       // Christian Standard Bible
  "fbv": "65eec8e0b60e656b-01",       // Free Bible Version
  "t4t": "66c22495370cdfc0-01",       // Translation for Translators
  "lsb": "01b29f4b342acc35-01",       // Literal Standard Bible
  "gnv": "c315fa9f71d4af3a-01",       // Geneva Bible 1599
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get("book") || "";
  const chapter = searchParams.get("chapter") || "1";
  const translation = searchParams.get("translation") || "bsb";

  const apiKey = process.env.API_BIBLE_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "API.Bible key not configured" },
      { status: 500 }
    );
  }

  const bibleId = API_BIBLE_IDS[translation];
  if (!bibleId) {
    return Response.json(
      { error: `Unknown translation: ${translation}` },
      { status: 400 }
    );
  }

  const bookId = BOOK_MAP[book];
  if (!bookId) {
    return Response.json(
      { error: `Unknown book: ${book}` },
      { status: 400 }
    );
  }

  const chapterId = `${bookId}.${chapter}`;

  try {
    const res = await fetch(
      `https://rest.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}?content-type=json&include-verse-numbers=true`,
      {
        headers: { "api-key": apiKey },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return Response.json(
        { error: `API.Bible error: ${res.status}`, details: errText },
        { status: res.status }
      );
    }

    const data = await res.json();
    const content = data.data?.content || [];

    const verses: { book_name: string; chapter: number; verse: number; text: string }[] = [];
    let currentVerse = 0;
    let currentText = "";

    for (const item of content) {
      if (item.type === "verse" && item.attrs?.number) {
        if (currentVerse > 0 && currentText.trim()) {
          verses.push({
            book_name: book,
            chapter: parseInt(chapter),
            verse: currentVerse,
            text: currentText.trim(),
          });
        }
        currentVerse = parseInt(item.attrs.number);
        currentText = "";
      } else if (item.type === "text") {
        currentText += item.text || "";
      } else if (item.items) {
        currentText += extractText(item.items);
      }
    }

    if (currentVerse > 0 && currentText.trim()) {
      verses.push({
        book_name: book,
        chapter: parseInt(chapter),
        verse: currentVerse,
        text: currentText.trim(),
      });
    }

    return Response.json({
      reference: `${book} ${chapter}`,
      verses,
      translation_id: translation,
    });
  } catch (e) {
    return Response.json(
      { error: "Failed to fetch from API.Bible" },
      { status: 500 }
    );
  }
}

function extractText(items: unknown[]): string {
  let text = "";
  for (const item of items) {
    const i = item as { type?: string; text?: string; items?: unknown[] };
    if (i.type === "text" && i.text) {
      text += i.text;
    } else if (i.items) {
      text += extractText(i.items);
    }
  }
  return text;
}

const BOOK_MAP: Record<string, string> = {
  "Genesis": "GEN", "Exodus": "EXO", "Leviticus": "LEV", "Numbers": "NUM",
  "Deuteronomy": "DEU", "Joshua": "JOS", "Judges": "JDG", "Ruth": "RUT",
  "1 Samuel": "1SA", "2 Samuel": "2SA", "1 Kings": "1KI", "2 Kings": "2KI",
  "1 Chronicles": "1CH", "2 Chronicles": "2CH", "Ezra": "EZR", "Nehemiah": "NEH",
  "Esther": "EST", "Job": "JOB", "Psalms": "PSA", "Proverbs": "PRO",
  "Ecclesiastes": "ECC", "Song of Solomon": "SNG", "Isaiah": "ISA", "Jeremiah": "JER",
  "Lamentations": "LAM", "Ezekiel": "EZK", "Daniel": "DAN", "Hosea": "HOS",
  "Joel": "JOL", "Amos": "AMO", "Obadiah": "OBA", "Jonah": "JON",
  "Micah": "MIC", "Nahum": "NAM", "Habakkuk": "HAB", "Zephaniah": "ZEP",
  "Haggai": "HAG", "Zechariah": "ZEC", "Malachi": "MAL",
  "Matthew": "MAT", "Mark": "MRK", "Luke": "LUK", "John": "JHN",
  "Acts": "ACT", "Romans": "ROM", "1 Corinthians": "1CO", "2 Corinthians": "2CO",
  "Galatians": "GAL", "Ephesians": "EPH", "Philippians": "PHP", "Colossians": "COL",
  "1 Thessalonians": "1TH", "2 Thessalonians": "2TH", "1 Timothy": "1TI", "2 Timothy": "2TI",
  "Titus": "TIT", "Philemon": "PHM", "Hebrews": "HEB", "James": "JAS",
  "1 Peter": "1PE", "2 Peter": "2PE", "1 John": "1JN", "2 John": "2JN",
  "3 John": "3JN", "Jude": "JUD", "Revelation": "REV",
};
