"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog-card";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  excerpt: string;
  coverImage: string;
  readingTime: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

interface User {
  id: string;
  name: string;
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
  joinDate: string | null;
}

export default function Home() {
  // Mock data for blog posts
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    content: "",
    category: "",
    image: "",
    author: "",
    date: "",
    excerpt: "",
    coverImage: "",
    readingTime: "",
    createdAt: "",
    updatedAt: "",
    published: false,
  });

  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    password: "",
    createdAt: "",
    updatedAt: "",
    profileImage: null,
    bio: null,
    website: null,
    role: "USER",
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
    joinDate: null,
  });

  // Related posts data (can be fetched or mocked for now)
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/featured`);
        const data = await response.json();
        setFeaturedPosts(data);
        console.log("Fetched post data:", data);
      } catch (error) {
        console.error("Failed to fetch post", error);
      }
    };

    fetchPost(); // Run the fetch only once when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white dark:from-teal-950 dark:to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-teal-800 dark:text-teal-300">MiniBlog</h1>
          <p className="text-lg text-teal-600 dark:text-teal-400 max-w-2xl mx-auto mb-8">
            A simple platform for readers and writers to share ideas and stories.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
              <Link href="/blogs">Browse Blogs</Link>
            </Button>
            <Button asChild variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
              <Link href="/auth/login">Start Writing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-teal-800 dark:text-teal-300">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.length > 0 ? (
            featuredPosts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <div className="">
            <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-teal-600 border-solid"></div>
          </div> 
          </div>
          )}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
            <Link href="/blogs">View All Posts</Link>
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-teal-100 dark:bg-teal-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-teal-800 dark:text-teal-300">Ready to share your story?</h2>
          <p className="text-teal-600 dark:text-teal-400 max-w-2xl mx-auto mb-6">
            Join our community of writers and readers today.
          </p>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
            <Link href="/auth/signup">Create Account</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
