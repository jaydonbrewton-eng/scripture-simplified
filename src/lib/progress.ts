const STORAGE_KEY = "scripture-simplified-progress";
const STREAK_KEY = "scripture-simplified-streak";

export interface ReadingProgress {
  [key: string]: boolean; // "Genesis-1" => true
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string; // YYYY-MM-DD
  totalChaptersRead: number;
  readDates: string[]; // array of YYYY-MM-DD
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function getProgress(): ReadingProgress {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function getStreakData(): StreakData {
  if (typeof window === "undefined") {
    return { currentStreak: 0, longestStreak: 0, lastReadDate: "", totalChaptersRead: 0, readDates: [] };
  }
  try {
    const data = localStorage.getItem(STREAK_KEY);
    return data
      ? JSON.parse(data)
      : { currentStreak: 0, longestStreak: 0, lastReadDate: "", totalChaptersRead: 0, readDates: [] };
  } catch {
    return { currentStreak: 0, longestStreak: 0, lastReadDate: "", totalChaptersRead: 0, readDates: [] };
  }
}

export function markChapterRead(book: string, chapter: number): void {
  const progress = getProgress();
  const key = `${book}-${chapter}`;

  if (progress[key]) return; // already read

  progress[key] = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

  // Update streak
  const streak = getStreakData();
  const today = getToday();
  const yesterday = getYesterday();

  streak.totalChaptersRead++;

  if (streak.lastReadDate === today) {
    // Already read today, just save
  } else if (streak.lastReadDate === yesterday) {
    // Consecutive day
    streak.currentStreak++;
  } else if (streak.lastReadDate === "") {
    // First time ever
    streak.currentStreak = 1;
  } else {
    // Streak broken
    streak.currentStreak = 1;
  }

  if (streak.currentStreak > streak.longestStreak) {
    streak.longestStreak = streak.currentStreak;
  }

  streak.lastReadDate = today;

  if (!streak.readDates.includes(today)) {
    streak.readDates.push(today);
  }

  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
}

export function isChapterRead(book: string, chapter: number): boolean {
  return !!getProgress()[`${book}-${chapter}`];
}

export function getBookProgress(bookName: string, totalChapters: number): number {
  const progress = getProgress();
  let read = 0;
  for (let i = 1; i <= totalChapters; i++) {
    if (progress[`${bookName}-${i}`]) read++;
  }
  return Math.round((read / totalChapters) * 100);
}
