"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Lock, ArrowLeft } from "lucide-react"

export default function ChangePasswordPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear specific error when user starts typing in a field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate current password
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    // Validate new password
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long"
    }

    // Validate password confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your backend API
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation of current password
      if (formData.currentPassword !== "password") {
        throw new Error("Current password is incorrect")
      }

      // Password change successful
      setSuccess(true)
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/user/dashboard")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while changing your password")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          className="mb-6 text-teal-600 hover:text-teal-700 hover:bg-teal-50 -ml-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Button>

        <Card className="border-teal-100 dark:border-teal-900">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="text-teal-600" size={20} />
              <CardTitle className="text-teal-800 dark:text-teal-300">Change Password</CardTitle>
            </div>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>

          <CardContent>
            {success && (
              <Alert className="mb-6 bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your password has been changed successfully. You will be redirected to your dashboard.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="mb-6 bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  disabled={isSubmitting || success}
                  className={errors.currentPassword ? "border-red-500" : ""}
                />
                {errors.currentPassword && <p className="text-sm text-red-500">{errors.currentPassword}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={isSubmitting || success}
                  className={errors.newPassword ? "border-red-500" : ""}
                />
                {errors.newPassword ? (
                  <p className="text-sm text-red-500">{errors.newPassword}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isSubmitting || success}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={isSubmitting || success}
                >
                  {isSubmitting ? "Updating..." : "Change Password"}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-teal-100 dark:border-teal-900 pt-4">
            <p className="text-sm text-muted-foreground">
              <Link href="/auth/forgot-password" className="text-teal-600 hover:underline">
                Forgot your current password?
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/contact" className="text-teal-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
