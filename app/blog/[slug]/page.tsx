"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/post-card";
import NewsletterForm from "@/components/newsletter-form";

// Define types for Post and Author
interface Author {
  name: string;
  image: string;
  bio: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  authorId: string;
  date: string;
  excerpt: string;
  coverImage: string;
  readingTime: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string | null;
  bio: string | null;
  website: string | null;
  role: "USER" | "ADMIN";
  isVerified: boolean;
  isBlocked: boolean;
  lastLogin: string | null;
  lastPasswordChange: string | null;
  location: string | null;
  socialLinks: {
    Twitter: string | null;
    Instagram: string | null;
    Facebook: string | null;
    LinkedIn: string | null;
    GitHub: string | null;
  };
  joinDate: string | null;
}

export default function BlogPost() {
  const params = useParams();
  
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Extract the slug from URL params
    if (params?.slug) {
      const postSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
      setSlug(postSlug);
    }
  }, [params]);

  useEffect(() => {
    if (slug) {
      // Fetch the post data based on slug
      const fetchPost = async () => {
        try {
          const postResponse = await fetch(`/api/blog/view?id=${slug}`);
          const postData = await postResponse.json();
          setPost(postData);

          console.log("Post Data:", postData);
          // Fetch user profile data
          const userResponse = await fetch(`/api/user/blogwriter?userId=${postData.authorId}`);
          const userData = await userResponse.json();
          setUser(userData);

          // Fetch related posts
          const relatedPostsResponse = await fetch(`/api/blog/related?category=${postData.category}`);
          const relatedPostsData = await relatedPostsResponse.json();
          
          // Defensive coding
          if (Array.isArray(relatedPostsData)) {
            setRelatedPosts(relatedPostsData);
          } else if (relatedPostsData?.data && Array.isArray(relatedPostsData.data)) {
            setRelatedPosts(relatedPostsData.data);
          } else {
            setRelatedPosts([]); // fallback
          }
          
        } catch (error) {
          console.error("Failed to fetch post", error);
        }
      };
      fetchPost();
    }
  }, [slug]);

  // Fallbacks for post and user data in case they're not available yet
  if (!post || !user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium">
          <ArrowLeft className="mr-2" size={16} /> Back to home
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                {post.date && (
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                )}
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1" size={16} />
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <div className="border-t border-b py-6 mb-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="outline" size="sm" className="mr-2">
                <Share2 className="mr-2" size={16} /> Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="mr-2" size={16} /> Save
              </Button>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Category:</span>
              <Badge variant="secondary">{post.category}</Badge>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-muted p-6 rounded-lg mb-12">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold mb-2">About {user.name}</h3>
              <p className="text-muted-foreground">{user.bio}</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((relatedPost) => (
            <PostCard key={relatedPost.id} post={relatedPost} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 mb-16">
        <NewsletterForm />
      </section>
    </main>
  );
}
