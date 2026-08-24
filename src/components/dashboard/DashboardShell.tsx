"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/icons";
import { UserMenu } from "@/components/dashboard/UserMenu";
import type { SessionUser } from "@/lib/auth-routes";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Tasks", href: "/tasks" },
  { label: "Settings", href: "/settings" },
];

type DashboardShellProps = {
  user: SessionUser;
  children: React.ReactNode;
};

export function DashboardShell({ user, children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Kavya Labs dashboard home"
          >
            <LogoMark className="h-8 w-8" />
            <span className="text-base font-semibold tracking-tight text-foreground">
              Kavya Labs
            </span>
          </Link>
          <UserMenu user={user} />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 sm:px-6 lg:flex-row lg:gap-8 lg:px-8 lg:py-8">
        <aside className="lg:w-56 lg:shrink-0">
          <nav aria-label="Dashboard navigation">
            <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label} className="shrink-0">
                    <Link
                      href={item.href}
                      className={`block whitespace-nowrap rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
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
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
