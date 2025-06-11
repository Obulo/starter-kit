// Organization branding configuration
// These can be customized per client deployment via environment variables

export const orgConfig = {
  // Organization name - displayed in welcome messages and branding
  name: import.meta.env.VITE_ORG_NAME || 'Your Organization',
  
  // Organization domain - for reference and potential future use
  domain: import.meta.env.VITE_ORG_DOMAIN || '',
  
  // Optional custom logo URL - if not provided, uses default Obulo logo
  logoUrl: import.meta.env.VITE_ORG_LOGO_URL || '',
  
  // Primary brand color - defaults to stone-700 if not specified
  primaryColor: import.meta.env.VITE_ORG_PRIMARY_COLOR || '#44403c', // stone-700
  
  // Helper to get welcome message
  getWelcomeMessage: () => `Welcome to ${orgConfig.name}`,
  
  // Helper to get sign-in subtitle
  getSignInSubtitle: () => `Enter your email to access ${orgConfig.name}`,
  
  // Helper to check if custom branding is configured
  hasCustomBranding: () => Boolean(import.meta.env.VITE_ORG_NAME),
} 