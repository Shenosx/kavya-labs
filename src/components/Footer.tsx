import { LogoMark } from "@/components/icons";
import {
  FOOTER_COMPANY_LINKS,
  FOOTER_PRODUCT_LINKS,
  SECTIONS,
} from "@/lib/sections";

export function Footer() {
  return (
    <footer
      id={SECTIONS.about}
      aria-label="Site footer"
      className="section-anchor border-t border-border bg-surface/50"
    >
      <div className="section-container py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <a
              href={`#${SECTIONS.top}`}
              className="inline-flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Kavya Labs — back to top"
            >
              <LogoMark className="h-8 w-8" />
              <span className="text-base font-semibold tracking-tight">
                Kavya Labs
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-[1.65] text-muted">
              We build intelligent digital products that turn complex problems
              into simple, scalable experiences for teams ready to move forward.
            </p>
          </div>

          <nav aria-labelledby="footer-product-heading">
            <h2
              id="footer-product-heading"
              className="text-sm font-semibold text-foreground"
            >
              Product
            </h2>
            <ul className="mt-4 space-y-3">
              {FOOTER_PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground focus-visible:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company-heading">
            <h2
              id="footer-company-heading"
              className="text-sm font-semibold text-foreground"
            >
              Company
            </h2>
            <ul className="mt-4 space-y-3">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground focus-visible:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-7 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
          <p className="text-sm text-muted">
            © 2026 Kavya Labs. All rights reserved.
          </p>
          <p className="text-sm text-muted">Founded by Rohan Mehta</p>
        </div>
      </div>
    </footer>
  );
}
