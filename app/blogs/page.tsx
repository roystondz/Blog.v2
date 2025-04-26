import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import BlogCard from "@/components/blog-card"

export default function BlogsPage() {
  // Mock data for blog posts
  const posts = [
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
    {
      id: "4",
      title: "The Psychology of Productivity",
      excerpt: "Understanding the mental factors that affect how we work and focus.",
      coverImage: "/placeholder.svg?height=400&width=600",
      date: "April 12, 2025",
      author: {
        name: "Sophia Williams",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "5",
      title: "Travel on a Budget: European Edition",
      excerpt: "How to explore Europe without breaking the bank.",
      coverImage: "/placeholder.svg?height=400&width=600",
      date: "April 10, 2025",
      author: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "6",
      title: "Introduction to Digital Photography",
      excerpt: "Essential tips for beginners looking to improve their photography skills.",
      coverImage: "/placeholder.svg?height=400&width=600",
      date: "April 8, 2025",
      author: {
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
  ]

  const categories = ["All", "Technology", "Lifestyle", "Travel", "Health", "Business"]

  return (
    <main className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-teal-800 dark:text-teal-300">All Blogs</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input type="search" placeholder="Search blogs..." className="pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className={
                category === "All"
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "border-teal-600 text-teal-600 hover:bg-teal-50 dark:border-teal-500 dark:text-teal-500"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" className="bg-teal-600 text-white hover:bg-teal-700">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </main>
  )
}
