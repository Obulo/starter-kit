import React, { useState } from 'react'
import { useOrganization } from '@clerk/clerk-react'
import { SettingsLayout } from '@/components/SettingsLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Building2, Loader2 } from 'lucide-react'
import { workspaceService } from '@/lib/workspace'

export function Settings() {
  const { organization } = useOrganization()
  const [workspaceName, setWorkspaceName] = useState(organization?.name || '')
  const [isUpdatingName, setIsUpdatingName] = useState(false)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleUpdateWorkspaceName = async () => {
    if (!organization || !workspaceName.trim()) return

    setIsUpdatingName(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      // Update organization name in Clerk
      await organization.update({ name: workspaceName.trim() })
      
      // Update workspace name in Supabase
      try {
        await workspaceService.updateWorkspaceName(organization.id, workspaceName.trim())
      } catch (supabaseError) {
        console.warn('Supabase update failed, but Clerk update succeeded:', supabaseError)
        // Don't fail the whole operation if Supabase fails
      }
      
      setSuccessMessage('Workspace name updated successfully!')
    } catch (error) {
      console.error('Error updating workspace name:', error)
      setErrorMessage('Failed to update workspace name. Please try again.')
    } finally {
      setIsUpdatingName(false)
    }
  }

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !organization) return

    setIsUploadingLogo(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      // Update organization logo in Clerk
      await organization.setLogo({ file })
      
      setSuccessMessage('Logo updated successfully!')
    } catch (error) {
      console.error('Error updating logo:', error)
      setErrorMessage('Failed to update logo. Please try again.')
    } finally {
      setIsUploadingLogo(false)
    }
  }

  const removeLogo = async () => {
    if (!organization) return

    setIsUploadingLogo(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await organization.setLogo({ file: null })
      setSuccessMessage('Logo removed successfully!')
    } catch (error) {
      console.error('Error removing logo:', error)
      setErrorMessage('Failed to remove logo. Please try again.')
    } finally {
      setIsUploadingLogo(false)
    }
  }

  // Sync workspace name with organization data
  React.useEffect(() => {
    if (organization?.name) {
      setWorkspaceName(organization.name)
    }
  }, [organization?.name])

  // Clear messages after 5 seconds
  React.useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('')
        setErrorMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, errorMessage])

  return (
    <SettingsLayout
      title="Workspace Settings"
      breadcrumbs={[
        { title: "Settings", href: "/settings" },
        { title: "Workspace" }
      ]}
    >
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Workspace Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your workspace settings and preferences.
          </p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
            {errorMessage}
          </div>
        )}

                {/* Workspace Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Workspace Settings
            </CardTitle>
            <CardDescription>
              Manage your workspace name and logo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Workspace Logo */}
            <div className="space-y-2">
              <Label>Workspace Logo</Label>
              <div className="flex items-center gap-4">
                {/* Logo Preview */}
                <div className="relative">
                  {organization?.imageUrl ? (
                    <img 
                      src={organization.imageUrl} 
                      alt="Workspace logo"
                      className="h-12 w-12 rounded-lg object-cover border bg-muted"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg border bg-muted flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  {isUploadingLogo && (
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    </div>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isUploadingLogo}
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {organization?.imageUrl ? 'Change' : 'Upload'}
                  </Button>
                  {organization?.imageUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isUploadingLogo}
                      onClick={removeLogo}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                {/* Hidden File Input */}
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={isUploadingLogo}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Square image recommended. Max 10MB.
              </p>
            </div>

            {/* Workspace Name */}
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <div className="flex gap-2">
                <Input
                  id="workspace-name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Enter workspace name..."
                  disabled={isUpdatingName}
                  className="flex-1"
                />
                <Button 
                  onClick={handleUpdateWorkspaceName}
                  disabled={isUpdatingName || !workspaceName.trim() || workspaceName === organization?.name}
                >
                  {isUpdatingName && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workspace Info */}
        <Card>
          <CardHeader>
            <CardTitle>Workspace Information</CardTitle>
            <CardDescription>
              Read-only information about your workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Workspace ID</Label>
                <p className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                  {organization?.id}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Members</Label>
                <p className="text-sm text-muted-foreground">
                  {organization?.membersCount || 0} member{organization?.membersCount !== 1 ? 's' : ''}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Created</Label>
                <p className="text-sm text-muted-foreground">
                  {organization?.createdAt ? new Date(organization.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Slug</Label>
                <p className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                  {organization?.slug}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  )
} 