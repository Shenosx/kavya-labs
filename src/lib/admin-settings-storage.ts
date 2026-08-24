export const ADMIN_SETTINGS_KEYS = {
  emailAlerts: "kavya-admin-email-alerts",
  weeklyDigest: "kavya-admin-weekly-digest",
  compactLayout: "kavya-admin-compact-layout",
} as const;

export const ADMIN_SETTINGS_DEFAULTS = {
  emailAlerts: true,
  weeklyDigest: true,
  compactLayout: false,
} as const;

export function readStoredBoolean(key: string, defaultValue: boolean): boolean {
  try {
    const stored = localStorage.getItem(key);
    if (stored === "true") return true;
    if (stored === "false") return false;
  } catch {
    // localStorage may be unavailable
  }
  return defaultValue;
}

export function writeStoredBoolean(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // localStorage may be unavailable
  }
}
