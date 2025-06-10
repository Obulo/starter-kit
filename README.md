# Obulo Starter Kit

This is the foundation starter kit for building internal tools on the Obulo platform. It provides a multi-workspace, AI-friendly scaffold with Clerk auth, Supabase backend, and modern React frontend.

## 🏗️ Architecture

- **Turborepo** monorepo with workspace management
- **Multi-tenant** architecture with Row Level Security (RLS)
- **Clerk** authentication with organization support  
- **Supabase** PostgreSQL backend with real-time features
- **Vite + React** frontend with shadcn/ui design system
- **AI-native** development with Clerk Agent Toolkit support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Supabase CLI (optional for local development)
- Clerk account with organization features enabled

### 1. Environment Setup

Copy the environment template and add your keys:

```bash
cp env.local.example .env.local
```

Update `.env.local` with your actual Clerk keys:

```env
# Supabase (pre-configured for obulo-starter-dev)
SUPABASE_URL=https://vbgyshnnhnnjsalphpab.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiZ3lzaG5uaG5uanNhbHBocGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzU2NDksImV4cCI6MjA2NTE1MTY0OX0.hA1-xqKlJJtnMrbiD__WDehgNm6piPTDyLuk33VvBvI

# Clerk - Get these from your Clerk dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

> **Note**: The Supabase configuration is pre-configured for the `obulo-starter-dev` project with database schema and RLS policies already deployed.

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Database Setup

The database schema is already deployed to the Supabase project. For local development:

```bash
pnpm db:start  # Start local Supabase (optional)
```

### 4. Verify Setup

Test your Clerk Agent Toolkit integration:

```bash
CLERK_SECRET_KEY=sk_test_your_secret_key pnpm test:clerk
```

Expected output:
```
✅ Clerk Agent Toolkit initialized successfully!
📊 Available user tools: [ 'getUserId', 'getUser', 'getUserCount', 'updateUser', 'updateUserPublicMetadata', 'updateUserUnsafeMetadata' ]
📊 Available organization tools: [ 'getOrganization', 'createOrganization', 'updateOrganization', ... ]
📊 Total available tools: 19
```

### 5. Start Development

```bash
pnpm dev
```

## 📦 Package Structure

```
starter-kit/
├── apps/
│   └── web/               # Vite + React frontend
├── packages/
│   ├── ui/                # shadcn/ui design system
│   ├── sdk/               # Supabase client & auth helpers  
│   └── logic/             # Workspace logic & permissions
├── supabase/              # Database schema & migrations
└── turbo.json             # Monorepo configuration
```

## 🔐 Authentication & Authorization

- **Clerk Organizations** map to Obulo workspaces
- **Row Level Security** ensures data isolation between workspaces
- **Role-based permissions**: `owner`, `admin`, `member`
- **Domain restrictions** for `localhost:3000` and `localhost:54321`

## 🧠 AI Development

This starter kit is optimized for AI development workflows:

- **Clerk Agent Toolkit** for AI agent authentication with 19 tools available:
  - **6 User Tools**: `getUserId`, `getUser`, `getUserCount`, `updateUser`, `updateUserPublicMetadata`, `updateUserUnsafeMetadata`
  - **11 Organization Tools**: `getOrganization`, `createOrganization`, `updateOrganization`, `updateOrganizationMetadata`, `deleteOrganization`, `createOrganizationMembership`, `updateOrganizationMembership`, `updateOrganizationMembershipMetadata`, `deleteOrganizationMembership`, `createOrganizationInvitation`, `revokeOrganizationInvitation`
  - **2 Additional Tools**: For invitations and metadata management
- **Structured database schema** with clear relationships
- **Type-safe SDK** with generated TypeScript types
- **Composable logic packages** for easy extension

### Using with AI Agents

```typescript
import { createClerkToolkit } from '@clerk/agent-toolkit/ai-sdk'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const toolkit = await createClerkToolkit()

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    tools: {
      ...toolkit.users(),
      ...toolkit.organizations(),
    },
  })

  return result.toDataStreamResponse()
}
```

### Testing Clerk Agent Toolkit

1. **Get your Clerk secret key** from the [Clerk Dashboard](https://dashboard.clerk.com)
2. **Test the integration:**
   ```bash
   CLERK_SECRET_KEY=sk_test_your_key pnpm test:clerk
   ```
3. **Start the MCP server for Claude Desktop:**
   ```bash
   pnpm clerk:mcp sk_test_your_key
   ```

This enables Claude Desktop and other MCP clients to interact with your Clerk users and organizations.

> **Verified**: This setup has been tested and confirmed working with the `obulo-starter-dev` project. The toolkit provides 19 AI tools for user and organization management.

## 🛠️ Development Commands

```bash
# Development
pnpm dev          # Start all workspaces
pnpm build        # Build all packages
pnpm lint         # Lint all packages

# Database
pnpm db:start     # Start local Supabase
pnpm db:stop      # Stop local Supabase  
pnpm db:reset     # Reset local database

# Clerk Agent Toolkit
pnpm test:clerk   # Test Clerk Agent Toolkit setup
pnpm clerk:mcp    # Start local MCP server (requires secret key)

# Formatting
pnpm format       # Format all files
```

## 🔄 Database Schema

Core tables with workspace-based multi-tenancy (deployed to `obulo-starter-dev`):

- `workspaces` - Organization/tenant containers
- `workspace_members` - User-workspace relationships with roles (`owner`, `admin`, `member`)
- `projects` - Workspace-scoped projects with status tracking
- `user_profiles` - Extended user information synced with Clerk

**Features:**
- ✅ Row Level Security (RLS) policies for all tables
- ✅ Automatic `updated_at` triggers 
- ✅ UUID primary keys with proper indexing
- ✅ Foreign key relationships with CASCADE deletes
- ✅ Demo seed data for development
- ✅ TypeScript types generated and available in `@obulo/sdk`

## 🎯 Next Steps

### ✅ Completed Setup
- Database schema deployed with RLS policies
- Clerk Agent Toolkit tested and verified (19 tools available)
- TypeScript types generated
- Environment configuration ready

### 🚀 Ready to Build
1. **Build the frontend** (`apps/web`) with Vite + React + Clerk auth
2. **Create UI components** (`packages/ui`) with shadcn/ui design system  
3. **Implement business logic** (`packages/logic`) for workspace management
4. **Set up Clerk domain restrictions** for your production URLs
5. **Extend with vertical-specific templates** (gym, agency, etc.)

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Clerk Agent Toolkit](https://clerk.com/changelog/2025-03-7-clerk-agent-toolkit)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Turborepo Docs](https://turbo.build)


