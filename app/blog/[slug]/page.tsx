import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import PostCard from "@/components/post-card"
import NewsletterForm from "@/components/newsletter-form"

export default function BlogPost({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the post data based on the slug
  const post = {
    title: "The Future of Web Development: What's Next After React?",
    excerpt:
      "Exploring emerging technologies and frameworks that might shape the future of web development in the post-React era.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "April 20, 2025",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Senior Developer Advocate and tech writer with a passion for emerging web technologies.",
    },
    category: "Technology",
    readingTime: "5 min read",
    content: `
      <p>For over a decade, React has dominated the frontend development landscape, revolutionizing how we build user interfaces. But as with all technologies, evolution is inevitable. This article explores what might come next in the world of web development.</p>
      
      <h2>The Current State of React</h2>
      
      <p>React's component-based architecture and virtual DOM have made it the library of choice for countless developers and organizations. With the introduction of hooks in 2019 and server components more recently, React has continued to evolve and maintain its relevance.</p>
      
      <p>However, as web applications become increasingly complex and performance expectations rise, developers are beginning to explore alternatives that address some of React's limitations.</p>
      
      <h2>Emerging Frameworks and Approaches</h2>
      
      <p>Several new frameworks and approaches are gaining traction in the developer community:</p>
      
      <ul>
        <li><strong>Svelte</strong>: Unlike React, Svelte shifts much of the work to compile time rather than runtime, resulting in highly optimized vanilla JavaScript.</li>
        <li><strong>Solid</strong>: Inspired by React but with a more efficient reactivity system that doesn't use a virtual DOM.</li>
        <li><strong>Qwik</strong>: Designed for instant loading with resumability rather than hydration.</li>
        <li><strong>Islands Architecture</strong>: A pattern that focuses on selective hydration of interactive components.</li>
      </ul>
      
      <h2>The Rise of Compiler-Based Approaches</h2>
      
      <p>One clear trend is the move toward compiler-based approaches that optimize code at build time rather than relying on runtime operations. This shift promises better performance and smaller bundle sizes.</p>
      
      <h2>AI-Assisted Development</h2>
      
      <p>Another significant trend is the integration of AI into the development workflow. Tools like GitHub Copilot are just the beginning. We can expect future frameworks to incorporate AI more deeply, potentially automating aspects of UI development that currently require manual coding.</p>
      
      <h2>Conclusion</h2>
      
      <p>While React isn't disappearing anytime soon, the web development landscape is diversifying. The future likely holds a more varied ecosystem where developers choose tools based on specific project needs rather than defaulting to a single dominant framework.</p>
      
      <p>As with any technological evolution, the key for developers is to stay curious, keep learning, and be willing to adapt as new approaches emerge.</p>
    `,
  }

  // Mock related posts
  const relatedPosts = [
    {
      id: "2",
      title: "Understanding the JAMstack Architecture",
      excerpt: "A deep dive into the JavaScript, APIs, and Markup architecture that's changing web development.",
      coverImage: "/placeholder.svg?height=400&width=600",
      date: "April 15, 2025",
      author: {
        name: "Emma Roberts",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      category: "Technology",
      readingTime: "6 min read",
    },
    {
      id: "3",
      title: "Web Performance Optimization Techniques",
      excerpt: "Essential strategies to make your websites load faster and provide better user experiences.",
      coverImage: "/placeholder.svg?height=400&width=600",
      date: "April 10, 2025",
      author: {
        name: "Marcus Chen",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      category: "Technology",
      readingTime: "7 min read",
    },
    {
      id: "4",
      title: "The State of CSS in 2025",
      excerpt: "Exploring the latest CSS features and how they're transforming web design possibilities.",
      coverImage: "/placeholder.svg?height=400&width=600",
      date: "April 5, 2025",
      author: {
        name: "Sophia Williams",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      category: "Technology",
      readingTime: "5 min read",
    },
  ]

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
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1" size={16} /> {post.readingTime}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder.svg"}
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
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold mb-2">About {post.author.name}</h3>
              <p className="text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 mb-16">
        <NewsletterForm />
      </section>
    </main>
  )
}
