/** Server-only admin access configuration */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const admins = getAdminEmails();
  if (admins.length === 0) return false;
  return admins.includes(email.toLowerCase());
}

export const ADMIN_ROUTES = {
  overview: "/admin",
  users: "/admin/users",
  analytics: "/admin/analytics",
  settings: "/admin/settings",
} as const;

export type AdminNavItem = {
  label: string;
  href: string;
  description?: string;
};

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Overview", href: ADMIN_ROUTES.overview, description: "KPIs and activity" },
  { label: "Users", href: ADMIN_ROUTES.users, description: "Manage users" },
  { label: "Analytics", href: ADMIN_ROUTES.analytics, description: "Growth metrics" },
  { label: "Settings", href: ADMIN_ROUTES.settings, description: "Workspace settings" },
];

export const ADMIN_PAGE_TITLES: Record<string, string> = {
  "/admin": "Overview",
  "/admin/users": "Users",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
};
