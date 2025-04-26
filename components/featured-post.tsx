import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Author {
  name: string
  avatar: string
}

interface Post {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  author: Author
  category: string
  readingTime: string
}

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="rounded-lg overflow-hidden">
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div>
        <Badge variant="outline" className="mb-4">
          {post.category}
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          <Link href={`/blog/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="text-muted-foreground mb-6">{post.excerpt}</p>
        <div className="flex items-center justify-between flex-wrap gap-4">
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
    </div>
  )
}
