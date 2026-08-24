export type UserRole = "Admin" | "Member" | "Viewer";
export type UserStatus = "Active" | "Invited" | "Suspended";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  lastActive: string;
  initials: string;
  recentActivity: string[];
};

export type KpiMetric = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
};

export type ActivityEvent = {
  id: string;
  name: string;
  initials: string;
  description: string;
  timestamp: string;
  type: "join" | "project" | "milestone" | "update" | "signin";
};

export type DateRangeKey = "7d" | "30d" | "90d";

export const KPI_METRICS: KpiMetric[] = [
  { id: "total-users", label: "Total Users", value: "1,284", change: "+12.8%", trend: "up" },
  { id: "active-users", label: "Active Users", value: "892", change: "+8.4%", trend: "up" },
  { id: "new-signups", label: "New Signups", value: "164", change: "+18.4%", trend: "up" },
  { id: "engagement", label: "Engagement", value: "72.6%", change: "+5.2%", trend: "up" },
];

export const DEMO_USERS: DemoUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@kavyalabs.io",
    role: "Admin",
    status: "Active",
    joined: "2024-08-12",
    lastActive: "2026-08-24T09:15:00Z",
    initials: "SC",
    recentActivity: ["Updated workspace settings", "Reviewed user permissions", "Signed in"],
  },
  {
    id: "2",
    name: "Marcus Lee",
    email: "marcus.lee@kavyalabs.io",
    role: "Member",
    status: "Active",
    joined: "2024-11-03",
    lastActive: "2026-08-24T08:42:00Z",
    initials: "ML",
    recentActivity: ["Created project Launch v2", "Assigned 3 tasks", "Commented on roadmap"],
  },
  {
    id: "3",
    name: "Emily Tan",
    email: "emily.tan@kavyalabs.io",
    role: "Member",
    status: "Active",
    joined: "2025-01-18",
    lastActive: "2026-08-23T16:20:00Z",
    initials: "ET",
    recentActivity: ["Completed milestone Beta QA", "Updated task priorities"],
  },
  {
    id: "4",
    name: "Daniel Wong",
    email: "daniel.wong@kavyalabs.io",
    role: "Viewer",
    status: "Active",
    joined: "2025-03-07",
    lastActive: "2026-08-22T11:05:00Z",
    initials: "DW",
    recentActivity: ["Viewed analytics report", "Exported project summary"],
  },
  {
    id: "5",
    name: "Alex Morgan",
    email: "alex.morgan@kavyalabs.io",
    role: "Member",
    status: "Active",
    joined: "2025-04-22",
    lastActive: "2026-08-24T07:30:00Z",
    initials: "AM",
    recentActivity: ["Signed in", "Updated profile", "Joined sprint planning"],
  },
  {
    id: "6",
    name: "Priya Sharma",
    email: "priya.sharma@kavyalabs.io",
    role: "Admin",
    status: "Active",
    joined: "2024-09-30",
    lastActive: "2026-08-23T14:50:00Z",
    initials: "PS",
    recentActivity: ["Managed user roles", "Reviewed audit log"],
  },
  {
    id: "7",
    name: "James Okonkwo",
    email: "james.okonkwo@kavyalabs.io",
    role: "Member",
    status: "Invited",
    joined: "2026-08-10",
    lastActive: "2026-08-10T10:00:00Z",
    initials: "JO",
    recentActivity: ["Invitation sent", "Pending account activation"],
  },
  {
    id: "8",
    name: "Lina Fischer",
    email: "lina.fischer@kavyalabs.io",
    role: "Viewer",
    status: "Active",
    joined: "2025-06-14",
    lastActive: "2026-08-21T09:18:00Z",
    initials: "LF",
    recentActivity: ["Viewed dashboard", "Downloaded report"],
  },
  {
    id: "9",
    name: "Ryan Patel",
    email: "ryan.patel@kavyalabs.io",
    role: "Member",
    status: "Suspended",
    joined: "2025-02-05",
    lastActive: "2026-07-15T13:22:00Z",
    initials: "RP",
    recentActivity: ["Account suspended by admin", "Last active 5 weeks ago"],
  },
  {
    id: "10",
    name: "Maya Johnson",
    email: "maya.johnson@kavyalabs.io",
    role: "Member",
    status: "Active",
    joined: "2025-07-01",
    lastActive: "2026-08-24T06:55:00Z",
    initials: "MJ",
    recentActivity: ["Created 5 tasks", "Updated project timeline"],
  },
  {
    id: "11",
    name: "Chris Alvarez",
    email: "chris.alvarez@kavyalabs.io",
    role: "Viewer",
    status: "Invited",
    joined: "2026-08-18",
    lastActive: "2026-08-18T08:00:00Z",
    initials: "CA",
    recentActivity: ["Invitation sent"],
  },
  {
    id: "12",
    name: "Nina Kowalski",
    email: "nina.kowalski@kavyalabs.io",
    role: "Member",
    status: "Active",
    joined: "2025-08-25",
    lastActive: "2026-08-23T19:40:00Z",
    initials: "NK",
    recentActivity: ["Completed sprint review", "Updated documentation"],
  },
];

export const RECENT_ACTIVITY: ActivityEvent[] = [
  {
    id: "a1",
    name: "Sarah Chen",
    initials: "SC",
    description: "Sarah Chen joined the workspace",
    timestamp: "2026-08-24T09:15:00Z",
    type: "join",
  },
  {
    id: "a2",
    name: "Marcus Lee",
    initials: "ML",
    description: "Marcus Lee created a new project",
    timestamp: "2026-08-24T08:42:00Z",
    type: "project",
  },
  {
    id: "a3",
    name: "Emily Tan",
    initials: "ET",
    description: "Emily Tan completed a milestone",
    timestamp: "2026-08-23T16:20:00Z",
    type: "milestone",
  },
  {
    id: "a4",
    name: "Daniel Wong",
    initials: "DW",
    description: "Daniel Wong updated a project",
    timestamp: "2026-08-22T11:05:00Z",
    type: "update",
  },
  {
    id: "a5",
    name: "Alex Morgan",
    initials: "AM",
    description: "Alex Morgan signed in",
    timestamp: "2026-08-24T07:30:00Z",
    type: "signin",
  },
  {
    id: "a6",
    name: "Maya Johnson",
    initials: "MJ",
    description: "Maya Johnson created 5 new tasks",
    timestamp: "2026-08-24T06:55:00Z",
    type: "project",
  },
];

/** Deterministic growth data — new users per day */
export function getGrowthData(range: DateRangeKey): { label: string; value: number }[] {
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const base = range === "7d" ? 8 : range === "30d" ? 4 : 3;
  return Array.from({ length: days }, (_, i) => {
    const day = days - i;
    const value = base + Math.round((Math.sin(i * 0.45) + 1) * 3) + (i % 5);
    return {
      label: range === "7d" ? `D${day}` : `${day}d`,
      value,
    };
  }).reverse();
}

export function getActivityOverview(range: DateRangeKey) {
  const multiplier = range === "7d" ? 0.35 : range === "30d" ? 1 : 2.8;
  return [
    { label: "Active users", value: Math.round(892 * multiplier) },
    { label: "Sessions", value: Math.round(1240 * multiplier) },
    { label: "Projects created", value: Math.round(48 * multiplier) },
    { label: "Tasks completed", value: Math.round(316 * multiplier) },
  ];
}

export function getSignupSummary(range: DateRangeKey) {
  const data = getGrowthData(range);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return {
    total,
    average: Math.round(total / data.length),
    peak: Math.max(...data.map((d) => d.value)),
  };
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date("2026-08-24T10:00:00Z");
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
