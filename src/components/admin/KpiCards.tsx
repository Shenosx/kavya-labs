import { KPI_METRICS } from "@/lib/admin-data";
import type { ReactNode } from "react";

const icons: Record<string, ReactNode> = {
  "total-users": (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 8h5M18.5 5.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "active-users": (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "new-signups": (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  engagement: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 16V12M12 16V9M16 16V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export function KpiCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {KPI_METRICS.map((metric) => (
        <li key={metric.id}>
          <article className="rounded-xl border border-border bg-surface-elevated/40 p-5 transition-all duration-300 hover:border-accent/25 hover:bg-surface-elevated/60 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-muted">{metric.label}</p>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-accent-soft text-accent">
                {icons[metric.id]}
              </span>
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              {metric.value}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-sm">
              <span
                className="font-medium text-emerald-400"
                aria-label={`Trend ${metric.trend}`}
              >
                {metric.change}
              </span>
              <span className="text-muted" aria-hidden="true">
                vs last period
              </span>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
