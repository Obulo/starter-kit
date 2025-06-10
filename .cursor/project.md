# Obulo Master Vision Document

## 🚀 Obulo Overview

**Obulo** is the AI-native platform for building custom internal tools that scale. Designed for agencies, developers, and AI agents, it offers the foundation to build, host, and scale SaaS-like apps tailored for small businesses.

Obulo combines:

* A universal SaaS scaffold (workspace, auth, RLS, billing)
* A CLI & SDK designed for AI devs
* A hybrid architecture: Obulo-hosted + agency-extendable
* Integration-ready platform with vertical presets (e.g. gyms, agencies)

---

## 🏗️ Platform Architecture

### 1. **Monorepo Layout (Turborepo)**

```
starter-kit/
├── apps/
│   └── web/       # Next.js or Vite frontend
├── packages/
│   ├── ui/        # Shared design system (shadcn + Tailwind)
│   ├── sdk/       # Supabase, auth, user helpers
│   └── logic/     # Permissions, roles, workspace logic
├── supabase/      # Schema, RLS, seed
└── turbo.json     # Build orchestrator
```

### 2. **Database Architecture**

* Single Supabase project
* Row-level security (RLS) scoped by `workspace_id`
* All tenants (clients) share a global schema:

  * `workspaces`, `workspace_members`, `projects`, `users`, etc.

### 3. **Vertical Presets**

* CLI flag or UI choice selects a vertical: `--template=gym`
* Injects seed data, starter pages, integrations
* Vertical-specific components (`@obulo/templates/gym`) can be extended by agencies

---

## 🧩 Core Concepts

### Agencies

* Can manage multiple client orgs (workspaces)
* Have access to a hosted platform UI to:

  * Create new client apps
  * Customize components in their IDE (via CLI)
  * See billing, usage, app deployments

### End Clients

* Use apps hosted on Obulo
* Billed per user (\$14/mo)
* Managed by their agency (or Obulo directly)

### AI-First Development

* Obulo is designed for AI agents to scaffold and extend code
* Human devs can jump in via CLI and IDE
* Pre-built logic modules and components are AI-readable and composable

---

## 💸 Billing Model

### Platform Tiers

* **Agency Unlimited Plan:** \$399/mo

  * Unlimited client orgs (apps) under their agency
  * Access to agency dashboard, branded subdomain, advanced templates

* **Client SaaS Plan:** \$14/mo/user

  * Recurring billing for each user in a workspace

### Managed vs BYOH

* **Obulo Hosted:** Default option; all client apps live in our Supabase + Vercel infra
* **Bring Your Own Hosting (BYOH):** For advanced agencies wanting full control

---

## ⚙️ Development Experience

### Obulo CLI

```bash
npx obulo create my-gym-app --template=gym
cd my-gym-app
pnpm install && supabase start && pnpm dev
```

Supports:

* Project scaffolding
* Template injection
* Dev server with Supabase + Vite

### Developer Modes

* Obulo-hosted apps (SaaS-like)
* Agency-hosted apps (custom, self-managed)
* Hybrid: shared schema but external logic

---

## 🔐 Authentication Strategy

### Default: Clerk (for Obulo-hosted apps)

* Secure, managed auth with org support maps to `workspace_id`
* Drop-in UIs for login, profile, user management
* Reduces time-to-value for AI devs and agencies
* Adds multi-session, 2FA, SSO, social logins, etc.

### Auth SDK Abstraction

* `@obulo/sdk/auth` wraps Clerk logic
* Enables future flexibility (Supabase native auth, Auth0, etc.)
* Custom logic for agencies still supported

---

## 🔌 Integrations Strategy

* Every vertical can register integrations via SDK adapters

  ```ts
  import { syncPushPress } from '@obulo/integrations/gym/pushpress';
  await syncPushPress(workspaceId);
  ```
* Data is pulled into normalized Obulo tables
* Logic lives in scheduled jobs or webhooks (supabase + cron)

---

## 🧠 Strategic Advantages

* **AI-first DX:** Makes AI devs productive instantly
* **Composable SaaS logic:** Permissions, billing, RLS — all prebuilt
* **Vertical acceleration:** Presets for gyms, agencies, and more
* **Modern hosting:** Supabase + Vercel out of the box
* **Extensible:** Bring your own IDE, SDK, infra if needed

---

## 🗺️ Next Steps

* Finalize v1 CLI + starter-kit
* Build Obulo-hosted dashboard (agency + client views)
* Productize billing + workspace provisioning
* Publish public templates: gym, agency, creator
* Invite pilot agencies to onboard




# What We Are Building In This Project
We are creating the starter-kit. Here is the brief for it. 

🧱 Obulo Starter Kit — Build Brief

## 🌟 Purpose

This starter kit is the foundation of every internal app built on the Obulo platform — whether hosted by Obulo or self-managed by an agency. It must provide a clean, extensible, and AI-friendly scaffold that includes:

* Workspace-based multi-tenancy
* Clerk-based auth
* Supabase backend with RLS
* Shared design system + logic layer
* Developer-friendly structure for AI agents & IDE use
* CLI & template-ready

---

## 🗂️ Folder Structure (Turborepo)

```
starter-kit/
├── apps/
│   └── web/               # Vite + React + Clerk frontend
├── packages/
│   ├── ui/                # shadcn/ui design system + Tailwind config
│   ├── sdk/               # Supabase client, auth helpers, integrations
│   └── logic/             # Workspace logic, permissions, roles
├── supabase/              # Supabase schema, RLS policies, migrations
├── .env.local             # Example env file
└── turbo.json             # Monorepo orchestration
```

---

## ✅ Must-Haves

### 1. **Multi-Workspace Architecture**

* Each user can belong to one or more workspaces
* Tables must include `workspace_id` and be protected by Supabase RLS
* UI supports switching workspaces (like Notion)

### 2. **Auth with Clerk**

* Clerk frontend integration with React
* Use organization features to map Clerk → workspace
* Support for login only (no public signups)
* Admin-only user management screen
* Profile screen for editing name, avatar

### 3. **Supabase Integration**

* RLS policies for all workspace-bound tables
* Seed script for initial org + user + workspace
* Real-time setup (optional)
* Supabase CLI support (`supabase start`)

### 4. **UI & Design System**

* Tailwind + shadcn/ui
* Dark/light mode toggle
* Page layout components (sidebar, header)
* Reusable components for buttons, inputs, tables, etc.

### 5. **CLI Compatibility**

* Must be clonable via: `npx obulo create my-app`
* Accepts `--template=gym` or other presets
* Folder structure must support template injection (e.g., seeded logic/components)

---

## 🧠 Nice-to-Haves (For Iteration)

* Feature flags per workspace
* Reusable loading/skeleton states
* In-app notifications system (Toast/Supabase Realtime)
* Audit logs via DB triggers

---

## 📦 Env Setup (example)

```env
SUPABASE_URL=https://your-instance.supabase.co
SUPABASE_ANON_KEY=...
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_FRONTEND_API=...
```

---

## 💪 Dev Commands

```bash
pnpm install
supabase start
pnpm dev
```


