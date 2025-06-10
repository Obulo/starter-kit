import type { Workspace, WorkspaceMember } from '@obulo/sdk'

export interface WorkspaceUtils {
  getCurrentWorkspace(): Promise<Workspace | null>
  getUserWorkspaces(): Promise<Workspace[]>
  getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]>
  switchWorkspace(workspaceId: string): Promise<void>
}

export function createWorkspaceUtils(): WorkspaceUtils {
  return {
    async getCurrentWorkspace() {
      // Implementation will be added when we integrate with Clerk
      return null
    },
    
    async getUserWorkspaces() {
      // Implementation will be added when we integrate with Clerk
      return []
    },
    
    async getWorkspaceMembers(_workspaceId: string) {
      // Implementation will be added when we integrate with Clerk
      return []
    },
    
    async switchWorkspace(_workspaceId: string) {
      // Implementation will be added when we integrate with Clerk
    }
  }
} 