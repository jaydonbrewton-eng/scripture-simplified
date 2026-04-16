"use client";

import Header from "@/components/Header";
import BookSelector from "@/components/BookSelector";
import ChapterSelector from "@/components/ChapterSelector";
import ChapterReader from "@/components/ChapterReader";
import { BIBLE_BOOKS, type BibleBook } from "@/lib/bible-data";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

function parseParams(searchParams: URLSearchParams) {
  const bookParam = searchParams.get("book");
  const chapterParam = searchParams.get("chapter");
  let book: BibleBook | null = null;
  let chapter: number | null = null;
  if (bookParam) {
    const found = BIBLE_BOOKS.find(
      (b) => b.name.toLowerCase() === bookParam.toLowerCase()
    );
    if (found) {
      book = found;
      if (chapterParam) {
        const ch = parseInt(chapterParam);
        if (ch >= 1 && ch <= found.chapters) {
          chapter = ch;
        }
      }
    }
  }
  return { book, chapter };
}

function ReadContentInner({ initialBook, initialChapter, fromParam }: { initialBook: BibleBook | null; initialChapter: number | null; fromParam: string | null }) {
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(initialBook);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(initialChapter);

  const handleBack = () => {
    if (fromParam && fromParam.startsWith("topic-")) {
      const topicId = fromParam.replace("topic-", "");
      router.push(`/topic/${topicId}`);
    } else {
      setSelectedChapter(null);
    }
  };

  if (selectedBook && selectedChapter) {
    return (
      <ChapterReader
        book={selectedBook}
        chapter={selectedChapter}
        onBack={handleBack}
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

function ReadContent() {
  const searchParams = useSearchParams();
  const { book, chapter } = parseParams(searchParams);
  const fromParam = searchParams.get("from") || null;
  const key = `${searchParams.get("book") || ""}-${searchParams.get("chapter") || ""}-${fromParam || ""}`;

  return <ReadContentInner key={key} initialBook={book} initialChapter={chapter} fromParam={fromParam} />;
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
