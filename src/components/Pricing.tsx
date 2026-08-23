import { Button } from "@/components/ui/Button";
import { SECTIONS } from "@/lib/sections";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    description: "For individuals getting started with task management.",
    features: ["Up to 3 projects", "Unlimited tasks", "Basic collaboration"],
    recommended: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/ user / month",
    description: "For growing teams that need more control and visibility.",
    features: [
      "Unlimited projects",
      "Priority support",
      "Advanced reporting",
      "Team permissions",
    ],
    recommended: true,
  },
  {
    name: "Team",
    price: "$24",
    period: "/ user / month",
    description: "For organizations managing work at scale.",
    features: [
      "Everything in Pro",
      "Admin controls",
      "Custom workflows",
      "Dedicated onboarding",
    ],
    recommended: false,
  },
];

export function Pricing() {
  return (
    <section
      id={SECTIONS.pricing}
      aria-labelledby="pricing-heading"
      className="section-anchor section-spacing"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-heading"
            className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Simple pricing. No surprises.
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Choose the plan that fits your team.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <li key={plan.name}>
              <article
                className={`relative flex h-full flex-col rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-7 ${
                  plan.recommended
                    ? "border-accent/40 bg-surface-elevated/70 shadow-glow"
                    : "border-border bg-surface-elevated/40 hover:border-accent/20"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    Recommended
                  </span>
                )}

                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted">{plan.period}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {plan.description}
                </p>

                <ul className="mt-6 flex-1 space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8.5 6.5 12 13 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href={`#${SECTIONS.cta}`}
                    variant={plan.recommended ? "primary" : "secondary"}
                    className="w-full"
                  >
                    Start free
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
