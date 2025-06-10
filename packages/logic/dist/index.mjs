// src/workspace.ts
function createWorkspaceUtils() {
  return {
    async getCurrentWorkspace() {
      return null;
    },
    async getUserWorkspaces() {
      return [];
    },
    async getWorkspaceMembers(_workspaceId) {
      return [];
    },
    async switchWorkspace(_workspaceId) {
    }
  };
}

// src/auth.ts
function createAuthUtils() {
  return {
    async getCurrentUser() {
      return null;
    },
    async getToken() {
      return null;
    },
    async signOut() {
    }
  };
}

// src/utils.ts
function formatDate(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(d);
}
function formatRelativeTime(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = /* @__PURE__ */ new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1e3);
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592e3) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(d);
}
function generateSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
export {
  createAuthUtils,
  createWorkspaceUtils,
  formatDate,
  formatRelativeTime,
  generateSlug
};
