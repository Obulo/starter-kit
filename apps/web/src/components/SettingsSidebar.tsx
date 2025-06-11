import React from 'react'
import {
  Bell,
  CreditCard,
  Settings,
  User,
  Users,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { WorkspaceSwitcher } from './WorkspaceSwitcher'
import { NavSettings } from './NavSettings'
import { NavUser } from './NavUser'

// Settings navigation data
const settingsData = {
  navMain: [
    {
      title: 'Workspace',
      url: '/settings/workspace',
      icon: Settings,
      isActive: true,
    },
    {
      title: 'Profile',
      url: '/settings/profile',
      icon: User,
    },
    {
      title: 'Team',
      url: '/settings/team',
      icon: Users,
    },
    {
      title: 'Billing',
      url: '/settings/billing',
      icon: CreditCard,
    },
    {
      title: 'Notifications',
      url: '/settings/notifications',
      icon: Bell,
    },
  ],
}

export function SettingsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavSettings items={settingsData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 