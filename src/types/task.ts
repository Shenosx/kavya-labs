import type { TaskPriority, TaskStatus } from "@/lib/workspace-data";

export type Task = {
  id: string;
  title: string;
  project: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  assignee: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskPayload = {
  title: string;
  project: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
};
