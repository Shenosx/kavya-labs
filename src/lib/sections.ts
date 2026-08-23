/** Shared section anchors for navigation and in-page links */
export const SECTIONS = {
  top: "top",
  features: "features",
  story: "story",
  about: "about",
  contact: "contact",
} as const;

export const NAV_LINKS = [
  { label: "Product", href: `#${SECTIONS.features}` },
  { label: "Solutions", href: `#${SECTIONS.story}` },
  { label: "Company", href: `#${SECTIONS.about}` },
  { label: "Contact", href: `#${SECTIONS.contact}` },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { label: "Features", href: `#${SECTIONS.features}` },
  { label: "How it works", href: `#${SECTIONS.story}` },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: "About", href: `#${SECTIONS.about}` },
  { label: "Contact", href: `#${SECTIONS.contact}` },
] as const;

/** Safe mailto without inventing a company email address */
export const CONTACT_MAILTO =
  "mailto:?subject=Kavya%20Labs%20%E2%80%94%20Project%20Inquiry&body=Hello%20Kavya%20Labs%20team%2C%0A%0A";
