import type { ProjectStatus } from "@/lib/workspace-data";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  updatedAt: string;
  createdAt: string;
};

export type CreateProjectPayload = {
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
};

export type UpdateProjectPayload = {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  progress?: number;
};
