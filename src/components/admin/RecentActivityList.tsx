import { RECENT_ACTIVITY, formatRelativeTime } from "@/lib/admin-data";

export function RecentActivityList() {
  if (RECENT_ACTIVITY.length === 0) {
    return (
      <section className="rounded-xl border border-border bg-surface-elevated/30 p-8 text-center">
        <p className="text-sm font-medium text-foreground">No recent activity</p>
        <p className="mt-2 text-sm text-muted">Activity will appear here as users interact.</p>
      </section>
    );
  }

  return (
    <section
      className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6"
      aria-labelledby="recent-activity-title"
    >
      <h2 id="recent-activity-title" className="text-base font-semibold text-foreground">
        Recent activity
      </h2>
      <ul className="mt-4 space-y-3">
        {RECENT_ACTIVITY.map((event) => (
          <li key={event.id}>
            <article className="flex items-start gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-border hover:bg-white/[0.02]">
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-xs font-semibold text-accent"
                aria-hidden="true"
              >
                {event.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">{event.description}</p>
                <p className="mt-1 text-xs text-muted">
                  <time dateTime={event.timestamp}>{formatRelativeTime(event.timestamp)}</time>
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
