"use client";

import { useMemo, useState } from "react";
import {
  DEMO_TASKS,
  TASK_PRIORITY_STYLES,
  TASK_STATUS_STYLES,
  formatWorkspaceDate,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/workspace-data";

export function TasksView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "All">("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return DEMO_TASKS.filter((task) => {
      const matchesSearch =
        !q ||
        task.title.toLowerCase().includes(q) ||
        task.project.toLowerCase().includes(q) ||
        task.assignee.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [search, statusFilter, priorityFilter]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Tasks
        </h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Manage priorities, assignments, and delivery across your projects.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <label htmlFor="task-search" className="sr-only">
          Search tasks
        </label>
        <input
          id="task-search"
          type="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full max-w-md rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none"
        />
        <div className="flex flex-wrap gap-3">
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | "All")}
            className="h-11 rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
          >
            <option value="All">All statuses</option>
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
          <select
            aria-label="Filter by priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | "All")}
            className="h-11 rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
          >
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface-elevated/30 px-6 py-12 text-center">
          <h2 className="text-base font-semibold text-foreground">No tasks found</h2>
          <p className="mt-2 text-sm text-muted">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          <ul className="hidden space-y-3 lg:block">
            {filtered.map((task) => (
              <li key={task.id}>
                <article className="rounded-xl border border-border bg-surface-elevated/30 px-4 py-4 transition-colors hover:border-accent/20 hover:bg-surface-elevated/50 sm:px-5">
                  <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] sm:items-center">
                    <div>
                      <h2 className="text-sm font-medium text-foreground">{task.title}</h2>
                      <p className="mt-1 text-xs text-muted">{task.project}</p>
                    </div>
                    <span
                      className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${TASK_PRIORITY_STYLES[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${TASK_STATUS_STYLES[task.status]}`}
                    >
                      {task.status}
                    </span>
                    <p className="text-sm text-muted">{formatWorkspaceDate(task.dueDate)}</p>
                    <p className="text-sm text-foreground">{task.assignee}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <ul className="space-y-3 lg:hidden">
            {filtered.map((task) => (
              <li key={task.id}>
                <article className="rounded-xl border border-border bg-surface-elevated/30 p-4">
                  <h2 className="text-sm font-medium text-foreground">{task.title}</h2>
                  <p className="mt-1 text-xs text-muted">{task.project}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${TASK_PRIORITY_STYLES[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${TASK_STATUS_STYLES[task.status]}`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <dt className="text-muted">Due</dt>
                      <dd className="text-foreground">{formatWorkspaceDate(task.dueDate)}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Assignee</dt>
                      <dd className="text-foreground">{task.assignee}</dd>
                    </div>
                  </dl>
                </article>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
