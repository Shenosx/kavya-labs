"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { SessionUser } from "@/lib/auth-routes";
import {
  USER_SETTINGS_DEFAULTS,
  USER_SETTINGS_KEYS,
  readStoredBoolean,
  writeStoredBoolean,
} from "@/lib/user-settings-storage";

type SettingsViewProps = {
  user: SessionUser;
};

export function SettingsView({ user }: SettingsViewProps) {
  const [emailNotifications, setEmailNotifications] = useState<boolean>(
    USER_SETTINGS_DEFAULTS.emailNotifications,
  );
  const [productUpdates, setProductUpdates] = useState<boolean>(
    USER_SETTINGS_DEFAULTS.productUpdates,
  );
  const [compactLayout, setCompactLayout] = useState<boolean>(
    USER_SETTINGS_DEFAULTS.compactLayout,
  );

  useEffect(() => {
    setEmailNotifications(
      readStoredBoolean(
        USER_SETTINGS_KEYS.emailNotifications,
        USER_SETTINGS_DEFAULTS.emailNotifications,
      ),
    );
    setProductUpdates(
      readStoredBoolean(
        USER_SETTINGS_KEYS.productUpdates,
        USER_SETTINGS_DEFAULTS.productUpdates,
      ),
    );
    setCompactLayout(
      readStoredBoolean(
        USER_SETTINGS_KEYS.compactLayout,
        USER_SETTINGS_DEFAULTS.compactLayout,
      ),
    );
  }, []);

  const handleEmailNotifications = useCallback((value: boolean) => {
    setEmailNotifications(value);
    writeStoredBoolean(USER_SETTINGS_KEYS.emailNotifications, value);
  }, []);

  const handleProductUpdates = useCallback((value: boolean) => {
    setProductUpdates(value);
    writeStoredBoolean(USER_SETTINGS_KEYS.productUpdates, value);
  }, []);

  const handleCompactLayout = useCallback((value: boolean) => {
    setCompactLayout(value);
    writeStoredBoolean(USER_SETTINGS_KEYS.compactLayout, value);
  }, []);

  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Manage your profile and workspace preferences.
        </p>
      </div>

      <section className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6">
        <h2 className="text-base font-semibold text-foreground">Profile</h2>
        <div className="mt-4 flex items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border border-border object-cover"
            />
          ) : (
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-base font-semibold text-accent">
              {initials}
            </span>
          )}
          <div>
            <p className="text-base font-medium text-foreground">
              {user.name ?? "Workspace user"}
            </p>
            <p className="text-sm text-muted">{user.email ?? "No email available"}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6">
        <h2 className="text-base font-semibold text-foreground">Account information</h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">Name</dt>
            <dd className="mt-1 text-sm text-foreground">{user.name ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">Email</dt>
            <dd className="mt-1 text-sm text-foreground">{user.email ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Authentication
            </dt>
            <dd className="mt-1 text-sm text-foreground">Google OAuth</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6">
        <h2 className="text-base font-semibold text-foreground">Notifications</h2>
        <ul className="mt-4 space-y-4">
          <li className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Email notifications</p>
              <p className="text-xs text-muted">Receive updates about assigned tasks</p>
            </div>
            <Toggle
              checked={emailNotifications}
              onChange={handleEmailNotifications}
              label="Email notifications"
            />
          </li>
          <li className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Product updates</p>
              <p className="text-xs text-muted">News about Kavya Labs features</p>
            </div>
            <Toggle
              checked={productUpdates}
              onChange={handleProductUpdates}
              label="Product updates"
            />
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6">
        <h2 className="text-base font-semibold text-foreground">Appearance</h2>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Compact layout</p>
            <p className="text-xs text-muted">Reduce spacing in workspace views</p>
          </div>
          <Toggle
            checked={compactLayout}
            onChange={handleCompactLayout}
            label="Compact layout"
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
