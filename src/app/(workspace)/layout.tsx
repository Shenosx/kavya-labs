import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "Workspace — Kavya Labs",
  description: "Your Kavya Labs workspace.",
};

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}
