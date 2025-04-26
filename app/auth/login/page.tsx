"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt with:", formData)

    // Mock login - in a real app, you would validate credentials with your backend
    if (formData.email === "user@example.com" && formData.password === "password") {
      // Simulate successful login
      router.push("/user/dashboard")
    } else if (formData.email === "admin@example.com" && formData.password === "admin") {
      // Simulate admin login
      router.push("/admin/dashboard")
    } else {
      alert("Invalid credentials. Try user@example.com/password or admin@example.com/admin")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md border-teal-100 dark:border-teal-900">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-teal-800 dark:text-teal-300">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-xs text-teal-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-teal-600 hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-xs text-center text-muted-foreground">
            <p>Demo credentials:</p>
            <p>User: user@example.com / password</p>
            <p>Admin: admin@example.com / admin</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
