# Obulo Starter Kit

**🎉 Production-Ready AI-Native Internal Tools Platform**

This is the complete, enhanced starter kit for building internal tools on the Obulo platform. It provides a multi-workspace, AI-friendly scaffold with advanced Clerk-Supabase integration, modern React frontend, and enterprise-grade security.

## ✨ What's Included

- **✅ Complete Web Application** - React + Vite + Clerk authentication
- **✅ Enhanced Clerk-Supabase Integration** - Including Clerk FDW for real-time data access
- **✅ Multi-tenant Architecture** - Row Level Security with workspace isolation
- **✅ Component Library** - Beautiful UI components with shadcn/ui design system
- **✅ AI Development Tools** - 19 Clerk Agent Toolkit tools verified and working
- **✅ Type-Safe Development** - End-to-end TypeScript with generated types

## 🏗️ Architecture

- **Turborepo** monorepo with workspace management
- **Multi-tenant** architecture with Row Level Security (RLS)
- **Clerk** authentication with organization support + **FDW integration**
- **Supabase** PostgreSQL backend with real-time features + **Clerk Foreign Data Wrapper**
- **Vite + React** frontend with TailwindCSS and component library
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

> **Note**: The Supabase configuration is pre-configured for the `obulo-starter-dev` project with database schema, RLS policies, and **Clerk FDW integration** already deployed.

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Development

```bash
pnpm dev
```

The web app will be available at `http://localhost:3000` with hot reload enabled.

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

## 🔄 Enhanced Clerk-Supabase Integration

This starter kit features the **most advanced Clerk-Supabase integration** available:

### **Standard Integration (JWT Claims)**
```typescript
// RLS policies enforce workspace isolation via JWT claims
CREATE POLICY workspace_isolation ON projects
FOR ALL USING (workspace_id = auth.jwt() ->> 'org_id');
```

### **🚀 Enhanced Integration (Clerk FDW)**
```sql
-- Direct access to Clerk data in Postgres!
SELECT * FROM clerk.organizations;
SELECT * FROM clerk.users;
SELECT * FROM clerk.organization_memberships;

-- Sync to local tables with perfect RLS
SELECT sync_all_clerk_data();
```

**Benefits:**
- **Real-time data access** - Query Clerk data like it's local
- **Offline capabilities** - Local sync means app works even if Clerk is down  
- **Complex queries** - Join Clerk data with your app data easily
- **Performance** - Best of JWT claims + local data

## 📦 Package Structure

```
starter-kit/
├── apps/
│   └── web/               # ✅ Vite + React frontend (COMPLETE)
├── packages/
│   ├── ui/                # ✅ shadcn/ui design system (COMPLETE)
│   ├── sdk/               # ✅ Supabase client & auth helpers (COMPLETE)
│   └── logic/             # ✅ Workspace logic & permissions (COMPLETE)
├── supabase/              # ✅ Database schema & migrations (COMPLETE)
└── turbo.json             # ✅ Monorepo configuration (COMPLETE)
```

## 🎨 UI Components

The `@obulo/ui` package includes production-ready components:

- **Button** - Multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card** - Flexible container with header, content, and footer sections  
- **Input** - Form input with consistent styling and accessibility
- **Utils** - `cn()` function for conditional className merging

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@obulo/ui'

function Dashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Obulo</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  )
}
```

## 🔐 Authentication & Authorization

- **Clerk Organizations** map to Obulo workspaces
- **Enhanced FDW sync** keeps local data current with Clerk
- **Row Level Security** ensures data isolation between workspaces
- **Role-based permissions**: `owner`, `admin`, `member`
- **Automatic workspace switching** via Organization Switcher
- **Protected routes** with authentication checks

## 🧠 AI Development

This starter kit is optimized for AI development workflows:

- **Clerk Agent Toolkit** for AI agent authentication with 19 tools available:
  - **6 User Tools**: `getUserId`, `getUser`, `getUserCount`, `updateUser`, `updateUserPublicMetadata`, `updateUserUnsafeMetadata`
  - **11 Organization Tools**: `getOrganization`, `createOrganization`, `updateOrganization`, `updateOrganizationMetadata`, `deleteOrganization`, `createOrganizationMembership`, `updateOrganizationMembership`, `updateOrganizationMembershipMetadata`, `deleteOrganizationMembership`, `createOrganizationInvitation`, `revokeOrganizationInvitation`
  - **2 Additional Tools**: For invitations and metadata management
- **Structured database schema** with clear relationships
- **Type-safe SDK** with generated TypeScript types
- **Composable logic packages** for easy extension
- **Cursor-optimized** development experience

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
pnpm dev          # Start all workspaces (web app + package builds)
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

Enhanced multi-tenant database with Clerk FDW integration:

### **Core Tables** (deployed to `obulo-starter-dev`)
- `workspaces` - Organization/tenant containers
- `workspace_members` - User-workspace relationships with roles (`owner`, `admin`, `member`)
- `projects` - Workspace-scoped projects with status tracking
- `user_profiles` - Extended user information synced with Clerk

### **Clerk FDW Tables** (real-time access)
- `clerk.organizations` - Live Clerk organization data
- `clerk.users` - Live Clerk user data  
- `clerk.organization_memberships` - Live membership data

### **Sync Functions**
```sql
-- Sync all Clerk data to local tables
SELECT sync_all_clerk_data();

-- Individual sync functions
SELECT sync_clerk_organizations();
SELECT sync_clerk_users();  
SELECT sync_clerk_memberships();
```

**Features:**
- ✅ Row Level Security (RLS) policies for all tables
- ✅ Clerk Foreign Data Wrapper (FDW) for real-time access
- ✅ Automatic sync functions for data consistency
- ✅ Automatic `updated_at` triggers 
- ✅ UUID primary keys with proper indexing
- ✅ Foreign key relationships with CASCADE deletes
- ✅ Demo seed data for development
- ✅ TypeScript types generated and available in `@obulo/sdk`

## 🎯 What's Complete

### ✅ **Fully Functional Starter Kit**
- **Web Application**: React + Vite + Clerk auth with workspace switching
- **Component Library**: Button, Card, Input components with Tailwind styling
- **Business Logic**: Workspace utilities and auth helpers
- **Database Integration**: Enhanced Clerk FDW + RLS security
- **Development Environment**: Hot reload, type checking, and build optimization

### ✅ **Enhanced Features**
- **Clerk FDW Integration**: Direct access to Clerk data in Postgres
- **Real-time Sync**: Automatic synchronization between Clerk and local tables
- **Multi-tenant Security**: Perfect workspace isolation via RLS
- **AI Development**: 19 verified Clerk Agent Toolkit tools
- **Type Safety**: End-to-end TypeScript with generated database types

## 🚀 Next Steps for Your Project

1. **Customize branding** - Update logo, colors, and styling in the UI components
2. **Add business features** - Extend the database schema with your domain-specific tables
3. **Build AI features** - Use the Clerk Agent Toolkit for intelligent user and org management
4. **Deploy to production** - Configure domain restrictions and deploy to your hosting platform
5. **Extend with templates** - Create vertical-specific templates (gym, agency, etc.)

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Clerk Agent Toolkit](https://clerk.com/changelog/2025-03-7-clerk-agent-toolkit)
- [Supabase Clerk Wrapper](https://supabase.com/docs/guides/database/extensions/wrappers/clerk)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Turborepo Docs](https://turbo.build)


