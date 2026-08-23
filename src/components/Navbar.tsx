import { auth } from "@/auth";
import { NavbarClient } from "@/components/NavbarClient";

export async function Navbar() {
  const session = await auth();
  return <NavbarClient session={session} />;
}
