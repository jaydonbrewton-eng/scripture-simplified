"use client";

import { BIBLE_BOOKS, type BibleBook } from "@/lib/bible-data";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

interface BookSelectorProps {
  onSelectBook: (book: BibleBook) => void;
}

export default function BookSelector({ onSelectBook }: BookSelectorProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "old" | "new">("all");

  const filtered = BIBLE_BOOKS.filter((book) => {
    const matchesSearch = book.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || book.testament === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "old", "new"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-border"
              }`}
            >
              {f === "all" ? "All" : f === "old" ? "Old Testament" : "New Testament"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((book) => (
          <button
            key={book.name}
            onClick={() => onSelectBook(book)}
            className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-secondary"
          >
            <div>
              <p className="font-medium text-card-foreground">{book.name}</p>
              <p className="text-xs text-muted-foreground">
                {book.chapters} chapter{book.chapters !== 1 ? "s" : ""}
              </p>
            </div>
            <ChevronRight
              size={16}
              className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
            />
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          No books found matching &quot;{search}&quot;
        </div>
      )}
    </div>
  );
}
