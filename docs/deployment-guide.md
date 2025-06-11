# Deployment Guide - Client Organization Setup

## Overview

This guide explains how to deploy and customize the Obulo Starter Kit for your organization. The starter kit supports white-label deployment with custom organization branding.

## 🎯 Quick Setup

### 1. Environment Configuration

Create a `.env` file in the `apps/web` directory with your organization's details:

```bash
# Required - Core Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Organization Branding (White-label Configuration)
VITE_ORG_NAME=Acme Corporation
VITE_ORG_DOMAIN=acme.obulo.com
VITE_ORG_LOGO_URL=https://your-domain.com/logo.png
VITE_ORG_PRIMARY_COLOR=#44403c
```

### 2. Organization Branding Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_ORG_NAME` | Your organization name displayed in welcome messages | "Acme Corporation" | ✅ Recommended |
| `VITE_ORG_DOMAIN` | Your subdomain (for reference) | "acme.obulo.com" | ❌ Optional |
| `VITE_ORG_LOGO_URL` | Custom logo URL (if you want to replace Obulo logo) | "https://acme.com/logo.png" | ❌ Optional |
| `VITE_ORG_PRIMARY_COLOR` | Custom primary color (hex code) | "#2563eb" | ❌ Optional |

## 🏢 Organization Experience

### With Organization Branding Configured

When `VITE_ORG_NAME` is set:

**Authentication Screen:**
- **Header**: "Welcome to Acme Corporation" (instead of "Welcome back")
- **Subtitle**: "Enter your email to access Acme Corporation"
- **Branding**: Shows "Acme Corporation" prominently with "Powered by Obulo" below
- **Domain**: Deployed on `acme.obulo.com`

### Without Organization Branding

When `VITE_ORG_NAME` is not set:

**Authentication Screen:**
- **Header**: "Welcome back" (generic)
- **Subtitle**: "Enter your email to sign in to your account"
- **Branding**: Shows only "Obulo" logo
- **Domain**: Can be deployed anywhere

## 🚀 Deployment Steps

### 1. Clone and Setup

```bash
# Clone the starter kit
git clone https://github.com/your-org/obulo-starter-kit.git
cd obulo-starter-kit

# Install dependencies
npm install

# Configure environment variables
cp apps/web/.env.example apps/web/.env
# Edit .env with your organization details
```

### 2. Configure Authentication

1. **Create Clerk Application**:
   - Go to [Clerk Dashboard](https://clerk.com)
   - Create new application
   - Copy publishable key and secret key

2. **Create Supabase Project**:
   - Go to [Supabase Dashboard](https://supabase.com)
   - Create new project
   - Copy project URL and anon key

3. **Set Environment Variables**:
   ```bash
   # In apps/web/.env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

### 3. Organization Customization

```bash
# In apps/web/.env
VITE_ORG_NAME=Your Company Name
VITE_ORG_DOMAIN=yourcompany.obulo.com
VITE_ORG_LOGO_URL=https://yourcompany.com/logo.png
VITE_ORG_PRIMARY_COLOR=#your-brand-color
```

### 4. Build and Deploy

```bash
# Build the application
npm run build

# Deploy to your hosting platform
# (Vercel, Netlify, etc.)
```

## 🎨 Advanced Customization

### Custom Logo

If you want to replace the Obulo logo entirely:

1. **Set Logo URL**:
   ```bash
   VITE_ORG_LOGO_URL=https://yourcompany.com/logo.png
   ```

2. **Update AuthLayout** (optional, for more control):
   ```tsx
   // In src/components/AuthLayout.tsx
   {orgConfig.logoUrl ? (
     <img src={orgConfig.logoUrl} alt={orgConfig.name} className="h-8" />
   ) : (
     // Default Obulo logo
   )}
   ```

### Custom Colors

The starter kit uses CSS variables for theming. You can override colors:

```css
/* In src/index.css */
:root {
  --brand-primary: your-custom-color;
  --brand-secondary: your-secondary-color;
}
```

### Custom Domain Setup

1. **Configure DNS**:
   - Add CNAME record: `yourcompany.obulo.com` → your hosting platform
   
2. **SSL Certificate**:
   - Most hosting platforms (Vercel, Netlify) handle SSL automatically
   
3. **Environment Update**:
   ```bash
   VITE_ORG_DOMAIN=yourcompany.obulo.com
   ```

## 🔒 Security Considerations

### Environment Variables

- **Never commit `.env` files** to version control
- **Use different keys** for staging and production
- **Rotate keys regularly** for security

### Domain Security

- **Enable HTTPS** (should be automatic with most hosts)
- **Configure CORS** in Supabase for your domain
- **Set proper Clerk allowed origins**

## 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] Organization name set (`VITE_ORG_NAME`)
- [ ] Clerk application created and keys added
- [ ] Supabase project created and keys added
- [ ] Custom domain configured (if using subdomain)
- [ ] SSL certificate active
- [ ] CORS configured in Supabase
- [ ] Clerk allowed origins configured
- [ ] Application tested with organization branding
- [ ] Contact information updated for support

## 🆘 Support

For deployment support or questions:

1. **Check the logs** in your hosting platform
2. **Verify environment variables** are set correctly
3. **Test authentication flow** thoroughly
4. **Contact Obulo support** if needed

## 🎉 Result

After following this guide, your clients will see:

- **Professional Login**: "Welcome to [Their Company]"
- **Custom Branding**: Their organization name prominently displayed
- **Seamless Experience**: Feels like their own internal tool
- **White-label Ready**: No generic messaging, fully branded

This creates a professional, enterprise-grade experience that makes users feel they're accessing their organization's official internal tool, not a third-party application. 