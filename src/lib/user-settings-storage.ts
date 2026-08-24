export const USER_SETTINGS_KEYS = {
  emailNotifications: "kavya-user-email-notifications",
  productUpdates: "kavya-user-product-updates",
  compactLayout: "kavya-user-compact-layout",
} as const;

export const USER_SETTINGS_DEFAULTS = {
  emailNotifications: true,
  productUpdates: true,
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
