"use client";

import { getCurrentChallenge, getDaysLeftInWeek } from "@/lib/challenge";
import { isChapterRead } from "@/lib/progress";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WeeklyChallenge() {
  const challenge = getCurrentChallenge();
  const daysLeft = getDaysLeftInWeek();
  const [communityCount, setCommunityCount] = useState(0);
  const [personalCompleted, setPersonalCompleted] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Fetch community count
    fetch("/api/challenge")
      .then((r) => r.json())
      .then((d) => setCommunityCount(d.count))
      .catch(() => {});

    // Check personal progress
    const completed = new Set<number>();
    challenge.chapters.forEach((ch, i) => {
      if (isChapterRead(ch.book, ch.chapter)) completed.add(i);
    });
    setPersonalCompleted(completed);
  }, [challenge]);

  const personalProgress = Math.round((personalCompleted.size / challenge.chapters.length) * 100);

  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{challenge.emoji}</span>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Weekly Challenge</p>
            </div>
            <h3 className="text-xl font-bold">{challenge.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{challenge.description}</p>
          </div>
          {daysLeft > 0 && (
            <span className="shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {daysLeft}d left
            </span>
          )}
        </div>

        {/* Community stat */}
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Users size={14} className="text-primary" />
          <span><strong className="text-foreground">{communityCount.toLocaleString()}</strong> chapters read by the community this week</span>
        </div>

        {/* Personal progress */}
        {personalProgress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Your progress</span>
              <span className="font-semibold text-primary">{personalCompleted.size}/{challenge.chapters.length}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${personalProgress}%` }} />
            </div>
          </div>
        )}

        {/* Chapter list */}
        <div className="space-y-2">
          {challenge.chapters.map((ch, i) => {
            const done = personalCompleted.has(i);
            return (
              <Link
                key={i}
                href={`/read?book=${encodeURIComponent(ch.book)}&chapter=${ch.chapter}`}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all hover:border-primary/40 ${
                  done ? "border-green-500/20 bg-green-500/5" : "border-border bg-card"
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  done ? "bg-green-500/10 text-green-400" : "bg-primary/10 text-primary"
                }`}>
                  {done ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{ch.book} {ch.chapter}</p>
                  <p className="text-xs text-muted-foreground">{ch.title}</p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
