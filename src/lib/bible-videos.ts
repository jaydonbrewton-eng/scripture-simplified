// Curated Bible Project and other high-quality Bible video links mapped to books
// Bible Project overview videos cover the major themes of each book

interface VideoEntry {
  title: string;
  url: string;
  source: string;
  thumbnail?: string;
}

const BIBLE_PROJECT_VIDEOS: Record<string, VideoEntry[]> = {
  "Genesis": [
    { title: "Genesis 1-11 Overview", url: "https://www.youtube.com/embed/GQI72THyO5I", source: "The Bible Project" },
    { title: "Genesis 12-50 Overview", url: "https://www.youtube.com/embed/F4isSyennFo", source: "The Bible Project" },
  ],
  "Exodus": [
    { title: "Exodus 1-18 Overview", url: "https://www.youtube.com/embed/jH_aojNJM3E", source: "The Bible Project" },
    { title: "Exodus 19-40 Overview", url: "https://www.youtube.com/embed/oNpTha80yyE", source: "The Bible Project" },
  ],
  "Leviticus": [
    { title: "Leviticus Overview", url: "https://www.youtube.com/embed/IJ-FekWUZzE", source: "The Bible Project" },
  ],
  "Numbers": [
    { title: "Numbers Overview", url: "https://www.youtube.com/embed/tp5MIrMZFqo", source: "The Bible Project" },
  ],
  "Deuteronomy": [
    { title: "Deuteronomy Overview", url: "https://www.youtube.com/embed/q5QEH9bH8AU", source: "The Bible Project" },
  ],
  "Joshua": [
    { title: "Joshua Overview", url: "https://www.youtube.com/embed/JqOqJlFF_eU", source: "The Bible Project" },
  ],
  "Judges": [
    { title: "Judges Overview", url: "https://www.youtube.com/embed/kOYy8iCfIJ4", source: "The Bible Project" },
  ],
  "Ruth": [
    { title: "Ruth Overview", url: "https://www.youtube.com/embed/0h1eoBeR4Jk", source: "The Bible Project" },
  ],
  "1 Samuel": [
    { title: "1 Samuel Overview", url: "https://www.youtube.com/embed/QJOju5Dw0V0", source: "The Bible Project" },
  ],
  "2 Samuel": [
    { title: "2 Samuel Overview", url: "https://www.youtube.com/embed/YvoWDXNDJgs", source: "The Bible Project" },
  ],
  "1 Kings": [
    { title: "1 Kings Overview", url: "https://www.youtube.com/embed/bVFW3wbi9pk", source: "The Bible Project" },
  ],
  "2 Kings": [
    { title: "2 Kings Overview", url: "https://www.youtube.com/embed/zez_Dc3Io8o", source: "The Bible Project" },
  ],
  "Job": [
    { title: "Job Overview", url: "https://www.youtube.com/embed/GswSg2ohqmA", source: "The Bible Project" },
  ],
  "Psalms": [
    { title: "Psalms Overview", url: "https://www.youtube.com/embed/j9phNEaPrv8", source: "The Bible Project" },
  ],
  "Proverbs": [
    { title: "Proverbs Overview", url: "https://www.youtube.com/embed/AzmYV8GNAIM", source: "The Bible Project" },
  ],
  "Ecclesiastes": [
    { title: "Ecclesiastes Overview", url: "https://www.youtube.com/embed/lrsQ1tc-2wk", source: "The Bible Project" },
  ],
  "Song of Solomon": [
    { title: "Song of Solomon Overview", url: "https://www.youtube.com/embed/4KC7xE4fgOw", source: "The Bible Project" },
  ],
  "Isaiah": [
    { title: "Isaiah 1-39 Overview", url: "https://www.youtube.com/embed/d0A6Uchb1F8", source: "The Bible Project" },
    { title: "Isaiah 40-66 Overview", url: "https://www.youtube.com/embed/_TzdEPuqgQo", source: "The Bible Project" },
  ],
  "Jeremiah": [
    { title: "Jeremiah Overview", url: "https://www.youtube.com/embed/RSK36cHbrk0", source: "The Bible Project" },
  ],
  "Lamentations": [
    { title: "Lamentations Overview", url: "https://www.youtube.com/embed/p8GDFPdaQZQ", source: "The Bible Project" },
  ],
  "Ezekiel": [
    { title: "Ezekiel 1-33 Overview", url: "https://www.youtube.com/embed/R-CIPu1nko8", source: "The Bible Project" },
    { title: "Ezekiel 34-48 Overview", url: "https://www.youtube.com/embed/SDeCWW_Bnyw", source: "The Bible Project" },
  ],
  "Daniel": [
    { title: "Daniel Overview", url: "https://www.youtube.com/embed/9cSC9uobtPM", source: "The Bible Project" },
  ],
  "Hosea": [
    { title: "Hosea Overview", url: "https://www.youtube.com/embed/kE6SZ1ogOVU", source: "The Bible Project" },
  ],
  "Joel": [
    { title: "Joel Overview", url: "https://www.youtube.com/embed/zQLazbgz90c", source: "The Bible Project" },
  ],
  "Amos": [
    { title: "Amos Overview", url: "https://www.youtube.com/embed/mGgWaPGpGz4", source: "The Bible Project" },
  ],
  "Jonah": [
    { title: "Jonah Overview", url: "https://www.youtube.com/embed/dLIabZc0O4c", source: "The Bible Project" },
  ],
  "Micah": [
    { title: "Micah Overview", url: "https://www.youtube.com/embed/MFEUEcylwLc", source: "The Bible Project" },
  ],
  "Habakkuk": [
    { title: "Habakkuk Overview", url: "https://www.youtube.com/embed/OPMaRqGJPUU", source: "The Bible Project" },
  ],
  "Matthew": [
    { title: "Matthew 1-13 Overview", url: "https://www.youtube.com/embed/3Dv4-n2MRAo", source: "The Bible Project" },
    { title: "Matthew 14-28 Overview", url: "https://www.youtube.com/embed/GGCF3OPWN14", source: "The Bible Project" },
  ],
  "Mark": [
    { title: "Mark Overview", url: "https://www.youtube.com/embed/HGHqu9-DtXk", source: "The Bible Project" },
  ],
  "Luke": [
    { title: "Luke 1-9 Overview", url: "https://www.youtube.com/embed/XIb_dCIxzr0", source: "The Bible Project" },
    { title: "Luke 10-24 Overview", url: "https://www.youtube.com/embed/26z_KhwNdD8", source: "The Bible Project" },
  ],
  "John": [
    { title: "John 1-12 Overview", url: "https://www.youtube.com/embed/G-2e9mMf7E8", source: "The Bible Project" },
    { title: "John 13-21 Overview", url: "https://www.youtube.com/embed/RUfh_wOsauk", source: "The Bible Project" },
  ],
  "Acts": [
    { title: "Acts 1-12 Overview", url: "https://www.youtube.com/embed/CGbNw855ksw", source: "The Bible Project" },
    { title: "Acts 13-28 Overview", url: "https://www.youtube.com/embed/Z-17KxpjL0Q", source: "The Bible Project" },
  ],
  "Romans": [
    { title: "Romans 1-4 Overview", url: "https://www.youtube.com/embed/ej_6dVdJSIU", source: "The Bible Project" },
    { title: "Romans 5-16 Overview", url: "https://www.youtube.com/embed/0SVTl4Xa5fY", source: "The Bible Project" },
  ],
  "1 Corinthians": [
    { title: "1 Corinthians Overview", url: "https://www.youtube.com/embed/yiHf8klCCc4", source: "The Bible Project" },
  ],
  "2 Corinthians": [
    { title: "2 Corinthians Overview", url: "https://www.youtube.com/embed/3lfPK2vfC54", source: "The Bible Project" },
  ],
  "Galatians": [
    { title: "Galatians Overview", url: "https://www.youtube.com/embed/vmx4UjRFp0M", source: "The Bible Project" },
  ],
  "Ephesians": [
    { title: "Ephesians Overview", url: "https://www.youtube.com/embed/Y71r-T98E2Q", source: "The Bible Project" },
  ],
  "Philippians": [
    { title: "Philippians Overview", url: "https://www.youtube.com/embed/oE9qqW1-BkU", source: "The Bible Project" },
  ],
  "Colossians": [
    { title: "Colossians Overview", url: "https://www.youtube.com/embed/pXTXlDxQsvc", source: "The Bible Project" },
  ],
  "1 Thessalonians": [
    { title: "1 Thessalonians Overview", url: "https://www.youtube.com/embed/No7Nq6IX23c", source: "The Bible Project" },
  ],
  "2 Thessalonians": [
    { title: "2 Thessalonians Overview", url: "https://www.youtube.com/embed/kbPBMT_r0HY", source: "The Bible Project" },
  ],
  "1 Timothy": [
    { title: "1 Timothy Overview", url: "https://www.youtube.com/embed/7RoqnGcEjcs", source: "The Bible Project" },
  ],
  "2 Timothy": [
    { title: "2 Timothy Overview", url: "https://www.youtube.com/embed/urlvnxCaL00", source: "The Bible Project" },
  ],
  "Hebrews": [
    { title: "Hebrews Overview", url: "https://www.youtube.com/embed/1fNWTZZwgbs", source: "The Bible Project" },
  ],
  "James": [
    { title: "James Overview", url: "https://www.youtube.com/embed/qn-hLHWwRYY", source: "The Bible Project" },
  ],
  "1 Peter": [
    { title: "1 Peter Overview", url: "https://www.youtube.com/embed/0h52jOe_KDg", source: "The Bible Project" },
  ],
  "2 Peter": [
    { title: "2 Peter Overview", url: "https://www.youtube.com/embed/wWLv_ITyKYc", source: "The Bible Project" },
  ],
  "1 John": [
    { title: "1-3 John Overview", url: "https://www.youtube.com/embed/l3QkE6nKylM", source: "The Bible Project" },
  ],
  "2 John": [
    { title: "1-3 John Overview", url: "https://www.youtube.com/embed/l3QkE6nKylM", source: "The Bible Project" },
  ],
  "3 John": [
    { title: "1-3 John Overview", url: "https://www.youtube.com/embed/l3QkE6nKylM", source: "The Bible Project" },
  ],
  "Jude": [
    { title: "Jude Overview", url: "https://www.youtube.com/embed/6UoCmakZmys", source: "The Bible Project" },
  ],
  "Revelation": [
    { title: "Revelation 1-11 Overview", url: "https://www.youtube.com/embed/5nvVVcYD-0w", source: "The Bible Project" },
    { title: "Revelation 12-22 Overview", url: "https://www.youtube.com/embed/QpnIrbq2bKo", source: "The Bible Project" },
  ],
};

export function getVideosForBook(bookName: string): VideoEntry[] {
  return BIBLE_PROJECT_VIDEOS[bookName] || [];
}

export function hasVideos(bookName: string): boolean {
  return bookName in BIBLE_PROJECT_VIDEOS;
}
