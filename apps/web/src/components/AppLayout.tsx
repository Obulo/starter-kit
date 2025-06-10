import React from 'react'
import { useOrganization, useUser, OrganizationSwitcher, UserButton } from '@clerk/clerk-react'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { organization } = useOrganization()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Workspace */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Obulo</h1>
              <div className="text-sm text-gray-500">
                {organization?.name || 'Personal Workspace'}
              </div>
            </div>

            {/* Right side - Organization switcher and user menu */}
            <div className="flex items-center space-x-4">
              <OrganizationSwitcher
                appearance={{
                  elements: {
                    organizationSwitcherTrigger: "border border-gray-300 rounded-md px-3 py-2 text-sm"
                  }
                }}
              />
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
} 