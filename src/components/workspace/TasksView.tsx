"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import {
  normalizeTaskDueDate,
  TASK_PRIORITY_STYLES,
  TASK_STATUS_STYLES,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/workspace-data";
import type { CreateTaskPayload, Task } from "@/types/task";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

const defaultCreateForm = (): CreateTaskPayload => ({
  title: "",
  project: "",
  priority: "Medium",
  status: "To do",
  dueDate: "",
  assignee: "",
});

function TasksLoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading tasks"
      className="space-y-3"
    >
      <p className="sr-only">Loading tasks...</p>
      <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-surface-elevated/30 px-6 py-8">
        <span
          aria-hidden="true"
          className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-accent"
        />
        <p className="text-sm text-muted">Loading tasks...</p>
      </div>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          aria-hidden="true"
          className="animate-pulse rounded-xl border border-border bg-surface-elevated/30 px-5 py-4"
        >
          <div className="flex items-center gap-4">
            <div className="h-4 w-4 rounded bg-surface-elevated" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/5 rounded bg-surface-elevated" />
              <div className="h-3 w-1/4 rounded bg-surface-elevated" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TaskDeleteButton({
  task,
  disabled,
  onDelete,
}: {
  task: Task;
  disabled?: boolean;
  onDelete: (task: Task) => void;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={disabled}
      className="text-red-300 hover:text-red-200"
      onClick={() => onDelete(task)}
    >
      Delete
    </Button>
  );
}
function TaskActionsMenu({
  onDelete,
  disabled,
}: {
  onDelete: () => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label="Task actions"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-50"
      >
        <span aria-hidden="true">⋯</span>
      </button>
      {open ? (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-border bg-surface-elevated py-1 shadow-card">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="block w-full px-3 py-2 text-left text-sm text-red-300 transition-colors hover:bg-white/5"
          >
            Delete task
          </button>
        </div>
      ) : null}
    </div>
  );
}

