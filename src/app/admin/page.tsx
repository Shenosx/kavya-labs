import { KpiCards } from "@/components/admin/KpiCards";
import { GrowthChart } from "@/components/admin/GrowthChart";
import { ActivityOverviewChart } from "@/components/admin/ActivityOverviewChart";
import { RecentActivityList } from "@/components/admin/RecentActivityList";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Overview
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Monitor Kavya Labs activity, users, and growth.
        </p>
      </div>

      <KpiCards />

      <div className="grid gap-6 xl:grid-cols-2">
        <GrowthChart />
        <ActivityOverviewChart />
      </div>

      <RecentActivityList />
    </div>
  );
}
