"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Eye, Search, UserCheck, UserX, Settings, Shield, FileText } from "lucide-react"

export default function AdminDashboard() {
  // Mock blog posts
  const [allPosts, setAllPosts] = useState([
    {
      id: "1",
      title: "Getting Started with Web Development",
      author: "Alex Johnson",
      status: "published",
      date: "April 20, 2025",
      views: 245,
    },
    {
      id: "2",
      title: "The Future of AI in Everyday Life",
      author: "Emma Roberts",
      status: "published",
      date: "April 18, 2025",
      views: 189,
    },
    {
      id: "3",
      title: "Sustainable Living: Simple Steps",
      author: "Marcus Chen",
      status: "published",
      date: "April 15, 2025",
      views: 156,
    },
    {
      id: "4",
      title: "Introduction to Digital Photography",
      author: "Priya Patel",
      status: "pending",
      date: "April 12, 2025",
      views: 0,
    },
    {
      id: "5",
      title: "Travel on a Budget: European Edition",
      author: "David Kim",
      status: "pending",
      date: "April 10, 2025",
      views: 0,
    },
  ])

  // Mock users
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "author",
      posts: 3,
      joinDate: "January 15, 2025",
      status: "active",
    },
    {
      id: "2",
      name: "Emma Roberts",
      email: "emma@example.com",
      role: "author",
      posts: 1,
      joinDate: "February 20, 2025",
      status: "active",
    },
    {
      id: "3",
      name: "Marcus Chen",
      email: "marcus@example.com",
      role: "author",
      posts: 1,
      joinDate: "March 5, 2025",
      status: "active",
    },
    {
      id: "4",
      name: "Priya Patel",
      email: "priya@example.com",
      role: "author",
      posts: 1,
      joinDate: "March 15, 2025",
      status: "pending",
    },
    {
      id: "5",
      name: "David Kim",
      email: "david@example.com",
      role: "author",
      posts: 1,
      joinDate: "April 1, 2025",
      status: "pending",
    },
  ])

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setAllPosts(allPosts.filter((post) => post.id !== id))
    }
  }

  const handleApprovePost = (id: string) => {
    setAllPosts(allPosts.map((post) => (post.id === id ? { ...post, status: "published" } : post)))
  }

  const handleApproveUser = (id: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: "active" } : user)))
  }

  const handleBanUser = (id: string) => {
    if (confirm("Are you sure you want to ban this user?")) {
      setUsers(users.map((user) => (user.id === id ? { ...user, status: "banned" } : user)))
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800 dark:text-teal-300">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild className="bg-teal-600 hover:bg-teal-700">
            <Link href="/admin/create-blog">
              <FileText className="mr-2" size={16} />
              New Blog Post
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
            <Link href="/admin/settings">
              <Settings className="mr-2" size={16} />
              Advanced Settings
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-teal-100 dark:border-teal-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-teal-800 dark:text-teal-300">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{allPosts.length}</p>
          </CardContent>
        </Card>
        <Card className="border-teal-100 dark:border-teal-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-teal-800 dark:text-teal-300">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card className="border-teal-100 dark:border-teal-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-teal-800 dark:text-teal-300">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {allPosts.filter((post) => post.status === "pending").length +
                users.filter((user) => user.status === "pending").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-teal-100 dark:border-teal-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-teal-800 dark:text-teal-300">Admin Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/admin/system">
                <Shield className="mr-2" size={16} />
                System Controls
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="mb-6 bg-teal-50 dark:bg-teal-950">
          <TabsTrigger value="posts" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Manage Posts
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Manage Users
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Site Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-teal-800 dark:text-teal-300">All Blog Posts</CardTitle>
                  <CardDescription>Manage and moderate all blog posts</CardDescription>
                </div>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <Input placeholder="Search posts..." className="pl-9 w-full md:w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-teal-100 dark:border-teal-900">
                      <th className="text-left py-3 px-2">Title</th>
                      <th className="text-left py-3 px-2">Author</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Views</th>
                      <th className="text-right py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPosts.map((post) => (
                      <tr key={post.id} className="border-b border-teal-100 dark:border-teal-900">
                        <td className="py-3 px-2">{post.title}</td>
                        <td className="py-3 px-2">{post.author}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              post.status === "published"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">{post.date}</td>
                        <td className="py-3 px-2">{post.views}</td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-2">
                            {post.status === "pending" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleApprovePost(post.id)}
                                className="text-green-500 hover:text-green-700 hover:bg-green-50"
                              >
                                <UserCheck size={16} />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/blogs/${post.id}`}>
                                <Eye size={16} />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/blogs/${post.id}`}>
                                <Edit size={16} />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-teal-800 dark:text-teal-300">All Users</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <Input placeholder="Search users..." className="pl-9 w-full md:w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-teal-100 dark:border-teal-900">
                      <th className="text-left py-3 px-2">Name</th>
                      <th className="text-left py-3 px-2">Email</th>
                      <th className="text-left py-3 px-2">Role</th>
                      <th className="text-left py-3 px-2">Posts</th>
                      <th className="text-left py-3 px-2">Join Date</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-right py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-teal-100 dark:border-teal-900">
                        <td className="py-3 px-2">{user.name}</td>
                        <td className="py-3 px-2">{user.email}</td>
                        <td className="py-3 px-2">{user.role}</td>
                        <td className="py-3 px-2">{user.posts}</td>
                        <td className="py-3 px-2">{user.joinDate}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : user.status === "pending"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-2">
                            {user.status === "pending" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleApproveUser(user.id)}
                                className="text-green-500 hover:text-green-700 hover:bg-green-50"
                              >
                                <UserCheck size={16} />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/users/${user.id}`}>
                                <Edit size={16} />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleBanUser(user.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <UserX size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader>
              <CardTitle className="text-teal-800 dark:text-teal-300">Site Settings</CardTitle>
              <CardDescription>Configure your blog platform settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" defaultValue="MiniBlog" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea id="siteDescription" defaultValue="A minimal blogging platform for readers and writers" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postsPerPage">Posts Per Page</Label>
                  <Input id="postsPerPage" type="number" defaultValue="10" />
                </div>

                <div className="space-y-2">
                  <Label>Content Moderation</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="moderateContent" defaultChecked />
                    <label htmlFor="moderateContent" className="text-sm font-medium leading-none">
                      Require approval for new posts
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>User Registration</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="openRegistration" defaultChecked />
                    <label htmlFor="openRegistration" className="text-sm font-medium leading-none">
                      Allow new user registrations
                    </label>
                  </div>
                </div>

                <Button className="bg-teal-600 hover:bg-teal-700">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
