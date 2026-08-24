import { DEMO_PROJECTS } from "@/lib/workspace-data";
import type { ProjectStatus } from "@/lib/workspace-data";
import { getSql, queryFirstRow, queryRows } from "@/lib/db";

export type ProjectRecord = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  updatedAt: string;
  createdAt: string;
};

type ProjectRow = {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  updated_at: string;
  created_at: string;
};

export type CreateProjectInput = {
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
};

export type UpdateProjectInput = {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  progress?: number;
};

const STATUSES: ProjectStatus[] = ["Planning", "In progress", "Review", "Completed"];

export function isValidProjectStatus(value: string): value is ProjectStatus {
  return STATUSES.includes(value as ProjectStatus);
}

function clampProgress(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function mapProjectRow(row: ProjectRow): ProjectRecord {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status as ProjectStatus,
    progress: row.progress,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
  };
}

export async function countProjectsForUser(userId: string): Promise<number> {
  const sql = getSql();
  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM projects
    WHERE user_id = ${userId}
  `;
  return Number(queryFirstRow<{ count: number }>(rows).count);
}

export async function seedDemoProjectsForUser(userId: string): Promise<void> {
  const sql = getSql();

  for (const project of DEMO_PROJECTS) {
    await sql`
      INSERT INTO projects (
        user_id,
        name,
        description,
        status,
        progress
      )
      VALUES (
        ${userId},
        ${project.name},
        ${project.description},
        ${project.status},
        ${project.progress}
      )
      ON CONFLICT (user_id, name) DO NOTHING
    `;
  }
}

export async function listProjectsForUser(userId: string): Promise<ProjectRecord[]> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      name,
      description,
      status,
      progress,
      updated_at,
      created_at
    FROM projects
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `;

  return queryRows<ProjectRow>(rows).map(mapProjectRow);
}

export async function getProjectsForUserWithSeed(userId: string): Promise<ProjectRecord[]> {
  const count = await countProjectsForUser(userId);
  if (count === 0) {
    await seedDemoProjectsForUser(userId);
  }
  return listProjectsForUser(userId);
}

export async function createProjectForUser(
  userId: string,
  input: CreateProjectInput
): Promise<ProjectRecord> {
  const sql = getSql();

  const rows = await sql`
    INSERT INTO projects (
      user_id,
      name,
      description,
      status,
      progress
    )
    VALUES (
      ${userId},
      ${input.name.trim()},
      ${input.description.trim()},
      ${input.status},
      ${clampProgress(input.progress)}
    )
    RETURNING
      id,
      name,
      description,
      status,
      progress,
      updated_at,
      created_at
  `;

  return mapProjectRow(queryFirstRow<ProjectRow>(rows));
}

export async function countTasksForProjectName(
  userId: string,
  projectName: string
): Promise<number> {
  const sql = getSql();
  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM tasks
    WHERE user_id = ${userId} AND project = ${projectName}
  `;
  return Number(queryFirstRow<{ count: number }>(rows).count);
}

export async function updateProjectForUser(
  userId: string,
  projectId: string,
  input: UpdateProjectInput
): Promise<ProjectRecord | null> {
  const sql = getSql();

  const existingRows = queryRows<ProjectRow>(
    await sql`
    SELECT
      id,
      name,
      description,
      status,
      progress,
      updated_at,
      created_at
    FROM projects
    WHERE id = ${projectId} AND user_id = ${userId}
    LIMIT 1
  `
  );

  if (existingRows.length === 0) {
    return null;
  }

  const existing = mapProjectRow(existingRows[0]);
  const nextName = input.name !== undefined ? input.name.trim() : existing.name;
  const nextDescription =
    input.description !== undefined ? input.description.trim() : existing.description;
  const nextStatus = input.status ?? existing.status;
  const nextProgress =
    input.progress !== undefined ? clampProgress(input.progress) : existing.progress;

  if (nextName !== existing.name) {
    await sql`
      UPDATE tasks
      SET project = ${nextName}, updated_at = now()
      WHERE user_id = ${userId} AND project = ${existing.name}
    `;
  }

  const rows = await sql`
    UPDATE projects
    SET
      name = ${nextName},
      description = ${nextDescription},
      status = ${nextStatus},
      progress = ${nextProgress},
      updated_at = now()
    WHERE id = ${projectId} AND user_id = ${userId}
    RETURNING
      id,
      name,
      description,
      status,
      progress,
      updated_at,
      created_at
  `;

  return mapProjectRow(queryFirstRow<ProjectRow>(rows));
}

export type DeleteProjectResult =
  | { ok: true }
  | { ok: false; reason: "not_found" | "has_tasks"; taskCount?: number };

export async function deleteProjectForUser(
  userId: string,
  projectId: string
): Promise<DeleteProjectResult> {
  const sql = getSql();

  const existingRows = queryRows<ProjectRow>(
    await sql`
    SELECT id, name
    FROM projects
    WHERE id = ${projectId} AND user_id = ${userId}
    LIMIT 1
  `
  );

  if (existingRows.length === 0) {
    return { ok: false, reason: "not_found" };
  }

  const projectName = existingRows[0].name;
  const taskCount = await countTasksForProjectName(userId, projectName);

  if (taskCount > 0) {
    return { ok: false, reason: "has_tasks", taskCount };
  }

  await sql`
    DELETE FROM projects
    WHERE id = ${projectId} AND user_id = ${userId}
  `;

  return { ok: true };
}

export async function countActiveProjectsForUser(userId: string): Promise<number> {
  const sql = getSql();
  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM projects
    WHERE user_id = ${userId} AND status != 'Completed'
  `;
  return Number(queryFirstRow<{ count: number }>(rows).count);
}

export async function ensureProjectsSeeded(userId: string): Promise<void> {
  const count = await countProjectsForUser(userId);
  if (count === 0) {
    await seedDemoProjectsForUser(userId);
  }
}
