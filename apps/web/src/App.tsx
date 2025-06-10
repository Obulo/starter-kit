import React from 'react'
import { ClerkProvider, SignIn, SignUp, useAuth, useOrganization, CreateOrganization, OrganizationSwitcher } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { AuthLayout } from './components/AuthLayout'
import { AppLayout } from './components/AppLayout'
import { LoadingSpinner } from './components/LoadingSpinner'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey) {
  throw new Error('Missing Publishable Key')
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth()
  const { organization, isLoaded: orgLoaded } = useOrganization()

  if (!isLoaded || !orgLoaded) {
    return <LoadingSpinner />
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />
  }

  // If user is signed in but no organization, redirect to org selection
  if (!organization) {
    return <Navigate to="/select-org" replace />
  }

  return <>{children}</>
}

// App Routes Component
function AppRoutes() {
  return (
    <Routes>
            {/* Sign-in only for authorized users */}
      <Route
        path="/sign-in/*"
        element={
          <AuthLayout>
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600">
                Sign in with your authorized account
              </p>
            </div>
            <SignIn
              routing="path"
              path="/sign-in"
              afterSignInUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                  footerActionLink: "hidden", // Hide sign-up link
                  footer: "hidden" // Hide the entire footer section
                }
              }}
            />
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Need access? Contact your company administrator
              </p>
            </div>
          </AuthLayout>
        }
      />

      {/* Organization selection */}
      <Route
        path="/select-org"
        element={
          <AuthLayout>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Select or Create Organization
              </h2>
              <p className="text-gray-600 mb-8">
                Choose an existing organization or create a new one to continue.
              </p>
              <CreateOrganization
                routing="path"
                path="/select-org"
                afterCreateOrganizationUrl="/dashboard"
              />
            </div>
          </AuthLayout>
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Redirect sign-up attempts to sign-in */}
      <Route path="/sign-up/*" element={<Navigate to="/sign-in" replace />} />
      
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ClerkProvider>
  )
}

export default App 