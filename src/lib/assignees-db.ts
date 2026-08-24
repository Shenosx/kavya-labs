import { getSql, queryRows } from "@/lib/db";

export type AssigneeOption = {
  name: string;
};

export async function listAssigneeOptionsForUser(userId: string): Promise<AssigneeOption[]> {
  const sql = getSql();

  const userRows = await sql`
    SELECT DISTINCT name
    FROM users
    WHERE name IS NOT NULL AND trim(name) <> ''
    ORDER BY name ASC
  `;

  const taskRows = await sql`
    SELECT DISTINCT assignee AS name
    FROM tasks
    WHERE user_id = ${userId}
      AND assignee IS NOT NULL
      AND trim(assignee) <> ''
    ORDER BY assignee ASC
  `;

  const names = new Set<string>();

  for (const row of queryRows<{ name: string }>(userRows)) {
    names.add(row.name.trim());
  }

  for (const row of queryRows<{ name: string }>(taskRows)) {
    names.add(row.name.trim());
  }

  return Array.from(names)
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({ name }));
}
