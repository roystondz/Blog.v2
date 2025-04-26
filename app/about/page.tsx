import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function About() {
  const teamMembers = [
    {
      name: "Royston Akash Dsouza",
      role: "Founder & Editor-in-Chief",
      bio: "Computer Science Engineer, Passionate about Technology.",
      avatar: "/placeholder.svg?height=300&width=300",
      
    },
    
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Insights</h1>
          <p className="text-xl text-muted-foreground">
            We're a team of writers, thinkers, and creators exploring the ideas that shape our world.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 mb-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center m-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Insights was founded in 2025 with a simple mission: to create thoughtful, accessible content that helps
              people navigate our rapidly changing world.
            </p>
            <p className="text-muted-foreground mb-4">
              We believe that the best ideas emerge at the intersection of different domains — where technology meets
              culture, where personal growth meets societal change, and where creativity meets practicality.
            </p>
            <p className="text-muted-foreground">
              Our team brings diverse perspectives and expertise, united by a shared commitment to quality, depth, and
              intellectual curiosity.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://lcwuyflyet.ufs.sh/f/Zxk6koLkOENoJ8JDi4ZSzQ3vGTu0HkIDhfLZbiogNW1rsMB6"
              alt="Our team collaborating"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted py-16 mb-16">
        <div className="container mx-auto px-4 m-10">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Intellectual Curiosity</h3>
                <p className="text-muted-foreground">
                  We approach topics with open minds, asking questions that challenge conventional thinking and explore
                  new possibilities.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Practical Insight</h3>
                <p className="text-muted-foreground">
                  We believe that good ideas should be actionable. Our content aims to provide practical value alongside
                  conceptual understanding.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Inclusive Perspective</h3>
                <p className="text-muted-foreground">
                  We seek out diverse viewpoints and recognize that the most interesting conversations happen when
                  different perspectives meet.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
              <p className="text-sm mb-4">{member.bio}</p>
              <div className="flex justify-center gap-2">
                <Button variant="ghost" size="icon">
                  <Twitter size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
          </p>
          <Button size="lg" className="rounded-full">
            Contact Us
          </Button>
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" size="icon">
              <Twitter size={18} />
            </Button>
            <Button variant="outline" size="icon">
              <Github size={18} />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin size={18} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
