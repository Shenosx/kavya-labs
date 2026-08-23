import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/HeroVisual";
import { SECTIONS } from "@/lib/sections";

export function Hero() {
  return (
    <section
      id={SECTIONS.hero}
      aria-labelledby="hero-heading"
      className="section-anchor relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 surface-grid opacity-40"
        aria-hidden="true"
      />

      <div className="section-container relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="max-w-xl">
            <p className="animate-fade-up mb-4 text-[0.6875rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-accent sm:mb-5 sm:text-xs sm:tracking-[0.2em]">
              PROJECT MANAGEMENT · BUILT FOR MODERN TEAMS
            </p>

            <h1
              id="hero-heading"
              className="animate-fade-up-delay-1 text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-5xl sm:leading-[1.08] lg:text-[3.25rem]"
            >
              Move work forward,{" "}
              <span className="gradient-text">without the busywork.</span>
            </h1>

            <p className="animate-fade-up-delay-2 mt-5 max-w-lg text-[0.9375rem] leading-[1.65] text-muted sm:mt-6 sm:text-lg sm:leading-relaxed">
              TaskFlow brings projects, tasks, priorities, and team collaboration
              into one focused workspace.
            </p>

            <div className="animate-fade-up-delay-3 mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <Button href={`#${SECTIONS.cta}`} size="lg">
                Get started
              </Button>
              <Button href={`#${SECTIONS.howItWorks}`} variant="secondary" size="lg">
                See how it works
              </Button>
            </div>
          </div>

          <div className="animate-fade-up-delay-2 relative mx-auto w-full max-w-[min(100%,520px)] lg:max-w-none">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
