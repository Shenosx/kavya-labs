"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu } from "@/components/icons";
import { ADMIN_NAV, ADMIN_PAGE_TITLES } from "@/lib/admin";
import type { SessionUser } from "@/lib/auth-routes";

type AdminHeaderProps = {
  user: SessionUser;
  onMenuOpen: () => void;
};

export function AdminHeader({ user, onMenuOpen }: AdminHeaderProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const pageTitle = ADMIN_PAGE_TITLES[pathname] ?? "Admin";

  const suggestions = useMemo(() => {
    if (!query.trim()) return ADMIN_NAV;
    const q = query.toLowerCase();
    return ADMIN_NAV.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q),
    );
  }, [query]);

  const initials =
    user.name
      ?.split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "A";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground lg:hidden"
          aria-label="Open navigation menu"
          onClick={onMenuOpen}
        >
          <IconMenu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {pageTitle}
          </h1>
        </div>

        <div className="relative hidden sm:block" ref={searchRef}>
          <label htmlFor="admin-search" className="sr-only">
            Search admin navigation
          </label>
          <input
            id="admin-search"
            type="search"
            placeholder="Search admin..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => window.setTimeout(() => setSearchOpen(false), 150)}
            className="h-10 w-48 rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground placeholder:text-muted transition-colors focus:border-accent/40 focus:bg-surface-elevated focus:outline-none lg:w-64"
          />
          {searchOpen && suggestions.length > 0 && (
            <ul
              role="listbox"
              aria-label="Navigation suggestions"
              className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-64 rounded-xl border border-border bg-surface-elevated p-2 shadow-card"
            >
              {suggestions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    role="option"
                    className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <span className="font-medium text-foreground">{item.label}</span>
                    {item.description && (
                      <span className="mt-0.5 block text-xs text-muted">
                        {item.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className="relative hidden h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/30 hover:text-foreground sm:inline-flex"
          aria-label="Notifications (demo)"
        >
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="hidden items-center gap-2 sm:flex" aria-label="Admin profile">
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border border-border object-cover"
            />
          ) : (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
              {initials}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
