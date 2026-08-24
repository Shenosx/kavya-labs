"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import {
  PROJECT_STATUS_STYLES,
  formatWorkspaceDate,
  type ProjectStatus,
} from "@/lib/workspace-data";
import type { CreateProjectPayload, Project, UpdateProjectPayload } from "@/types/project";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

const defaultCreateForm = (): CreateProjectPayload => ({
  name: "",
  description: "",
  status: "Planning",
  progress: 0,
});

function ProjectFormModal({
  open,
  title,
  submitLabel,
  initialValues,
  submitting,
  onClose,
  onSubmit,
}: {
  open: boolean;
  title: string;
  submitLabel: string;
  initialValues: CreateProjectPayload;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateProjectPayload) => Promise<void>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<CreateProjectPayload>(initialValues);

  useEffect(() => {
    if (!open) return;
    setForm(initialValues);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, initialValues]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-form-title"
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-xl border border-border bg-surface-elevated p-6 shadow-card outline-none"
      >
        <h2 id="project-form-title" className="text-lg font-semibold text-foreground">
          {title}
        </h2>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit(form);
          }}
        >
          <div>
            <label htmlFor="project-name" className="block text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="project-name"
              required
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="project-description"
              className="block text-sm font-medium text-foreground"
            >
              Description
            </label>
            <textarea
              id="project-description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated/50 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="project-status" className="block text-sm font-medium text-foreground">
                Status
              </label>
              <select
                id="project-status"
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    status: e.target.value as ProjectStatus,
                  }))
                }
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
              >
                <option value="Planning">Planning</option>
                <option value="In progress">In progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label htmlFor="project-progress" className="block text-sm font-medium text-foreground">
                Progress (%)
              </label>
              <input
                id="project-progress"
                type="number"
                min={0}
                max={100}
                value={form.progress}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    progress: Number.parseInt(e.target.value, 10) || 0,
                  }))
                }
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground focus:border-accent/40 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ProjectsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "All">("All");
  const [viewFilter, setViewFilter] = useState<"all" | "active">("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to load projects");
      }
      const data = (await response.json()) as { projects: Project[] };
      setProjects(data.projects);
    } catch {
      setError("Unable to load projects. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter === "active") {
      setViewFilter("active");
      setStatusFilter("All");
    } else {
      setViewFilter("all");
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesSearch =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.status.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || project.status === statusFilter;
      const matchesViewFilter =
        viewFilter === "all" ? true : project.status !== "Completed";
      return matchesSearch && matchesStatus && matchesViewFilter;
    });
  }, [projects, search, statusFilter, viewFilter]);

  const handleCreateProject = async (payload: CreateProjectPayload) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as
        | { project?: Project; error?: string }
        | null;
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to create project");
      }
      setProjects((prev) => [data!.project!, ...prev]);
      setCreateOpen(false);
      router.refresh();
      showToast("Project created.");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Could not create project.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProject = async (payload: UpdateProjectPayload) => {
    if (!editTarget) return;
    setSubmitting(true);
    try {
      const response = await fetch(`/api/projects/${editTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as
        | { project?: Project; error?: string }
        | null;
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to update project");
      }
      setProjects((prev) =>
        prev.map((project) => (project.id === editTarget.id ? data!.project! : project))
      );
      setEditTarget(null);
      router.refresh();
      showToast("Project updated.");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Could not update project.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/projects/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to delete project");
      }
      setProjects((prev) => prev.filter((project) => project.id !== deleteTarget.id));
      setDeleteTarget(null);
      router.refresh();
      showToast("Project deleted.");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Could not delete project.",
        "error"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Projects
          </h1>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Track active initiatives and delivery progress across your workspace.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="w-full sm:w-auto">
          Add project
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label htmlFor="project-search" className="sr-only">
          Search projects
        </label>
        <input
          id="project-search"
          type="search"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={loading}
          className="h-11 w-full max-w-md rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none disabled:opacity-50"
        />
        <label htmlFor="project-status" className="sr-only">
          Filter by status
        </label>
        <select
          id="project-status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | "All")}
          disabled={loading}
          className="h-11 rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none disabled:opacity-50"
        >
          <option value="All">All statuses</option>
          <option value="Planning">Planning</option>
          <option value="In progress">In progress</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <div className="rounded-xl border border-border bg-surface-elevated/30 px-6 py-12 text-center">
          <p className="text-sm text-muted">Loading projects...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-border bg-surface-elevated/30 px-6 py-12 text-center">
          <h2 className="text-base font-semibold text-foreground">Something went wrong</h2>
          <p className="mt-2 text-sm text-muted">{error}</p>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => void loadProjects()}>
              Try again
            </Button>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface-elevated/30 px-6 py-12 text-center">
          <h2 className="text-base font-semibold text-foreground">No projects yet</h2>
          <p className="mt-2 text-sm text-muted">Create your first project to get started.</p>
          <div className="mt-4">
            <Button onClick={() => setCreateOpen(true)}>Add project</Button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface-elevated/30 px-6 py-12 text-center">
          <h2 className="text-base font-semibold text-foreground">No projects found</h2>
          <p className="mt-2 text-sm text-muted">
            Try adjusting your search or filter to find a project.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((project) => (
            <li key={project.id}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-surface-elevated/40 p-5 transition-all duration-300 hover:border-accent/25 hover:bg-surface-elevated/70 hover:shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold text-foreground">{project.name}</h2>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${PROJECT_STATUS_STYLES[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description || "No description provided."}
                </p>
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted">Progress</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-elevated">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-[#6366f1]"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted">
                  Last updated {formatWorkspaceDate(project.updatedAt)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setEditTarget(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-300 hover:text-red-200"
                    onClick={() => setDeleteTarget(project)}
                  >
                    Delete
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <ProjectFormModal
        open={createOpen}
        title="Add project"
        submitLabel="Create project"
        initialValues={defaultCreateForm()}
        submitting={submitting}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateProject}
      />

      <ProjectFormModal
        open={Boolean(editTarget)}
        title="Edit project"
        submitLabel="Save changes"
        initialValues={
          editTarget
            ? {
                name: editTarget.name,
                description: editTarget.description,
                status: editTarget.status,
                progress: editTarget.progress,
              }
            : defaultCreateForm()
        }
        submitting={submitting}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEditProject}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete project"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : ""
        }
        confirmLabel={deleting ? "Deleting..." : "Delete project"}
        onCancel={() => {
          if (!deleting) setDeleteTarget(null);
        }}
        onConfirm={() => void handleDeleteProject()}
      />

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
