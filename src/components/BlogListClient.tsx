"use client"; // This component handles client-side state and interactions

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { PostMetadata } from "@/lib/posts"; // Import the shared interface

interface BlogListClientProps {
  allPosts: PostMetadata[]; // Receive all posts as a prop
}

export default function BlogListClient({ allPosts }: BlogListClientProps) {
  const [isLoaded, setIsLoaded] = useState(false); // For initial fade-in effect
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // No need for isLoading or fetching state here, data is passed via props

  useEffect(() => {
    setIsLoaded(true); // Trigger fade-in animation
  }, []);

  // Filter posts based on category and search query (client-side filtering)
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      categoryFilter === "all" ||
      post.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories for filter dropdown/buttons from the passed props
  const categories = [
    "all",
    ...new Set(allPosts.map((post) => post.category.toLowerCase())),
  ];

  return (
    <div
      className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Search and Filter Section */}
      <section className="py-8 px-4 md:px-8 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.length > 1 && categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition duration-300 ${
                    categoryFilter === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section with Sidebar */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-8/12">
              {filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {/* Featured Post - First Post */}
                  {filteredPosts.slice(0, 1).map((post) => (
                    <FadeIn key={post.id} delay={0.1} direction="up">
                      <Link href={`/blog/${post.id}`} className="block group">
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="relative h-72 bg-gray-200">
                            <Image
                              src={post.imageUrl}
                              alt={`Blog post image for: ${post.title}`}
                              className="object-cover"
                              fill
                              sizes="(max-width: 768px) 100vw, 60vw"
                              priority // Prioritize loading the featured image
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                  {post.author
                                    .split(" ")
                                    .map((name) => name[0])
                                    .join("")}
                                </div>
                                <div className="ml-3">
                                  <p className="font-medium text-gray-900">
                                    {post.author}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {post.date}
                                  </p>
                                </div>
                              </div>
                              <span className="inline-flex items-center text-blue-600 font-medium">
                                Read Article
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 ml-1"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}

                  {/* Other Posts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.slice(1).map((post, index) => (
                      <FadeIn
                        key={post.id}
                        delay={0.1 * (index + 1)}
                        direction="up"
                        className="h-full"
                      >
                        <Link
                          href={`/blog/${post.id}`}
                          className="block h-full group"
                        >
                          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                            <div className="relative h-48 bg-gray-200">
                              <Image
                                src={post.imageUrl}
                                alt={`Blog post image for: ${post.title}`}
                                className="object-cover"
                                fill
                                sizes="(max-width: 768px) 100vw, 30vw"
                              />
                              <div className="absolute top-3 left-3">
                                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                                  {post.category}
                                </span>
                              </div>
                            </div>
                            <div className="p-5 flex-grow flex flex-col">
                              <div className="flex-grow">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                  {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3"> {/* Added line-clamp */}
                                  {post.excerpt}
                                </p>
                              </div>
                              <div className="flex items-center mt-3">
                                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                  {post.author
                                    .split(" ")
                                    .map((name) => name[0])
                                    .join("")}
                                </div>
                                <div className="ml-2">
                                  <p className="text-xs font-medium text-gray-900">
                                    {post.author}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {post.date}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              ) : (
                 // Display message if no posts match filters or if initial data is empty
                <div className="text-center py-16">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No articles found
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Try changing your search or filter criteria, or check back later.
                  </p>
                  <button
                    onClick={() => {
                      setCategoryFilter("all");
                      setSearchQuery("");
                    }}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-4/12">
              <div className="sticky top-28">
                {/* Categories Widget */}
                {allPosts.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
                        Categories
                      </h3>
                      <ul className="space-y-2">
                        {categories.map((category, index) => (
                          <li key={index}>
                            <button
                              className={`w-full text-left px-2 py-1.5 rounded-lg transition duration-200 ${
                                categoryFilter === category
                                  ? "bg-blue-100 text-blue-700 font-medium"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                              onClick={() => setCategoryFilter(category)}
                            >
                              {category === "all"
                                ? "All Categories"
                                : category.charAt(0).toUpperCase() +
                                  category.slice(1)}
                              <span className="float-right text-sm text-gray-500">
                                {category === "all"
                                  ? allPosts.length
                                  : allPosts.filter(
                                      (post) =>
                                        post.category.toLowerCase() === category,
                                    ).length}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Popular Posts Widget */}
                 {allPosts.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
                        Popular Posts
                      </h3>
                      {/* Display top 3 posts based on fetched data */}
                      <div className="space-y-4">
                        {allPosts.slice(0, 3).map((post) => (
                          <div key={post.id} className="flex gap-3">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
                              <Image
                                src={post.imageUrl}
                                alt={`Blog post image for: ${post.title}`}
                                className="object-cover"
                                fill
                                sizes="80px"
                              />
                            </div>
                            <div className="flex-grow">
                              <Link
                                href={`/blog/${post.id}`}
                                className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2 text-sm"
                              >
                                {post.title}
                              </Link>
                              <p className="text-xs text-gray-500 mt-1">
                                {post.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                 )}

                {/* CTA Widget */}
                <div className="bg-blue-600 rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 text-white text-center">
                    <h3 className="text-lg font-bold mb-2">
                      Need Tech Support in Long Beach?
                    </h3>
                    <p className="text-blue-100 mb-4">
                      LB Computer Help is here for all your <strong>Long Beach computer repair</strong> and <strong>IT support</strong> needs.
                    </p>
                    <a
                      href="tel:2133496790"
                      className="inline-block bg-white text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Call (213) 349-6790 for Long Beach Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 text-blue-100">
            Subscribe to our newsletter for the latest tech tips, industry news,
            and exclusive offers.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition duration-300"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm mt-4 text-blue-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
