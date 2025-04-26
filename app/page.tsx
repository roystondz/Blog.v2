import Link from "next/link"
import { Button } from "@/components/ui/button"
import BlogCard from "@/components/blog-card"

export default function Home() {
  // Mock data for blog posts
  const featuredPosts = [
    {
      id: "1",
      title: "Getting Started with Web Development",
      excerpt: "A beginner's guide to modern web development tools and frameworks.",
      coverImage: "/placeholder.svg?height=400&width=600",
      date: "April 20, 2025",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "2",
      title: "The Future of AI in Everyday Life",
      excerpt: "How artificial intelligence is transforming our daily experiences.",
      coverImage: "/placeholder.svg?height=400&width=600",
      date: "April 18, 2025",
      author: {
        name: "Emma Roberts",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "3",
      title: "Sustainable Living: Simple Steps",
      excerpt: "Small changes that make a big difference for our planet.",
      coverImage: "/placeholder.svg?height=400&width=600",
      date: "April 15, 2025",
      author: {
        name: "Marcus Chen",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
  ]

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
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
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
  )
}
