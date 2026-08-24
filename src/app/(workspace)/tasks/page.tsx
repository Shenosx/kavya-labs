import { Suspense } from "react";
import { TasksView } from "@/components/workspace/TasksView";

export default function TasksPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-border bg-surface-elevated/30 px-6 py-12 text-center">
          <p className="text-sm text-muted">Loading tasks...</p>
        </div>
      }
    >
      <TasksView />
    </Suspense>
  );
}
