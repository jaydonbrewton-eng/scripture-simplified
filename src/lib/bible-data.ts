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

export const TRANSLATIONS = [
  { id: "kjv", name: "King James Version", abbreviation: "KJV" },
  { id: "web", name: "World English Bible", abbreviation: "WEB" },
  { id: "bbe", name: "Bible in Basic English", abbreviation: "BBE" },
  { id: "asv", name: "American Standard Version", abbreviation: "ASV" },
  { id: "darby", name: "Darby Bible", abbreviation: "DARBY" },
  { id: "dra", name: "Douay-Rheims", abbreviation: "DRA" },
  { id: "oeb-us", name: "Open English Bible", abbreviation: "OEB" },
  { id: "oeb-cw", name: "Open English Bible (UK)", abbreviation: "OEB-UK" },
  { id: "webbe", name: "World English Bible (UK)", abbreviation: "WEBBE" },
] as const;

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
  const bookId = getBookId(bookName);
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

export const DAILY_READINGS = [
  { book: "John", chapter: 3, title: "For God So Loved the World", description: "The most famous verse in the Bible and what it really means for you." },
  { book: "Psalms", chapter: 23, title: "The Lord is My Shepherd", description: "A powerful reminder that you're never walking through life alone." },
  { book: "Romans", chapter: 8, title: "Nothing Can Separate Us", description: "No matter what you're going through, nothing can cut you off from God's love." },
  { book: "Genesis", chapter: 1, title: "In the Beginning", description: "How it all started -- the creation of everything." },
  { book: "Matthew", chapter: 5, title: "The Sermon on the Mount", description: "Jesus drops some of the most real life advice ever given." },
  { book: "Proverbs", chapter: 3, title: "Trust in the Lord", description: "Practical wisdom for making decisions and trusting the process." },
  { book: "Philippians", chapter: 4, title: "Finding Peace", description: "How to find real peace even when life gets chaotic." },
  { book: "1 Corinthians", chapter: 13, title: "What Love Really Is", description: "The definition of love that goes way deeper than feelings." },
  { book: "Isaiah", chapter: 40, title: "Renewed Strength", description: "When you're running on empty, this is where you recharge." },
  { book: "James", chapter: 1, title: "Faith Under Pressure", description: "How tough times actually build something real in you." },
  { book: "Ephesians", chapter: 6, title: "Spiritual Armor", description: "The tools you need to stand strong against what life throws at you." },
  { book: "Psalms", chapter: 91, title: "God's Protection", description: "A powerful declaration of safety and divine protection." },
  { book: "Matthew", chapter: 6, title: "Don't Worry", description: "Jesus explains why stressing about tomorrow is pointless." },
  { book: "Hebrews", chapter: 11, title: "Faith Hall of Fame", description: "Stories of people who bet everything on faith -- and won." },
];

export function getTodaysReading() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_READINGS[dayOfYear % DAILY_READINGS.length];
}
