import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuthenticatedUser } from "@/lib/auth-user";
import {
  createTaskForUser,
  getTasksForUserWithSeed,
  isValidDueDate,
  isValidPriority,
  isValidStatus,
} from "@/lib/tasks-db";

function serverError() {
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export async function GET() {
  try {
    const user = await requireAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tasks = await getTasksForUserWithSeed(user.id);
    return NextResponse.json({ tasks });
  } catch {
    return serverError();
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const project = typeof body.project === "string" ? body.project.trim() : "";
    const priority = typeof body.priority === "string" ? body.priority : "";
    const status = typeof body.status === "string" ? body.status : "";

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!project) {
      return NextResponse.json({ error: "Project is required" }, { status: 400 });
    }

    if (!isValidPriority(priority)) {
      return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
    }

    if (!isValidStatus(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const dueDate =
      typeof body.dueDate === "string" && body.dueDate.trim()
        ? body.dueDate.trim()
        : null;
    const assignee =
      typeof body.assignee === "string" && body.assignee.trim()
        ? body.assignee.trim()
        : null;

    if (!isValidDueDate(dueDate)) {
      return NextResponse.json({ error: "Invalid due date" }, { status: 400 });
    }

    const task = await createTaskForUser(user.id, {
      title,
      project,
      priority,
      status,
      dueDate,
      assignee,
    });

    revalidatePath("/dashboard");

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.error("POST /api/tasks failed:", error);
    return serverError();
  }
}
