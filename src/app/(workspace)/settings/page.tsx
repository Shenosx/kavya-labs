import { auth } from "@/auth";
import { SettingsView } from "@/components/workspace/SettingsView";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user ?? {};

  return <SettingsView user={user} />;
}
