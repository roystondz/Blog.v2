"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Database, Shield, RefreshCw, HardDrive, Lock } from "lucide-react"

export default function SystemControlsPage() {
  const router = useRouter()

  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [cacheCleared, setCacheCleared] = useState(false)

  const handleClearCache = () => {
    if (confirm("Are you sure you want to clear the system cache?")) {
      // In a real app, you would send a request to clear the cache
      setCacheCleared(true)
      setTimeout(() => setCacheCleared(false), 3000)
    }
  }

  const handleBackup = () => {
    // In a real app, you would trigger a database backup
    alert("Database backup initiated. You will be notified when complete.")
  }

  const handleRestore = () => {
    // In a real app, you would show a file picker and restore from backup
    alert("Please select a backup file to restore from.")
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800 dark:text-teal-300">System Controls</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-teal-600 text-teal-600 hover:bg-teal-50"
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-teal-100 dark:border-teal-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-teal-800 dark:text-teal-300 flex items-center">
              <Shield className="mr-2" size={20} /> Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">System security status</p>
            <p className="text-lg font-medium text-green-600">Secure</p>
          </CardContent>
        </Card>
        <Card className="border-teal-100 dark:border-teal-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-teal-800 dark:text-teal-300 flex items-center">
              <Database className="mr-2" size={20} /> Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">Database status</p>
            <p className="text-lg font-medium text-green-600">Connected</p>
          </CardContent>
        </Card>
        <Card className="border-teal-100 dark:border-teal-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-teal-800 dark:text-teal-300 flex items-center">
              <HardDrive className="mr-2" size={20} /> Storage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">Storage usage</p>
            <p className="text-lg font-medium">45% (450MB / 1GB)</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="maintenance" className="w-full">
        <TabsList className="mb-6 bg-teal-50 dark:bg-teal-950">
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Database
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance">
          <Card className="border-teal-100 dark:border-teal-900 mb-6">
            <CardHeader>
              <CardTitle className="text-teal-800 dark:text-teal-300">System Maintenance</CardTitle>
              <CardDescription>Manage system maintenance settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      When enabled, the site will display a maintenance message to all non-admin users
                    </p>
                  </div>
                  <Switch id="maintenanceMode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                </div>

                {maintenanceMode && (
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                    <Textarea
                      id="maintenanceMessage"
                      defaultValue="We're currently performing scheduled maintenance. Please check back soon."
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debugMode">Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable detailed error messages and logging (not recommended for production)
                    </p>
                  </div>
                  <Switch id="debugMode" checked={debugMode} onCheckedChange={setDebugMode} />
                </div>

                <div className="space-y-2">
                  <Label>System Cache</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={handleClearCache}
                      className="bg-teal-600 hover:bg-teal-700"
                      disabled={cacheCleared}
                    >
                      <RefreshCw className="mr-2" size={16} />
                      {cacheCleared ? "Cache Cleared!" : "Clear Cache"}
                    </Button>
                    <p className="text-sm text-muted-foreground">Last cleared: Today at 10:45 AM</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>System Logs</Label>
                  <div className="h-40 bg-muted rounded-md p-4 overflow-y-auto font-mono text-xs">
                    <p>[2025-04-25 08:15:32] INFO: System startup complete</p>
                    <p>[2025-04-25 08:15:30] INFO: Database connection established</p>
                    <p>[2025-04-25 08:15:28] INFO: Loading configuration</p>
                    <p>[2025-04-25 08:15:25] INFO: Starting application server</p>
                    <p>[2025-04-24 23:45:12] INFO: System shutdown</p>
                    <p>[2025-04-24 22:30:45] WARN: High memory usage detected (85%)</p>
                    <p>[2025-04-24 20:15:22] INFO: User login: admin@example.com</p>
                    <p>[2025-04-24 19:45:10] INFO: New post published: "Getting Started with Web Development"</p>
                  </div>
                </div>

                <Button className="bg-teal-600 hover:bg-teal-700">Save Maintenance Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader>
              <CardTitle className="text-teal-800 dark:text-teal-300">Database Management</CardTitle>
              <CardDescription>Manage database operations and backups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Database Information</Label>
                    <div className="bg-muted rounded-md p-4">
                      <p className="text-sm mb-1">
                        <strong>Type:</strong> MySQL
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Version:</strong> 8.0.32
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Size:</strong> 245 MB
                      </p>
                      <p className="text-sm">
                        <strong>Tables:</strong> 24
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Connection Status</Label>
                    <div className="bg-muted rounded-md p-4">
                      <p className="text-sm mb-1">
                        <strong>Status:</strong> <span className="text-green-600">Connected</span>
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Host:</strong> db.example.com
                      </p>
                      <p className="text-sm mb-1">
                        <strong>Active Connections:</strong> 3
                      </p>
                      <p className="text-sm">
                        <strong>Last Error:</strong> None
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Backup & Restore</Label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={handleBackup} className="bg-teal-600 hover:bg-teal-700">
                      Create Backup
                    </Button>
                    <Button
                      onClick={handleRestore}
                      variant="outline"
                      className="border-teal-600 text-teal-600 hover:bg-teal-50"
                    >
                      Restore from Backup
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last backup: April 24, 2025 at 11:30 PM (12 hours ago)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Scheduled Backups</Label>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Daily Automatic Backups</p>
                      <p className="text-sm text-muted-foreground">System will create a backup every day at 2:00 AM</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Database Optimization</Label>
                  <Button className="bg-teal-600 hover:bg-teal-700">Optimize Database</Button>
                  <p className="text-sm text-muted-foreground">Last optimization: April 20, 2025 (5 days ago)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader>
              <CardTitle className="text-teal-800 dark:text-teal-300">Security Settings</CardTitle>
              <CardDescription>Manage system security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactor">Require Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require all admin users to use two-factor authentication
                    </p>
                  </div>
                  <Switch id="twoFactor" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="failedLogin">Failed Login Protection</Label>
                    <p className="text-sm text-muted-foreground">
                      Temporarily block IP addresses after 5 failed login attempts
                    </p>
                  </div>
                  <Switch id="failedLogin" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Admin Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" />
                </div>

                <div className="p-4 border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950 rounded-md flex items-start gap-3">
                  <AlertTriangle className="text-amber-600 dark:text-amber-400 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium text-amber-800 dark:text-amber-300">Security Notice</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Your SSL certificate will expire in 30 days. Please renew it to maintain secure connections.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>API Access</Label>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Enable API Access</p>
                      <p className="text-sm text-muted-foreground">Allow external applications to access the API</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>API Keys</Label>
                  <div className="bg-muted rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">Mobile App</p>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Regenerate
                      </Button>
                    </div>
                    <p className="font-mono text-xs bg-background p-2 rounded mb-4 overflow-x-auto">
                      sk_live_51NxT8rKjH7bY6gTp2JvkLm3nKs8HGQhCUZRFx7vBtKlBzn9
                    </p>

                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">External Dashboard</p>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Regenerate
                      </Button>
                    </div>
                    <p className="font-mono text-xs bg-background p-2 rounded overflow-x-auto">
                      sk_live_51NxT8rKjH7bY6gTp2JvkLm3nKs8HGQhCUZRFx7vBtKlBzn9
                    </p>
                  </div>
                </div>

                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Lock className="mr-2" size={16} />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
