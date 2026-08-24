"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ADMIN_SETTINGS_DEFAULTS,
  ADMIN_SETTINGS_KEYS,
  readStoredBoolean,
  writeStoredBoolean,
} from "@/lib/admin-settings-storage";

export default function AdminSettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("Kavya Labs");
  const [emailAlerts, setEmailAlerts] = useState<boolean>(
    ADMIN_SETTINGS_DEFAULTS.emailAlerts,
  );
  const [weeklyDigest, setWeeklyDigest] = useState<boolean>(
    ADMIN_SETTINGS_DEFAULTS.weeklyDigest,
  );
  const [compactMode, setCompactMode] = useState<boolean>(
    ADMIN_SETTINGS_DEFAULTS.compactLayout,
  );

  useEffect(() => {
    setEmailAlerts(
      readStoredBoolean(
        ADMIN_SETTINGS_KEYS.emailAlerts,
        ADMIN_SETTINGS_DEFAULTS.emailAlerts,
      ),
    );
    setWeeklyDigest(
      readStoredBoolean(
        ADMIN_SETTINGS_KEYS.weeklyDigest,
        ADMIN_SETTINGS_DEFAULTS.weeklyDigest,
      ),
    );
    setCompactMode(
      readStoredBoolean(
        ADMIN_SETTINGS_KEYS.compactLayout,
        ADMIN_SETTINGS_DEFAULTS.compactLayout,
      ),
    );
  }, []);

  const handleEmailAlertsChange = useCallback((value: boolean) => {
    setEmailAlerts(value);
    writeStoredBoolean(ADMIN_SETTINGS_KEYS.emailAlerts, value);
  }, []);

  const handleWeeklyDigestChange = useCallback((value: boolean) => {
    setWeeklyDigest(value);
    writeStoredBoolean(ADMIN_SETTINGS_KEYS.weeklyDigest, value);
  }, []);

  const handleCompactModeChange = useCallback((value: boolean) => {
    setCompactMode(value);
    writeStoredBoolean(ADMIN_SETTINGS_KEYS.compactLayout, value);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Configure demo workspace preferences. Changes are stored locally only.
        </p>
      </div>

      <section className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6">
        <h3 className="text-base font-semibold text-foreground">Workspace</h3>
        <div className="mt-4 max-w-md">
          <label htmlFor="workspace-name" className="block text-sm text-muted">
            Workspace name
          </label>
          <input
            id="workspace-name"
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
          />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6">
        <h3 className="text-base font-semibold text-foreground">Notifications</h3>
        <ul className="mt-4 space-y-4">
          <li className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Email alerts</p>
              <p className="text-xs text-muted">Receive important workspace notifications</p>
            </div>
            <Toggle
              checked={emailAlerts}
              onChange={handleEmailAlertsChange}
              label="Email alerts"
            />
          </li>
          <li className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Weekly digest</p>
              <p className="text-xs text-muted">Summary of activity and growth metrics</p>
            </div>
            <Toggle
              checked={weeklyDigest}
              onChange={handleWeeklyDigestChange}
              label="Weekly digest"
            />
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6">
        <h3 className="text-base font-semibold text-foreground">Appearance</h3>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Compact admin layout</p>
            <p className="text-xs text-muted">Reduce spacing in tables and cards</p>
          </div>
          <Toggle
            checked={compactMode}
            onChange={handleCompactModeChange}
            label="Compact mode"
          />
        </div>
      </section>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        checked ? "bg-accent" : "bg-surface-elevated border border-border"
      }`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
          checked ? "left-[1.375rem]" : "left-0.5"
        }`}
      />
    </button>
  );
}
