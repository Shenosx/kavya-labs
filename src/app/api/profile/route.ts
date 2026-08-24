import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuthenticatedUser } from "@/lib/auth-user";
import { updateUserProfile } from "@/lib/users";

function serverError() {
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export async function GET() {
  try {
    const user = await requireAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      profile: {
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  } catch {
    return serverError();
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await requireAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const profile = await updateUserProfile(user.id, { name });

    if (!profile) {
      return NextResponse.json({ error: "Unable to update profile" }, { status: 400 });
    }

    revalidatePath("/settings");
    revalidatePath("/dashboard");

    return NextResponse.json({
      profile: {
        name: profile.name,
        email: profile.email,
        image: profile.image,
      },
    });
  } catch {
    return serverError();
  }
}
