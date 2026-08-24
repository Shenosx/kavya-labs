import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { AccessDenied } from "@/components/admin/AccessDenied";

export const metadata = {
  title: "Admin — Kavya Labs",
  description: "Kavya Labs admin dashboard.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  if (!isAdminEmail(session.user.email)) {
    return <AccessDenied userEmail={session.user.email} />;
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}
