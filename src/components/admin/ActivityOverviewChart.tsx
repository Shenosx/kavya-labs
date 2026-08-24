"use client";

import { useMemo } from "react";
import type { DateRangeKey } from "@/lib/admin-data";
import { getActivityOverview } from "@/lib/admin-data";

type ActivityOverviewChartProps = {
  range?: DateRangeKey;
};

export function ActivityOverviewChart({ range = "30d" }: ActivityOverviewChartProps) {
  const data = useMemo(() => getActivityOverview(range), [range]);
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const barHeight = 160;

  return (
    <section
      className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6"
      aria-labelledby="activity-overview-title"
    >
      <div className="mb-6">
        <h2 id="activity-overview-title" className="text-base font-semibold text-foreground">
          Activity overview
        </h2>
        <p className="mt-1 text-sm text-muted">
          Active users, sessions, projects, and completed tasks
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {data.map((item) => {
          const height = Math.max((item.value / maxValue) * barHeight, 8);
          return (
            <div key={item.label} className="flex flex-col items-center text-center">
              <div
                className="flex w-full items-end justify-center"
                style={{ height: barHeight }}
                aria-hidden="true"
              >
                <div
                  className="w-full max-w-[3rem] rounded-t-md bg-gradient-to-t from-accent/80 to-accent/40 transition-all duration-300 hover:from-accent hover:to-accent/60"
                  style={{ height }}
                />
              </div>
              <p className="mt-3 text-lg font-semibold text-foreground">
                {item.value.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-muted">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
