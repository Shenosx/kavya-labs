"use client";

import { signIn } from "next-auth/react";
import { IconGoogle, LogoMark } from "@/components/icons";
import Link from "next/link";
import { AUTH_ROUTES } from "@/lib/auth-routes";

export function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: AUTH_ROUTES.dashboard })}
      className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border-strong bg-surface-elevated/60 px-5 text-sm font-medium text-foreground transition-all duration-200 hover:border-accent/40 hover:bg-surface-elevated active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label="Continue with Google"
    >
      <IconGoogle className="h-5 w-5" />
      Continue with Google
    </button>
  );
}

export function BackToHomeLink() {
  return (
    <Link
      href="/"
      className="text-sm text-muted transition-colors hover:text-foreground focus-visible:text-foreground"
    >
      ← Back to Kavya Labs
    </Link>
  );
}

export function SignInBrand() {
  return (
    <div className="flex flex-col items-center text-center">
      <LogoMark className="h-10 w-10" />
      <p className="mt-4 text-lg font-semibold tracking-tight text-foreground">
        Kavya Labs
      </p>
    </div>
  );
}
