import { SECTIONS } from "@/lib/sections";

const testimonials = [
  {
    quote:
      "TaskFlow gave our team one place to plan sprints, assign work, and follow progress without switching tools.",
    name: "Jordan Lee",
    role: "Product Lead, Example Studio",
  },
  {
    quote:
      "We finally stopped losing tasks in chat threads. Priorities are clear and everyone knows what comes next.",
    name: "Sam Rivera",
    role: "Operations Manager, Demo Co.",
  },
  {
    quote:
      "The workspace feels focused. Projects, owners, and status are visible at a glance — exactly what we needed.",
    name: "Alex Chen",
    role: "Engineering Manager, Sample Labs",
  },
];

export function Testimonials() {
  return (
    <section
      id={SECTIONS.testimonials}
      aria-labelledby="testimonials-heading"
      className="section-anchor section-spacing border-y border-border bg-surface/30"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="testimonials-heading"
            className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Teams work better with clarity.
          </h2>
          <p className="mt-3 text-sm text-muted">
            Example customer quotes for demonstration purposes only.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {testimonials.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col rounded-xl border border-border bg-background/60 p-6 transition-all duration-300 hover:border-accent/20 hover:bg-surface-elevated/50">
                <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
