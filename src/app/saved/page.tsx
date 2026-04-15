"use client";

import Header from "@/components/Header";
import { getBookmarks, removeBookmark, type Bookmark } from "@/lib/bookmarks";
import { Bookmark as BookmarkIcon, Share2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function SavedPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleRemove = (id: string) => {
    removeBookmark(id);
    setBookmarks(getBookmarks());
  };

  const handleShare = async (bookmark: Bookmark) => {
    const text = `"${bookmark.text.trim()}"\n— ${bookmark.book} ${bookmark.chapter}:${bookmark.verse} (${bookmark.translation.toUpperCase()})`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(text);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {shareToast && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg">
            Copied to clipboard!
          </div>
        )}

        <div className="animate-fade-in">
          <div className="mb-6 flex items-center gap-2">
            <BookmarkIcon size={20} className="text-primary" />
            <h1 className="text-2xl font-bold">Saved Verses</h1>
            {bookmarks.length > 0 && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {bookmarks.length}
              </span>
            )}
          </div>

          {bookmarks.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card py-20 text-center">
              <BookmarkIcon size={40} className="mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground">No saved verses yet.</p>
              <p className="mt-1 text-sm text-muted-foreground/60">
                Bookmark verses while reading to build your collection.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {bookmark.book} {bookmark.chapter}:{bookmark.verse}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {bookmark.translation.toUpperCase()} &middot;{" "}
                        {new Date(bookmark.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => handleShare(bookmark)}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary"
                        title="Share"
                      >
                        <Share2 size={14} />
                      </button>
                      <button
                        onClick={() => handleRemove(bookmark.id)}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed">{bookmark.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
