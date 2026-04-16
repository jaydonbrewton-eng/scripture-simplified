"use client";

import Header from "@/components/Header";
import { BIBLE_BOOKS } from "@/lib/bible-data";
import { getStreakData, getBookProgress } from "@/lib/progress";
import { BookOpen, CheckCircle2, Flame, Trophy } from "lucide-react";
import { useState } from "react";

export default function ProgressPage() {
  const [streak] = useState(() => {
    if (typeof window === "undefined") return { currentStreak: 0, longestStreak: 0, lastReadDate: "", totalChaptersRead: 0, readDates: [] as string[] };
    return getStreakData();
  });
  const [bookStats] = useState<{ name: string; progress: number; chapters: number }[]>(() => {
    if (typeof window === "undefined") return [];
    return BIBLE_BOOKS.map((b) => ({
      name: b.name,
      progress: getBookProgress(b.name, b.chapters),
      chapters: b.chapters,
    })).filter((b) => b.progress > 0)
      .sort((a, b) => b.progress - a.progress);
  });

  const totalChapters = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);
  const overallProgress = totalChapters > 0 ? Math.round((streak.totalChaptersRead / totalChapters) * 100) : 0;

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <div className="animate-fade-in">
          <div className="mb-8 flex items-center gap-2">
            <Trophy size={20} className="text-primary" />
            <h1 className="text-2xl font-bold">Your Progress</h1>
          </div>

          {/* Streak cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <Flame size={32} className="mx-auto mb-2 text-orange-400" />
              <p className="text-3xl font-bold">{streak.currentStreak}</p>
              <p className="text-sm text-muted-foreground">Day streak</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <BookOpen size={32} className="mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold">{streak.totalChaptersRead}</p>
              <p className="text-sm text-muted-foreground">Chapters read</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <Trophy size={32} className="mx-auto mb-2 text-yellow-400" />
              <p className="text-3xl font-bold">{streak.longestStreak}</p>
              <p className="text-sm text-muted-foreground">Longest streak</p>
            </div>
          </div>

          {/* Overall Bible progress */}
          <div className="mb-8 rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">Overall Bible Progress</h2>
              <span className="text-sm font-bold text-primary">{overallProgress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {streak.totalChaptersRead} of {totalChapters} chapters
            </p>
          </div>

          {/* Books in progress */}
          {bookStats.length > 0 ? (
            <div>
              <h2 className="mb-4 font-semibold">Books You&apos;ve Started</h2>
              <div className="space-y-3">
                {bookStats.map((b) => (
                  <div key={b.name} className="rounded-xl border border-border bg-card p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {b.progress === 100 ? (
                          <CheckCircle2 size={16} className="text-green-400" />
                        ) : (
                          <BookOpen size={16} className="text-primary" />
                        )}
                        <span className="font-medium">{b.name}</span>
                      </div>
                      <span className={`text-sm font-bold ${b.progress === 100 ? "text-green-400" : "text-primary"}`}>
                        {b.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full transition-all ${b.progress === 100 ? "bg-green-400" : "bg-primary"}`}
                        style={{ width: `${b.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card py-16 text-center">
              <BookOpen size={40} className="mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground">No chapters read yet.</p>
              <p className="mt-1 text-sm text-muted-foreground/60">
                Start reading and mark chapters as complete to track your progress.
              </p>
            </div>
          )}

          {/* Reading history heatmap-like display */}
          {streak.readDates.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-4 font-semibold">Reading History</h2>
              <div className="flex flex-wrap gap-1.5">
                {streak.readDates.slice(-30).map((date) => (
                  <div
                    key={date}
                    className="h-8 w-8 rounded-md bg-primary/30 flex items-center justify-center text-[10px] text-primary font-medium"
                    title={date}
                  >
                    {new Date(date + "T12:00:00").getDate()}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Last 30 days of reading activity</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
