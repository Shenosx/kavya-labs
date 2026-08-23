import { Button } from "@/components/ui/Button";
import { CONTACT_MAILTO, SECTIONS } from "@/lib/sections";

export function CtaSection() {
  return (
    <section
      id={SECTIONS.contact}
      aria-labelledby="cta-heading"
      className="section-anchor section-spacing"
    >
      <div className="section-container">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated/50 px-5 py-12 text-center transition-shadow duration-300 hover:shadow-glow sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(124,108,240,0.15),transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-xl">
            <h2
              id="cta-heading"
              className="text-balance text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] sm:text-4xl"
            >
              Let&apos;s build what&apos;s next.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.65] text-muted sm:text-lg sm:leading-relaxed">
              Have a complex idea worth simplifying? Let&apos;s turn it into a
              product people want to use.
            </p>
            <div className="mt-8">
              <Button href={CONTACT_MAILTO} size="lg">
                Start a conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
