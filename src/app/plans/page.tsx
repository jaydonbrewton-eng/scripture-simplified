"use client";

import Header from "@/components/Header";
import { READING_PLANS } from "@/lib/topics";
import { BIBLE_BOOKS } from "@/lib/bible-data";
import ChapterReader from "@/components/ChapterReader";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { isChapterRead } from "@/lib/progress";

export default function PlansPage() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<{ book: string; chapter: number } | null>(null);
  const completedDays = useMemo(() => {
    if (typeof window === "undefined") return {} as Record<string, Set<number>>;
    const completed: Record<string, Set<number>> = {};
    READING_PLANS.forEach((plan) => {
      const set = new Set<number>();
      plan.days.forEach((d) => {
        if (isChapterRead(d.book, d.chapter)) set.add(d.day);
      });
      completed[plan.id] = set;
    });
    return completed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDay]);

  if (activeDay) {
    const book = BIBLE_BOOKS.find((b) => b.name === activeDay.book);
    if (book) {
      return (
        <>
          <Header />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
            <ChapterReader
              book={book}
              chapter={activeDay.chapter}
              onBack={() => setActiveDay(null)}
              onChangeChapter={(ch) => setActiveDay({ ...activeDay, chapter: ch })}
            />
          </main>
        </>
      );
    }
  }

  const plan = READING_PLANS.find((p) => p.id === activePlan);

  if (plan) {
    const completed = completedDays[plan.id] || new Set();
    const progress = Math.round((completed.size / plan.days.length) * 100);

    return (
      <>
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
          <div className="animate-fade-in">
            <button
              onClick={() => setActivePlan(null)}
              className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft size={16} /> All Plans
            </button>

            <div className="mb-6 text-center">
              <span className="text-3xl">{plan.emoji}</span>
              <h2 className="mt-2 text-xl font-bold">{plan.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            </div>

            {progress > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-primary">{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <div className="space-y-3">
              {plan.days.map((day) => {
                const done = completed.has(day.day);
                return (
                  <button
                    key={day.day}
                    onClick={() => setActiveDay({ book: day.book, chapter: day.chapter })}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all hover:border-primary/40 ${
                      done ? "border-green-500/20 bg-green-500/5" : "border-border bg-card"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      done ? "bg-green-500/10 text-green-400" : "bg-primary/10 text-primary"
                    }`}>
                      {done ? <CheckCircle2 size={18} /> : day.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{day.title}</p>
                      <p className="text-xs text-muted-foreground">{day.book} {day.chapter} &mdash; {day.summary}</p>
                    </div>
                    <ArrowRight size={16} className="shrink-0 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <div className="animate-fade-in">
          <div className="mb-6 flex items-center gap-2">
            <BookOpen size={20} className="text-primary" />
            <h1 className="text-2xl font-bold">Reading Plans</h1>
          </div>
          <p className="mb-6 text-muted-foreground">
            Short, focused plans for what you&apos;re going through right now.
          </p>

          <div className="space-y-3">
            {READING_PLANS.map((plan) => {
              const completed = completedDays[plan.id] || new Set();
              const progress = Math.round((completed.size / plan.days.length) * 100);
              return (
                <button
                  key={plan.id}
                  onClick={() => setActivePlan(plan.id)}
                  className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/40"
                >
                  <span className="text-3xl">{plan.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{plan.title}</p>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    {progress > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs font-medium text-primary">{progress}%</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-primary">{plan.days.length}</p>
                    <p className="text-xs text-muted-foreground">days</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