function CreateTaskModal({
  open,
  onClose,
  onSubmit,
  submitting,
  initialAssignee,
  assigneeOptions,
  projectOptions,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateTaskPayload) => Promise<void>;
  submitting: boolean;
  initialAssignee: string;
  assigneeOptions: string[];
  projectOptions: string[];
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<CreateTaskPayload>(() => ({
    ...defaultCreateForm(),
    assignee: initialAssignee,
  }));

  useEffect(() => {
    if (!open) return;

    setForm({
      ...defaultCreateForm(),
      assignee: initialAssignee,
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, initialAssignee]);

  const assigneeChoices = useMemo(() => {
    const names = new Set(assigneeOptions);
    if (initialAssignee.trim()) {
      names.add(initialAssignee.trim());
    }
    if (form.assignee.trim()) {
      names.add(form.assignee.trim());
    }
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [assigneeOptions, initialAssignee, form.assignee]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close create task dialog"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-xl border border-border bg-surface-elevated p-6 shadow-card outline-none"
      >
        <h2 id="create-task-title" className="text-lg font-semibold text-foreground">
          Create task
        </h2>
        <p className="mt-1 text-sm text-muted">
          Add a new task to your workspace. It will be saved to your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="create-title" className="block text-sm font-medium text-foreground">
              Title
            </label>
            <input
              id="create-title"
              required
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none"
              placeholder="Task title"
            />
          </div>

          <div>
            <label htmlFor="create-project" className="block text-sm font-medium text-foreground">
              Project
            </label>
            {projectOptions.length > 0 ? (
              <select
                id="create-project"
                required
                value={form.project}
                onChange={(e) => setForm((prev) => ({ ...prev, project: e.target.value }))}
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
              >
                <option value="">Select a project</option>
                {projectOptions.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="create-project"
                required
                value={form.project}
                onChange={(e) => setForm((prev) => ({ ...prev, project: e.target.value }))}
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none"
                placeholder="Project name"
              />
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="create-priority" className="block text-sm font-medium text-foreground">
                Priority
              </label>
              <select
                id="create-priority"
                value={form.priority}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    priority: e.target.value as TaskPriority,
                  }))
                }
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label htmlFor="create-status" className="block text-sm font-medium text-foreground">
                Status
              </label>
              <select
                id="create-status"
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    status: e.target.value as TaskStatus,
                  }))
                }
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="create-due-date" className="block text-sm font-medium text-foreground">
                Due date
              </label>
              <input
                id="create-due-date"
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground focus:border-accent/40 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="create-assignee" className="block text-sm font-medium text-foreground">
                Assignee
              </label>
              <select
                id="create-assignee"
                value={form.assignee}
                onChange={(e) => setForm((prev) => ({ ...prev, assignee: e.target.value }))}
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none"
              >
                <option value="">Unassigned</option>
                {assigneeChoices.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function TasksView() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");
  const [viewFilter, setViewFilter] = useState<"all" | "open" | "done">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "All">("All");
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [assigneeOptions, setAssigneeOptions] = useState<string[]>([]);
  const [projectOptions, setProjectOptions] = useState<string[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tasks", { credentials: "same-origin" });
      if (!response.ok) {
        throw new Error("Failed to load tasks");
      }

      const data = (await response.json()) as { tasks: Task[] };
      setTasks(data.tasks);
    } catch {
      setError("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadFormOptions = useCallback(async () => {
    try {
      const [assigneesResponse, projectsResponse] = await Promise.all([
        fetch("/api/assignees", { credentials: "same-origin" }),
        fetch("/api/projects", { credentials: "same-origin" }),
      ]);

      if (assigneesResponse.ok) {
        const data = (await assigneesResponse.json()) as {
          assignees: { name: string }[];
        };
        setAssigneeOptions(data.assignees.map((item) => item.name));
      }

      if (projectsResponse.ok) {
        const data = (await projectsResponse.json()) as {
          projects: { name: string }[];
        };
        setProjectOptions(data.projects.map((project) => project.name));
      }
    } catch {
      // Form can still fall back to text inputs where needed.
    }
  }, []);

  useEffect(() => {
    void loadTasks();
    void loadFormOptions();
  }, [loadTasks, loadFormOptions]);

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter === "open") {
      setViewFilter("open");
      setStatusFilter("All");
    } else if (filter === "done") {
      setViewFilter("done");
      setStatusFilter("Done");
    } else {
      setViewFilter("all");
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch =
        !q ||
        task.title.toLowerCase().includes(q) ||
        task.project.toLowerCase().includes(q) ||
        (task.assignee ?? "").toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;
      const matchesViewFilter =
        viewFilter === "all"
          ? true
          : viewFilter === "open"
            ? task.status !== "Done"
            : task.status === "Done";
      return matchesSearch && matchesStatus && matchesPriority && matchesViewFilter;
    });
  }, [tasks, search, statusFilter, priorityFilter, viewFilter]);

  const handleCreateTask = async (payload: CreateTaskPayload) => {
    if (!payload.title.trim()) {
      showToast("Title is required.", "error");
      return;
    }

    if (!payload.project.trim()) {
      showToast("Project is required.", "error");
      return;
    }

    setCreating(true);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          title: payload.title.trim(),
          project: payload.project.trim(),
          priority: payload.priority,
          status: payload.status,
          dueDate: payload.dueDate.trim() ? payload.dueDate.trim() : null,
          assignee: payload.assignee.trim() ? payload.assignee.trim() : null,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { task?: Task; error?: string }
        | null;

      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to create task");
      }

      if (!data?.task) {
        throw new Error("Failed to create task");
      }

      const createdTask = data.task;
      setTasks((prev) => [createdTask, ...prev]);
      setCreateOpen(false);
      router.refresh();
      void loadFormOptions();
      showToast("Task created successfully.");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Could not create task. Please try again.",
        "error"
      );
    } finally {
      setCreating(false);
    }
  };

  const patchTask = useCallback(
    async (
      taskId: string,
      updates: {
        status?: TaskStatus;
        priority?: TaskPriority;
        dueDate?: string | null;
        assignee?: string | null;
      },
      successMessage?: string
    ) => {
      const previousTask = tasks.find((item) => item.id === taskId);
      if (!previousTask) {
        return;
      }

      const hasChange = Object.entries(updates).some(([key, value]) => {
        if (key === "dueDate") {
          return (
            normalizeTaskDueDate(previousTask.dueDate) !==
            normalizeTaskDueDate(value as string | null)
          );
        }

        const current = previousTask[key as keyof typeof updates];
        return current !== value;
      });

      if (!hasChange) {
        return;
      }

      setUpdatingIds((prev) => new Set(prev).add(taskId));
      setTasks((prev) =>
        prev.map((item) => (item.id === taskId ? { ...item, ...updates } : item))
      );

      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify(updates),
        });

        const data = (await response.json().catch(() => null)) as
          | { task?: Task; error?: string }
          | null;

        if (!response.ok) {
          throw new Error(data?.error ?? "Failed to update task");
        }

        if (!data?.task) {
          throw new Error("Failed to update task");
        }

        setTasks((prev) =>
          prev.map((item) => (item.id === taskId ? data.task! : item))
        );
        router.refresh();
        showToast(successMessage ?? "Task updated.");
      } catch (error) {
        setTasks((prev) =>
          prev.map((item) => (item.id === taskId ? previousTask : item))
        );
        showToast(
          error instanceof Error
            ? error.message
            : "Could not update task. Please try again.",
          "error"
        );
      } finally {
        setUpdatingIds((prev) => {
          const next = new Set(prev);
          next.delete(taskId);
          return next;
        });
      }
    },
    [tasks, router, showToast]
  );

  const handleToggleComplete = (task: Task) => {
    const nextStatus: TaskStatus = task.status === "Done" ? "To do" : "Done";
    void patchTask(
      task.id,
      { status: nextStatus },
      nextStatus === "Done" ? "Task marked complete." : "Task reopened."
    );
  };

  const handleStatusSelectChange = (taskId: string, value: string) => {
    if (value === "To do" || value === "In progress" || value === "Done") {
      void patchTask(taskId, { status: value }, "Task status updated.");
    }
  };

  const handlePrioritySelectChange = (taskId: string, value: string) => {
    if (value === "High" || value === "Medium" || value === "Low") {
      void patchTask(taskId, { priority: value }, "Task priority updated.");
    }
  };

  const handleDueDateChange = (taskId: string, value: string) => {
    const nextDueDate = normalizeTaskDueDate(value);
    void patchTask(
      taskId,
      { dueDate: nextDueDate },
      nextDueDate ? "Due date updated." : "Due date cleared."
    );
  };

  const handleAssigneeChange = (taskId: string, value: string) => {
    void patchTask(
      taskId,
      { assignee: value || null },
      value ? "Assignee updated." : "Assignee cleared."
    );
  };

  const handleDeleteTask = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      const response = await fetch(`/api/tasks/${deleteTarget.id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prev) => prev.filter((task) => task.id !== deleteTarget.id));
      setDeleteTarget(null);
      router.refresh();
      showToast("Task deleted.");
    } catch {
      showToast("Could not delete task. Please try again.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const renderCompletionControl = (task: Task) => (
    <button
      type="button"
      disabled={updatingIds.has(task.id)}
      onClick={() => handleToggleComplete(task)}
      aria-label={task.status === "Done" ? "Mark task incomplete" : "Mark task complete"}
      aria-pressed={task.status === "Done"}
      className="inline-flex h-4 w-4 items-center justify-center rounded border border-border bg-surface-elevated transition-colors hover:border-accent/40 disabled:opacity-50"
    >
      <span
        className={`h-2.5 w-2.5 rounded-sm ${
          task.status === "Done" ? "bg-accent" : "bg-transparent"
        }`}
        aria-hidden="true"
      />
    </button>
  );

  const renderPriorityControl = (task: Task) => (
    <select
      aria-label={`Priority for ${task.title}`}
      value={task.priority}
      disabled={updatingIds.has(task.id)}
      onChange={(e) => handlePrioritySelectChange(task.id, e.target.value)}
      className={`h-8 w-full max-w-[7.5rem] rounded-full border border-border bg-surface-elevated/50 px-2.5 text-xs font-medium text-foreground focus:border-accent/40 focus:outline-none disabled:opacity-50 ${TASK_PRIORITY_STYLES[task.priority]}`}
    >
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  );

  const renderDueDateControl = (task: Task) => {
    const inputValue = normalizeTaskDueDate(task.dueDate) ?? "";

    return (
      <div className="flex flex-col gap-1">
        <input
          type="date"
          aria-label={`Due date for ${task.title}`}
          value={inputValue}
          disabled={updatingIds.has(task.id)}
          onChange={(e) => handleDueDateChange(task.id, e.target.value)}
          className="h-8 w-full min-w-[9rem] rounded-lg border border-border bg-surface-elevated/50 px-2 text-xs text-foreground focus:border-accent/40 focus:outline-none disabled:opacity-50"
        />
        {inputValue ? (
          <button
            type="button"
            disabled={updatingIds.has(task.id)}
            onClick={() => handleDueDateChange(task.id, "")}
            className="text-left text-xs text-muted transition-colors hover:text-foreground disabled:opacity-50"
          >
            Clear date
          </button>
        ) : null}
      </div>
    );
  };

  const renderAssigneeControl = (task: Task) => {
    const options = Array.from(
      new Set([...(task.assignee ? [task.assignee] : []), ...assigneeOptions])
    ).sort((a, b) => a.localeCompare(b));

    return (
      <select
        aria-label={`Assignee for ${task.title}`}
        value={task.assignee ?? ""}
        disabled={updatingIds.has(task.id)}
        onChange={(e) => handleAssigneeChange(task.id, e.target.value)}
        className="h-8 w-full min-w-[9rem] rounded-lg border border-border bg-surface-elevated/50 px-2 text-xs text-foreground focus:border-accent/40 focus:outline-none disabled:opacity-50"
      >
        <option value="">Unassigned</option>
        {options.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    );
  };

  const renderStatusControl = (task: Task) => (
    <select
      aria-label={`Status for ${task.title}`}
      value={task.status}
      disabled={updatingIds.has(task.id)}
      onChange={(e) => handleStatusSelectChange(task.id, e.target.value)}
      className={`h-8 w-full max-w-[9.5rem] rounded-full border border-border bg-surface-elevated/50 px-2.5 text-xs font-medium text-foreground focus:border-accent/40 focus:outline-none disabled:opacity-50 ${TASK_STATUS_STYLES[task.status]}`}
    >
      <option value="To do">To do</option>
      <option value="In progress">In progress</option>
      <option value="Done">Done</option>
    </select>
  );

  const renderTaskRowDesktop = (task: Task) => (
    <article className="rounded-xl border border-border bg-surface-elevated/30 px-4 py-4 transition-colors hover:border-accent/20 hover:bg-surface-elevated/50 sm:px-5">
      <div className="grid gap-4 sm:grid-cols-[auto_1.4fr_1fr_1fr_1fr_1fr_auto] sm:items-center">
        <div>{renderCompletionControl(task)}</div>
        <div>
          <h2
            className={`text-sm font-medium ${
              task.status === "Done" ? "text-muted line-through" : "text-foreground"
            }`}
          >
            {task.title}
          </h2>
          <p className="mt-1 text-xs text-muted">{task.project}</p>
        </div>
        <div>{renderPriorityControl(task)}</div>
        <div>{renderStatusControl(task)}</div>
        <div>{renderDueDateControl(task)}</div>
        <div>{renderAssigneeControl(task)}</div>
        <div className="flex items-center gap-1">
          <TaskDeleteButton
            task={task}
            disabled={deleting || updatingIds.has(task.id)}
            onDelete={setDeleteTarget}
          />
          <TaskActionsMenu
            disabled={deleting || updatingIds.has(task.id)}
            onDelete={() => setDeleteTarget(task)}
          />
        </div>
      </div>
    </article>
  );

  const renderTaskRowMobile = (task: Task) => (
    <article className="rounded-xl border border-border bg-surface-elevated/30 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {renderCompletionControl(task)}
          <div>
            <h2
              className={`text-sm font-medium ${
                task.status === "Done" ? "text-muted line-through" : "text-foreground"
              }`}
            >
              {task.title}
            </h2>
            <p className="mt-1 text-xs text-muted">{task.project}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TaskDeleteButton
            task={task}
            disabled={deleting || updatingIds.has(task.id)}
            onDelete={setDeleteTarget}
          />
          <TaskActionsMenu
            disabled={deleting || updatingIds.has(task.id)}
            onDelete={() => setDeleteTarget(task)}
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {renderPriorityControl(task)}
        {renderStatusControl(task)}
      </div>
      <div className="mt-3">
        <p className="text-xs text-muted">Due date</p>
        <div className="mt-1">{renderDueDateControl(task)}</div>
      </div>
      <dl className="mt-3 grid grid-cols-1 gap-2 text-xs">
        <div>
          <dt className="text-muted">Assignee</dt>
          <dd className="mt-1">{renderAssigneeControl(task)}</dd>
        </div>
      </dl>
    </article>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Tasks
          </h1>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Manage priorities, assignments, and delivery across your projects.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="w-full sm:w-auto">
          Create task
        </Button>
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
          disabled={loading}
          className="h-11 w-full max-w-md rounded-lg border border-border bg-surface-elevated/50 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none disabled:opacity-50"
        />
        <div className="flex flex-wrap gap-3">
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | "All")}
            disabled={loading}
            className="h-11 rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none disabled:opacity-50"
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
            disabled={loading}
            className="h-11 rounded-lg border border-border bg-surface-elevated/50 px-3 text-sm text-foreground focus:border-accent/40 focus:outline-none disabled:opacity-50"
          >
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <TasksLoadingSkeleton />
      ) : error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/5 px-6 py-12 text-center"
        >
          <h2 className="text-base font-semibold text-foreground">Unable to load tasks</h2>
          <p className="mt-2 text-sm text-muted">{error}</p>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => void loadTasks()}>
              Retry
            </Button>
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface-elevated/30 px-6 py-12 text-center">
          <h2 className="text-base font-semibold text-foreground">No tasks yet</h2>
          <p className="mt-2 text-sm text-muted">
            Create your first task to get started.
          </p>
          <div className="mt-4">
            <Button onClick={() => setCreateOpen(true)}>Create task</Button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
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
              <li key={task.id}>{renderTaskRowDesktop(task)}</li>
            ))}
          </ul>

          <ul className="space-y-3 lg:hidden">
            {filtered.map((task) => (
              <li key={task.id}>{renderTaskRowMobile(task)}</li>
            ))}
          </ul>
        </>
      )}

      <CreateTaskModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateTask}
        submitting={creating}
        initialAssignee={session?.user?.name ?? ""}
        assigneeOptions={assigneeOptions}
        projectOptions={projectOptions}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete task"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`
            : ""
        }
        confirmLabel={deleting ? "Deleting..." : "Delete task"}
        onCancel={() => {
          if (!deleting) setDeleteTarget(null);
        }}
        onConfirm={() => void handleDeleteTask()}
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
