import { createClient } from '@obulo/sdk'

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export interface Workspace {
  id: string
  name: string
  clerk_organization_id: string
  created_at: string
  updated_at: string
}

export const workspaceService = {
  async updateWorkspaceName(organizationId: string, name: string): Promise<void> {
    const { error } = await supabase
      .from('workspaces')
      .update({ 
        name,
        updated_at: new Date().toISOString()
      })
      .eq('clerk_organization_id', organizationId)

    if (error) {
      console.error('Error updating workspace in Supabase:', error)
      throw new Error('Failed to update workspace in database')
    }
  },

  async getWorkspace(organizationId: string): Promise<Workspace | null> {
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .eq('clerk_organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching workspace from Supabase:', error)
      return null
    }

    return data
  },

  async createWorkspace(organizationId: string, name: string): Promise<Workspace> {
    const { data, error } = await supabase
      .from('workspaces')
      .insert({
        clerk_organization_id: organizationId,
        name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating workspace in Supabase:', error)
      throw new Error('Failed to create workspace in database')
    }

    return data
  }
} 