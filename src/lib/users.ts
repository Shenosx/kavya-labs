import { getSql, queryFirstRow, queryRows } from "@/lib/db";

export type DbUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: string;
};

type UserRow = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  created_at: string;
};

function mapUserRow(row: UserRow): DbUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    image: row.image,
    createdAt: row.created_at,
  };
}

export async function upsertUserByEmail(input: {
  email: string;
  name: string | null;
  image: string | null;
}): Promise<DbUser> {
  const sql = getSql();

  const rows = await sql`
    INSERT INTO users (email, name, image)
    VALUES (${input.email}, ${input.name}, ${input.image})
    ON CONFLICT (email) DO UPDATE SET
      image = EXCLUDED.image
    RETURNING id, email, name, image, created_at
  `;

  return mapUserRow(queryFirstRow<UserRow>(rows));
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const sql = getSql();

  const rows = queryRows<UserRow>(
    await sql`
    SELECT id, email, name, image, created_at
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `
  );

  if (rows.length === 0) {
    return null;
  }

  return mapUserRow(rows[0]);
}

export async function updateUserProfile(
  userId: string,
  input: { name: string }
): Promise<DbUser | null> {
  const sql = getSql();
  const name = input.name.trim();

  if (!name) {
    return null;
  }

  const rows = await sql`
    UPDATE users
    SET name = ${name}
    WHERE id = ${userId}
    RETURNING id, email, name, image, created_at
  `;

  if (queryRows<UserRow>(rows).length === 0) {
    return null;
  }

  return mapUserRow(queryFirstRow<UserRow>(rows));
}
