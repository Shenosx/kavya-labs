import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "Dashboard — Kavya Labs",
  description: "Your Kavya Labs workspace.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <DashboardShell user={session.user}>{children}</DashboardShell>
  );
}
