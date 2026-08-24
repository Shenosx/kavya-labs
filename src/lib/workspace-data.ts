export type ProjectStatus = "Planning" | "In progress" | "Review" | "Completed";

export type DemoProject = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  lastUpdated: string;
};

export type TaskPriority = "High" | "Medium" | "Low";
export type TaskStatus = "To do" | "In progress" | "Done";

export type DemoTask = {
  id: string;
  title: string;
  project: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
};

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: "p1",
    name: "Product launch",
    description: "Coordinate release milestones, QA, and go-to-market assets.",
    status: "In progress",
    progress: 68,
    lastUpdated: "2026-08-24T09:00:00Z",
  },
  {
    id: "p2",
    name: "Platform rebuild",
    description: "Modernize core architecture and improve deployment workflows.",
    status: "Planning",
    progress: 24,
    lastUpdated: "2026-08-23T14:30:00Z",
  },
  {
    id: "p3",
    name: "Customer portal",
    description: "Self-service portal for clients to track progress and requests.",
    status: "Review",
    progress: 91,
    lastUpdated: "2026-08-22T11:15:00Z",
  },
  {
    id: "p4",
    name: "Q2 roadmap",
    description: "Planning and prioritization for the next quarter initiatives.",
    status: "In progress",
    progress: 52,
    lastUpdated: "2026-08-21T16:45:00Z",
  },
  {
    id: "p5",
    name: "Design system audit",
    description: "Align components, tokens, and documentation across products.",
    status: "Completed",
    progress: 100,
    lastUpdated: "2026-08-20T10:00:00Z",
  },
  {
    id: "p6",
    name: "API integration",
    description: "Connect third-party services and internal data pipelines.",
    status: "In progress",
    progress: 44,
    lastUpdated: "2026-08-19T08:20:00Z",
  },
];

export const DEMO_TASKS: DemoTask[] = [
  {
    id: "t1",
    title: "Finalize launch checklist",
    project: "Product launch",
    priority: "High",
    status: "In progress",
    dueDate: "2026-08-26",
    assignee: "Alex Chen",
  },
  {
    id: "t2",
    title: "Review API integration scope",
    project: "Platform rebuild",
    priority: "High",
    status: "To do",
    dueDate: "2026-08-27",
    assignee: "Jordan Lee",
  },
  {
    id: "t3",
    title: "Update portal onboarding copy",
    project: "Customer portal",
    priority: "Medium",
    status: "In progress",
    dueDate: "2026-08-28",
    assignee: "Sam Rivera",
  },
  {
    id: "t4",
    title: "Prepare sprint planning notes",
    project: "Q2 roadmap",
    priority: "Medium",
    status: "Done",
    dueDate: "2026-08-22",
    assignee: "Emily Tan",
  },
  {
    id: "t5",
    title: "Audit component tokens",
    project: "Design system audit",
    priority: "Low",
    status: "Done",
    dueDate: "2026-08-20",
    assignee: "Daniel Wong",
  },
  {
    id: "t6",
    title: "Configure webhook endpoints",
    project: "API integration",
    priority: "High",
    status: "To do",
    dueDate: "2026-08-29",
    assignee: "Marcus Lee",
  },
  {
    id: "t7",
    title: "Draft beta release notes",
    project: "Product launch",
    priority: "Medium",
    status: "In progress",
    dueDate: "2026-08-25",
    assignee: "Sarah Chen",
  },
  {
    id: "t8",
    title: "Validate staging deployment",
    project: "Platform rebuild",
    priority: "Low",
    status: "To do",
    dueDate: "2026-08-30",
    assignee: "Alex Morgan",
  },
];

export function formatWorkspaceDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Normalize DB/API due dates to YYYY-MM-DD for date inputs and comparisons. */
export function normalizeTaskDueDate(value: string | null | undefined): string | null {
  if (value == null || value === "") {
    return null;
  }

  const match = String(value).trim().match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

export const PROJECT_STATUS_STYLES: Record<ProjectStatus, string> = {
  Planning: "bg-surface-elevated text-muted",
  "In progress": "bg-accent/20 text-accent",
  Review: "bg-amber-500/15 text-amber-300",
  Completed: "bg-emerald-500/15 text-emerald-300",
};

export const TASK_PRIORITY_STYLES: Record<TaskPriority, string> = {
  High: "bg-accent/20 text-accent",
  Medium: "bg-blue-500/15 text-blue-300",
  Low: "bg-surface-elevated text-muted",
};

export const TASK_STATUS_STYLES: Record<TaskStatus, string> = {
  "To do": "bg-surface-elevated text-muted",
  "In progress": "bg-accent/20 text-accent",
  Done: "bg-emerald-500/15 text-emerald-300",
};
