"use client";

import {
  BookOpen,
  Sparkles,
  Search,
  Calendar,
  Bookmark,
  Flame,
  Type,
  Eye,
  Heart,
  ImageIcon,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    icon: BookOpen,
    title: "Welcome to Scripture Simplified",
    description:
      "The Bible, made digestible. We break it down in plain language so you can understand it without losing the message. Let us show you around.",
    color: "text-primary",
    action: null,
  },
  {
    icon: BookOpen,
    title: "Read",
    description:
      "Browse all 66 books, pick a chapter, and read in multiple translations side by side. The reading page is clean and distraction-free.",
    color: "text-primary",
    action: { label: "Try it", href: "/read" },
  },
  {
    icon: Sparkles,
    title: "Break It Down",
    description:
      "See a verse you don't fully get? Tap \"Break it down\" and AI explains it in plain, modern language -- key words, deeper meaning, real-life application, and a one-line takeaway.",
    color: "text-primary",
    action: { label: "Try on John 3", href: "/read?book=John&chapter=3" },
  },
  {
    icon: Type,
    title: "Tap Any Word",
    description:
      "While reading, tap any word to get its definition in biblical context -- including the original Hebrew or Greek meaning. Every word has layers.",
    color: "text-primary",
    action: null,
  },
  {
    icon: Eye,
    title: "Study Tools",
    description:
      "Below the chapter title you'll find Watch Overview and Commentary. Watch beautifully animated Bible Project videos. Commentary gives you historical context and key themes.",
    color: "text-primary",
    action: null,
  },
  {
    icon: Heart,
    title: "What Are You Going Through?",
    description:
      "On the home page, pick what you're dealing with -- anxiety, depression, loneliness, identity, and more. We'll take you straight to the verses that speak to it.",
    color: "text-primary",
    action: { label: "See topics", href: "/#topics" },
  },
  {
    icon: Calendar,
    title: "Reading Plans",
    description:
      "Short, focused plans like \"7 Days on Anxiety\" or \"5 Days on Identity.\" Not \"read the Bible in a year\" -- just what you need right now.",
    color: "text-primary",
    action: { label: "Browse plans", href: "/plans" },
  },
  {
    icon: Search,
    title: "Search",
    description:
      "Look up any verse by reference or browse preset topics. Find exactly what you need, fast.",
    color: "text-primary",
    action: { label: "Try searching", href: "/search" },
  },
  {
    icon: Bookmark,
    title: "Save & Share",
    description:
      "Bookmark verses to build your personal collection. Create shareable verse card images in square (for posts) or story format (for Instagram/TikTok).",
    color: "text-primary",
    action: null,
  },
  {
    icon: Flame,
    title: "Track Your Progress",
    description:
      "Mark chapters as read, build a daily streak, and watch your progress grow across every book of the Bible.",
    color: "text-orange-400",
    action: { label: "See progress", href: "/progress" },
  },
  {
    icon: ImageIcon,
    title: "You're All Set",
    description:
      "That's everything. Dive in, take your time, and let the Word speak to you. You can replay this tour anytime from the home page.",
    color: "text-primary",
    action: null,
  },
];

interface WalkthroughProps {
  onComplete: () => void;
}

export default function Walkthrough({ onComplete }: WalkthroughProps) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const Icon = current.icon;
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/95 p-6">
      <div className="w-full max-w-md text-center">
        {/* Skip */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={onComplete}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip tour <X size={14} />
          </button>
        </div>

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 animate-fade-in" key={`icon-${step}`}>
          <Icon size={36} className={current.color} />
        </div>

        {/* Content */}
        <div className="animate-fade-in" key={`content-${step}`}>
          <h2 className="mb-3 text-2xl font-bold">{current.title}</h2>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
            {current.description}
          </p>

          {/* Interactive action button */}
          {current.action && (
            <a
              href={current.action.href}
              onClick={onComplete}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              {current.action.label} <ArrowRight size={12} />
            </a>
          )}
        </div>

        {/* Progress dots */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer hover:bg-primary/60 ${
                i === step ? "w-6 bg-primary" : i < step ? "w-1.5 bg-primary/40" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {!isFirst && (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 active:scale-95 transition-all"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <button
            onClick={() => isLast ? onComplete() : setStep(step + 1)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-accent active:scale-95 transition-all"
          >
            {isLast ? "Get Started" : "Next"} <ArrowRight size={16} />
          </button>
        </div>

        {/* Step counter */}
        <p className="mt-4 text-xs text-muted-foreground">
          {step + 1} of {STEPS.length}
        </p>
      </div>
    </div>
  );
}
