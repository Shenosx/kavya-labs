"use client";

import { useMemo, useState } from "react";
import {
  DEMO_USERS,
  formatDate,
  formatRelativeTime,
  type DemoUser,
  type UserRole,
  type UserStatus,
} from "@/lib/admin-data";
import { UserProfileDrawer } from "@/components/admin/UserProfileDrawer";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useAdminToast } from "@/components/admin/AdminToast";

type SortKey = "name" | "joined" | "lastActive";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 8;

const roleStyles: Record<UserRole, string> = {
  Admin: "bg-accent/20 text-accent",
  Member: "bg-blue-500/15 text-blue-300",
  Viewer: "bg-surface-elevated text-muted",
};

const statusStyles: Record<UserStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-300",
  Invited: "bg-amber-500/15 text-amber-300",
  Suspended: "bg-red-500/15 text-red-300",
};

export function UserManagement() {
  const { showToast } = useAdminToast();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "All">("All");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<DemoUser | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    user: DemoUser;
    type: "role" | "suspend";
  } | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = DEMO_USERS.filter((user) => {
      const matchesSearch =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q) ||
        user.status.toLowerCase().includes(q);
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      if (sortKey === "joined") cmp = a.joined.localeCompare(b.joined);
      if (sortKey === "lastActive") cmp = a.lastActive.localeCompare(b.lastActive);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [search, roleFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
    setSortKey("name");
    setSortDir("asc");
    setPage(1);
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return "↕";
    return sortDir === "asc" ? "↑" : "↓";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Users
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Manage and monitor Kavya Labs users.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex-1">
          <label htmlFor="user-search" className="sr-only">
            Search users
          </label>
          <input
            id="user-search"
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-11 w-full max-w-md rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div>
            <label htmlFor="role-filter" className="sr-only">
              Filter by role
            </label>
            <select
              id="role-filter"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value as UserRole | "All");
                setPage(1);
              }}
              className="h-11 rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
            >
              <option value="All">Role: All</option>
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <div>
            <label htmlFor="status-filter" className="sr-only">
              Filter by status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as UserStatus | "All");
                setPage(1);
              }}
              className="h-11 rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
            >
              <option value="All">Status: All</option>
              <option value="Active">Active</option>
              <option value="Invited">Invited</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="h-11 rounded-lg border border-border px-4 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
          >
            Reset filters
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface-elevated/30 px-6 py-12 text-center">
          <svg
            className="mx-auto h-10 w-10 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <h3 className="mt-4 text-base font-semibold text-foreground">No users found</h3>
          <p className="mt-2 text-sm text-muted">
            Try adjusting your search or filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-medium text-white hover:bg-[#8b7ef5]"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-border lg:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Kavya Labs users</caption>
              <thead className="border-b border-border bg-surface-elevated/50">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium text-muted">
                    <button
                      type="button"
                      onClick={() => handleSort("name")}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      User <span aria-hidden="true">{sortIndicator("name")}</span>
                    </button>
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium text-muted">Email</th>
                  <th scope="col" className="px-4 py-3 font-medium text-muted">Role</th>
                  <th scope="col" className="px-4 py-3 font-medium text-muted">Status</th>
                  <th scope="col" className="px-4 py-3 font-medium text-muted">
                    <button
                      type="button"
                      onClick={() => handleSort("joined")}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      Joined <span aria-hidden="true">{sortIndicator("joined")}</span>
                    </button>
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium text-muted">
                    <button
                      type="button"
                      onClick={() => handleSort("lastActive")}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      Last active <span aria-hidden="true">{sortIndicator("lastActive")}</span>
                    </button>
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium text-muted">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border/60 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                          {user.initials}
                        </span>
                        <span className="font-medium text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleStyles[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[user.status]}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{formatDate(user.joined)}</td>
                    <td className="px-4 py-3 text-muted">
                      {formatRelativeTime(user.lastActive)}
                    </td>
                    <td className="relative px-4 py-3">
                      <button
                        type="button"
                        aria-expanded={openMenuId === user.id}
                        aria-haspopup="menu"
                        aria-label={`Actions for ${user.name}`}
                        onClick={() =>
                          setOpenMenuId((id) => (id === user.id ? null : user.id))
                        }
                        className="rounded-lg border border-border px-2 py-1 text-xs text-muted hover:text-foreground"
                      >
                        ···
                      </button>
                      {openMenuId === user.id && (
                        <div
                          role="menu"
                          className="absolute right-4 top-full z-10 mt-1 w-40 rounded-lg border border-border bg-surface-elevated p-1 shadow-card"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            className="block w-full rounded-md px-3 py-2 text-left text-sm text-muted hover:bg-white/5 hover:text-foreground"
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenMenuId(null);
                            }}
                          >
                            View profile
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            className="block w-full rounded-md px-3 py-2 text-left text-sm text-muted hover:bg-white/5 hover:text-foreground"
                            onClick={() => {
                              setConfirmAction({ user, type: "role" });
                              setOpenMenuId(null);
                            }}
                          >
                            Edit role
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            className="block w-full rounded-md px-3 py-2 text-left text-sm text-muted hover:bg-white/5 hover:text-foreground"
                            onClick={() => {
                              setConfirmAction({ user, type: "suspend" });
                              setOpenMenuId(null);
                            }}
                          >
                            Suspend user
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 lg:hidden">
            {paginated.map((user) => (
              <li key={user.id}>
                <article className="rounded-xl border border-border bg-surface-elevated/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                        {user.initials}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted">{user.email}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`View profile for ${user.name}`}
                      onClick={() => setSelectedUser(user)}
                      className="text-xs text-accent"
                    >
                      View
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${roleStyles[user.role]}`}>
                      {user.role}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${statusStyles[user.status]}`}>
                      {user.status}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-muted">
                    Joined {formatDate(user.joined)} · Last active{" "}
                    {formatRelativeTime(user.lastActive)}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Showing {rangeStart}–{rangeEnd} of {filtered.length} users
            </p>
            <nav aria-label="Pagination" className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => p - 1)}
                className="h-9 rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-current={p === currentPage ? "page" : undefined}
                  onClick={() => setPage(p)}
                  className={`h-9 min-w-9 rounded-lg border px-3 text-sm transition-colors ${
                    p === currentPage
                      ? "border-accent/40 bg-accent-soft text-foreground"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="h-9 rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          </div>
        </>
      )}

      <UserProfileDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />

      <ConfirmDialog
        open={!!confirmAction}
        title={
          confirmAction?.type === "role" ? "Edit user role" : "Suspend user"
        }
        message={
          confirmAction?.type === "role"
            ? `This is a demo action. No role change will be saved for ${confirmAction?.user.name}.`
            : `This is a demo action. ${confirmAction?.user.name} will not actually be suspended.`
        }
        confirmLabel="Continue (demo)"
        onCancel={() => setConfirmAction(null)}
        onConfirm={() => {
          if (!confirmAction) return;
          showToast(
            confirmAction.type === "role"
              ? `Demo: role edit recorded for ${confirmAction.user.name}.`
              : `Demo: suspend action recorded for ${confirmAction.user.name}.`,
            "success",
          );
          setConfirmAction(null);
        }}
      />
    </div>
  );
}
