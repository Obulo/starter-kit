import { Workspace, WorkspaceMember } from '@obulo/sdk';

interface WorkspaceUtils {
    getCurrentWorkspace(): Promise<Workspace | null>;
    getUserWorkspaces(): Promise<Workspace[]>;
    getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]>;
    switchWorkspace(workspaceId: string): Promise<void>;
}
declare function createWorkspaceUtils(): WorkspaceUtils;

interface AuthUtils {
    getCurrentUser(): Promise<any>;
    getToken(): Promise<string | null>;
    signOut(): Promise<void>;
}
declare function createAuthUtils(): AuthUtils;

declare function formatDate(date: Date | string): string;
declare function formatRelativeTime(date: Date | string): string;
declare function generateSlug(text: string): string;

export { type AuthUtils, type WorkspaceUtils, createAuthUtils, createWorkspaceUtils, formatDate, formatRelativeTime, generateSlug };
