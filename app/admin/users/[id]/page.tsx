"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function AdminEditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const userId = params.id

  // Mock user data - in a real app, you would fetch this based on the userId
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    bio: "Frontend developer and technical writer with a passion for teaching.",
    location: "New York, NY",
    website: "https://alexjohnson.com",
    twitter: "@alexjohnson",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "author",
    status: "active",
    joinDate: "January 15, 2025",
    posts: 3,
    verified: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSwitchChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("User update data:", formData)

    // Mock submission - in a real app, you would send this data to your backend
    alert("User profile updated successfully!")
    router.push("/admin/dashboard")
  }

  const handleDeleteUser = () => {
    if (confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) {
      // In a real app, you would send a delete request to your backend
      alert("User deleted successfully!")
      router.push("/admin/dashboard")
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800 dark:text-teal-300">Edit User</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-teal-600 text-teal-600 hover:bg-teal-50"
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader className="pb-4">
              <CardTitle className="text-teal-800 dark:text-teal-300">User Information</CardTitle>
              <CardDescription>User ID: {userId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-teal-200 dark:border-teal-800">
                  <Image
                    src={formData.avatar || "/placeholder.svg"}
                    alt={formData.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{formData.name}</h2>
                <p className="text-sm text-muted-foreground">{formData.email}</p>
                <p className="text-xs text-muted-foreground">Member since {formData.joinDate}</p>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      formData.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : formData.status === "pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {formData.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="destructive" className="w-full" onClick={handleDeleteUser}>
                  Delete User
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="border-teal-100 dark:border-teal-900 mb-8">
            <CardHeader>
              <CardTitle className="text-teal-800 dark:text-teal-300">Profile Information</CardTitle>
              <CardDescription>Edit user profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={formData.avatar || "/placeholder.svg"} alt={formData.name} />
                      <AvatarFallback className="bg-teal-200 text-teal-800">{formData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Input id="avatar" type="file" accept="image/*" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="User bio"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://website.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="@username"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader>
              <CardTitle className="text-teal-800 dark:text-teal-300">Account Settings</CardTitle>
              <CardDescription>Manage user account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="role">User Role</Label>
                    <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="author">Author</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Account Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="banned">Banned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="verified">Email Verified</Label>
                    <p className="text-sm text-muted-foreground">User has verified their email address</p>
                  </div>
                  <Switch
                    id="verified"
                    checked={formData.verified}
                    onCheckedChange={(checked) => handleSwitchChange("verified", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="resetPassword">Reset Password</Label>
                    <p className="text-sm text-muted-foreground">Send password reset email to user</p>
                  </div>
                  <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                    Send Reset Link
                  </Button>
                </div>

                <div className="pt-4 border-t border-teal-100 dark:border-teal-900">
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    Save Account Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
