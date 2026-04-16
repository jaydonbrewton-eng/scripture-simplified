"use client";

import Header from "@/components/Header";
import { TOPICS } from "@/lib/topics";
import { BIBLE_BOOKS } from "@/lib/bible-data";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const topic = TOPICS.find((t) => t.id === id);

  if (!topic) {
    return (
      <>
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 text-center">
          <p className="text-muted-foreground">Topic not found.</p>
          <Link href="/" className="mt-4 inline-block text-primary hover:underline">Go home</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <div className="animate-fade-in">
          <Link href="/" className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft size={16} /> Back
          </Link>

          <div className="mb-8 text-center">
            <span className="text-4xl">{topic.emoji}</span>
            <h1 className="mt-3 text-2xl font-bold">{topic.label}</h1>
            <p className="mt-1 text-muted-foreground">{topic.description}</p>
          </div>

          <div className="space-y-3">
            {topic.verses.map((verse, i) => (
              <Link
                key={i}
                href={`/read?book=${encodeURIComponent(verse.book)}&chapter=${verse.chapter}&from=topic-${topic.id}`}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  <BookOpen size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary">{verse.reference}</p>
                  <p className="mt-1 text-sm text-secondary-foreground leading-relaxed">{verse.preview}</p>
                </div>
                <ArrowRight size={16} className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
