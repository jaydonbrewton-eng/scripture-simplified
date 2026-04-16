"use client";

import { TRANSLATIONS, fetchChapter, type BibleBook, type ChapterData, type Verse } from "@/lib/bible-data";
import { addBookmark, removeBookmark, getBookmarks } from "@/lib/bookmarks";
import { markChapterRead, isChapterRead } from "@/lib/progress";
import { getVideosForBook } from "@/lib/bible-videos";
import { getCurrentChallenge } from "@/lib/challenge";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Copy,
  Flame,
  Image as ImageIcon,
  Lightbulb,
  Link2,
  Loader2,
  MessageCircle,
  Play,
  Sparkles,
  Type,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold text-foreground mt-4 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold text-foreground mt-4 mb-1">$1</h2>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^\* (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="my-2 space-y-1">$&</ul>')
    .replace(/\n{2,}/g, '</p><p class="mt-3">')
    .replace(/\n/g, '<br/>');
}

interface ChapterReaderProps {
  book: BibleBook;
  chapter: number;
  onBack: () => void;
  onChangeChapter: (chapter: number) => void;
}

export default function ChapterReader({ book, chapter, onBack, onChangeChapter }: ChapterReaderProps) {
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [compareData, setCompareData] = useState<ChapterData | null>(null);
  const [translation, setTranslation] = useState("kjv");
  const [compareTranslation, setCompareTranslation] = useState<string | null>(null);
  const [mobileCompareTab, setMobileCompareTab] = useState<"primary" | "compare">("primary");
  const [loading, setLoading] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [breakdown, setBreakdown] = useState<string | null>(null);
  const [crossRefs, setCrossRefs] = useState<string[]>([]);
  const [expandedRef, setExpandedRef] = useState<string | null>(null);
  const [expandedRefText, setExpandedRefText] = useState<string | null>(null);
  const [expandedRefLoading, setExpandedRefLoading] = useState(false);
  const [breakdownLoading, setBreakdownLoading] = useState(false);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<string>>(new Set());
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  const [verseCardVerse, setVerseCardVerse] = useState<Verse | null>(null);
  const [wordDef, setWordDef] = useState<{ word: string; verse: Verse } | null>(null);
  const [wordDefData, setWordDefData] = useState<{ definition: string; original: string; note: string } | null>(null);
  const [wordDefLoading, setWordDefLoading] = useState(false);
  const [commentary, setCommentary] = useState<{ context: string; keyThemes: string[]; lifeApplication: string } | null>(null);
  const [commentaryLoading, setCommentaryLoading] = useState(false);
  const [commentaryOpen, setCommentaryOpen] = useState(false);
  const [chapterRead, setChapterRead] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const refreshBookmarks = useCallback(() => {
    const bookmarks = getBookmarks();
    const set = new Set<string>();
    bookmarks.forEach((b) => {
      if (b.book === book.name && b.chapter === chapter) {
        set.add(`${b.verse}`);
      }
    });
    setBookmarkedVerses(set);
  }, [book.name, chapter]);

  useEffect(() => {
    refreshBookmarks();
  }, [refreshBookmarks]);

  useEffect(() => {
    setChapterRead(isChapterRead(book.name, chapter));
  }, [book.name, chapter]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setChapterData(null);
    setCompareData(null);
    setSelectedVerse(null);
    setBreakdown(null);
    setCommentary(null);
    setCommentaryOpen(false);

    fetchChapter(book.name, chapter, translation).then((data) => {
      if (!cancelled) {
        setChapterData(data);
        setLoading(false);
      }
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [book.name, chapter, translation]);

  useEffect(() => {
    if (!compareTranslation) {
      setCompareData(null);
      return;
    }
    let cancelled = false;
    fetchChapter(book.name, chapter, compareTranslation).then((data) => {
      if (!cancelled) setCompareData(data);
    });
    return () => { cancelled = true; };
  }, [book.name, chapter, compareTranslation]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (selectedVerse || wordDef || verseCardVerse || toolsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedVerse, wordDef, verseCardVerse, toolsOpen]);

  const handleBreakdown = async (verse: Verse) => {
    setSelectedVerse(verse);
    setBreakdown(null);
    setCrossRefs([]);
    setExpandedRef(null);
    setExpandedRefText(null);
    setBreakdownLoading(true);
    setHighlightedVerse(verse.verse);
    setTimeout(() => setHighlightedVerse(null), 2000);

    try {
      const res = await fetch("/api/breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verse: verse.text,
          reference: `${verse.book_name} ${verse.chapter}:${verse.verse}`,
          translation,
        }),
      });
      const data = await res.json();
      setBreakdown(data.breakdown);
      if (data.crossReferences) setCrossRefs(data.crossReferences);
    } catch {
      setBreakdown("Could not generate breakdown. Make sure your OpenAI API key is configured in .env.local");
    } finally {
      setBreakdownLoading(false);
    }
  };

  const handleBookmark = (verse: Verse) => {
    const key = `${verse.verse}`;
    if (bookmarkedVerses.has(key)) {
      const all = getBookmarks();
      const match = all.find(
        (b) => b.book === book.name && b.chapter === chapter && b.verse === verse.verse
      );
      if (match) removeBookmark(match.id);
    } else {
      addBookmark({
        book: book.name,
        chapter,
        verse: verse.verse,
        text: verse.text,
        translation,
      });
    }
    refreshBookmarks();
  };

  const showToast = (msg: string) => {
    setShareToast(msg);
    setTimeout(() => setShareToast(null), 2500);
  };

  const handleShare = async (verse: Verse) => {
    const text = `"${verse.text.trim()}"\n\u2014 ${verse.book_name} ${verse.chapter}:${verse.verse} (${translation.toUpperCase()})`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        showToast("Copied to clipboard!");
      }
    } catch {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!");
    }
  };

  const handleGenerateCard = (verse: Verse) => {
    setVerseCardVerse(verse);
  };

  const downloadVerseCard = async () => {
    if (!verseCardVerse) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, "#0b1120");
    grad.addColorStop(0.5, "#0f1a2e");
    grad.addColorStop(1, "#0b1525");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative glow circle
    const glowGrad = ctx.createRadialGradient(540, 400, 0, 540, 400, 400);
    glowGrad.addColorStop(0, "rgba(96, 165, 250, 0.15)");
    glowGrad.addColorStop(1, "rgba(96, 165, 250, 0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Quote marks
    ctx.fillStyle = "rgba(96, 165, 250, 0.3)";
    ctx.font = "bold 120px Georgia, serif";
    ctx.fillText("\u201C", 60, 200);

    // Verse text
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "32px Georgia, serif";
    const words = verseCardVerse.text.trim().split(" ");
    const lines: string[] = [];
    let currentLine = "";
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width > 900) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const startY = 540 - (lines.length * 46) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, 90, startY + i * 46);
    });

    // Reference
    ctx.fillStyle = "#60a5fa";
    ctx.font = "bold 28px sans-serif";
    const ref = `${verseCardVerse.book_name} ${verseCardVerse.chapter}:${verseCardVerse.verse}`;
    ctx.fillText(ref, 90, startY + lines.length * 46 + 50);

    // Translation badge
    ctx.fillStyle = "rgba(96, 165, 250, 0.2)";
    const badgeText = translation.toUpperCase();
    const badgeW = ctx.measureText(badgeText).width + 30;
    ctx.beginPath();
    ctx.roundRect(90, startY + lines.length * 46 + 70, badgeW, 36, 8);
    ctx.fill();
    ctx.fillStyle = "#60a5fa";
    ctx.font = "16px sans-serif";
    ctx.fillText(badgeText, 105, startY + lines.length * 46 + 94);

    // Branding
    ctx.fillStyle = "rgba(136, 136, 160, 0.5)";
    ctx.font = "18px sans-serif";
    ctx.fillText("ScriptureSimplified", 90, 1030);

    const link = document.createElement("a");
    link.download = `${ref.replace(/\s+/g, "-").replace(":", "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("Verse card downloaded!");
    setVerseCardVerse(null);
  };

  const downloadStoryCard = () => {
    if (!verseCardVerse) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 0, 1920);
    grad.addColorStop(0, "#0b1120");
    grad.addColorStop(0.4, "#0f1a2e");
    grad.addColorStop(1, "#060d18");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Glow
    const glow = ctx.createRadialGradient(540, 800, 0, 540, 800, 500);
    glow.addColorStop(0, "rgba(96, 165, 250, 0.12)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1080, 1920);

    // Quote mark
    ctx.fillStyle = "rgba(96, 165, 250, 0.25)";
    ctx.font = "bold 160px Georgia, serif";
    ctx.fillText("\u201C", 70, 700);

    // Verse text
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "38px Georgia, serif";
    const words = verseCardVerse.text.trim().split(" ");
    const lines: string[] = [];
    let currentLine = "";
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width > 900) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const startY = 960 - (lines.length * 54) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, 90, startY + i * 54);
    });

    // Reference
    ctx.fillStyle = "#60a5fa";
    ctx.font = "bold 32px sans-serif";
    const ref = `${verseCardVerse.book_name} ${verseCardVerse.chapter}:${verseCardVerse.verse}`;
    ctx.fillText(ref, 90, startY + lines.length * 54 + 60);

    // Branding
    ctx.fillStyle = "rgba(136, 136, 160, 0.4)";
    ctx.font = "20px sans-serif";
    ctx.fillText("ScriptureSimplified", 90, 1840);

    const link = document.createElement("a");
    link.download = `${ref.replace(/\s+/g, "-").replace(":", "-")}-story.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("Story card downloaded!");
    setVerseCardVerse(null);
  };

  const handleWordTap = async (word: string, verse: Verse) => {
    const cleanWord = word.replace(/[^a-zA-Z'-]/g, "");
    if (cleanWord.length < 3) return;
    setWordDef({ word: cleanWord, verse });
    setWordDefData(null);
    setWordDefLoading(true);

    try {
      const res = await fetch("/api/define", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: cleanWord,
          verseContext: verse.text,
          reference: `${verse.book_name} ${verse.chapter}:${verse.verse}`,
        }),
      });
      const data = await res.json();
      setWordDefData(data);
    } catch {
      setWordDefData({ definition: `Could not define "${cleanWord}".`, original: "", note: "" });
    } finally {
      setWordDefLoading(false);
    }
  };

  const handleLoadCommentary = async () => {
    if (commentary) {
      setCommentaryOpen(!commentaryOpen);
      return;
    }
    setCommentaryLoading(true);
    setCommentaryOpen(true);

    const verseSummary = chapterData?.verses
      .slice(0, 10)
      .map((v) => `${v.verse}. ${v.text}`)
      .join("\n") || "";

    try {
      const res = await fetch("/api/commentary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book: book.name,
          chapter,
          verseSummary,
        }),
      });
      const data = await res.json();
      setCommentary(data);
    } catch {
      setCommentary({
        context: "Could not load commentary. Try again later.",
        keyThemes: [],
        lifeApplication: "",
      });
    } finally {
      setCommentaryLoading(false);
    }
  };

  const handleMarkRead = () => {
    markChapterRead(book.name, chapter);
    setChapterRead(true);
    showToast("Chapter marked as read!");

    // Increment community challenge counter if this chapter is in the current challenge
    const challenge = getCurrentChallenge();
    const isInChallenge = challenge.chapters.some(
      (ch) => ch.book === book.name && ch.chapter === chapter
    );
    if (isInChallenge) {
      fetch("/api/challenge", { method: "POST" }).catch(() => {});
    }
  };

  const videos = getVideosForBook(book.name);

  const renderVerseText = (verse: Verse) => {
    const words = verse.text.split(/(\s+)/);
    return words.map((segment, i) => {
      if (/^\s+$/.test(segment)) return segment;
      return (
        <span
          key={i}
          className="cursor-pointer rounded hover:bg-primary/10 hover:text-primary active:bg-primary/20 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleWordTap(segment, verse);
          }}
        >
          {segment}
        </span>
      );
    });
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-secondary animate-pulse" />
          <div className="h-6 w-48 rounded-lg bg-secondary animate-pulse" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-2 px-3">
              <div className="h-4 rounded bg-secondary animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
              <div className="h-4 rounded bg-secondary animate-pulse" style={{ width: `${50 + Math.random() * 40}%` }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!chapterData || chapterData.verses.length === 0) {
    return (
      <div className="animate-fade-in text-center py-16">
        <p className="text-lg font-semibold text-foreground mb-2">Couldn&apos;t load this chapter</p>
        <p className="text-muted-foreground mb-4">This translation might not be available right now. Try a different one.</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={onBack} className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Go back</button>
          <button onClick={() => window.location.reload()} className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-accent transition-colors">Try again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {shareToast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg animate-fade-in">
          {shareToast}
        </div>
      )}



      {/* Top bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1.5 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>
          <h2 className="text-xl font-bold">{book.name} {chapter}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 pr-8 text-sm font-medium text-primary focus:border-primary focus:outline-none"
            >
              {TRANSLATIONS.map((t) => (
                <option key={t.id} value={t.id}>{t.abbreviation} — {t.name}</option>
              ))}
            </select>
          </div>

          <select
            value={compareTranslation || ""}
            onChange={(e) => setCompareTranslation(e.target.value || null)}
            className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
          >
            <option value="">+ Compare</option>
            {TRANSLATIONS.filter((t) => t.id !== translation).map((t) => (
              <option key={t.id} value={t.id}>{t.abbreviation} — {t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Study tools strip */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1">

        {videos.length > 0 && (
          <button
            onClick={() => { setToolsOpen(true); setTimeout(() => setShowVideos(true), 100); }}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground whitespace-nowrap hover:border-primary/40 hover:text-primary active:bg-secondary transition-colors"
          >
            <Play size={14} /> Watch Overview
          </button>
        )}
        <button
          onClick={() => { setToolsOpen(true); setTimeout(() => handleLoadCommentary(), 100); }}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground whitespace-nowrap hover:border-primary/40 hover:text-primary active:bg-secondary transition-colors"
        >
          <MessageCircle size={14} /> Commentary
        </button>
      </div>

      {/* Mobile tab switcher for compare mode */}
      {compareData && (
        <div className="mb-4 flex rounded-xl border border-border bg-card p-1 md:hidden">
          <button
            onClick={() => setMobileCompareTab("primary")}
            className={`flex-1 rounded-lg py-2 text-center text-sm font-semibold transition-colors ${
              mobileCompareTab === "primary" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {TRANSLATIONS.find((t) => t.id === translation)?.abbreviation}
          </button>
          <button
            onClick={() => setMobileCompareTab("compare")}
            className={`flex-1 rounded-lg py-2 text-center text-sm font-semibold transition-colors ${
              mobileCompareTab === "compare" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {TRANSLATIONS.find((t) => t.id === compareTranslation)?.abbreviation}
          </button>
        </div>
      )}

      {/* Verses */}
      <div className={compareData ? "grid gap-6 md:grid-cols-2" : ""}>
        <div className={`space-y-1 ${compareData && mobileCompareTab !== "primary" ? "hidden md:block" : ""}`}>
          {compareData && (
            <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-primary md:block">
              {TRANSLATIONS.find((t) => t.id === translation)?.abbreviation}
            </p>
          )}
          {chapterData.verses.map((verse) => (
            <div
              key={verse.verse}
              className={`group relative rounded-lg px-3 py-2 transition-all duration-500 hover:bg-secondary ${
                highlightedVerse === verse.verse ? "bg-primary/10 ring-1 ring-primary/30" : ""
              } ${bookmarkedVerses.has(`${verse.verse}`) ? "border-l-2 border-primary/40" : ""}`}
            >
              <p className="text-base leading-relaxed">
                <span className="mr-2 inline-flex h-5 min-w-5 items-center justify-center rounded text-xs font-bold text-primary">{verse.verse}</span>
                {renderVerseText(verse)}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                <button onClick={() => handleBreakdown(verse)} className="flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary active:bg-primary/30 hover:bg-primary/20">
                  <Sparkles size={12} /> Break it down
                </button>
                <button onClick={() => handleBookmark(verse)} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1.5 text-xs text-muted-foreground active:text-primary hover:text-primary">
                  {bookmarkedVerses.has(`${verse.verse}`) ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
                </button>
                <button onClick={() => handleShare(verse)} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1.5 text-xs text-muted-foreground active:text-primary hover:text-primary">
                  <Copy size={12} />
                </button>
                <button onClick={() => handleGenerateCard(verse)} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1.5 text-xs text-muted-foreground active:text-primary hover:text-primary">
                  <ImageIcon size={12} /> Card
                </button>
              </div>
            </div>
          ))}
        </div>

        {compareData && (
          <div className={`space-y-1 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0 ${mobileCompareTab !== "compare" ? "hidden md:block" : ""}`}>
            <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-primary md:block">
              {TRANSLATIONS.find((t) => t.id === compareTranslation)?.abbreviation}
            </p>
            {compareData.verses.map((verse) => (
              <div key={verse.verse} className="rounded-lg px-3 py-2">
                <p className="text-base leading-relaxed text-secondary-foreground">
                  <span className="mr-2 text-xs font-bold text-primary/60">{verse.verse}</span>
                  {verse.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ESV copyright notice */}
      {(translation === "esv" || compareTranslation === "esv") && (
        <p className="mt-4 text-xs text-muted-foreground/60 text-center">
          Scripture quotations marked &quot;ESV&quot; are from the ESV&reg; Bible (The Holy Bible, English Standard Version&reg;), copyright &copy; 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.
        </p>
      )}

      {/* Tools panel (bottom sheet) */}
      {toolsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setToolsOpen(false); }}
        >
          <div className="animate-modal w-full max-w-lg rounded-t-2xl border-t border-border bg-card max-h-[80vh] overflow-y-auto">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-border" />
            </div>

            <div className="flex items-center justify-between px-5 pb-3">
              <h3 className="font-semibold">Study Tools</h3>
              <button onClick={() => setToolsOpen(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary"><X size={18} /></button>
            </div>

            <div className="px-5 pb-6 space-y-3">

              {/* Watch video */}
              {videos.length > 0 && (
                <div className="rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setShowVideos(!showVideos)}
                    className="flex w-full items-center gap-3 p-4 hover:bg-secondary transition-colors"
                  >
                    <Play size={18} className="shrink-0 text-primary" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">Watch: {book.name} Overview</p>
                      <p className="text-xs text-muted-foreground">The Bible Project</p>
                    </div>
                    {showVideos ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                  </button>
                  {showVideos && (
                    <div className="border-t border-border p-4 space-y-3 animate-fade-in">
                      {videos.map((video, i) => (
                        <div key={i}>
                          <div className="aspect-video overflow-hidden rounded-lg">
                            <iframe src={video.url} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full" />
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{video.title}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Commentary */}
              <div className="rounded-xl border border-border overflow-hidden">
                <button
                  onClick={handleLoadCommentary}
                  className="flex w-full items-center gap-3 p-4 hover:bg-secondary transition-colors"
                >
                  <MessageCircle size={18} className="shrink-0 text-primary" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">Chapter Commentary</p>
                    <p className="text-xs text-muted-foreground">Context, themes &amp; life application</p>
                  </div>
                  {commentaryOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </button>
                {commentaryOpen && (
                  <div className="border-t border-border p-4 animate-fade-in">
                    {commentaryLoading ? (
                      <div className="flex items-center gap-2 py-4 justify-center">
                        <Loader2 size={16} className="animate-spin text-primary" />
                        <span className="text-xs text-muted-foreground">Loading...</span>
                      </div>
                    ) : commentary ? (
                      <div className="space-y-4 text-sm leading-relaxed">
                        <div>
                          <p className="font-semibold text-foreground mb-1 flex items-center gap-1.5"><BookOpen size={13} className="text-primary" /> Context</p>
                          <p className="text-secondary-foreground">{commentary.context}</p>
                        </div>
                        {commentary.keyThemes.length > 0 && (
                          <div>
                            <p className="font-semibold text-foreground mb-1 flex items-center gap-1.5"><Flame size={13} className="text-orange-400" /> Key Themes</p>
                            <ul className="space-y-1.5">
                              {commentary.keyThemes.map((theme, i) => (
                                <li key={i} className="text-secondary-foreground pl-3 border-l-2 border-primary/20">{theme}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {commentary.lifeApplication && (
                          <div>
                            <p className="font-semibold text-foreground mb-1 flex items-center gap-1.5"><Lightbulb size={13} className="text-yellow-400" /> Apply It</p>
                            <p className="text-secondary-foreground">{commentary.lifeApplication}</p>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breakdown modal -- always centered overlay */}
      {selectedVerse && (
        <div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-4 animate-overlay"
          style={{ WebkitBackdropFilter: "none" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedVerse(null);
              setBreakdown(null);
              setCrossRefs([]);
            }
          }}
        >
          <div
            ref={modalRef}
            className="animate-modal w-full sm:max-w-lg max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-primary/20 bg-card shadow-2xl shadow-primary/10"
          >
            {/* Sticky close bar for mobile */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-card px-6 pt-5 pb-3 border-b border-border sm:border-none">
              <div>
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles size={18} />
                  <span className="font-semibold">Break It Down</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {selectedVerse.book_name} {selectedVerse.chapter}:{selectedVerse.verse}
                </p>
              </div>
              <button
                onClick={() => { setSelectedVerse(null); setBreakdown(null); setCrossRefs([]); }}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:bg-secondary"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 pb-6">
            <div className="mb-5 rounded-xl bg-secondary/80 p-4 border border-border">
              <p className="text-sm italic leading-relaxed text-secondary-foreground">
                &quot;{selectedVerse.text.trim()}&quot;
              </p>
            </div>

            {breakdownLoading ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <div className="relative">
                  <Loader2 size={28} className="animate-spin text-primary" />
                  <div className="absolute inset-0 animate-ping opacity-20">
                    <Sparkles size={28} className="text-primary" />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">Breaking this down for you...</span>
              </div>
            ) : breakdown ? (
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Lightbulb size={14} className="text-yellow-400" />
                    In Plain Language
                  </div>
                  <div
                    className="text-sm leading-relaxed text-secondary-foreground prose-breakdown"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(breakdown) }}
                  />
                </div>

                {crossRefs.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Link2 size={14} className="text-primary" />
                      Related Verses
                    </div>
                    <div className="space-y-2">
                      {crossRefs.map((ref, i) => {
                        const isOpen = expandedRef === ref;
                        return (
                          <div key={i}>
                            <button
                              onClick={async () => {
                                if (isOpen) {
                                  setExpandedRef(null);
                                  setExpandedRefText(null);
                                  return;
                                }
                                setExpandedRef(ref);
                                setExpandedRefText(null);
                                setExpandedRefLoading(true);
                                try {
                                  const res = await fetch(`/api/search?q=${encodeURIComponent(ref)}`);
                                  const data = await res.json();
                                  if (data.results && data.results.length > 0) {
                                    setExpandedRefText(data.results.map((v: { verse: number; text: string }) => `${v.verse}. ${v.text.trim()}`).join(" "));
                                  } else {
                                    setExpandedRefText("Could not load this verse.");
                                  }
                                } catch {
                                  setExpandedRefText("Could not load this verse.");
                                } finally {
                                  setExpandedRefLoading(false);
                                }
                              }}
                              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${isOpen ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary hover:bg-primary/20"}`}
                            >
                              <Link2 size={12} className="shrink-0" />
                              <span className="flex-1">{ref}</span>
                              <ChevronDown size={12} className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isOpen && (
                              <div className="mt-1 rounded-lg bg-secondary/60 border border-border/50 p-3 animate-fade-in">
                                {expandedRefLoading ? (
                                  <div className="flex items-center gap-2 py-2 justify-center">
                                    <Loader2 size={14} className="animate-spin text-primary" />
                                    <span className="text-xs text-muted-foreground">Loading verse...</span>
                                  </div>
                                ) : (
                                  <p className="text-sm leading-relaxed text-secondary-foreground italic">{expandedRefText}</p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
          </div>
        </div>
      )}

      {/* Verse Card Preview Modal */}
      {verseCardVerse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-overlay"
          style={{ WebkitBackdropFilter: "none" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setVerseCardVerse(null);
          }}
        >
          <div className="animate-modal w-full max-w-sm rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <ImageIcon size={16} className="text-primary" />
                Verse Card
              </h3>
              <button
                onClick={() => setVerseCardVerse(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Preview */}
            <div className="mb-4 aspect-square rounded-xl bg-gradient-to-br from-[#0b1120] via-[#0f1a2e] to-[#0b1525] p-6 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-4 left-4 text-5xl font-serif text-primary/30">&ldquo;</div>
              <p className="text-sm leading-relaxed text-white/90 font-serif relative z-10 mb-3">
                {verseCardVerse.text.trim()}
              </p>
              <p className="text-xs font-bold text-primary relative z-10">
                {verseCardVerse.book_name} {verseCardVerse.chapter}:{verseCardVerse.verse}
              </p>
              <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-50" />
            </div>

            <div className="space-y-2">
              <button
                onClick={downloadVerseCard}
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors"
              >
                Download Square (1080x1080)
              </button>
              <button
                onClick={downloadStoryCard}
                className="w-full rounded-xl border border-primary/30 bg-primary/10 py-3 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
              >
                Download Story (1080x1920)
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Square for posts &middot; Story for Instagram/TikTok stories
            </p>
          </div>
        </div>
      )}

      {/* Word definition modal */}
      {wordDef && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-overlay"
          style={{ WebkitBackdropFilter: "none" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) { setWordDef(null); setWordDefData(null); }
          }}
        >
          <div className="animate-modal w-full max-w-sm rounded-2xl border border-primary/20 bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary">
                  <Type size={16} />
                  <span className="font-semibold">Word Study</span>
                </div>
                <p className="mt-1 text-lg font-bold">&ldquo;{wordDef.word}&rdquo;</p>
                <p className="text-xs text-muted-foreground">
                  {wordDef.verse.book_name} {wordDef.verse.chapter}:{wordDef.verse.verse}
                </p>
              </div>
              <button
                onClick={() => { setWordDef(null); setWordDefData(null); }}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {wordDefLoading ? (
              <div className="flex items-center gap-3 py-8 justify-center">
                <Loader2 size={20} className="animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Looking it up...</span>
              </div>
            ) : wordDefData ? (
              <div className="space-y-3">
                <div className="rounded-xl bg-secondary/80 p-4 border border-border">
                  <p className="text-sm leading-relaxed text-foreground">{wordDefData.definition}</p>
                </div>

                {wordDefData.original && (
                  <div className="rounded-lg bg-primary/5 p-3 border border-primary/10">
                    <p className="text-xs font-semibold text-primary mb-1">Original Language</p>
                    <p className="text-sm text-secondary-foreground">{wordDefData.original}</p>
                  </div>
                )}

                {wordDefData.note && (
                  <div className="flex gap-2 text-sm">
                    <Lightbulb size={14} className="mt-0.5 shrink-0 text-yellow-400" />
                    <p className="text-secondary-foreground">{wordDefData.note}</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Mark as read + Chapter navigation */}
      <div className="mt-8 border-t border-border pt-6 space-y-4">
        <div className="flex justify-center">
          {chapterRead ? (
            <div className="flex items-center gap-2 rounded-xl bg-green-500/10 px-5 py-2.5 text-sm font-medium text-green-400">
              <CheckCircle2 size={16} />
              Chapter complete
            </div>
          ) : (
            <button
              onClick={handleMarkRead}
              className="flex items-center gap-2 rounded-xl bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 active:bg-primary/30 transition-colors"
            >
              <CheckCircle2 size={16} />
              Mark chapter as read
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => onChangeChapter(chapter - 1)}
          disabled={chapter <= 1}
          className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
        >
          <ArrowLeft size={16} /> Previous
        </button>
        <span className="text-sm text-muted-foreground">
          {book.name} {chapter} of {book.chapters}
        </span>
        <button
          onClick={() => onChangeChapter(chapter + 1)}
          disabled={chapter >= book.chapters}
          className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
        >
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
