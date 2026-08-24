"use client";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="max-w-md rounded-xl border border-border bg-surface-elevated/50 p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
        <p className="mt-3 text-sm text-muted">
          We couldn&apos;t load this admin view. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center rounded-lg bg-accent px-5 text-sm font-medium text-white hover:bg-[#8b7ef5]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
