// This is now a Server Component by default (no "use client")
import Link from "next/link"; // Keep Link if needed for static parts
import BlogListClient from "@/components/BlogListClient"; // Import the Client Component
import { getSortedPostsData } from "@/lib/posts"; // Import the server-side data fetching function

export default function BlogPage() {
  // Fetch data server-side
  const allPosts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Banner (can remain server-rendered) */}
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

      {/* Render the Client Component, passing fetched data as props */}
      <BlogListClient allPosts={allPosts} />

      {/* Newsletter Section (can remain server-rendered) */}
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
