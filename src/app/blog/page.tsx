"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const blogPosts = [
  {
    id: "cybersecurity-tips-long-beach", // This entry already exists from the failed attempt, just updating imageUrl
    title: "5 Essential Cybersecurity Tips for Long Beach Residents & Businesses",
    date: "April 17, 2025", // Using today's date
    category: "Security",
    excerpt: "Protect yourself and your business in Long Beach with these 5 crucial cybersecurity tips covering passwords, phishing, updates, Wi-Fi, and backups.",
    imageUrl: "/images/blog/cybersecurity-tips-long-beach.png", // Use generated image
    author: "Brandon Ruiz",
    authorRole: "Lead Technician",
  },
  {
    id: "fix-slow-wifi-long-beach",
    title: "5 Essential Cybersecurity Tips for Long Beach Residents & Businesses",
    date: "April 17, 2025",
    category: "Security",
    excerpt: "Protect yourself and your business in Long Beach with these 5 crucial cybersecurity tips covering passwords, phishing, updates, Wi-Fi, and backups.",
    imageUrl: "/images/blog/cybersecurity-tips-long-beach.png", // Correct image path
    author: "Brandon Ruiz",
    authorRole: "Lead Technician",
  },
  {
    id: "fix-slow-wifi-long-beach", // Correct ID
    title: "Fixing Slow Wi-Fi: Common Causes & Solutions for Long Beach Homes & Offices", // Correct Title
    date: "April 17, 2025", // Correct Date (can adjust if needed)
    category: "Networking", // Correct Category
    excerpt: "Experiencing slow Wi-Fi in Long Beach? Learn common causes like router placement, interference, and congestion, plus troubleshooting tips.", // Correct Excerpt
    imageUrl: "/images/blog/wifi-interference.png", // Correct image path
    author: "Brandon Ruiz", // Correct Author
    authorRole: "Lead Technician", // Correct Role
  },
  {
    id: "slow-computer-troubleshooting-long-beach",
    title: "Slow Computer? Top 5 Troubleshooting Tips from Long Beach Tech Experts",
    date: "April 16, 2025",
    category: "Troubleshooting", // New category or use 'Productivity'/'Computer Services'
    excerpt: "Frustrated with a slow computer in Long Beach? Try these 5 expert troubleshooting tips before calling for repair.",
    imageUrl: "/images/blog/slow-computer-troubleshooting.png", // Updated image path
    author: "Brandon Ruiz", // Assuming Brandon is the author
    authorRole: "Lead Technician",
  },
  {
    id: "securing-your-small-business",
    title: "Securing Your Small Business in the Digital Age",
    date: "March 15, 2025",
    category: "Security",
    excerpt:
      "Learn essential cybersecurity measures every small business should implement to protect against common threats.",
    imageUrl: "/images/blog/cybersecurity.jpg",
    author: "Michael Chen",
    authorRole: "IT Security Specialist",
  },
  {
    id: "windows-11-productivity",
    title: "10 Windows 11 Features That Will Boost Your Productivity",
    date: "March 10, 2025",
    category: "Productivity",
    excerpt:
      "Discover hidden Windows 11 features and settings that can significantly improve your daily workflow.",
    imageUrl: "/images/blog/windows11.jpg",
    author: "Sarah Johnson",
    authorRole: "IT Consultant",
  },
  {
    id: "cloud-storage-solutions",
    title: "Comparing Cloud Storage Solutions for Businesses",
    date: "March 5, 2025",
    category: "Cloud Services",
    excerpt:
      "A comprehensive comparison of popular cloud storage options to help you choose the right one for your business needs.",
    imageUrl: "/images/blog/cloud-storage.jpg",
    author: "Michael Chen",
    authorRole: "IT Security Specialist",
  },
  {
    id: "network-troubleshooting",
    title: "Common Network Issues and How to Fix Them",
    date: "February 28, 2025",
    category: "Networking",
    excerpt:
      "A guide to diagnosing and resolving the most frequent network problems faced by home and small business users.",
    imageUrl: "/images/blog/networking.jpg",
    author: "Sarah Johnson",
    authorRole: "IT Consultant",
  },
  {
    id: "smartphone-battery-tips",
    title: "7 Tips to Extend Your Smartphone Battery Life",
    date: "February 20, 2025",
    category: "Mobile Devices",
    excerpt:
      "Simple but effective strategies to maximize battery life on both Android and iPhone devices.",
    imageUrl: "/images/blog/smartphone.jpg",
    author: "Michael Chen",
    authorRole: "IT Security Specialist",
  },
  {
    id: "managed-services-benefits",
    title: "The Business Case for Managed IT Services",
    date: "February 15, 2025",
    category: "MSP",
    excerpt:
      "How managed services can reduce costs, improve reliability, and provide strategic advantages for growing businesses.",
    imageUrl: "/images/blog/managed-services.jpg",
    author: "Sarah Johnson",
    authorRole: "IT Consultant",
  },
];

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      categoryFilter === "all" ||
      post.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(blogPosts.map((post) => post.category.toLowerCase())),
  ];

  return (
    <div
      className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header Banner */}
      <div className="relative py-24 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            LB Computer Help Blog | Long Beach Tech Insights
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Expert IT advice, computer tips, and industry insights from your local Long Beach tech professionals.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 md:px-8 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
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

            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
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
                      <Link href={`/blog/${post.id}`} className="block">
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="relative h-72 bg-gray-200">
                            <Image
                              src={post.imageUrl}
                              alt={`Blog post image for: ${post.title}`}
                              className="object-cover"
                              fill
                              sizes="(max-width: 768px) 100vw, 60vw"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg">
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
                          className="block h-full"
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
                                <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                                  {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                  {post.excerpt}
                                </p>
                              </div>
                              <div className="flex items-center mt-3">
                                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
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
                    Try changing your search or filter criteria.
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
                                ? blogPosts.length
                                : blogPosts.filter(
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

                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
                      Popular Posts
                    </h3>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex gap-3">
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
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
