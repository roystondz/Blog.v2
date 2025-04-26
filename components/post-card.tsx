import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="group">
      <div className="rounded-lg overflow-hidden mb-4">
        <Link href={`/blog/${post.id}`}>
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      <Badge variant="outline" className="mb-2">
        {post.category}
      </Badge>
      <h3 className="text-xl font-bold mb-2 line-clamp-2">
        <Link href={`/blog/${post.id}`} className="hover:underline">
          {post.title}
        </Link>
      </h3>
      <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">{post.date}</p>
        <div className="flex items-center text-muted-foreground">
          <Clock className="mr-1" size={14} /> {post.readingTime}
        </div>
      </div>
    </div>
  )
}
