import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { SettingsSidebar } from './SettingsSidebar'

interface SettingsLayoutProps {
  children: React.ReactNode
  title?: string
  breadcrumbs?: Array<{
    title: string
    href?: string
  }>
}

export function SettingsLayout({ 
  children, 
  title = "Settings",
  breadcrumbs = [
    { title: "Settings", href: "/settings" },
    { title: "General" }
  ]
}: SettingsLayoutProps) {
  return (
    <SidebarProvider>
      <SettingsSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.title}>
                    <BreadcrumbItem className={index === breadcrumbs.length - 1 ? "" : "hidden md:block"}>
                      {breadcrumb.href && index < breadcrumbs.length - 1 ? (
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.title}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 