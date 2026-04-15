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

    // Parse the nested API.Bible JSON structure
    // Structure: array of paragraph tags, each containing verse tags and text nodes
    const verseMap = new Map<number, string>();
    let currentVerse = 0;

    function walkItems(items: ApiItem[], insideVerseTag = false) {
      for (const item of items) {
        if (item.type === "tag" && item.name === "verse" && item.attrs?.number) {
          currentVerse = parseInt(item.attrs.number);
          // Skip children of verse tags (they contain the verse number as text)
          continue;
        } else if (item.type === "text" && item.text && currentVerse > 0 && !insideVerseTag) {
          const existing = verseMap.get(currentVerse) || "";
          verseMap.set(currentVerse, existing + item.text);
        }
        if (item.items && item.items.length > 0) {
          walkItems(item.items, false);
        }
      }
    }

    walkItems(content);

    const verses = Array.from(verseMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([num, text]) => ({
        book_name: book,
        chapter: parseInt(chapter),
        verse: num,
        text: text.trim(),
      }))
      .filter((v) => v.text.length > 0);

    return Response.json({
      reference: data.data?.reference || `${book} ${chapter}`,
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

interface ApiItem {
  type?: string;
  name?: string;
  text?: string;
  attrs?: { number?: string; style?: string; [key: string]: unknown };
  items?: ApiItem[];
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
