import { Suspense } from "react";
import { ProjectsView } from "@/components/workspace/ProjectsView";

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-border bg-surface-elevated/30 px-6 py-12 text-center">
          <p className="text-sm text-muted">Loading projects...</p>
        </div>
      }
    >
      <ProjectsView />
    </Suspense>
  );
}
