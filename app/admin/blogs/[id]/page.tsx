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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function AdminEditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const blogId = params.id

  // Mock blog data - in a real app, you would fetch this based on the blogId
  const [formData, setFormData] = useState({
    title: "Getting Started with Web Development",
    excerpt: "A beginner's guide to modern web development tools and frameworks.",
    content: `
      <p>Web development can seem overwhelming at first. With so many languages, frameworks, and tools to choose from, it's hard to know where to start. This guide aims to provide a clear path for beginners.</p>
      
      <h2>Understanding the Basics</h2>
      
      <p>Before diving into frameworks and libraries, it's essential to have a solid understanding of the core technologies:</p>
      
      <ul>
        <li><strong>HTML</strong>: The backbone of any website, providing structure to your content.</li>
        <li><strong>CSS</strong>: Responsible for styling and layout, making your websites visually appealing.</li>
        <li><strong>JavaScript</strong>: Adds interactivity and dynamic behavior to web pages.</li>
      </ul>
      
      <p>Spend time mastering these fundamentals before moving on to more advanced topics. There are plenty of free resources online to help you learn, including MDN Web Docs, freeCodeCamp, and Codecademy.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=1200",
    category: "technology",
    author: "Alex Johnson",
    authorId: "1",
    date: "April 20, 2025",
    status: "published",
    featured: true,
    allowComments: true,
    views: 245,
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
    console.log("Blog update data:", formData)

    // Mock submission - in a real app, you would send this data to your backend
    alert("Blog post updated successfully!")
    router.push("/admin/dashboard")
  }

  const handleDeleteBlog = () => {
    if (confirm("Are you sure you want to permanently delete this blog post? This action cannot be undone.")) {
      // In a real app, you would send a delete request to your backend
      alert("Blog post deleted successfully!")
      router.push("/admin/dashboard")
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800 dark:text-teal-300">Edit Blog Post</h1>
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
          <Card className="border-teal-100 dark:border-teal-900 mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-teal-800 dark:text-teal-300">Blog Information</CardTitle>
              <CardDescription>Blog ID: {blogId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Author</p>
                  <p className="text-sm text-muted-foreground">{formData.author}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Published Date</p>
                  <p className="text-sm text-muted-foreground">{formData.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      formData.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                    }`}
                  >
                    {formData.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">Views</p>
                  <p className="text-sm text-muted-foreground">{formData.views}</p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <Button variant="destructive" className="w-full" onClick={handleDeleteBlog}>
                  Delete Blog Post
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader className="pb-4">
              <CardTitle className="text-teal-800 dark:text-teal-300">Publishing Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Post</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="allowComments">Allow Comments</Label>
                  <Switch
                    id="allowComments"
                    checked={formData.allowComments}
                    onCheckedChange={(checked) => handleSwitchChange("allowComments", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input id="publishDate" type="date" defaultValue="2025-04-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader>
              <CardTitle className="text-teal-800 dark:text-teal-300">Edit Blog Post</CardTitle>
              <CardDescription>Make changes to the blog post content</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Brief summary of the post"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <div className="mb-2 rounded-lg overflow-hidden">
                    <Image
                      src={formData.coverImage || "/placeholder.svg"}
                      alt={formData.title}
                      width={600}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <Input id="coverImage" type="file" accept="image/*" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={12}
                    className="font-mono"
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Select value={formData.authorId} onValueChange={(value) => handleSelectChange("authorId", value)}>
                    <SelectTrigger id="author">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Alex Johnson</SelectItem>
                      <SelectItem value="2">Emma Roberts</SelectItem>
                      <SelectItem value="3">Marcus Chen</SelectItem>
                      <SelectItem value="4">Sophia Williams</SelectItem>
                      <SelectItem value="5">David Kim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    Update Blog Post
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
