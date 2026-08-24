import { neon } from "@neondatabase/serverless";

let sqlClient: ReturnType<typeof neon> | null = null;
let schemaReady: Promise<void> | null = null;

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }
  return url;
}

export function getSql() {
  if (!sqlClient) {
    sqlClient = neon(getDatabaseUrl());
  }
  return sqlClient;
}

async function runSchemaMigration() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      image TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      project TEXT NOT NULL,
      priority TEXT NOT NULL CHECK (priority IN ('High', 'Medium', 'Low')),
      status TEXT NOT NULL CHECK (status IN ('To do', 'In progress', 'Done')),
      due_date DATE,
      assignee TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_tasks_user_status ON tasks(user_id, status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_tasks_user_created_at ON tasks(user_id, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_tasks_user_project ON tasks(user_id, project)`;

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL CHECK (status IN ('Planning', 'In progress', 'Review', 'Completed')),
      progress INT NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (user_id, name)
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_projects_user_status ON projects(user_id, status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_projects_user_updated_at ON projects(user_id, updated_at DESC)`;
}

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = runSchemaMigration().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  return schemaReady;
}

export function queryRows<T>(result: unknown): T[] {
  return result as T[];
}

export function queryFirstRow<T>(result: unknown): T {
  return queryRows<T>(result)[0];
}
