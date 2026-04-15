"use client";

import Header from "@/components/Header";
import ChapterReader from "@/components/ChapterReader";
import { BIBLE_BOOKS, DAILY_READINGS, getTodaysReading } from "@/lib/bible-data";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { useState } from "react";

export default function DailyPage() {
  const todaysReading = getTodaysReading();
  const [activeReading, setActiveReading] = useState<{ book: string; chapter: number } | null>(null);

  if (activeReading) {
    const book = BIBLE_BOOKS.find((b) => b.name === activeReading.book);
    if (book) {
      return (
        <>
          <Header />
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
            <ChapterReader
              book={book}
              chapter={activeReading.chapter}
              onBack={() => setActiveReading(null)}
              onChangeChapter={(ch) =>
                setActiveReading({ ...activeReading, chapter: ch })
              }
            />
          </main>
        </>
      );
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <div className="animate-fade-in">
          {/* Today's Featured Reading */}
          <section className="mb-10">
            <div className="mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              <h1 className="text-2xl font-bold">Daily Reading Plan</h1>
            </div>

            <div
              className="group cursor-pointer rounded-2xl border border-primary/30 bg-primary/5 p-8 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              onClick={() =>
                setActiveReading({
                  book: todaysReading.book,
                  chapter: todaysReading.chapter,
                })
              }
            >
              <div className="mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Today&apos;s Reading
                </span>
              </div>
              <h2 className="mb-2 text-2xl font-bold">{todaysReading.title}</h2>
              <p className="mb-1 text-sm text-muted-foreground">
                {todaysReading.book} {todaysReading.chapter}
              </p>
              <p className="mb-4 text-muted-foreground">{todaysReading.description}</p>
              <span className="flex items-center gap-1 text-sm font-medium text-primary">
                Start reading{" "}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </section>

          {/* Full Reading Plan */}
          <section>
            <h2 className="mb-4 text-lg font-bold">Full Reading Plan</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {DAILY_READINGS.map((reading, i) => {
                const isToday =
                  reading.book === todaysReading.book &&
                  reading.chapter === todaysReading.chapter;
                return (
                  <button
                    key={i}
                    onClick={() =>
                      setActiveReading({
                        book: reading.book,
                        chapter: reading.chapter,
                      })
                    }
                    className={`rounded-xl border p-4 text-left transition-all hover:border-primary/50 ${
                      isToday
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{reading.title}</p>
                          {isToday && (
                            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                              Today
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {reading.book} {reading.chapter}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {reading.description}
                        </p>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                        {i + 1}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
