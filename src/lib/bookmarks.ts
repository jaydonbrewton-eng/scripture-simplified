export interface Bookmark {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
  note?: string;
  createdAt: number;
}

const STORAGE_KEY = "scripture-simplified-bookmarks";

export function getBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addBookmark(bookmark: Omit<Bookmark, "id" | "createdAt">): Bookmark {
  const bookmarks = getBookmarks();
  const newBookmark: Bookmark = {
    ...bookmark,
    id: `${bookmark.book}-${bookmark.chapter}-${bookmark.verse}-${Date.now()}`,
    createdAt: Date.now(),
  };
  bookmarks.unshift(newBookmark);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  return newBookmark;
}

export function removeBookmark(id: string): void {
  const bookmarks = getBookmarks().filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export function isBookmarked(book: string, chapter: number, verse: number): boolean {
  return getBookmarks().some(
    (b) => b.book === book && b.chapter === chapter && b.verse === verse
  );
}
