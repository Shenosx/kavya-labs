import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuthenticatedUser } from "@/lib/auth-user";
import {
  createProjectForUser,
  getProjectsForUserWithSeed,
  isValidProjectStatus,
} from "@/lib/projects-db";

function serverError() {
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export async function GET() {
  try {
    const user = await requireAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await getProjectsForUserWithSeed(user.id);
    return NextResponse.json({ projects });
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
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : "";
    const status = typeof body.status === "string" ? body.status : "";
    const progress =
      typeof body.progress === "number"
        ? body.progress
        : Number.parseInt(String(body.progress ?? 0), 10);

    if (!name) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    if (!isValidProjectStatus(status)) {
      return NextResponse.json({ error: "Invalid project status" }, { status: 400 });
    }

    if (Number.isNaN(progress)) {
      return NextResponse.json({ error: "Invalid progress value" }, { status: 400 });
    }

    const project = await createProjectForUser(user.id, {
      name,
      description,
      status,
      progress,
    });

    revalidatePath("/dashboard");
    revalidatePath("/projects");

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("duplicate") || message.includes("unique")) {
      return NextResponse.json(
        { error: "A project with this name already exists" },
        { status: 400 }
      );
    }
    return serverError();
  }
}
