export interface AuthUtils {
  getCurrentUser(): Promise<any>
  getToken(): Promise<string | null>
  signOut(): Promise<void>
}

export function createAuthUtils(): AuthUtils {
  return {
    async getCurrentUser() {
      // Implementation will be added when we integrate with Clerk
      return null
    },
    
    async getToken() {
      // Implementation will be added when we integrate with Clerk
      return null
    },
    
    async signOut() {
      // Implementation will be added when we integrate with Clerk
    }
  }
} 