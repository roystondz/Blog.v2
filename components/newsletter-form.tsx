"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the email to your API
    console.log("Subscribing email:", email)
    setIsSubmitted(true)
    setEmail("")

    // Reset the success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <div className="bg-muted rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-2">Stay in the loop</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Subscribe to our newsletter for the latest articles, insights, and updates delivered straight to your inbox.
      </p>

      {isSubmitted ? (
        <div className="flex items-center justify-center text-green-500 mb-4">
          <Check className="mr-2" size={20} />
          <span>Thanks for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      )}

      <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  )
}
