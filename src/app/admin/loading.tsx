import { ChartSkeleton, KpiSkeleton, TableSkeleton } from "@/components/admin/AdminSkeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading admin content">
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-surface-elevated/80" />
        <div className="h-4 w-72 animate-pulse rounded-lg bg-surface-elevated/60" />
      </div>
      <KpiSkeleton />
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <TableSkeleton />
    </div>
  );
}
