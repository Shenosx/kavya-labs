import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { AUTH_ROUTES } from "@/lib/auth-routes";

const errorMessages: Record<string, string> = {
  Configuration: "Authentication is not configured correctly. Please contact support.",
  AccessDenied: "Access was denied. You may not have permission to sign in.",
  Verification: "The sign-in link is no longer valid. Please try again.",
  OAuthSignin: "Could not start Google sign-in. Please try again.",
  OAuthCallback: "Google sign-in could not be completed. Please try again.",
  OAuthAccountNotLinked:
    "This account is already linked to another sign-in method.",
  Default: "Something went wrong during sign-in. Please try again.",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorKey = params.error ?? "Default";
  const message = errorMessages[errorKey] ?? errorMessages.Default;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 surface-grid opacity-30"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface/80 p-8 text-center shadow-glow backdrop-blur-sm sm:p-10">
        <LogoMark className="mx-auto h-10 w-10" />
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Sign-in unavailable
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{message}</p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={AUTH_ROUTES.signIn}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-[#8b7ef5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Try again
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Back to Kavya Labs
          </Link>
        </div>
      </div>
    </div>
  );
}
