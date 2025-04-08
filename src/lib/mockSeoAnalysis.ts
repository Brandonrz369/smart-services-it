// Interfaces for SEO Analysis Data
export interface SeoCheck {
  id: string;
  category: "critical" | "important" | "good";
  title: string;
  description: string;
  status: "pass" | "fail" | "warning" | "info" | "pending";
  impact: number; // 1-10 scale
  details?: string;
  recommendation?: string;
}

export interface SeoScore {
  overall: number; // 0-100
  performance: number;
  onPage: number;
  technical: number;
  content: number;
}

export interface SeoResult {
  url: string;
  scanTime: Date;
  score: SeoScore;
  checks: SeoCheck[];
  keywords?: string[];
  metaTags?: {
    title?: string;
    description?: string;
    robots?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
  headings?: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
}

// Function to generate mock SEO analysis data
export const generateMockSeoAnalysis = (url: string): SeoResult => {
  const domain = new URL(url).hostname;

  // Generate random scores
  const performanceScore = Math.floor(Math.random() * 40) + 60; // 60-100
  const onPageScore = Math.floor(Math.random() * 40) + 60; // 60-100
  const technicalScore = Math.floor(Math.random() * 40) + 60; // 60-100
  const contentScore = Math.floor(Math.random() * 40) + 60; // 60-100
  const overallScore = Math.floor(
    (performanceScore + onPageScore + technicalScore + contentScore) / 4,
  );

  // Mocked meta tags
  const metaTags = {
    title: `${domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1)} - Professional Services and Solutions`,
    description: `${domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1)} provides professional services for businesses and individuals. Contact us today for a consultation.`,
    robots: "index, follow",
    canonical: url,
    ogTitle: `${domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1)} - Official Website`,
    ogDescription: `Learn more about ${domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1)} services and how we can help you achieve your goals.`,
    ogImage: `https://${domain}/images/og-image.jpg`,
  };

  // Mocked headings
  const headings = {
    h1: [
      "Welcome to " +
        domain.split(".")[0].charAt(0).toUpperCase() +
        domain.split(".")[0].slice(1),
    ],
    h2: ["Our Services", "About Us", "Why Choose Us", "Contact Information"],
    h3: [
      "Professional Solutions",
      "Expert Team",
      "Customer Testimonials",
      "Service Areas",
    ],
  };

  // Mocked keywords
  const keywords = [
    domain.split(".")[0],
    "services",
    "professional",
    "solutions",
    "business",
    "expert",
    "quality",
    "reliable",
  ];

  // Generate SEO checks
  const checks: SeoCheck[] = [
    {
      id: "title-tag",
      category: "critical",
      title: "Meta Title",
      description:
        "Title tag is present and within recommended length (50-60 characters)",
      status:
        metaTags.title.length > 20 && metaTags.title.length < 60
          ? "pass"
          : "fail",
      impact: 9,
      details: `Current title: "${metaTags.title}" (${metaTags.title.length} characters)`,
      recommendation:
        metaTags.title.length > 60
          ? "Your title tag is too long. Reduce to under 60 characters to ensure it displays properly in search results."
          : metaTags.title.length < 20
            ? "Your title tag is too short. Aim for 50-60 characters to maximize visibility in search results."
            : "Title tag is well-optimized. Continue to monitor for changes in best practices.",
    },
    {
      id: "meta-description",
      category: "critical",
      title: "Meta Description",
      description:
        "Meta description is present and within recommended length (150-160 characters)",
      status:
        metaTags.description.length > 120 && metaTags.description.length < 160
          ? "pass"
          : metaTags.description.length > 50 &&
              metaTags.description.length <= 120
            ? "warning"
            : "fail",
      impact: 8,
      details: `Current description: "${metaTags.description}" (${metaTags.description.length} characters)`,
      recommendation:
        metaTags.description.length > 160
          ? "Your meta description is too long. Reduce to under 160 characters to prevent truncation in search results."
          : metaTags.description.length < 50
            ? "Your meta description is too short. Aim for 150-160 characters to provide sufficient information to searchers."
            : metaTags.description.length <= 120 &&
                metaTags.description.length >= 50
              ? "Your meta description is a bit short. Consider expanding it closer to 150-160 characters for maximum visibility."
              : "Meta description is well-optimized. Continue to include relevant keywords and compelling call-to-action.",
    },
    {
      id: "h1-tag",
      category: "critical",
      title: "H1 Heading",
      description:
        "Page has exactly one H1 tag that contains relevant keywords",
      status: headings.h1.length === 1 ? "pass" : "fail",
      impact: 8,
      details:
        headings.h1.length === 0
          ? "No H1 heading found on the page."
          : headings.h1.length > 1
            ? `Multiple H1 headings found: ${headings.h1.join(", ")}`
            : `H1 heading: "${headings.h1[0]}"`,
      recommendation:
        headings.h1.length === 0
          ? "Add a single H1 heading that includes your primary keyword and clearly describes the page content."
          : headings.h1.length > 1
            ? "Reduce to a single H1 heading. Use H2-H6 for section headings instead."
            : "H1 is well-structured. Continue to ensure it contains your primary keyword and accurately represents page content.",
    },
    {
      id: "img-alt",
      category: "important",
      title: "Image Alt Text",
      description: "All images have descriptive alt text",
      status:
        Math.random() > 0.5
          ? "pass"
          : Math.random() > 0.5
            ? "warning"
            : "fail",
      impact: 6,
      details:
        Math.random() > 0.5
          ? "All images have alt text."
          : Math.random() > 0.5
            ? "Some images are missing alt text."
            : "Many or all images are missing alt text.",
      recommendation:
        "Ensure all images have descriptive alt text that includes relevant keywords when appropriate. This improves accessibility and provides context for search engines.",
    },
    {
      id: "ssl",
      category: "critical",
      title: "SSL Certificate",
      description: "Website uses HTTPS encryption",
      status: url.startsWith("https://") ? "pass" : "fail",
      impact: 9,
      details: url.startsWith("https://")
        ? "Website is properly secured with HTTPS."
        : "Website is not secured with HTTPS.",
      recommendation: url.startsWith("https://")
        ? "Continue to maintain valid SSL certification and ensure all resources load securely."
        : "Implement HTTPS across your entire website immediately. This is crucial for security and search rankings.",
    },
    {
      id: "mobile-friendly",
      category: "critical",
      title: "Mobile Friendliness",
      description:
        "Website displays and functions properly on mobile devices",
      status:
        Math.random() > 0.7
          ? "pass"
          : Math.random() > 0.5
            ? "warning"
            : "fail",
      impact: 10,
      details:
        Math.random() > 0.7
          ? "Website is fully responsive and displays well on mobile devices."
          : Math.random() > 0.5
            ? "Website has some mobile usability issues that should be addressed."
            : "Website has significant mobile usability problems.",
      recommendation:
        "Ensure your website is fully responsive, with readable text, adequate tap targets, and no horizontal scrolling required on mobile devices.",
    },
    {
      id: "page-speed",
      category: "important",
      title: "Page Speed",
      description: "Page loads quickly on both mobile and desktop",
      status:
        performanceScore > 85
          ? "pass"
          : performanceScore > 70
            ? "warning"
            : "fail",
      impact: 9,
      details: `Current estimated page speed score: ${performanceScore}/100`,
      recommendation:
        performanceScore > 85
          ? "Continue to monitor and optimize page speed. Consider implementing lazy loading for images and reducing unnecessary scripts."
          : performanceScore > 70
            ? "Improve page speed by optimizing images, enabling compression, leveraging browser caching, and minimizing render-blocking resources."
            : "Page speed requires immediate attention. Optimize images, enable compression, leverage browser caching, minimize CSS/JS, and consider AMP or server-side improvements.",
    },
    {
      id: "keyword-usage",
      category: "important",
      title: "Keyword Usage",
      description: "Primary keywords appear in important HTML elements",
      status: Math.random() > 0.5 ? "pass" : "warning",
      impact: 7,
      details:
        "Analysis of keyword placement in title, meta description, headings, and content.",
      recommendation:
        "Ensure your primary keywords appear naturally in the title tag, meta description, H1, early in the content, and several times throughout the page. Avoid keyword stuffing.",
    },
    {
      id: "internal-links",
      category: "important",
      title: "Internal Linking",
      description:
        "Page has sufficient internal links with descriptive anchor text",
      status: Math.random() > 0.6 ? "pass" : "warning",
      impact: 6,
      details:
        Math.random() > 0.6
          ? "Good distribution of internal links with descriptive anchor text."
          : "Some improvement needed in internal linking structure.",
      recommendation:
        "Create a logical internal linking structure that guides users to related content and helps search engines understand your site hierarchy. Use descriptive anchor text that includes target keywords.",
    },
    {
      id: "content-quality",
      category: "critical",
      title: "Content Quality",
      description: "Content is comprehensive, unique, and valuable to users",
      status:
        contentScore > 85 ? "pass" : contentScore > 70 ? "warning" : "fail",
      impact: 10,
      details: `Content quality assessment score: ${contentScore}/100`,
      recommendation:
        contentScore > 85
          ? "Continue to produce high-quality, comprehensive content that addresses user intent. Consider expanding with related topics."
          : contentScore > 70
            ? "Enhance content depth and breadth. Address user questions more comprehensively and include supporting facts, statistics, and examples."
            : "Significant content improvement needed. Create in-depth, valuable content that thoroughly covers the topic and provides unique insights.",
    },
    {
      id: "social-tags",
      category: "good",
      title: "Social Meta Tags",
      description: "OpenGraph and Twitter Card tags are properly implemented",
      status:
        metaTags.ogTitle && metaTags.ogDescription && metaTags.ogImage
          ? "pass"
          : "warning",
      impact: 5,
      details:
        metaTags.ogTitle && metaTags.ogDescription && metaTags.ogImage
          ? "OpenGraph tags found and properly configured."
          : "Some or all OpenGraph tags are missing.",
      recommendation:
        "Implement complete OpenGraph and Twitter Card tags for better social media sharing. Include title, description, image, and URL tags.",
    },
    {
      id: "structured-data",
      category: "good",
      title: "Structured Data",
      description: "Appropriate schema markup is implemented",
      status: Math.random() > 0.5 ? "pass" : "warning",
      impact: 6,
      details:
        Math.random() > 0.5
          ? "Schema markup detected for organization and page type."
          : "Limited or no schema markup detected.",
      recommendation:
        "Implement relevant schema markup for your content type (e.g., Article, Product, FAQ, How-to, Local Business). This helps search engines understand your content and may enable rich results.",
    },
    {
      id: "canonical-tag",
      category: "important",
      title: "Canonical Tag",
      description: "Canonical tag is properly implemented",
      status: metaTags.canonical ? "pass" : "fail",
      impact: 7,
      details: metaTags.canonical
        ? `Canonical tag points to: ${metaTags.canonical}`
        : "No canonical tag found.",
      recommendation: metaTags.canonical
        ? "Canonical tag is properly implemented. Continue to use canonical tags to prevent duplicate content issues."
        : "Implement canonical tags to identify the preferred version of pages with similar or duplicate content.",
    },
    {
      id: "url-structure",
      category: "important",
      title: "URL Structure",
      description: "URL is clean, descriptive, and includes keywords",
      status: url.length < 75 && !url.includes("?") ? "pass" : "warning",
      impact: 6,
      details: `Current URL: ${url}`,
      recommendation:
        "Use clean, descriptive URLs that include relevant keywords. Avoid parameters, special characters, and unnecessary depth. Keep URLs concise and logical.",
    },
  ];

  return {
    url,
    scanTime: new Date(),
    score: {
      overall: overallScore,
      performance: performanceScore,
      onPage: onPageScore,
      technical: technicalScore,
      content: contentScore,
    },
    checks,
    keywords,
    metaTags,
    headings,
  };
};
