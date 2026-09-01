import { DEMO_TASKS } from "@/lib/workspace-data";
import type { TaskPriority, TaskStatus } from "@/lib/workspace-data";
import { normalizeTaskDueDate } from "@/lib/workspace-data";
import { getSql, ensureSchema, queryFirstRow, queryRows } from "@/lib/db";
import {
  countActiveProjectsForUser,
  ensureProjectsSeeded,
} from "@/lib/projects-db";

export type TaskRecord = {
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

type TaskRow = {
  id: string;
  title: string;
  project: string;
  priority: string;
  status: string;
  due_date: string | null;
  assignee: string | null;
  created_at: string;
  updated_at: string;
};

export type DashboardSummary = {
  activeProjects: number;
  openTasks: number;
  completedTasks: number;
};

export type CreateTaskInput = {
  title: string;
  project: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string | null;
  assignee?: string | null;
};

export type UpdateTaskInput = {
  title?: string;
  project?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string | null;
  assignee?: string | null;
};

const PRIORITIES: TaskPriority[] = ["High", "Medium", "Low"];
const STATUSES: TaskStatus[] = ["To do", "In progress", "Done"];

export function isValidPriority(value: string): value is TaskPriority {
  return PRIORITIES.includes(value as TaskPriority);
}

export function isValidStatus(value: string): value is TaskStatus {
  return STATUSES.includes(value as TaskStatus);
}

export function isValidDueDate(value: string | null): boolean {
  if (value === null) return true;
  const normalized = normalizeTaskDueDate(value);
  if (!normalized) return false;
  const [year, month, day] = normalized.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function formatDateValue(value: string | null | undefined): string | null {
  return normalizeTaskDueDate(value);
}

function mapTaskRow(row: TaskRow): TaskRecord {
  return {
    id: row.id,
    title: row.title,
    project: row.project,
    priority: row.priority as TaskPriority,
    status: row.status as TaskStatus,
    dueDate: normalizeTaskDueDate(row.due_date),
    assignee: row.assignee,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function countTasksForUser(userId: string): Promise<number> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM tasks
    WHERE user_id = ${userId}
  `;
  return Number(queryFirstRow<{ count: number }>(rows).count);
}

export async function seedDemoTasksForUser(userId: string): Promise<void> {
  await ensureSchema();
  const sql = getSql();

  for (const task of DEMO_TASKS) {
    await sql`
      INSERT INTO tasks (
        user_id,
        title,
        project,
        priority,
        status,
        due_date,
        assignee
      )
      VALUES (
        ${userId},
        ${task.title},
        ${task.project},
        ${task.priority},
        ${task.status},
        ${formatDateValue(task.dueDate)},
        ${task.assignee}
      )
    `;
  }
}

export async function listTasksForUser(userId: string): Promise<TaskRecord[]> {
  await ensureSchema();
  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      title,
      project,
      priority,
      status,
      due_date,
      assignee,
      created_at,
      updated_at
    FROM tasks
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;

  return queryRows<TaskRow>(rows).map(mapTaskRow);
}

export async function getTasksForUserWithSeed(userId: string): Promise<TaskRecord[]> {
  const count = await countTasksForUser(userId);
  if (count === 0) {
    await seedDemoTasksForUser(userId);
  }
  return listTasksForUser(userId);
}

export async function createTaskForUser(
  userId: string,
  input: CreateTaskInput
): Promise<TaskRecord> {
  await ensureSchema();
  const sql = getSql();

  const rows = await sql`
    INSERT INTO tasks (
      user_id,
      title,
      project,
      priority,
      status,
      due_date,
      assignee
    )
    VALUES (
      ${userId},
      ${input.title.trim()},
      ${input.project.trim()},
      ${input.priority},
      ${input.status},
      ${formatDateValue(input.dueDate)},
      ${input.assignee?.trim() || null}
    )
    RETURNING
      id,
      title,
      project,
      priority,
      status,
      due_date,
      assignee,
      created_at,
      updated_at
  `;

  return mapTaskRow(queryFirstRow<TaskRow>(rows));
}

export async function updateTaskForUser(
  userId: string,
  taskId: string,
  input: UpdateTaskInput
): Promise<TaskRecord | null> {
  await ensureSchema();
  const sql = getSql();

  const existingRows = queryRows<TaskRow>(
    await sql`
    SELECT
      id,
      title,
      project,
      priority,
      status,
      due_date,
      assignee,
      created_at,
      updated_at
    FROM tasks
    WHERE id = ${taskId} AND user_id = ${userId}
    LIMIT 1
  `
  );

  if (existingRows.length === 0) {
    return null;
  }

  const existing = mapTaskRow(existingRows[0]);

  const nextTitle = input.title !== undefined ? input.title.trim() : existing.title;
  const nextProject =
    input.project !== undefined ? input.project.trim() : existing.project;
  const nextPriority = input.priority ?? existing.priority;
  const nextStatus = input.status ?? existing.status;
  const nextDueDate =
    input.dueDate !== undefined
      ? formatDateValue(input.dueDate)
      : existing.dueDate;
  const nextAssignee =
    input.assignee !== undefined
      ? input.assignee === null
        ? null
        : input.assignee.trim() || null
      : existing.assignee;

  const rows = await sql`
    UPDATE tasks
    SET
      title = ${nextTitle},
      project = ${nextProject},
      priority = ${nextPriority},
      status = ${nextStatus},
      due_date = ${nextDueDate},
      assignee = ${nextAssignee},
      updated_at = now()
    WHERE id = ${taskId} AND user_id = ${userId}
    RETURNING
      id,
      title,
      project,
      priority,
      status,
      due_date,
      assignee,
      created_at,
      updated_at
  `;

  return mapTaskRow(queryFirstRow<TaskRow>(rows));
}

export async function deleteTaskForUser(
  userId: string,
  taskId: string
): Promise<boolean> {
  await ensureSchema();
  const sql = getSql();

  const rows = await sql`
    DELETE FROM tasks
    WHERE id = ${taskId} AND user_id = ${userId}
    RETURNING id
  `;

  return queryRows<{ id: string }>(rows).length > 0;
}

export async function getDashboardSummaryForUser(
  userId: string
): Promise<DashboardSummary> {
  const sql = getSql();

  await ensureProjectsSeeded(userId);

  const openRows = await sql`
    SELECT COUNT(*)::int AS count
    FROM tasks
    WHERE user_id = ${userId} AND status != 'Done'
  `;

  const completedRows = await sql`
    SELECT COUNT(*)::int AS count
    FROM tasks
    WHERE user_id = ${userId} AND status = 'Done'
  `;

  const activeProjects = await countActiveProjectsForUser(userId);

  return {
    openTasks: Number(queryFirstRow<{ count: number }>(openRows).count),
    completedTasks: Number(queryFirstRow<{ count: number }>(completedRows).count),
    activeProjects,
  };
}

export async function getDashboardSummaryWithSeed(
  userId: string
): Promise<DashboardSummary> {
  const count = await countTasksForUser(userId);
  if (count === 0) {
    await seedDemoTasksForUser(userId);
  }
  return getDashboardSummaryForUser(userId);
}
