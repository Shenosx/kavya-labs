"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { LogoMark, IconClose } from "@/components/icons";
import { AdminToastProvider } from "@/components/admin/AdminToast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AUTH_ROUTES } from "@/lib/auth-routes";
import { ADMIN_NAV } from "@/lib/admin";
import type { SessionUser } from "@/lib/auth-routes";

type AdminShellProps = {
  user: SessionUser;
  children: React.ReactNode;
};

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const initials =
    user.name
      ?.split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "A";

  return (
    <AdminToastProvider>
      <div className="flex min-h-screen bg-background">
        {mobileOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Admin navigation"
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <LogoMark className="h-8 w-8" />
              <span className="text-sm font-semibold tracking-tight">Kavya Labs</span>
            </Link>
            <button
              type="button"
              className="rounded-lg p-1 text-muted hover:text-foreground lg:hidden"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {ADMIN_NAV.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        isActive
                          ? "bg-accent-soft font-medium text-foreground"
                          : "text-muted hover:bg-white/5 hover:text-foreground"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-border pt-4">
              <Link
                href={AUTH_ROUTES.dashboard}
                className="block rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              >
                Back to Workspace
              </Link>
            </div>
          </nav>

          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              {user.image ? (
                <Image
                  src={user.image}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                  {initials}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {user.name ?? "Admin"}
                </p>
                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: AUTH_ROUTES.signIn })}
              className="mt-3 w-full rounded-lg border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-accent/30 hover:bg-white/5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader user={user} onMenuOpen={() => setMobileOpen(true)} />
          <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </AdminToastProvider>
  );
}
