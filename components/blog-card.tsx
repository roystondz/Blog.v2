import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"



interface Post {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  author: string
  readingTime: string
  content: string
  category: string
  createdAt: string
  updatedAt: string
  published: boolean
  
}

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden border-teal-100 dark:border-teal-900 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
      <Link href={`/blog/${post.id}`} className="block">
        <div className="aspect-video overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold mb-2 text-teal-800 dark:text-teal-300 hover:underline">{post.title}</h3>
        </Link>
        <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback className="bg-teal-200 text-teal-800">{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{post.author.name}</span>
        </div> */}
        <span className="text-xs text-muted-foreground">{post.date}</span>
      </CardFooter>
    </Card>
  )
}
