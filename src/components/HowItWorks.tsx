import { SECTIONS } from "@/lib/sections";

const steps = [
  {
    id: "plan",
    label: "Plan",
    description: "Set up projects, milestones, and deliverables in one workspace.",
  },
  {
    id: "prioritize",
    label: "Prioritize",
    description: "Assign tasks, set priorities, and clarify what matters most.",
  },
  {
    id: "collaborate",
    label: "Collaborate",
    description: "Keep updates, comments, and context connected to the work.",
  },
  {
    id: "deliver",
    label: "Deliver",
    description: "Track progress and move projects forward with confidence.",
  },
];

export function HowItWorks() {
  return (
    <section
      id={SECTIONS.howItWorks}
      aria-labelledby="how-it-works-heading"
      className="section-anchor section-spacing border-y border-border bg-surface/30"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-it-works-heading"
            className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            From planning to progress.
          </h2>
        </div>

        <div className="relative mt-14">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block"
            aria-hidden="true"
          />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, index) => (
              <li key={step.id} className="relative">
                <article className="group h-full rounded-xl border border-border bg-background/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/25 hover:bg-surface-elevated/50 hover:shadow-soft">
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-0 rounded-full bg-accent/20 blur-md opacity-60 transition-opacity group-hover:opacity-100" />
                      <span className="relative text-xs font-semibold text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </article>

                {index < steps.length - 1 && (
                  <div
                    className="flex justify-center py-2 lg:hidden"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-6 w-6 text-accent/40"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 5v14M6 13l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
