import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  BackToHomeLink,
  GoogleSignInButton,
  SignInBrand,
} from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign in — Kavya Labs",
  description: "Sign in to your Kavya Labs workspace.",
};

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 surface-grid opacity-30"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-border bg-surface/80 p-8 shadow-glow backdrop-blur-sm sm:p-10">
          <SignInBrand />

          <div className="mt-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Sign in to continue to your workspace.
            </p>
          </div>

          <div className="mt-8">
            <GoogleSignInButton />
          </div>

          <div className="mt-8 text-center">
            <BackToHomeLink />
          </div>
        </div>
      </div>
    </div>
  );
}
