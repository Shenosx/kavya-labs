import { LogoMark } from "@/components/icons";
import { FOOTER_LINKS, PRODUCT_NAME, SECTIONS } from "@/lib/sections";

export function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-border bg-surface/50">
      <div className="section-container py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href={`#${SECTIONS.hero}`}
              className="inline-flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={`${PRODUCT_NAME} — back to top`}
            >
              <LogoMark className="h-8 w-8" />
              <span className="text-base font-semibold tracking-tight">
                {PRODUCT_NAME}
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-[1.65] text-muted">
              Focused project management for modern teams.
            </p>
          </div>

          <nav
            aria-labelledby="footer-links-heading"
            className="sm:col-span-2 lg:col-span-2"
          >
            <h2 id="footer-links-heading" className="text-sm font-semibold text-foreground">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {FOOTER_LINKS.map((link) => (
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

        <div className="mt-10 border-t border-border pt-7 sm:mt-12 sm:pt-8">
          <p className="text-sm text-muted">
            © 2026 TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
