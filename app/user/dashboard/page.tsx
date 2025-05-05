"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react"


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
  role: "USER" | "ADMIN";  // based on your role options
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
   // Add this field to the User interface
}





export default function UserDashboard() {
  // Mock user data
  
  const [loading, setLoading] = useState(true)
  // Mock blog posts
  const [userPosts, setUserPosts] = useState<{ id: string; title: string; published: boolean; createdAt: string; views: number }[]>([])
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    password: '',
    createdAt: '',
    updatedAt: '',
    profileImage: '',
    bio: null,
    website: null,
    role: "USER",          // default to USER
    isVerified: false,
    isBlocked: false,
    lastLogin: null,
    lastPasswordChange: null,
    location: null,
    Twitter: null,
    Instagram: null,
    Facebook: null,
    LinkedIn: null,
    GitHub: null,
    joinDate: null// Format the date as needed
  });
  // const handleDeletePost = (id: string) => {
  //   if (confirm("Are you sure you want to delete this post?")) {
  //     setUserPosts(userPosts.filter((post) => post.id !== id))
  //   }
  // }
  const [userLoading, setUserLoading] = useState(false)
  const [userPostsLoaded, setUserPostsLoaded] = useState(false)

  useEffect(() => {
    // Fetch user data and posts from API
    const fetchUserData = async () => {
      try{
        const response = await fetch("/api/user/profile")
      const data = await response.json()
      setUserLoading(true)
      if (response.ok) {
        setUser(data)
        
        // Mock user posts
        
      } 
      }catch (error) {
        console.error("Error fetching user data", error)
        
      }
      finally {
        setUserLoading(false)
      }
      
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return; // Wait for user to be loaded

      try {
        const response = await fetch(`/api/blog/all-user-blog?userId=${user.id}`);
        const data = await response.json();

        if (response.ok) {
          setUserPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user])

  if ((loading && userLoading ) || (loading && userPosts.length === 0)) {  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600 border-solid"></div>
      </div>
    )
  }

  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/blog/delete?postId=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUserPosts(userPosts.filter((post) => post.id !== id));
        } else {
          console.error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  


  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-teal-800 dark:text-teal-300">User Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-teal-100 dark:border-teal-900">
            <CardHeader className="pb-4">
              <CardTitle className="text-teal-800 dark:text-teal-300">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-teal-200 dark:border-teal-800">
                  <Image
                    src={ user.profileImage ||"/placeholder.svg"}
                    alt={user.name || "User Avatar"}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground">Member since {user.joinDate}</p>
              </div>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">
                  <Link href="/user/edit">Edit Profile</Link>
                </Button>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/user/create-blog">
                    <PlusCircle className="mr-2" size={16} />
                    New Blog Post
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="mb-6 bg-teal-50 dark:bg-teal-950">
              <TabsTrigger value="posts" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                My Posts
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                Stats
              </TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                Saved
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <Card className="border-teal-100 dark:border-teal-900">
                <CardHeader>
                  <CardTitle className="text-teal-800 dark:text-teal-300">My Blog Posts</CardTitle>
                  <CardDescription>Manage your published and draft posts</CardDescription>
                </CardHeader>
                <CardContent>
                  {userPosts.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-teal-100 dark:border-teal-900">
                            <th className="text-left py-3 px-2">Title</th>
                            <th className="text-left py-3 px-2">Status</th>
                            <th className="text-left py-3 px-2">Date</th>
                            <th className="text-left py-3 px-2">Views</th>
                            <th className="text-right py-3 px-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!loading && userPosts.map((post) => (
                            <tr key={post.id} className="border-b border-teal-100 dark:border-teal-900">
                              <td className="py-3 px-2">{post.title}</td>
                              <td className="py-3 px-2">
                                <span
                                  className={`inline-block px-2 py-1 rounded-full text-xs ${
                                    post.published 
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                      : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                  }`}
                                >
                                  {post.published ? "Published" : "Pending Approval"}
                                </span>
                              </td>
                              <td className="py-3 px-2">{post.createdAt.split('T')[0]}</td>
                              <td className="py-3 px-2">{post.views}</td>
                              <td className="py-3 px-2 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/blog/${post.id}`}>
                                      <Eye size={16} />
                                    </Link>
                                  </Button>
                                  <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/user/edit-blog/${post.id}`}>
                                      <Edit size={16} />
                                    </Link>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={()=>{handleDeletePost(post.id)}} 
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          
                          {loading && (
                            <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600 border-solid"></div>
      </div>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You haven't created any posts yet</p>
                      <Button asChild className="bg-teal-600 hover:bg-teal-700">
                        <Link href="/user/create-blog">Create Your First Post</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card className="border-teal-100 dark:border-teal-900">
                <CardHeader>
                  <CardTitle className="text-teal-800 dark:text-teal-300">Your Stats</CardTitle>
                  <CardDescription>View your blog performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-teal-50 dark:bg-teal-900 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Posts</h3>
                      <p className="text-3xl font-bold text-teal-800 dark:text-teal-300">{userPosts.length}</p>
                    </div>
                    <div className="bg-teal-50 dark:bg-teal-900 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Views</h3>
                      <p className="text-3xl font-bold text-teal-800 dark:text-teal-300">{}</p>
                    </div>
                    <div className="bg-teal-50 dark:bg-teal-900 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Avg. Views</h3>
                      <p className="text-3xl font-bold text-teal-800 dark:text-teal-300">{}</p>
                    </div>
                  </div>
                  <p className="text-center text-muted-foreground">More detailed analytics coming soon!</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved">
              <Card className="border-teal-100 dark:border-teal-900">
                <CardHeader>
                  <CardTitle className="text-teal-800 dark:text-teal-300">Saved Posts</CardTitle>
                  <CardDescription>Posts you've bookmarked for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't saved any posts yet</p>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700">
                      <Link href="/blogs">Browse Blogs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
