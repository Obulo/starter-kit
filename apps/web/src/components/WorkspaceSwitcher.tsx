import React from 'react'
import { useOrganization, useOrganizationList } from '@clerk/clerk-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ChevronsUpDown, Plus } from 'lucide-react'

export function WorkspaceSwitcher() {
  const { organization } = useOrganization()
  const { userMemberships, setActive, createOrganization } = useOrganizationList()

  const handleWorkspaceSwitch = (organizationId: string | null) => {
    setActive?.({ organization: organizationId })
  }

  const handleCreateWorkspace = () => {
    createOrganization?.({ name: 'New Workspace' })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-semibold overflow-hidden">
                {organization?.imageUrl ? (
                  <img 
                    src={organization.imageUrl} 
                    alt={organization.name || 'Workspace'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  organization?.name?.[0]?.toUpperCase() || 'P'
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {organization?.name || 'Personal Workspace'}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {organization?.membersCount ? `${organization.membersCount} members` : 'Personal'}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {userMemberships?.data?.map((membership) => (
              <DropdownMenuItem
                key={membership.organization.id}
                onClick={() => handleWorkspaceSwitch(membership.organization.id)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border bg-background text-xs overflow-hidden">
                  {membership.organization.imageUrl ? (
                    <img 
                      src={membership.organization.imageUrl} 
                      alt={membership.organization.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    membership.organization.name[0]?.toUpperCase()
                  )}
                </div>
                <div className="line-clamp-1 font-medium">
                  {membership.organization.name}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleWorkspaceSwitch(null)}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border bg-background text-xs">
                P
              </div>
              <div className="line-clamp-1 font-medium">Personal Workspace</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCreateWorkspace} className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border border-dashed">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 