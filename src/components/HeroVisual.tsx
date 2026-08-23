export function HeroVisual() {
  const tasks = [
    { label: "Define launch milestones", priority: "High", done: true },
    { label: "Review design handoff", priority: "Medium", done: false },
    { label: "Assign sprint owners", priority: "High", done: false },
  ];

  const team = ["A", "M", "S", "J"];

  return (
    <div
      className="relative w-full lg:ml-auto"
      role="img"
      aria-label="TaskFlow dashboard preview showing projects, tasks, progress, and team members"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-glow backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_0_80px_rgba(124,108,240,0.2)]">
        <div className="flex items-center gap-2 border-b border-border bg-surface-elevated/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="ml-2 text-xs font-medium text-muted">TaskFlow workspace</span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[140px_1fr]">
          <aside className="hidden border-r border-border bg-surface-elevated/30 p-4 sm:block" aria-hidden="true">
            <p className="text-[0.625rem] font-semibold uppercase tracking-widest text-muted">
              Projects
            </p>
            <ul className="mt-3 space-y-2">
              {["Product launch", "Website refresh", "Q2 roadmap"].map((project, i) => (
                <li
                  key={project}
                  className={`rounded-md px-2 py-1.5 text-xs ${
                    i === 0
                      ? "bg-accent-soft font-medium text-foreground"
                      : "text-muted"
                  }`}
                >
                  {project}
                </li>
              ))}
            </ul>
          </aside>

          <div className="p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-accent">
                  Project
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">Product launch</p>
              </div>
              <div className="flex -space-x-2" aria-hidden="true">
                {team.map((initial) => (
                  <span
                    key={initial}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface-elevated text-[0.625rem] font-semibold text-foreground"
                  >
                    {initial}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted">Progress</span>
                <span className="font-medium text-foreground">68%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-elevated">
                <div
                  className="h-full w-[68%] rounded-full bg-gradient-to-r from-accent to-[#6366f1] animate-pulse-soft"
                  aria-hidden="true"
                />
              </div>
            </div>

            <p className="mt-5 text-[0.625rem] font-semibold uppercase tracking-widest text-muted">
              Tasks
            </p>
            <ul className="mt-2 space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.label}
                  className="flex items-center gap-3 rounded-lg border border-border bg-background/50 px-3 py-2.5 transition-colors hover:border-accent/20"
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      task.done
                        ? "border-accent bg-accent text-white"
                        : "border-border-strong"
                    }`}
                    aria-hidden="true"
                  >
                    {task.done && (
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                        <path
                          d="M2.5 6l2.5 2.5 4.5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`min-w-0 flex-1 truncate text-xs ${
                      task.done ? "text-muted line-through" : "text-foreground"
                    }`}
                  >
                    {task.label}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[0.625rem] font-medium ${
                      task.priority === "High"
                        ? "bg-accent/20 text-accent"
                        : "bg-surface-elevated text-muted"
                    }`}
                  >
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-2 top-8 h-16 w-16 rounded-full bg-accent/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-8 -left-4 h-20 w-20 rounded-full bg-[#6366f1]/10 blur-3xl" />
    </div>
  );
}
