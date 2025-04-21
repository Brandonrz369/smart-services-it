import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostData as getPostDataFromLib } from "@/lib/posts";

const postsDirectory = path.join(process.cwd(), "content/blog");

// Function to get all post slugs (filenames without .mdx)
function getAllPostIds() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map((fileName) => ({
        slug: fileName.replace(/\.mdx$/, ""),
      }));
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

// Function to get data for a single post by slug
async function getPostData(slug: string) {
    return getPostDataFromLib(slug);
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
   const paths = getAllPostIds();
   return paths;
}

// Define the type for the expected frontmatter structure
interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorBio?: string;
  imageUrl: string;
  relatedPosts?: string[];
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
 try {
    const postData = await getPostData(params.slug);
    const frontmatter = postData.frontmatter as PostFrontmatter;

    if (!frontmatter) {
        return { title: "Post Not Found" };
    }

    const baseKeywords = "LB Computer Help, Long Beach IT support, computer services Long Beach, tech blog";
    const categoryKeywords = {
        Security: "cybersecurity tips, small business security, data protection",
        Productivity: "Windows 11 tips, productivity hacks, tech efficiency",
        "Cloud Services": "cloud storage comparison, business cloud solutions, OneDrive",
        Networking: "network troubleshooting, fix wifi issues, home networking",
        "Mobile Devices": "smartphone tips, extend battery life, mobile tech help",
        MSP: "managed IT services benefits, MSP Long Beach, business IT outsourcing",
        AI: "artificial intelligence, AI for business, adapting to AI",
        Troubleshooting: "computer troubleshooting, slow computer fix, tech support tips",
        "Managed Services": "managed IT services, outsourced IT Long Beach, business IT support",
    };
    // @ts-ignore - Allow dynamic key access
    const specificKeywords = categoryKeywords[frontmatter.category] || frontmatter.category || "";

    return {
        title: `${frontmatter.title} | LB Computer Help Blog`,
        description: `${frontmatter.excerpt} - Read more on the LB Computer Help blog for Long Beach tech insights.`,
        keywords: `${baseKeywords}, ${specificKeywords}, ${frontmatter.title}`,
        openGraph: {
            title: `${frontmatter.title} | LB Computer Help Blog`,
            description: frontmatter.excerpt,
            url: `https://lbcomputerhelp.com/blog/${params.slug}`,
            images: [ { url: `https://lbcomputerhelp.com${frontmatter.imageUrl}`, width: 1200, height: 630, alt: frontmatter.title } ],
            type: 'article',
            publishedTime: new Date(frontmatter.date).toISOString(),
            authors: [frontmatter.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${frontmatter.title} | LB Computer Help Blog`,
            description: frontmatter.excerpt,
            images: [`https://lbcomputerhelp.com${frontmatter.imageUrl}`],
        },
    };
 } catch (error) {
    console.error(`Error generating metadata for ${params.slug}:`, error);
    return { title: "Post Not Found", description: "The blog post you are looking for could not be loaded." };
 }
}

// Helper Function to Get Related Posts Metadata
async function getRelatedPostsMetadata(relatedPostSlugs: string[] | undefined): Promise<(PostFrontmatter & { id: string })[]> {
    if (!relatedPostSlugs || relatedPostSlugs.length === 0) {
        return [];
    }
    const relatedPostsData = await Promise.all(
        relatedPostSlugs.map(async (slug) => {
            try {
                const postData = await getPostData(slug);
                 const metadata: PostFrontmatter & { id: string } = {
                    id: slug,
                    ...(postData.frontmatter as PostFrontmatter),
                    authorBio: (postData.frontmatter as PostFrontmatter).authorBio || '',
                };
                return metadata;
            } catch (error) {
                console.error(`Error fetching related post data for slug: ${slug}`, error);
                return null;
            }
        })
    );
    return relatedPostsData.filter((post): post is PostFrontmatter & { id: string } => post !== null);
}

// --- Main Page Component ---
export default async function BlogPostPage({ params }: { params: { slug: string } }) { // Removed explicit Promise<JSX.Element> return type for now
  let postData;
  let frontmatter: PostFrontmatter | null = null;
  let relatedPostsMetadata: (PostFrontmatter & { id: string })[] = [];
  let errorOccurred = false;

  try {
    postData = await getPostData(params.slug);
    frontmatter = postData.frontmatter as PostFrontmatter;
    if (frontmatter?.relatedPosts) {
       relatedPostsMetadata = await getRelatedPostsMetadata(frontmatter.relatedPosts);
    }
  } catch (error) {
    errorOccurred = true;
    console.error(`Error loading post ${params.slug}:`, error);
  }

  if (errorOccurred || !frontmatter || !postData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link href="/blog" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Section */}
      <div className="relative py-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <Link href="/blog" className="flex items-center text-blue-200 hover:text-white mb-6 transition">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">{frontmatter.title}</h1>
            <div className="flex items-center justify-center mb-4">
              <div className="inline-block bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">{frontmatter.category}</div>
              <span className="mx-2 text-blue-200">•</span>
              <span className="text-blue-100">{frontmatter.date}</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                {frontmatter.author.split(" ").map((name) => name[0]).join("")}
              </div>
              <div className="ml-3 text-left">
                <p className="font-medium text-white">{frontmatter.author}</p>
                <p className="text-sm text-blue-100">{frontmatter.authorRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Featured Image */}
            <div className="w-full h-64 md:h-96 rounded-lg mb-8 relative overflow-hidden shadow-lg">
              <Image
                src={frontmatter.imageUrl}
                alt={`Featured image for blog post: ${frontmatter.title}`}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-strong:font-semibold">
               {/* Use MDXRemote to render the content */}
               <MDXRemote source={postData.content} />
            </article>

            {/* Author Bio */}
            {frontmatter.authorBio && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-600 rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    {frontmatter.author.split(" ").map((name) => name[0]).join("")}
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-gray-900">About {frontmatter.author}</h3>
                    <p className="text-gray-600 mb-1 text-sm">{frontmatter.authorRole}</p>
                    <p className="text-gray-700">{frontmatter.authorBio}</p>
                    </div>
                </div>
                </div>
            )}

            {/* Share Buttons (Placeholder) */}
            <div className="mt-10 flex items-center">
              <span className="text-gray-700 mr-4 font-medium">Share this article:</span>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition" aria-label="Share on Facebook"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg></button>
                <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition" aria-label="Share on Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></button>
                <button className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition" aria-label="Share on LinkedIn"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPostsMetadata.length > 0 && (
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPostsMetadata.map((relatedPost) => (
                <div key={relatedPost.id}>
                  <Link href={`/blog/${relatedPost.id}`} className="block h-full group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      <div className="relative h-40 bg-gray-200 overflow-hidden">
                        <Image
                          src={relatedPost.imageUrl}
                          alt={`Related blog post image: ${relatedPost.title}`}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">{relatedPost.category}</span>
                        </div>
                      </div>
                      <div className="p-5 flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{relatedPost.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Professional IT Support in Long Beach?</h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            From everyday tech problems to managed IT services in Long Beach, our team of experts is here to help your business succeed. Contact LB Computer Help today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition duration-300">View Our Services</Link>
            <Link href="/#contact" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
