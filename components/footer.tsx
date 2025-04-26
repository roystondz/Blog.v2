import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-teal-100 dark:border-teal-900 mt-auto px-10">
      <div className="container mx-auto px-4 py-8 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-teal-800 dark:text-teal-300">MiniBlog</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A simple platform for readers and writers to share ideas and stories.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-teal-800 dark:text-teal-300">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-teal-800 dark:text-teal-300">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-100 dark:border-teal-900 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MiniBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
