"use client";

import { useEffect, useRef } from "react";
import { IconClose } from "@/components/icons";
import type { DemoUser } from "@/lib/admin-data";
import { formatDate, formatRelativeTime } from "@/lib/admin-data";

type UserProfileDrawerProps = {
  user: DemoUser | null;
  onClose: () => void;
};

export function UserProfileDrawer({ user, onClose }: UserProfileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [user, onClose]);

  if (!user) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-50 bg-black/60"
        aria-label="Close profile drawer"
        onClick={onClose}
      />
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-user-name"
        tabIndex={-1}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-surface shadow-card outline-none"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="drawer-user-name" className="text-lg font-semibold text-foreground">
            User profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Close drawer"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-accent-soft text-base font-semibold text-accent">
              {user.initials}
            </span>
            <div>
              <p className="text-lg font-semibold text-foreground">{user.name}</p>
              <p className="text-sm text-muted">{user.email}</p>
            </div>
          </div>

          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted">Role</dt>
              <dd className="mt-1 text-sm text-foreground">{user.role}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted">Status</dt>
              <dd className="mt-1 text-sm text-foreground">{user.status}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted">Joined</dt>
              <dd className="mt-1 text-sm text-foreground">{formatDate(user.joined)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                Last active
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatRelativeTime(user.lastActive)}
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-foreground">Recent activity</h3>
            <ul className="mt-3 space-y-2">
              {user.recentActivity.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-background/50 px-3 py-2 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
