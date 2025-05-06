
# MiniBlog - Modern Blogging Platform

MiniBlog is a modern, feature-rich blogging platform built with Next.js and Tailwind CSS. It provides a clean, responsive interface for both readers and writers, with separate user and admin experiences.

## Features

### For Readers

* 🏠 Responsive homepage with featured posts
* 📚 Browse all blogs with filtering and search
* 👤 View author profiles and their published posts
* 🌓 Dark/light mode toggle
* 📱 Mobile-friendly design

### For Writers

* ✍️ Create, edit, and manage blog posts
* 📊 Dashboard with post analytics
* 🖼️ Image upload for profile and blog covers
* 🏷️ Categorize posts and add tags
* 📝 Rich content editing experience
* 📱 Mobile-friendly admin interface

### For Admins

* 👥 User management (approve, edit, ban users)
* 📝 Content moderation and management
* 🔒 Secure admin login
* 📊 Site-wide analytics
* ⚙️ System settings and configuration
* 🛠️ Advanced blog creation and editing tools

## Tech Stack

* **Framework**: Next.js 14 (App Router)
* **Styling**: Tailwind CSS
* **UI Components**: shadcn/ui
* **Authentication**: (Ready for integration)
* **Database**: Prisma + PostgreSQL (or your DB of choice)
* **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

* Node.js 18.x or later
* npm or yarn
* PostgreSQL (or other supported DB)

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_KEY="yoursecret" # For authentication (when integrated)
UPLOADTHING_TOKEN="JDFBASEIP...." (Make an account to upload photos)
```

> Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL credentials.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/roystondz/Blog.v2.git
cd Blog.v2
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up the database with Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### User Access

* **Homepage**: Browse featured posts and latest content
* **Blog Listing**: View all published blog posts
* **User Registration**: Create a new account

  * Email: `user@example.com`
  * Password: `password`

### Admin Access
(make a account where the role is {ROLE="ADMIN"})
* **Admin Login**: Access the admin portal at `/admin/login` with demo credentials:

  * Email: `admin@example.com`
  * Password: `admin123`

## Project Structure

```plaintext
miniblog/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin pages
│   ├── auth/               # Authentication pages
│   ├── blogs/              # Blog listing and individual posts
│   ├── profile/            # Public profile pages
│   ├── user/               # User dashboard and settings
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   └── ...                 # Custom components
├── lib/                    # Utility functions
├── prisma/                 # Prisma schema and client
├── public/                 # Static assets
├── .env                    # Environment variables
└── ...
```

## User Roles

### Regular Users

* Create and manage their own blog posts
* Edit their profile information
* View analytics for their own posts
* Comment on blog posts (when implemented)

### Admin Users

* All regular user capabilities
* Manage all users (approve, edit, ban)
* Manage all blog posts (create, edit, delete)
* Access system settings and configurations
* View site-wide analytics

## Screenshots

[Loading...]

## Roadmap

* ✅ Prisma database integration
* 🔐 Authentication system
* 💬 Comment system
* 📝 Rich text editor
* 🖼️ Image upload functionality
* 🔍 Search functionality
* 📧 Email notifications
* 🔗 Social sharing
* 📊 Analytics dashboard
* 📱 Mobile app

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)
* [Lucide Icons](https://lucide.dev/)

---

Built with ❤️ by **Roystn Akash Dsouza**

---

Would you like help integrating authentication next using NextAuth.js and Prisma?
