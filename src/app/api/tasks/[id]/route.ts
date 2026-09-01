import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuthenticatedUser } from "@/lib/auth-user";
import { ensureSchema } from "@/lib/db";
import {
  deleteTaskForUser,
  isValidDueDate,
  isValidPriority,
  isValidStatus,
  updateTaskForUser,
} from "@/lib/tasks-db";
import { normalizeTaskDueDate } from "@/lib/workspace-data";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function serverError() {
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureSchema();

    const { id } = await context.params;
    const body = await request.json();

    const updates: {
      title?: string;
      project?: string;
      priority?: "High" | "Medium" | "Low";
      status?: "To do" | "In progress" | "Done";
      dueDate?: string | null;
      assignee?: string | null;
    } = {};

    if (body.title !== undefined) {
      if (typeof body.title !== "string" || !body.title.trim()) {
        return NextResponse.json({ error: "Invalid title" }, { status: 400 });
      }
      updates.title = body.title.trim();
    }

    if (body.project !== undefined) {
      if (typeof body.project !== "string" || !body.project.trim()) {
        return NextResponse.json({ error: "Invalid project" }, { status: 400 });
      }
      updates.project = body.project.trim();
    }

    if (body.priority !== undefined) {
      if (typeof body.priority !== "string" || !isValidPriority(body.priority)) {
        return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
      }
      updates.priority = body.priority;
    }

    if (body.status !== undefined) {
      if (typeof body.status !== "string" || !isValidStatus(body.status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      updates.status = body.status;
    }

    if (body.dueDate !== undefined) {
      if (body.dueDate !== null && typeof body.dueDate !== "string") {
        return NextResponse.json({ error: "Invalid due date" }, { status: 400 });
      }

      const dueDate =
        body.dueDate === null
          ? null
          : normalizeTaskDueDate(body.dueDate);

      if (body.dueDate !== null && dueDate === null) {
        return NextResponse.json({ error: "Invalid due date" }, { status: 400 });
      }

      if (!isValidDueDate(dueDate)) {
        return NextResponse.json({ error: "Invalid due date" }, { status: 400 });
      }

      updates.dueDate = dueDate;
    }

    if (body.assignee !== undefined) {
      if (body.assignee !== null && typeof body.assignee !== "string") {
        return NextResponse.json({ error: "Invalid assignee" }, { status: 400 });
      }
      updates.assignee = body.assignee;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const task = await updateTaskForUser(user.id, id, updates);

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    revalidatePath("/dashboard");
    revalidatePath("/tasks");

    return NextResponse.json({ task });
  } catch (error) {
    console.error("PATCH /api/tasks/[id] failed:", error);
    return serverError();
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureSchema();

    const { id } = await context.params;
    const deleted = await deleteTaskForUser(user.id, id);

    if (!deleted) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    revalidatePath("/dashboard");
    revalidatePath("/tasks");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/tasks/[id] failed:", error);
    return serverError();
  }
}
