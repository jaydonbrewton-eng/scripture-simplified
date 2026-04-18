"use client";

import Header from "@/components/Header";
import InstallPrompt from "@/components/InstallPrompt";
import Walkthrough from "@/components/Walkthrough";
import WeeklyChallenge from "@/components/WeeklyChallenge";
import { getBookmarks } from "@/lib/bookmarks";
import { TOPICS } from "@/lib/topics";
import { ArrowRight, BookOpen, Bookmark, ChevronRight, Heart, HelpCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const WALKTHROUGH_KEY = "scripture-simplified-walkthrough-done";

export default function HomePage() {
  const [bookmarkCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return getBookmarks().length;
  });
  const [lastRead] = useState<{ book: string; chapter: number; translation: string } | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("scripture-simplified-last-read");
      if (!saved) return null;
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });
  const [showWalkthrough, setShowWalkthrough] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem(WALKTHROUGH_KEY);
  });

  const completeWalkthrough = () => {
    setShowWalkthrough(false);
    localStorage.setItem(WALKTHROUGH_KEY, "true");
  };

  return (
    <>
      {showWalkthrough && <Walkthrough onComplete={completeWalkthrough} />}
      <InstallPrompt />
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {/* Hero */}
        <section className="mb-12 text-center">
          <div className="animate-slide-up">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 animate-pulse-glow">
              <BookOpen size={36} className="text-primary" />
            </div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Scripture<span className="text-primary">Simplified</span>
            </h1>
            <p className="mx-auto max-w-md text-lg text-muted-foreground">
              The Bible made digestible. Read it, understand it, live it -- without
              losing a single drop of the message.
            </p>
          </div>
        </section>

        {/* Continue Reading */}
        {lastRead && (
          <section className="mb-10">
            <Link
              href={`/read?book=${encodeURIComponent(lastRead.book)}&chapter=${lastRead.chapter}`}
              className="group flex items-center gap-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen size={22} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-primary uppercase tracking-wider">Continue Reading</p>
                <p className="mt-0.5 text-lg font-bold">{lastRead.book} {lastRead.chapter}</p>
                <p className="text-xs text-muted-foreground">{lastRead.translation.toUpperCase()} &middot; Pick up where you left off</p>
              </div>
              <ChevronRight size={20} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          </section>
        )}

        {/* What are you going through? */}
        <section id="tour-topics" className="mb-12">
          <h2 className="mb-2 text-center text-lg font-bold">What are you going through?</h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Tap what resonates and we&apos;ll show you verses that speak to it.
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {TOPICS.map((topic) => (
              <Link
                key={topic.id}
                href={`/topic/${topic.id}`}
                className={`group rounded-2xl border border-border bg-gradient-to-br ${topic.color} p-4 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 active:scale-[0.98]`}
              >
                <span className="text-2xl">{topic.emoji}</span>
                <p className="mt-2 text-sm font-semibold">{topic.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{topic.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Weekly Community Challenge */}
        <WeeklyChallenge />

        {/* Quick Actions */}
        <section id="tour-actions" className="mb-12 grid gap-4 sm:grid-cols-3">
          <Link
            href="/plans"
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <Heart size={24} className="mb-3 text-primary" />
            <h3 className="mb-1 font-semibold">Reading Plans</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Short plans on anxiety, identity, purpose, and more.
            </p>
            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              Browse plans <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/read"
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <BookOpen size={24} className="mb-3 text-primary" />
            <h3 className="mb-1 font-semibold">Start Reading</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Browse all 66 books with multiple translations side by side.
            </p>
            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              Open Bible <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/saved"
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <Bookmark size={24} className="mb-3 text-primary" />
            <h3 className="mb-1 font-semibold">Saved Verses</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              {bookmarkCount > 0
                ? `You have ${bookmarkCount} saved verse${bookmarkCount !== 1 ? "s" : ""}.`
                : "Bookmark verses as you read to build your collection."}
            </p>
            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              View saved <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </section>

        {/* Break it Down feature callout */}
        <section id="tour-breakdown" className="mb-12 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
          <Sparkles size={28} className="mx-auto mb-3 text-primary" />
          <h2 className="mb-2 text-xl font-bold">Break It Down</h2>
          <p className="mx-auto mb-4 max-w-md text-sm text-muted-foreground">
            Hover over any verse and hit &quot;Break it down&quot; to get an AI-powered
            explanation in plain, modern language. The full meaning stays intact --
            it just clicks faster.
          </p>
          <Link
            href="/read"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
          >
            Try it out <ArrowRight size={14} />
          </Link>
        </section>

        {/* Popular Starting Points */}
        <section>
          <h2 className="mb-4 text-lg font-bold">Popular Starting Points</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { book: "John", desc: "Best intro to who Jesus is" },
              { book: "Genesis", desc: "Where it all begins" },
              { book: "Psalms", desc: "Songs, prayers, and raw emotion" },
              { book: "Proverbs", desc: "Practical life wisdom" },
              { book: "Romans", desc: "Deep dive into faith and grace" },
              { book: "Matthew", desc: "Jesus' life and teachings" },
            ].map(({ book, desc }) => (
              <Link
                key={book}
                href={`/read?book=${encodeURIComponent(book)}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {book.slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium">{book}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p>Scripture Simplified &mdash; Making the Word accessible for everyone.</p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            onClick={() => setShowWalkthrough(true)}
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <HelpCircle size={12} /> Take a tour
          </button>
          <Link
            href="/support"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <Heart size={12} /> Support this project
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
        </div>
      </footer>
    </>
  );
}
