"use client";

import { useMemo, useState } from "react";
import {
  DEMO_PROJECTS,
  PROJECT_STATUS_STYLES,
  formatWorkspaceDate,
  type ProjectStatus,
} from "@/lib/workspace-data";

export function ProjectsView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "All">("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return DEMO_PROJECTS.filter((project) => {
      const matchesSearch =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.status.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Projects
        </h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Track active initiatives and delivery progress across your workspace.
        </p>
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
          className="h-11 w-full max-w-md rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none"
        />
        <label htmlFor="project-status" className="sr-only">
          Filter by status
        </label>
        <select
          id="project-status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | "All")}
          className="h-11 rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
        >
          <option value="All">All statuses</option>
          <option value="Planning">Planning</option>
          <option value="In progress">In progress</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface-elevated/30 px-6 py-12 text-center">
          <svg
            className="mx-auto h-10 w-10 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <h2 className="mt-4 text-base font-semibold text-foreground">No projects found</h2>
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
                  {project.description}
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
                  Last updated {formatWorkspaceDate(project.lastUpdated)}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
