"use client";

import Header from "@/components/Header";
import { Search, ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";

const TOPIC_SUGGESTIONS = [
  { topic: "Love", query: "1 Corinthians 13", icon: "heart" },
  { topic: "Faith", query: "Hebrews 11:1", icon: "anchor" },
  { topic: "Anxiety", query: "Philippians 4:6-7", icon: "cloud" },
  { topic: "Strength", query: "Isaiah 40:31", icon: "zap" },
  { topic: "Forgiveness", query: "Ephesians 4:32", icon: "refresh" },
  { topic: "Purpose", query: "Jeremiah 29:11", icon: "compass" },
  { topic: "Peace", query: "John 14:27", icon: "feather" },
  { topic: "Hope", query: "Romans 15:13", icon: "sun" },
  { topic: "Wisdom", query: "James 1:5", icon: "book" },
  { topic: "Protection", query: "Psalms 91:1-2", icon: "shield" },
  { topic: "Identity", query: "Psalms 139:14", icon: "user" },
  { topic: "Patience", query: "James 1:2-4", icon: "clock" },
];

interface SearchResult {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
      setReference(data.reference || "");
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <div className="animate-fade-in">
          <div className="mb-6 flex items-center gap-2">
            <Search size={20} className="text-primary" />
            <h1 className="text-2xl font-bold">Search Scripture</h1>
          </div>

          <p className="mb-6 text-muted-foreground">
            Look up any verse by reference (e.g. &quot;John 3:16&quot;) or browse topics below.
          </p>

          {/* Search bar */}
          <div className="mb-8 flex gap-2">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder='Try "John 3:16" or "Psalms 23"...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full rounded-xl border border-border bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>

          {/* Results */}
          {searched && !loading && (
            <div className="mb-10 animate-fade-in">
              {results.length > 0 ? (
                <div>
                  {reference && (
                    <p className="mb-4 text-sm font-medium text-primary">{reference}</p>
                  )}
                  <div className="space-y-2">
                    {results.map((r, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30"
                      >
                        <p className="text-base leading-relaxed">
                          <span className="mr-2 text-xs font-bold text-primary">
                            {r.verse}
                          </span>
                          {r.text}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {r.book_name} {r.chapter}:{r.verse}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card py-12 text-center">
                  <BookOpen size={32} className="mx-auto mb-3 text-muted-foreground/30" />
                  <p className="text-muted-foreground">
                    No results found. Try a verse reference like &quot;Genesis 1:1&quot;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Topic suggestions */}
          <section>
            <h2 className="mb-2 text-lg font-bold">Browse by Topic</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Tap a topic to find key verses about it.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {TOPIC_SUGGESTIONS.map(({ topic, query: q }) => (
                <button
                  key={topic}
                  onClick={() => {
                    setQuery(q);
                    handleSearch(q);
                  }}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-secondary"
                >
                  <div>
                    <p className="font-medium text-foreground">{topic}</p>
                    <p className="text-xs text-muted-foreground">{q}</p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  />
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
