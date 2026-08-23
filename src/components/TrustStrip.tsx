const metrics = [
  { label: "Projects & tasks", description: "Organized in one workspace" },
  { label: "Built for teams", description: "Collaborate with clarity" },
  { label: "Progress tracking", description: "See what needs attention" },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Product highlights"
      className="border-y border-border bg-surface/40"
    >
      <div className="section-container py-7 sm:py-9">
        <ul className="grid gap-5 sm:grid-cols-3 sm:gap-6">
          {metrics.map((metric, index) => (
            <li
              key={metric.label}
              className={`flex flex-col items-start gap-1 ${
                index > 0 ? "sm:border-l sm:border-border sm:pl-8" : ""
              }`}
            >
              <span className="text-sm font-semibold tracking-wide text-foreground">
                {metric.label}
              </span>
              <span className="text-sm text-muted">{metric.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
