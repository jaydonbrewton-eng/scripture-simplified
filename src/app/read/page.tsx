"use client";

import Header from "@/components/Header";
import BookSelector from "@/components/BookSelector";
import ChapterSelector from "@/components/ChapterSelector";
import ChapterReader from "@/components/ChapterReader";
import { BIBLE_BOOKS, type BibleBook } from "@/lib/bible-data";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ReadContent() {
  const searchParams = useSearchParams();
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  useEffect(() => {
    const bookParam = searchParams.get("book");
    const chapterParam = searchParams.get("chapter");
    if (bookParam) {
      const found = BIBLE_BOOKS.find(
        (b) => b.name.toLowerCase() === bookParam.toLowerCase()
      );
      if (found) {
        setSelectedBook(found);
        if (chapterParam) {
          const ch = parseInt(chapterParam);
          if (ch >= 1 && ch <= found.chapters) {
            setSelectedChapter(ch);
          }
        }
      }
    }
  }, [searchParams]);

  if (selectedBook && selectedChapter) {
    return (
      <ChapterReader
        book={selectedBook}
        chapter={selectedChapter}
        onBack={() => setSelectedChapter(null)}
        onChangeChapter={(ch) => setSelectedChapter(ch)}
      />
    );
  }

  if (selectedBook) {
    return (
      <ChapterSelector
        book={selectedBook}
        onSelectChapter={(ch) => setSelectedChapter(ch)}
        onBack={() => setSelectedBook(null)}
      />
    );
  }

  return <BookSelector onSelectBook={(book) => setSelectedBook(book)} />;
}

export default function ReadPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <Suspense fallback={<div className="text-center text-muted-foreground py-16">Loading...</div>}>
          <ReadContent />
        </Suspense>
      </main>
    </>
  );
}
