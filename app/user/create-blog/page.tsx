"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadButton } from "@uploadthing/react"
export default function CreateBlogPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  })
  const[loading, setLoading] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); // Also you missed this! It prevents page reload.
      setLoading(true); // Set loading to true when form is submitted
      console.log("Form data submitted:", formData);
    
      try {
        const response = await fetch(`/api/blog/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to create post:", errorData);
          // Optionally show error to user
          return;
        }
        
        // Only after successful post creation, redirect
        router.push("/user/dashboard");
      } catch (error) {
        console.error("Error submitting form:", error);
      }finally{
        setLoading(false); // Reset loading state
      }
    }
    
  if (loading) {
    return(
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600 border-solid"></div>
      </div>
    )
      }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-teal-800 dark:text-teal-300">Create New Blog Post</h1>

      <Card className="max-w-4xl mx-auto border-teal-100 dark:border-teal-900">
        <CardHeader>
          <CardTitle className="text-teal-800 dark:text-teal-300">New Post</CardTitle>
          <CardDescription>Fill in the details for your new blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter a catchy title"
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={handleSelectChange} value={formData.category}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <UploadButton
  endpoint="imageUploader"
  onClientUploadComplete={(res:any) => {
    console.log("Upload completed:", res);
    // res[0].url will give you the uploaded file's URL
    const fileUrl = res[0].url;
    formData.image  = fileUrl; // Update the formData with the new image URL
    console.log("Uploaded file URL:", fileUrl);

    // You can now POST this fileUrl to your backend to save in database
  }}
  onUploadError={(error:any) => {
    alert(`ERROR! ${error.message}`);
  }}
/>
              <p className="text-xs text-muted-foreground">Recommended size: 1200x600 pixels</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your blog post content here..."
                required
                value={formData.content}
                onChange={handleChange}
                className="min-h-[300px]"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Publish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
