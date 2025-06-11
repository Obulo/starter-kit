import React from 'react'
import { orgConfig } from '../config/organization'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Brand/Logo Section */}
        <div className="flex items-center justify-center gap-3 font-medium">
          <a href="#" className="flex items-center gap-2">
            <div className="bg-stone-700 text-white flex size-6 items-center justify-center rounded-md">
              <svg 
                className="size-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-foreground font-semibold">Obulo</span>
          </a>
          
          {/* Divider and Organization Name */}
          {orgConfig.hasCustomBranding() && (
            <>
              <div className="w-px h-4 bg-stone-300"></div>
              <span className="text-foreground font-semibold">{orgConfig.name}</span>
            </>
          )}
        </div>
        
        {/* Auth Form Content */}
        {children}
        
        {/* Powered by Obulo - moved below the card */}
        {orgConfig.hasCustomBranding() && (
          <p className="text-center text-xs text-stone-500">
            Powered by Obulo
          </p>
        )}
      </div>
    </div>
  )
} 