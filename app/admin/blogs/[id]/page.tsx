"use client"

import type React from "react"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function AdminEditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const blogId = use(params).id

  // Adjusted form data structure based on the provided structure
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
    published: false,
    authorId: "",
    createdAt: "",
    updatedAt: "",
    category: "",
    image: "",
  })

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Mock fetch - in a real app, you would fetch this data from your backend
        const response = await fetch(`/api/admin/get-post?id=${blogId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch blog data")
        }
        const data = await response.json()

        // Set form data with the structure you provided
        setFormData({
          id: data.id,
          title: data.title,
          content: data.content,
          published: data.published,
          authorId: data.authorId,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          category: data.category,
          image: data.image,
        })
      } catch (error) {
        console.error("Error fetching blog data:", error)
      }
    }

    fetchBlogData()
  }, [blogId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string | boolean) => {
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

  const handleDeleteBlog = async() => {
    if (confirm("Are you sure you want to permanently delete this blog post? This action cannot be undone.")) {
      // In a real app, you would send a delete request to your backend
      try{
        const response = await fetch(`/api/admin/delete-post?id=${blogId}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error("Failed to delete blog post")
        }
        const data = await response.json()
        console.log("Blog post deleted:", data)   
      }catch (error) {
        console.error("Error deleting blog post:", error)
        alert("Failed to delete blog post. Please try again.")
        return
      }
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
                  <p className="text-sm text-muted-foreground">{formData.authorId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Created At</p>
                  <p className="text-sm text-muted-foreground">{formData.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      formData.published
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                    }`}
                  >
                    {formData.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">{formData.category}</p>
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
                  <Select value={formData.published ? "published" : "draft"} onValueChange={(value) => handleSelectChange("published", value === "published")}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Post</Label>
                  <Switch
                    id="featured"
                    checked={formData.published}
                    onCheckedChange={(checked) => handleSwitchChange("published", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input id="publishDate" type="date" defaultValue={formData.createdAt.slice(0, 10)} />
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
                    value={formData.content}
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
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <div className="mb-2 rounded-lg overflow-hidden">
                    <Image
                      src={formData.image || "/placeholder.svg"}
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
