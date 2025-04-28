"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { UploadButton } from "@uploadthing/react"

interface User {
  id: string;
  name: string ;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  profileImage: string | null;
  bio: string | null;
  website: string | null;
  role: "USER" | "ADMIN";  
  isVerified: boolean;
  isBlocked: boolean;
  lastLogin: string | null;
  lastPasswordChange: string | null;
  location: string | null;
  Twitter: string | null;
  Instagram: string | null;
  Facebook: string | null;
  LinkedIn: string | null;
  GitHub: string | null;
  joinDate: string |null;
}


export default function EditProfilePage() {
  const router = useRouter()

  const [formData, setFormData] = useState<User | null>(null); // Initialize formData as null
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch user data from API or local storage
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile")
        const data = await response.json()
        
        if (response.ok) {
          setFormData(data) // Set formData to the fetched data
        } else {
          console.error("Failed to fetch user data:", data.error)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => prev ? { ...prev, [name]: value } : prev) // Check if prev is not null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const response = fetch("/api/user/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    if (!response) {
      console.error("Failed to update user data")
      return
    }

    router.push("/user/dashboard")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600 border-solid"></div>
      </div>
    )
    return <div>Loading...</div> // Show loading while fetching the user data
  }

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600">User data not available. Please try again later.</p>
          <Button variant="outline" onClick={() => router.push("/api/user/logout")}>
            Go to Home
          </Button>
        </div>
      </div>
    )
    return <div>Error: User data not available</div> // Handle case when formData is still null
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-teal-800 dark:text-teal-300">Edit Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader className="pb-4">
              <CardTitle className="text-teal-800 dark:text-teal-300">Your Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-teal-200 dark:border-teal-800">
                  <Image
                    src={formData.profileImage || "/placeholder.svg"}
                    alt={formData.name || "User Avatar"}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{formData.name}</h2>
                <p className="text-sm text-muted-foreground">{formData.email}</p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">
                  <Link href="/user/change-password">Change Password</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader>
              <CardTitle className="text-teal-800 dark:text-teal-300">Profile Information</CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={formData.profileImage || "/placeholder.svg"} alt={formData.name} />
                      <AvatarFallback className="bg-teal-200 text-teal-800">{formData.name}</AvatarFallback>
                    </Avatar>
                    <UploadButton
  endpoint="imageUploader"
  onClientUploadComplete={(res:any) => {
    console.log("Upload completed:", res);
    // res[0].url will give you the uploaded file's URL
    const fileUrl = res[0].url;
    formData.profileImage = fileUrl; // Update the formData with the new image URL
    console.log("Uploaded file URL:", fileUrl);

    // You can now POST this fileUrl to your backend to save in database
  }}
  onUploadError={(error:any) => {
    alert(`ERROR! ${error.message}`);
  }}
/>

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
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about yourself"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location || ""}
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
                      value={formData.website || ""}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="Twitter">Twitter</Label>
                  <Input
                    id="Twitter"
                    name="Twitter"
                    type="text"
                    value={formData.Twitter || ""}
                    onChange={handleChange}
                    placeholder="@username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="Instagram"
                    name="Instagram"
                    type="text"
                    value={formData.Instagram || ""}
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
        </div>
      </div>
    </main>
  )
}
