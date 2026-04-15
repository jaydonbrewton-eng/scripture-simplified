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
  ImageIcon,
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
  },
  {
    icon: BookOpen,
    title: "Read",
    description:
      "Browse all 66 books, pick a chapter, and read in multiple translations side by side. The reading page is clean and distraction-free -- just you and the Word.",
    color: "text-primary",
  },
  {
    icon: Sparkles,
    title: "Break It Down",
    description:
      "See a verse you don't fully get? Tap \"Break it down\" and AI explains it in plain, modern language. The meaning stays 100% intact -- it just clicks faster.",
    color: "text-primary",
  },
  {
    icon: Type,
    title: "Tap Any Word",
    description:
      "While reading, tap any word to get its definition in biblical context -- including the original Hebrew or Greek meaning. Every word has layers.",
    color: "text-primary",
  },
  {
    icon: Eye,
    title: "Study Tools",
    description:
      "Below the chapter title you'll find Watch Overview and Commentary. Watch beautifully animated Bible Project videos that break down each book visually. Commentary gives you historical context and key themes.",
    color: "text-primary",
  },
  {
    icon: Search,
    title: "Search",
    description:
      "Look up any verse by reference or browse by topic -- love, anxiety, faith, purpose, and more. Find exactly what you need.",
    color: "text-primary",
  },
  {
    icon: Calendar,
    title: "Daily Reading",
    description:
      "A curated daily reading plan with bite-sized chapters and relatable descriptions. Build a habit without feeling overwhelmed.",
    color: "text-primary",
  },
  {
    icon: Bookmark,
    title: "Save & Share",
    description:
      "Bookmark verses to build your personal collection. Create shareable verse card images perfect for Instagram or TikTok.",
    color: "text-primary",
  },
  {
    icon: Flame,
    title: "Track Your Progress",
    description:
      "Mark chapters as read, build a daily streak, and watch your progress grow. See how far you've come across every book.",
    color: "text-orange-400",
  },
  {
    icon: ImageIcon,
    title: "You're All Set",
    description:
      "That's everything. Dive in, take your time, and let the Word speak to you. You can replay this walkthrough anytime from the home page.",
    color: "text-primary",
  },
];

interface WalkthroughProps {
  onComplete: () => void;
}

export default function Walkthrough({ onComplete }: WalkthroughProps) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const Icon = current.icon;
  const isLast = step === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/95 p-6">
      <div className="w-full max-w-md text-center">
        {/* Skip */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={onComplete}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip <X size={14} />
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
        </div>

        {/* Progress dots */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-6 bg-primary" : i < step ? "w-1.5 bg-primary/40" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <div className="mt-8">
          <button
            onClick={handleNext}
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
