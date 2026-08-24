export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-surface-elevated/80 ${className}`}
      aria-hidden="true"
    />
  );
}

export function KpiSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true" aria-label="Loading metrics">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-surface-elevated/30 p-5">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="mt-4 h-8 w-20" />
          <SkeletonBlock className="mt-3 h-3 w-16" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div
      className="rounded-xl border border-border bg-surface-elevated/30 p-6"
      aria-busy="true"
      aria-label="Loading chart"
    >
      <SkeletonBlock className="h-5 w-32" />
      <SkeletonBlock className="mt-2 h-4 w-48" />
      <SkeletonBlock className="mt-8 h-48 w-full" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading users">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBlock key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}
