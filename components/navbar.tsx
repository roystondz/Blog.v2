"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [inactive, setInactive] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile")
        if (response.ok) {
          setInactive(false)
        } else if (response.status === 401) {
          setInactive(true)
        }
      } catch (error) {
        console.error("Error fetching user data", error)
        setInactive(true)
      }
    }
    fetchUserData()
  }, [])

  return (
    <header className="border-b border-teal-100 dark:border-teal-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-teal-800 dark:text-teal-300">
            MiniBlog
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400">
              Home
            </Link>
            <Link href="/blogs" className="text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400">
              Blogs
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400">
              About
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            {inactive ? (
              <>
                <Button asChild variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                  <Link href="/user/profile">Profile</Link>
                </Button>
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/user/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                  <Link href="/api/user/logout">Sign Out</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ModeToggle />
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-teal-100 dark:border-teal-900">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/blogs" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Blogs
              </Link>
              <Link href="/about" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>

              {/* Mobile Auth Buttons */}
              {inactive ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-teal-100 dark:border-teal-900">
                  <Button asChild variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="bg-teal-600 hover:bg-teal-700">
                    <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-teal-100 dark:border-teal-900">
                  <Button asChild variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                    <Link href="/user/profile" onClick={() => setIsMenuOpen(false)}>
                      Profile
                    </Link>
                  </Button>
                  <Button asChild className="bg-teal-600 hover:bg-teal-700">
                    <Link href="/user/dashboard" onClick={() => setIsMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                    <Link href="/api/user/logout" onClick={() => setIsMenuOpen(false)}>
                      Sign Out
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
