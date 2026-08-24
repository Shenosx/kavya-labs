import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuthenticatedUser } from "@/lib/auth-user";
import {
  deleteProjectForUser,
  isValidProjectStatus,
  updateProjectForUser,
} from "@/lib/projects-db";

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

    const { id } = await context.params;
    const body = await request.json();

    const updates: {
      name?: string;
      description?: string;
      status?: "Planning" | "In progress" | "Review" | "Completed";
      progress?: number;
    } = {};

    if (body.name !== undefined) {
      if (typeof body.name !== "string" || !body.name.trim()) {
        return NextResponse.json({ error: "Invalid project name" }, { status: 400 });
      }
      updates.name = body.name.trim();
    }

    if (body.description !== undefined) {
      if (typeof body.description !== "string") {
        return NextResponse.json({ error: "Invalid description" }, { status: 400 });
      }
      updates.description = body.description.trim();
    }

    if (body.status !== undefined) {
      if (typeof body.status !== "string" || !isValidProjectStatus(body.status)) {
        return NextResponse.json({ error: "Invalid project status" }, { status: 400 });
      }
      updates.status = body.status;
    }

    if (body.progress !== undefined) {
      const progress =
        typeof body.progress === "number"
          ? body.progress
          : Number.parseInt(String(body.progress), 10);
      if (Number.isNaN(progress)) {
        return NextResponse.json({ error: "Invalid progress value" }, { status: 400 });
      }
      updates.progress = progress;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const project = await updateProjectForUser(user.id, id, updates);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    revalidatePath("/dashboard");
    revalidatePath("/projects");

    return NextResponse.json({ project });
  } catch {
    return serverError();
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const result = await deleteProjectForUser(user.id, id);

    if (!result.ok && result.reason === "not_found") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (!result.ok && result.reason === "has_tasks") {
      return NextResponse.json(
        {
          error: `This project has ${result.taskCount} associated task${
            result.taskCount === 1 ? "" : "s"
          }. Remove or reassign them before deleting the project.`,
        },
        { status: 409 }
      );
    }

    revalidatePath("/dashboard");
    revalidatePath("/projects");

    return NextResponse.json({ success: true });
  } catch {
    return serverError();
  }
}
