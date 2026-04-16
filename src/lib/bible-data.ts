export const BIBLE_BOOKS = [
  { name: "Genesis", chapters: 50, testament: "old" },
  { name: "Exodus", chapters: 40, testament: "old" },
  { name: "Leviticus", chapters: 27, testament: "old" },
  { name: "Numbers", chapters: 36, testament: "old" },
  { name: "Deuteronomy", chapters: 34, testament: "old" },
  { name: "Joshua", chapters: 24, testament: "old" },
  { name: "Judges", chapters: 21, testament: "old" },
  { name: "Ruth", chapters: 4, testament: "old" },
  { name: "1 Samuel", chapters: 31, testament: "old" },
  { name: "2 Samuel", chapters: 24, testament: "old" },
  { name: "1 Kings", chapters: 22, testament: "old" },
  { name: "2 Kings", chapters: 25, testament: "old" },
  { name: "1 Chronicles", chapters: 29, testament: "old" },
  { name: "2 Chronicles", chapters: 36, testament: "old" },
  { name: "Ezra", chapters: 10, testament: "old" },
  { name: "Nehemiah", chapters: 13, testament: "old" },
  { name: "Esther", chapters: 10, testament: "old" },
  { name: "Job", chapters: 42, testament: "old" },
  { name: "Psalms", chapters: 150, testament: "old" },
  { name: "Proverbs", chapters: 31, testament: "old" },
  { name: "Ecclesiastes", chapters: 12, testament: "old" },
  { name: "Song of Solomon", chapters: 8, testament: "old" },
  { name: "Isaiah", chapters: 66, testament: "old" },
  { name: "Jeremiah", chapters: 52, testament: "old" },
  { name: "Lamentations", chapters: 5, testament: "old" },
  { name: "Ezekiel", chapters: 48, testament: "old" },
  { name: "Daniel", chapters: 12, testament: "old" },
  { name: "Hosea", chapters: 14, testament: "old" },
  { name: "Joel", chapters: 3, testament: "old" },
  { name: "Amos", chapters: 9, testament: "old" },
  { name: "Obadiah", chapters: 1, testament: "old" },
  { name: "Jonah", chapters: 4, testament: "old" },
  { name: "Micah", chapters: 7, testament: "old" },
  { name: "Nahum", chapters: 3, testament: "old" },
  { name: "Habakkuk", chapters: 3, testament: "old" },
  { name: "Zephaniah", chapters: 3, testament: "old" },
  { name: "Haggai", chapters: 2, testament: "old" },
  { name: "Zechariah", chapters: 14, testament: "old" },
  { name: "Malachi", chapters: 4, testament: "old" },
  { name: "Matthew", chapters: 28, testament: "new" },
  { name: "Mark", chapters: 16, testament: "new" },
  { name: "Luke", chapters: 24, testament: "new" },
  { name: "John", chapters: 21, testament: "new" },
  { name: "Acts", chapters: 28, testament: "new" },
  { name: "Romans", chapters: 16, testament: "new" },
  { name: "1 Corinthians", chapters: 16, testament: "new" },
  { name: "2 Corinthians", chapters: 13, testament: "new" },
  { name: "Galatians", chapters: 6, testament: "new" },
  { name: "Ephesians", chapters: 6, testament: "new" },
  { name: "Philippians", chapters: 4, testament: "new" },
  { name: "Colossians", chapters: 4, testament: "new" },
  { name: "1 Thessalonians", chapters: 5, testament: "new" },
  { name: "2 Thessalonians", chapters: 3, testament: "new" },
  { name: "1 Timothy", chapters: 6, testament: "new" },
  { name: "2 Timothy", chapters: 4, testament: "new" },
  { name: "Titus", chapters: 3, testament: "new" },
  { name: "Philemon", chapters: 1, testament: "new" },
  { name: "Hebrews", chapters: 13, testament: "new" },
  { name: "James", chapters: 5, testament: "new" },
  { name: "1 Peter", chapters: 5, testament: "new" },
  { name: "2 Peter", chapters: 3, testament: "new" },
  { name: "1 John", chapters: 5, testament: "new" },
  { name: "2 John", chapters: 1, testament: "new" },
  { name: "3 John", chapters: 1, testament: "new" },
  { name: "Jude", chapters: 1, testament: "new" },
  { name: "Revelation", chapters: 22, testament: "new" },
] as const;

export type BibleBook = (typeof BIBLE_BOOKS)[number];

