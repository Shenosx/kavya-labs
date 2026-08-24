import { auth } from "@/auth";
import { ensureSchema } from "@/lib/db";
import { upsertUserByEmail, type DbUser } from "@/lib/users";

export type AuthenticatedUser = DbUser;

export async function requireAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return null;
  }

  await ensureSchema();

  return upsertUserByEmail({
    email,
    name: session.user?.name ?? null,
    image: session.user?.image ?? null,
  });
}
