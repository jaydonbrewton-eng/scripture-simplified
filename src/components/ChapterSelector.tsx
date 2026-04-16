"use client";

import type { BibleBook } from "@/lib/bible-data";
import { isChapterRead, getBookProgress } from "@/lib/progress";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ChapterSelectorProps {
  book: BibleBook;
  onSelectChapter: (chapter: number) => void;
  onBack: () => void;
}

export default function ChapterSelector({ book, onSelectChapter, onBack }: ChapterSelectorProps) {
  const [readChapters] = useState<Set<number>>(() => {
    if (typeof window === "undefined") return new Set<number>();
    const read = new Set<number>();
    for (let i = 1; i <= book.chapters; i++) {
      if (isChapterRead(book.name, i)) read.add(i);
    }
    return read;
  });
  const [progress] = useState(() => {
    if (typeof window === "undefined") return 0;
    return getBookProgress(book.name, book.chapters);
  });

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to books
      </button>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{book.name}</h2>
          <p className="text-sm text-muted-foreground">Select a chapter to read</p>
        </div>
        {progress > 0 && (
          <div className="text-right">
            <p className="text-sm font-semibold text-primary">{progress}%</p>
            <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => (
          <button
            key={ch}
            onClick={() => onSelectChapter(ch)}
            className={`relative flex h-12 items-center justify-center rounded-xl border text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground ${
              readChapters.has(ch)
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-border bg-card text-card-foreground"
            }`}
          >
            {ch}
            {readChapters.has(ch) && (
              <CheckCircle2 size={10} className="absolute -right-0.5 -top-0.5 text-green-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
