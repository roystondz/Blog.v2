import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function BlogPost({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the post data based on the slug
  const post = {
    title: "Getting Started with Web Development",
    excerpt: "A beginner's guide to modern web development tools and frameworks.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "April 20, 2025",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Frontend developer and technical writer with a passion for teaching.",
    },
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
      
      <h2>Choosing Your Path</h2>
      
      <p>Once you're comfortable with the basics, you'll need to decide which direction to take. Web development broadly splits into:</p>
      
      <ul>
        <li><strong>Frontend Development</strong>: Creating the user interface and experience.</li>
        <li><strong>Backend Development</strong>: Building server-side logic and databases.</li>
        <li><strong>Full Stack Development</strong>: Combining both frontend and backend skills.</li>
      </ul>
      
      <p>Your choice will influence which technologies you learn next. For frontend, you might explore React, Vue, or Angular. For backend, consider Node.js, Python with Django or Flask, or Ruby on Rails.</p>
      
      <h2>Essential Tools</h2>
      
      <p>Regardless of your path, certain tools are universal in modern web development:</p>
      
      <ul>
        <li><strong>Git</strong>: For version control and collaboration.</li>
        <li><strong>Command Line</strong>: For navigating your file system and running development tools.</li>
        <li><strong>Package Managers</strong>: npm or yarn for managing dependencies.</li>
        <li><strong>Code Editor</strong>: VS Code, Sublime Text, or Atom to write and edit code efficiently.</li>
      </ul>
      
      <h2>Building Projects</h2>
      
      <p>Theory is important, but nothing beats hands-on experience. Start with small projects and gradually increase complexity as your skills improve. Some ideas for beginner projects:</p>
      
      <ul>
        <li>A personal portfolio website</li>
        <li>A to-do list application</li>
        <li>A weather app using a public API</li>
        <li>A simple blog (like this one!)</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Web development is a journey, not a destination. The field evolves rapidly, so continuous learning is part of the process. Be patient with yourself, celebrate small victories, and don't be afraid to ask for help when needed.</p>
      
      <p>Remember, every expert was once a beginner. With persistence and practice, you'll be building impressive web applications before you know it.</p>
    `,
  }

  return (
    <main className="min-h-screen container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="ghost" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 -ml-4">
          <Link href="/blogs">
            <ArrowLeft className="mr-2" size={16} /> Back to blogs
          </Link>
        </Button>
      </div>

      <article className="max-w-3xl mx-auto">
        {/* Article Header */}
        <h1 className="text-3xl font-bold mb-4 text-teal-800 dark:text-teal-300">{post.title}</h1>

        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {post.date}
          </div>
          <div className="flex items-center">
            <User size={16} className="mr-1" />
            {post.author.name}
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
          className="prose prose-teal max-w-none mb-12 dark:prose-invert prose-headings:text-teal-800 dark:prose-headings:text-teal-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio */}
        <div className="border-t border-t-teal-100 dark:border-t-teal-900 pt-8 mt-8">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback className="bg-teal-200 text-teal-800">{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-teal-800 dark:text-teal-300">About {post.author.name}</h3>
              <p className="text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
