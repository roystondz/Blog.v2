"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BlogCard from "@/components/blog-card";
import { useState, useEffect } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  image: string | null;
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]); // Initialize as an empty array
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch blog posts when component is mounted or any dependency changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/blog/all?&category=${selectedCategory}&search=${searchQuery}`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log("Fetched posts:", data);  // Inspect the response format
        setPosts(data || []);  // Ensure this matches the actual API structure
        // Manually calculate totalPages if the API doesn't provide it
        setTotalPages(Math.ceil(data.length / 10)); // Assuming 10 posts per page
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);  // Fallback to empty array on error
      }
    };

    fetchPosts();
  }, [searchQuery, selectedCategory, currentPage]); // Re-run when these dependencies change

  const categories = ["All", "Technology", "Lifestyle", "Travel", "Health", "Business"];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search query changes
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-teal-800 dark:text-teal-300">All Blogs</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="search"
            placeholder="Search blogs..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              size="sm"
              className={
                category === selectedCategory
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "border-teal-600 text-teal-600 hover:bg-teal-50 dark:border-teal-500 dark:text-teal-500"
              }
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Ensure posts is an array before using .length */}
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <p>No posts available.</p> // Show a fallback message if no posts
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={currentPage === index + 1 ? "bg-teal-600 text-white" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </main>
  );
}
