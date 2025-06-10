// Export database types
export * from './types/database'

// Export Supabase client
export { createClient } from '@supabase/supabase-js'
export type { SupabaseClient } from '@supabase/supabase-js'

// Export Clerk components and hooks
export {
  ClerkProvider,
  SignIn,
  SignUp,
  UserButton,
  OrganizationSwitcher,
  useUser,
  useOrganization,
  useAuth,
  useClerk
} from '@clerk/clerk-react'

// Export Clerk Agent Toolkit for AI workflows
export { createClerkToolkit } from '@clerk/agent-toolkit/ai-sdk'

// Re-export useful types
export type {
  Database,
  Tables,
  Workspace,
  WorkspaceMember,
  Project,
  UserProfile,
  WorkspaceRole,
  ProjectStatus
} from './types/database' 