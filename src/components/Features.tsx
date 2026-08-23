import {
  IconCollaboration,
  IconProgress,
  IconProjects,
  IconTasks,
} from "@/components/icons";
import { SECTIONS } from "@/lib/sections";

const features = [
  {
    icon: IconProjects,
    title: "Projects, organized",
    description:
      "Keep projects, milestones, and deliverables structured in one clear workspace.",
  },
  {
    icon: IconTasks,
    title: "Tasks that stay on track",
    description:
      "Create priorities, assign owners, and see exactly what needs attention next.",
  },
  {
    icon: IconCollaboration,
    title: "Built for collaboration",
    description:
      "Keep conversations, updates, and work context connected instead of scattered across tools.",
  },
  {
    icon: IconProgress,
    title: "Progress at a glance",
    description:
      "Understand project health and team progress without digging through spreadsheets.",
  },
];

export function Features() {
  return (
    <section
      id={SECTIONS.features}
      aria-labelledby="features-heading"
      className="section-anchor section-spacing"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="features-heading"
            className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Features
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Everything your team needs to stay in flow.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <li key={feature.title}>
                <article className="group h-full rounded-xl border border-border bg-surface-elevated/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-elevated/70 hover:shadow-card focus-within:border-accent/30 focus-within:shadow-card">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-accent-soft text-accent transition-colors group-hover:border-accent/30 group-hover:bg-accent/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
