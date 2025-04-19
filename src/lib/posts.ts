import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostMetadata {
  id: string; // slug
  title: string;
  date: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  authorRole: string;
  // Add other frontmatter fields if needed
}

export function getSortedPostsData(): PostMetadata[] {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx')) // Ensure we only read .mdx files
    .map((fileName) => {
      // Remove ".mdx" from file name to get id (slug)
      const id = fileName.replace(/\.mdx$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      const postMetaData: PostMetadata = {
        id,
        title: matterResult.data.title || 'Untitled Post',
        date: matterResult.data.date || new Date().toISOString(),
        category: matterResult.data.category || 'Uncategorized',
        excerpt: matterResult.data.excerpt || '',
        imageUrl: matterResult.data.imageUrl || '/images/blog/placeholder.webp', // Add a default placeholder
        author: matterResult.data.author || 'Unknown Author',
        authorRole: matterResult.data.authorRole || '',
        // Ensure all required fields from PostMetadata are present
      };
      return postMetaData;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Function to get data for a single post (can be reused by [slug]/page.tsx if needed)
export async function getPostData(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found for slug: ${slug}`);
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      frontmatter: matterResult.data,
      content: matterResult.content,
    };
  }
