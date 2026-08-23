/** Shared section anchors for navigation and in-page links */
export const SECTIONS = {
  hero: "hero",
  features: "features",
  howItWorks: "how-it-works",
  pricing: "pricing",
  testimonials: "testimonials",
  cta: "cta",
} as const;

export const NAV_LINKS = [
  { label: "Product", href: `#${SECTIONS.hero}` },
  { label: "Features", href: `#${SECTIONS.features}` },
  { label: "How it works", href: `#${SECTIONS.howItWorks}` },
  { label: "Pricing", href: `#${SECTIONS.pricing}` },
  { label: "Contact", href: `#${SECTIONS.cta}` },
] as const;

export const FOOTER_LINKS = [
  { label: "Product", href: `#${SECTIONS.hero}` },
  { label: "Features", href: `#${SECTIONS.features}` },
  { label: "How it works", href: `#${SECTIONS.howItWorks}` },
  { label: "Pricing", href: `#${SECTIONS.pricing}` },
  { label: "Contact", href: `#${SECTIONS.cta}` },
] as const;

export const PRODUCT_NAME = "TaskFlow";
