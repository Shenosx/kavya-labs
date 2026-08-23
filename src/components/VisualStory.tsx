import { SECTIONS } from "@/lib/sections";

const pipelineSteps = [
  {
    id: "input",
    label: "Input",
    description: "Signals, data, and context from the real world.",
  },
  {
    id: "intelligence",
    label: "Intelligence",
    description: "Models and systems that understand patterns.",
  },
  {
    id: "insight",
    label: "Insight",
    description: "Clear outputs that inform better decisions.",
  },
  {
    id: "action",
    label: "Action",
    description: "Experiences that drive meaningful outcomes.",
  },
];

export function VisualStory() {
  return (
    <section
      id={SECTIONS.story}
      aria-labelledby="story-heading"
      className="section-anchor section-spacing border-y border-border bg-surface/30"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="story-heading"
            className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            From complex systems to clear experiences.
          </h2>
        </div>

        <div className="relative mt-14">
          {/* Connection line — desktop */}
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block"
            aria-hidden="true"
          />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {pipelineSteps.map((step, index) => (
              <li key={step.id} className="relative">
                <article className="group h-full rounded-xl border border-border bg-background/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/25 hover:bg-surface-elevated/50 hover:shadow-soft">
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-0 rounded-full bg-accent/20 blur-md transition-opacity group-hover:opacity-100 opacity-60" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-accent animate-pulse-soft" />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-widest text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </article>

                {/* Mobile connector arrow */}
                {index < pipelineSteps.length - 1 && (
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

          {/* Abstract system visualization */}
          <div
            className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface-elevated/30 p-6 sm:p-8"
            aria-hidden="true"
          >
            <svg
              className="h-auto w-full"
              viewBox="0 0 600 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 60 H140 M460 60 H560"
                stroke="rgba(124,108,240,0.3)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              <rect
                x="140"
                y="30"
                width="80"
                height="60"
                rx="8"
                stroke="rgba(255,255,255,0.12)"
                fill="rgba(124,108,240,0.08)"
              />
              <rect
                x="260"
                y="20"
                width="80"
                height="80"
                rx="12"
                stroke="rgba(124,108,240,0.35)"
                fill="rgba(124,108,240,0.12)"
              />
              <rect
                x="380"
                y="30"
                width="80"
                height="60"
                rx="8"
                stroke="rgba(255,255,255,0.12)"
                fill="rgba(99,179,237,0.06)"
              />
              <circle cx="180" cy="60" r="4" fill="#7c6cf0" />
              <circle cx="300" cy="60" r="6" fill="#7c6cf0" className="animate-pulse-soft" />
              <circle cx="420" cy="60" r="4" fill="#f4f5f7" />
              <path
                d="M220 60 L260 60 M340 60 L380 60"
                stroke="rgba(124,108,240,0.4)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
