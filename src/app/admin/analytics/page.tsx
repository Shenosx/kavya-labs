"use client";

import { useMemo, useState } from "react";
import { GrowthChart } from "@/components/admin/GrowthChart";
import { ActivityOverviewChart } from "@/components/admin/ActivityOverviewChart";
import type { DateRangeKey } from "@/lib/admin-data";
import { getSignupSummary } from "@/lib/admin-data";

const ranges: { key: DateRangeKey; label: string }[] = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
];

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<DateRangeKey>("30d");
  const summary = useMemo(() => getSignupSummary(range), [range]);

  const subtitle =
    range === "7d"
      ? "New users over the last 7 days"
      : range === "30d"
        ? "New users over the last 30 days"
        : "New users over the last 90 days";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Analytics
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Understand how your workspace is growing.
          </p>
        </div>

        <fieldset>
          <legend className="sr-only">Date range</legend>
          <div className="inline-flex rounded-lg border border-border p-1">
            {ranges.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={range === item.key}
                onClick={() => setRange(item.key)}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  range === item.key
                    ? "bg-accent-soft font-medium text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <ul className="grid gap-4 sm:grid-cols-3">
        <li className="rounded-xl border border-border bg-surface-elevated/40 p-5">
          <p className="text-sm text-muted">Total signups</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{summary.total}</p>
        </li>
        <li className="rounded-xl border border-border bg-surface-elevated/40 p-5">
          <p className="text-sm text-muted">Daily average</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{summary.average}</p>
        </li>
        <li className="rounded-xl border border-border bg-surface-elevated/40 p-5">
          <p className="text-sm text-muted">Peak day</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{summary.peak}</p>
        </li>
      </ul>

      <GrowthChart range={range} subtitle={subtitle} />
      <ActivityOverviewChart range={range} />

      <section className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6">
        <h3 className="text-base font-semibold text-foreground">Engagement snapshot</h3>
        <p className="mt-2 text-sm text-muted">
          Demo metrics for the selected {range === "7d" ? "7-day" : range === "30d" ? "30-day" : "90-day"} period.
          Engagement remains strong across active workspaces with consistent session growth.
        </p>
      </section>
    </div>
  );
}
