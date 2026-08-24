import { auth } from "@/auth";
import { DashboardSummaryCards } from "@/components/workspace/DashboardSummaryCards";
import { getDashboardSummaryWithSeed } from "@/lib/tasks-db";
import { requireAuthenticatedUser } from "@/lib/auth-user";

const recentActivity = [
  {
    title: "Design system audit marked complete",
    detail: "Product launch · Updated by Alex Chen",
    time: "2 hours ago",
  },
  {
    title: "New task assigned: API integration review",
    detail: "Platform rebuild · Assigned to Jordan Lee",
    time: "4 hours ago",
  },
  {
    title: "Sprint planning notes added",
    detail: "Q2 roadmap · Updated by Sam Rivera",
    time: "Yesterday",
  },
  {
    title: "Project milestone reached: Beta release",
    detail: "Customer portal · Completed by the team",
    time: "2 days ago",
  },
];

export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  let summaryCards = [
    { label: "Active projects", value: "0", href: "/projects?filter=active" },
    { label: "Open tasks", value: "0", href: "/tasks?filter=open" },
    { label: "Completed tasks", value: "0", href: "/tasks?filter=done" },
  ];

  try {
    const user = await requireAuthenticatedUser();
    if (user) {
      const summary = await getDashboardSummaryWithSeed(user.id);
      summaryCards = [
        {
          label: "Active projects",
          value: String(summary.activeProjects),
          href: "/projects?filter=active",
        },
        {
          label: "Open tasks",
          value: String(summary.openTasks),
          href: "/tasks?filter=open",
        },
        {
          label: "Completed tasks",
          value: String(summary.completedTasks),
          href: "/tasks?filter=done",
        },
      ];
    }
  } catch {
    // Keep zero values if the database is unavailable.
  }

  return (
    <div className="space-y-8">
      <section aria-labelledby="dashboard-welcome-heading">
        <h1
          id="dashboard-welcome-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Welcome back, {firstName}
        </h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Your workspace is ready.
        </p>
      </section>

      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">
          Workspace summary
        </h2>
        <DashboardSummaryCards cards={summaryCards} />
      </section>

      <section aria-labelledby="activity-heading">
        <h2
          id="activity-heading"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Recent activity
        </h2>
        <ul className="mt-4 space-y-3">
          {recentActivity.map((item) => (
            <li key={item.title}>
              <article className="rounded-xl border border-border bg-surface-elevated/30 px-4 py-4 transition-colors hover:border-accent/20 hover:bg-surface-elevated/50 sm:px-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{item.detail}</p>
                  </div>
                  <p className="shrink-0 text-xs text-muted">{item.time}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
