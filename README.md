# Kavya Labs

Finlatics Full-Stack Development with AI — Project 4.

A premium landing page and authenticated workspace for **Kavya Labs**.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Auth.js / NextAuth (Google OAuth)
- Plus Jakarta Sans (Google Fonts)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Week 1 — Landing Page

- Sticky navigation with mobile menu
- Hero with CSS/SVG abstract visualization
- Trust / metrics strip
- Features (4 cards)
- Visual story (Input → Intelligence → Insight → Action)
- CTA section
- Footer

## Week 2 — Authentication Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create Google OAuth credentials

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Go to **APIs & Services → Credentials**
4. Create an **OAuth 2.0 Client ID** (Web application)

### 3. Add environment variables

Copy the example file and fill in your values locally:

```bash
cp .env.example .env.local
```

Required variables:

```env
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

Generate `AUTH_SECRET` with:

```bash
openssl rand -base64 32
```

Never commit `.env.local` or real secrets to Git.

### 4. Configure localhost redirect URI

Add this authorized redirect URI in Google Cloud Console:

```text
http://localhost:3000/api/auth/callback/google
```

### 5. Configure production redirect URI

For Vercel, add your deployed domain using the same Auth.js callback path:

```text
https://YOUR-VERCEL-DOMAIN/api/auth/callback/google
```

Replace `YOUR-VERCEL-DOMAIN` with your actual deployment URL. Do not hardcode a specific domain in application code.

### 6. Run the application

```bash
npm run dev
```

Then test:

1. Landing page → **Get Started**
2. `/auth/signin` → **Continue with Google**
3. Successful callback → `/dashboard`
4. Sign out → `/auth/signin`

## Week 2 Scope

- Google OAuth via Auth.js
- Custom sign-in page
- Protected `/dashboard` workspace shell
- Session-aware landing page navigation

## Week 3 — Admin Dashboard

The admin area provides user management, analytics, and workspace settings for authorized administrators.

### Admin routes

| Route | Description |
| ----- | ----------- |
| `/admin` | Overview with KPIs, charts, and recent activity |
| `/admin/users` | User management table with search, filters, and sorting |
| `/admin/analytics` | Analytics with date range selector |
| `/admin/settings` | Demo workspace settings |

### Admin access configuration

Admin access is controlled by the `ADMIN_EMAILS` environment variable (comma-separated list of allowed emails).

```env
ADMIN_EMAILS=you@example.com,another-admin@example.com
```

Add your Google account email to `ADMIN_EMAILS` in `.env.local` after signing in with OAuth.

**Authenticated but not admin:** users see a polished access denied page with a link back to `/dashboard`.

**Unauthenticated:** users are redirected to `/auth/signin`.

### Week 3 scope

- Admin dashboard shell with sidebar and top navigation
- KPI overview cards with demo metrics
- SVG-based analytics charts (no heavy charting library)
- User management UI with search, filters, sorting, pagination, profile drawer
- Demo settings stored in local component state only

### Preserved from earlier weeks

- Week 1 landing page (`/`)
- Week 2 authentication (`/auth/signin`, `/dashboard`, Google OAuth)

## Not Included Yet

Database-backed admin mutations, production role management APIs, and Week 4 features are intentionally not implemented.
