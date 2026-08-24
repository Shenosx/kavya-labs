import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { AUTH_ROUTES } from "@/lib/auth-routes";

type AccessDeniedProps = {
  userEmail?: string | null;
};

export function AccessDenied({ userEmail }: AccessDeniedProps) {
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
          Access denied
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your account does not have administrator access to Kavya Labs.
          {userEmail ? (
            <>
              {" "}
              Signed in as <span className="text-foreground">{userEmail}</span>.
            </>
          ) : null}
        </p>
        <p className="mt-2 text-xs text-muted">
          Admin access is controlled by the <code className="text-accent">ADMIN_EMAILS</code>{" "}
          environment variable.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={AUTH_ROUTES.dashboard}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-[#8b7ef5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Back to workspace
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Return to Kavya Labs
          </Link>
        </div>
      </div>
    </div>
  );
}
