import { NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth-user";
import { listAssigneeOptionsForUser } from "@/lib/assignees-db";

function serverError() {
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export async function GET() {
  try {
    const user = await requireAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const assignees = await listAssigneeOptionsForUser(user.id);
    return NextResponse.json({ assignees });
  } catch {
    return serverError();
  }
}
