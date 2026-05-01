"use client";

import { BookOpen, Bookmark, Flame, Heart, Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/read", label: "Read", icon: BookOpen },
  { href: "/search", label: "Search", icon: Search },
  { href: "/plans", label: "Plans", icon: Heart },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/progress", label: "Progress", icon: Flame },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Scripture<span className="text-primary">Simplified</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