// Translations from bible-api.com (free, public domain)
const BIBLE_API_TRANSLATIONS = [
  { id: "kjv", name: "King James Version", abbreviation: "KJV", source: "bible-api" as const },
  { id: "web", name: "World English Bible", abbreviation: "WEB", source: "bible-api" as const },
  { id: "bbe", name: "Bible in Basic English", abbreviation: "BBE", source: "bible-api" as const },
  { id: "asv", name: "American Standard Version", abbreviation: "ASV", source: "bible-api" as const },
  { id: "darby", name: "Darby Bible", abbreviation: "DARBY", source: "bible-api" as const },
  { id: "dra", name: "Douay-Rheims", abbreviation: "DRA", source: "bible-api" as const },
  { id: "oeb-us", name: "Open English Bible", abbreviation: "OEB", source: "bible-api" as const },
  { id: "oeb-cw", name: "Open English Bible (UK)", abbreviation: "OEB-UK", source: "bible-api" as const },
  { id: "webbe", name: "World English Bible (UK)", abbreviation: "WEBBE", source: "bible-api" as const },
];

// Translations from API.Bible (requires API key)
const API_BIBLE_TRANSLATIONS = [
  { id: "niv", name: "New International Version", abbreviation: "NIV", source: "api-bible" as const },
  { id: "nlt", name: "New Living Translation", abbreviation: "NLT", source: "api-bible" as const },
  { id: "csb", name: "Christian Standard Bible", abbreviation: "CSB", source: "api-bible" as const },
  { id: "fbv", name: "Free Bible Version", abbreviation: "FBV", source: "api-bible" as const },
  { id: "t4t", name: "Translation for Translators", abbreviation: "T4T", source: "api-bible" as const },
  { id: "lsb", name: "Literal Standard Bible", abbreviation: "LSB", source: "api-bible" as const },
  { id: "gnv", name: "Geneva Bible 1599", abbreviation: "GNV", source: "api-bible" as const },
];

// ESV from Crossway ESV API
const ESV_TRANSLATION = [
  { id: "esv", name: "English Standard Version", abbreviation: "ESV", source: "esv-api" as const },
];

// Put the most popular ones first: ESV, NIV, NLT, CSB, then public domain, then the rest
export const TRANSLATIONS = [...ESV_TRANSLATION, ...API_BIBLE_TRANSLATIONS.slice(0, 3), ...BIBLE_API_TRANSLATIONS, ...API_BIBLE_TRANSLATIONS.slice(3)] as const;

export type Translation = (typeof TRANSLATIONS)[number];

export interface Verse {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface ChapterData {
  reference: string;
  verses: Verse[];
  translation_id: string;
}

const BOOK_ID_MAP: Record<string, string> = {
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

export function getBookId(bookName: string): string {
  return BOOK_ID_MAP[bookName] || bookName;
}

export async function fetchChapter(
  bookName: string,
  chapter: number,
  translationId: string = "kjv"
): Promise<ChapterData> {
  const translation = TRANSLATIONS.find((t) => t.id === translationId);
  const source = translation?.source || "bible-api";

  if (source === "esv-api") {
    return fetchFromEsvApi(bookName, chapter);
  }
  if (source === "api-bible") {
    return fetchFromApiBible(bookName, chapter, translationId);
  }
  return fetchFromBibleApi(bookName, chapter, translationId);
}

async function fetchFromBibleApi(
  bookName: string,
  chapter: number,
  translationId: string
): Promise<ChapterData> {
  const url = `https://bible-api.com/${bookName}+${chapter}?translation=${translationId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch chapter: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    reference: data.reference || `${bookName} ${chapter}`,
    verses: (data.verses || []).map((v: { book_name: string; chapter: number; verse: number; text: string }) => ({
      book_name: v.book_name || bookName,
      chapter: v.chapter || chapter,
      verse: v.verse,
      text: v.text?.trim() || "",
    })),
    translation_id: translationId,
  };
}

async function fetchFromApiBible(
  bookName: string,
  chapter: number,
  translationId: string
): Promise<ChapterData> {
  const url = `/api/bible?book=${encodeURIComponent(bookName)}&chapter=${chapter}&translation=${translationId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch chapter from API.Bible: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }

  return {
    reference: data.reference || `${bookName} ${chapter}`,
    verses: data.verses || [],
    translation_id: translationId,
  };
}

async function fetchFromEsvApi(
  bookName: string,
  chapter: number,
): Promise<ChapterData> {
  const url = `/api/esv?book=${encodeURIComponent(bookName)}&chapter=${chapter}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch chapter from ESV API: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }

  return {
    reference: data.reference || `${bookName} ${chapter}`,
    verses: data.verses || [],
    translation_id: "esv",
  };
}
