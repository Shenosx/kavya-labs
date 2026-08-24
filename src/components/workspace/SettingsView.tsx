"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
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

type Profile = {
  name: string | null;
  email: string | null;
  image: string | null;
};

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

export function SettingsView({ user }: SettingsViewProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({
    name: user.name ?? null,
    email: user.email ?? null,
    image: user.image ?? null,
  });
  const [profileLoading, setProfileLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(
    USER_SETTINGS_DEFAULTS.emailNotifications
  );
  const [productUpdates, setProductUpdates] = useState<boolean>(
    USER_SETTINGS_DEFAULTS.productUpdates
  );
  const [compactLayout, setCompactLayout] = useState<boolean>(
    USER_SETTINGS_DEFAULTS.compactLayout
  );

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const loadProfile = useCallback(async () => {
    setProfileLoading(true);
    try {
      const response = await fetch("/api/profile");
      if (!response.ok) {
        throw new Error("Failed to load profile");
      }
      const data = (await response.json()) as { profile: Profile };
      setProfile(data.profile);
    } catch {
      showToast("Unable to load profile from the database.", "error");
    } finally {
      setProfileLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    setEmailNotifications(
      readStoredBoolean(
        USER_SETTINGS_KEYS.emailNotifications,
        USER_SETTINGS_DEFAULTS.emailNotifications
      )
    );
    setProductUpdates(
      readStoredBoolean(
        USER_SETTINGS_KEYS.productUpdates,
        USER_SETTINGS_DEFAULTS.productUpdates
      )
    );
    setCompactLayout(
      readStoredBoolean(
        USER_SETTINGS_KEYS.compactLayout,
        USER_SETTINGS_DEFAULTS.compactLayout
      )
    );
  }, []);

  useEffect(() => {
    if (!editOpen) return;

    setEditName(profile.name ?? "");
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEditOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [editOpen, profile.name]);

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = editName.trim();
    if (!name) {
      showToast("Name is required.", "error");
      return;
    }

    setSavingProfile(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = (await response.json().catch(() => null)) as
        | { profile?: Profile; error?: string }
        | null;
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to update profile");
      }
      setProfile((prev) => ({
        ...prev,
        name: data!.profile!.name,
      }));
      setEditOpen(false);
      router.refresh();
      showToast("Profile updated.");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Could not update profile.",
        "error"
      );
    } finally {
      setSavingProfile(false);
    }
  };

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
    profile.name
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-base font-semibold text-foreground">Profile</h2>
          <Button variant="secondary" size="sm" onClick={() => setEditOpen(true)}>
            Edit
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-4">
          {profile.image ? (
            <Image
              src={profile.image}
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
              {profileLoading ? "Loading..." : profile.name ?? "Workspace user"}
            </p>
            <p className="text-sm text-muted">{profile.email ?? "No email available"}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6">
        <h2 className="text-base font-semibold text-foreground">Account information</h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">Name</dt>
            <dd className="mt-1 text-sm text-foreground">{profile.name ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">Email</dt>
            <dd className="mt-1 text-sm text-foreground">{profile.email ?? "—"}</dd>
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

      {editOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close edit profile dialog"
            onClick={() => setEditOpen(false)}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
            tabIndex={-1}
            className="relative w-full max-w-md rounded-xl border border-border bg-surface-elevated p-6 shadow-card outline-none"
          >
            <h2 id="edit-profile-title" className="text-lg font-semibold text-foreground">
              Edit profile
            </h2>
            <p className="mt-1 text-sm text-muted">
              Update your display name. Your Google email cannot be changed here.
            </p>
            <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
              <div>
                <label htmlFor="profile-name" className="block text-sm font-medium text-foreground">
                  Display name
                </label>
                <input
                  id="profile-name"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="profile-email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="profile-email"
                  value={profile.email ?? ""}
                  disabled
                  className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/30 px-4 text-sm text-muted"
                />
              </div>
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditOpen(false)}
                  disabled={savingProfile}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={savingProfile}>
                  {savingProfile ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-6 z-[70] flex flex-col gap-2"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg border px-4 py-3 text-sm shadow-card ${
              toast.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                : "border-red-500/30 bg-red-500/10 text-red-200"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
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
