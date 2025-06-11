# Organization Branding Architecture Brief

## Current Implementation (v1.0)

**Status:** ✅ Implemented  
**Approach:** Environment Variable Configuration  
**Use Case:** Single-tenant deployments and testing

### How It Works

Organization branding is configured via environment variables in each deployment:

```bash
# apps/web/.env.local
VITE_ORG_NAME=Acme Corporation
VITE_ORG_DOMAIN=acme.obulo.com
VITE_ORG_LOGO_URL=https://acme.com/logo.png
VITE_ORG_PRIMARY_COLOR=#44403c
```

**Implementation Files:**
- `src/config/organization.ts` - Configuration reader
- `src/components/AuthLayout.tsx` - Brand bar display
- `src/components/SignInForm.tsx` - Dynamic welcome messages

### Current User Experience

**With Organization Configured:**
- Brand bar: "Obulo | Acme Corporation"
- Welcome title: "Welcome Back"
- Subtitle: "Enter your email to access Acme Corporation"
- Footer: "Powered by Obulo"

**Without Organization (default):**
- Brand bar: "Obulo" only
- Welcome title: "Welcome back"
- Subtitle: "Enter your email to sign in to your account"
- No footer attribution

## Issue: Scalability Limitations

### Current Constraints

1. **One Deployment Per Client**
   - Each client needs their own deployment
   - `acme.obulo.com` → separate app instance
   - `company2.obulo.com` → another app instance

2. **Configuration Updates Require Redeployment**
   - Changing organization name requires code deployment
   - No runtime configuration changes
   - No self-service client management

3. **Resource Intensive**
   - Multiple app instances to maintain
   - Separate CI/CD pipelines per client
   - Higher hosting costs

4. **Limited Management**
   - No admin interface for organization settings
   - Manual environment variable management
   - No bulk operations or analytics

## Recommended Future Architecture (v2.0)

**Status:** 📋 Planned  
**Approach:** Database-Driven Multi-Tenant  
**Use Case:** Production scale with multiple clients

### Proposed Solution

**Single Deployment + Dynamic Configuration:**

1. **Organizations Table in Supabase**
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT UNIQUE NOT NULL, -- acme.obulo.com
  logo_url TEXT,
  primary_color TEXT DEFAULT '#44403c',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

2. **Domain-Based Lookup**
```typescript
// Enhanced config/organization.ts
async function getOrganizationByDomain() {
  const domain = window.location.hostname
  const { data } = await supabase
    .from('organizations')
    .select('*')
    .eq('domain', domain)
    .single()
  
  return data
}
```

3. **Admin Interface**
   - Organization management dashboard
   - Real-time configuration updates
   - Client self-service portal

### Benefits

- ✅ **Single Deployment:** One app serves all clients
- ✅ **Dynamic Configuration:** Real-time updates without redeployment
- ✅ **Scalable:** Support hundreds of clients
- ✅ **Cost Effective:** Shared infrastructure
- ✅ **Self-Service:** Clients can update their own branding
- ✅ **Analytics:** Usage tracking and insights

## Implementation Plan (Future)

### Phase 1: Database Schema
- [ ] Create organizations table in Supabase
- [ ] Add sample organization data
- [ ] Set up RLS policies for organization access

### Phase 2: Dynamic Loading
- [ ] Update `organization.ts` with async lookup
- [ ] Add loading states for organization data
- [ ] Implement error handling for missing orgs

### Phase 3: Admin Interface
- [ ] Create organization management pages
- [ ] Add CRUD operations for organizations
- [ ] Implement organization settings form

### Phase 4: Migration Tools
- [ ] Environment variable → database migration script
- [ ] Bulk import tools for existing clients
- [ ] Validation and testing tools

## Migration Strategy

### Hybrid Approach (Recommended)

```typescript
// Support both methods during transition
export const orgConfig = {
  async getConfig() {
    // Try environment variables first (backward compatibility)
    if (import.meta.env.VITE_ORG_NAME) {
      return {
        name: import.meta.env.VITE_ORG_NAME,
        domain: import.meta.env.VITE_ORG_DOMAIN,
        logoUrl: import.meta.env.VITE_ORG_LOGO_URL,
        primaryColor: import.meta.env.VITE_ORG_PRIMARY_COLOR,
      }
    }
    
    // Fall back to database lookup
    return await getOrganizationByDomain()
  }
}
```

**Benefits:**
- Existing deployments continue to work
- New deployments can use database approach
- Gradual migration path
- Zero breaking changes

## Technical Considerations

### Performance
- **Caching:** Cache organization data client-side
- **CDN:** Cache organization assets (logos)
- **Loading:** Implement skeleton UI during org data fetch

### Security
- **RLS Policies:** Organizations can only see their own data
- **Domain Validation:** Prevent domain hijacking
- **API Rate Limiting:** Protect against abuse

### Monitoring
- **Organization Metrics:** Track usage per organization
- **Performance Monitoring:** Monitor org lookup performance
- **Error Tracking:** Alert on org configuration issues

## Decision Timeline

**Current (v1.0):** Keep environment variable approach
- ✅ Simple and working for current needs
- ✅ Perfect for testing and demos
- ✅ Adequate for small client base

**Future (v2.0):** Migrate when needed
- 📅 **Trigger:** When managing 5+ clients becomes cumbersome
- 📅 **Trigger:** When clients request self-service configuration
- 📅 **Trigger:** When deployment overhead becomes significant

## Files Affected (Future Migration)

### Current Files to Update
- `src/config/organization.ts` - Add async lookup
- `src/components/AuthLayout.tsx` - Handle loading states
- `src/components/SignInForm.tsx` - Handle async org data

### New Files to Create
- `src/hooks/useOrganization.ts` - React hook for org data
- `src/pages/admin/Organizations.tsx` - Admin interface
- `supabase/migrations/create_organizations.sql` - Database schema
- `docs/organization-management.md` - Admin documentation

---

**Status:** Current implementation sufficient for near-term needs. Database approach planned for future scale requirements. 