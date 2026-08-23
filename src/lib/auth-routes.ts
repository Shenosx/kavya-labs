export type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type NavbarSession = {
  user?: SessionUser;
} | null;

export const AUTH_ROUTES = {
  signIn: "/auth/signin",
  dashboard: "/dashboard",
} as const;
