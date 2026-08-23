"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { AUTH_ROUTES, type SessionUser } from "@/lib/auth-routes";

type UserMenuProps = {
  user: SessionUser;
};

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="flex items-center gap-3 rounded-lg border border-border bg-surface-elevated/50 px-2 py-1.5 transition-colors hover:border-accent/30 hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open account menu"
        onClick={() => setOpen((value) => !value)}
      >
        {user.image ? (
          <Image
            src={user.image}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
            {initials}
          </span>
        )}
        <span className="hidden min-w-0 text-left sm:block">
          <span className="block truncate text-sm font-medium text-foreground">
            {user.name ?? "Account"}
          </span>
          <span className="block truncate text-xs text-muted">{user.email}</span>
        </span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[12rem] rounded-xl border border-border bg-surface-elevated p-2 shadow-card"
        >
          <div className="border-b border-border px-3 py-2 sm:hidden">
            <p className="truncate text-sm font-medium text-foreground">
              {user.name ?? "Account"}
            </p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>
          <Link
            href={AUTH_ROUTES.dashboard}
            role="menuitem"
            className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            Account
          </Link>
          <button
            type="button"
            role="menuitem"
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            onClick={() => signOut({ callbackUrl: AUTH_ROUTES.signIn })}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
