'use client';

import React, { useState } from 'react';
import { trackToolUsage } from '@/lib/analytics';

interface SeoCheck {
  id: string;
  category: 'critical' | 'important' | 'good';
  title: string;
  description: string;
  status: 'pass' | 'fail' | 'warning' | 'info' | 'pending';
  impact: number; // 1-10 scale
  details?: string;
  recommendation?: string;
}

interface SeoScore {
  overall: number; // 0-100
  performance: number;
  onPage: number;
  technical: number;
  content: number;
}

interface SeoResult {
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

export default function SeoAnalyzer() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SeoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'critical' | 'important' | 'good'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pass' | 'fail' | 'warning'>('all');

  const handleAnalyze = async () => {
    if (!url) return;
    
    // Validate URL
    let targetUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      targetUrl = 'https://' + url;
    }
    
    try {
      new URL(targetUrl);
    } catch (e) {
      setError('Please enter a valid URL');
      return;
    }
    
    // Reset states
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    
    // Track analysis start
    trackToolUsage('SeoAnalyzer', 'analysis_start', { url: targetUrl });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock SEO analysis data
      const mockResult = generateMockSeoAnalysis(targetUrl);
      setResult(mockResult);
      
      // Track analysis completion
      trackToolUsage('SeoAnalyzer', 'analysis_complete', { 
        url: targetUrl,
        score: mockResult.score.overall,
        passedChecks: mockResult.checks.filter(c => c.status === 'pass').length,
        failedChecks: mockResult.checks.filter(c => c.status === 'fail').length
      });
    } catch (err) {
      console.error('SEO analysis error:', err);
      setError('Failed to analyze the website. Please try again.');
      
      // Track error
      trackToolUsage('SeoAnalyzer', 'analysis_error', { 
        url: targetUrl,
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateMockSeoAnalysis = (url: string): SeoResult => {
    const domain = new URL(url).hostname;
    
    // Generate random scores
    const performanceScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const onPageScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const technicalScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const contentScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const overallScore = Math.floor((performanceScore + onPageScore + technicalScore + contentScore) / 4);
    
    // Mocked meta tags
    const metaTags = {
      title: `${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)} - Professional Services and Solutions`,
      description: `${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)} provides professional services for businesses and individuals. Contact us today for a consultation.`,
      robots: 'index, follow',
      canonical: url,
      ogTitle: `${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)} - Official Website`,
      ogDescription: `Learn more about ${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)} services and how we can help you achieve your goals.`,
      ogImage: `https://${domain}/images/og-image.jpg`
    };
    
    // Mocked headings
    const headings = {
      h1: ['Welcome to ' + domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)],
      h2: [
        'Our Services',
        'About Us',
        'Why Choose Us',
        'Contact Information'
      ],
      h3: [
        'Professional Solutions',
        'Expert Team',
        'Customer Testimonials',
        'Service Areas'
      ]
    };
    
    // Mocked keywords
    const keywords = [
      domain.split('.')[0],
      'services',
      'professional',
      'solutions',
      'business',
      'expert',
      'quality',
      'reliable'
    ];
    
    // Generate SEO checks
    const checks: SeoCheck[] = [
      {
        id: 'title-tag',
        category: 'critical',
        title: 'Meta Title',
        description: 'Title tag is present and within recommended length (50-60 characters)',
        status: metaTags.title.length > 20 && metaTags.title.length < 60 ? 'pass' : 'fail',
        impact: 9,
        details: `Current title: "${metaTags.title}" (${metaTags.title.length} characters)`,
        recommendation: metaTags.title.length > 60 
          ? 'Your title tag is too long. Reduce to under 60 characters to ensure it displays properly in search results.' 
          : metaTags.title.length < 20 
            ? 'Your title tag is too short. Aim for 50-60 characters to maximize visibility in search results.'
            : 'Title tag is well-optimized. Continue to monitor for changes in best practices.'
      },
      {
        id: 'meta-description',
        category: 'critical',
        title: 'Meta Description',
        description: 'Meta description is present and within recommended length (150-160 characters)',
        status: metaTags.description.length > 120 && metaTags.description.length < 160 ? 'pass' : 
               metaTags.description.length > 50 && metaTags.description.length <= 120 ? 'warning' : 'fail',
        impact: 8,
        details: `Current description: "${metaTags.description}" (${metaTags.description.length} characters)`,
        recommendation: metaTags.description.length > 160 
          ? 'Your meta description is too long. Reduce to under 160 characters to prevent truncation in search results.' 
          : metaTags.description.length < 50 
            ? 'Your meta description is too short. Aim for 150-160 characters to provide sufficient information to searchers.'
            : metaTags.description.length <= 120 && metaTags.description.length >= 50
              ? 'Your meta description is a bit short. Consider expanding it closer to 150-160 characters for maximum visibility.'
              : 'Meta description is well-optimized. Continue to include relevant keywords and compelling call-to-action.'
      },
      {
        id: 'h1-tag',
        category: 'critical',
        title: 'H1 Heading',
        description: 'Page has exactly one H1 tag that contains relevant keywords',
        status: headings.h1.length === 1 ? 'pass' : 'fail',
        impact: 8,
        details: headings.h1.length === 0 
          ? 'No H1 heading found on the page.' 
          : headings.h1.length > 1 
            ? `Multiple H1 headings found: ${headings.h1.join(', ')}` 
            : `H1 heading: "${headings.h1[0]}"`,
        recommendation: headings.h1.length === 0 
          ? 'Add a single H1 heading that includes your primary keyword and clearly describes the page content.' 
          : headings.h1.length > 1 
            ? 'Reduce to a single H1 heading. Use H2-H6 for section headings instead.' 
            : 'H1 is well-structured. Continue to ensure it contains your primary keyword and accurately represents page content.'
      },
      {
        id: 'img-alt',
        category: 'important',
        title: 'Image Alt Text',
        description: 'All images have descriptive alt text',
        status: Math.random() > 0.5 ? 'pass' : Math.random() > 0.5 ? 'warning' : 'fail',
        impact: 6,
        details: Math.random() > 0.5 
          ? 'All images have alt text.' 
          : Math.random() > 0.5 
            ? 'Some images are missing alt text.' 
            : 'Many or all images are missing alt text.',
        recommendation: 'Ensure all images have descriptive alt text that includes relevant keywords when appropriate. This improves accessibility and provides context for search engines.'
      },
      {
        id: 'ssl',
        category: 'critical',
        title: 'SSL Certificate',
        description: 'Website uses HTTPS encryption',
        status: url.startsWith('https://') ? 'pass' : 'fail',
        impact: 9,
        details: url.startsWith('https://') 
          ? 'Website is properly secured with HTTPS.' 
          : 'Website is not secured with HTTPS.',
        recommendation: url.startsWith('https://') 
          ? 'Continue to maintain valid SSL certification and ensure all resources load securely.' 
          : 'Implement HTTPS across your entire website immediately. This is crucial for security and search rankings.'
      },
      {
        id: 'mobile-friendly',
        category: 'critical',
        title: 'Mobile Friendliness',
        description: 'Website displays and functions properly on mobile devices',
        status: Math.random() > 0.7 ? 'pass' : Math.random() > 0.5 ? 'warning' : 'fail',
        impact: 10,
        details: Math.random() > 0.7 
          ? 'Website is fully responsive and displays well on mobile devices.' 
          : Math.random() > 0.5 
            ? 'Website has some mobile usability issues that should be addressed.' 
            : 'Website has significant mobile usability problems.',
        recommendation: 'Ensure your website is fully responsive, with readable text, adequate tap targets, and no horizontal scrolling required on mobile devices.'
      },
      {
        id: 'page-speed',
        category: 'important',
        title: 'Page Speed',
        description: 'Page loads quickly on both mobile and desktop',
        status: performanceScore > 85 ? 'pass' : performanceScore > 70 ? 'warning' : 'fail',
        impact: 9,
        details: `Current estimated page speed score: ${performanceScore}/100`,
        recommendation: performanceScore > 85 
          ? 'Continue to monitor and optimize page speed. Consider implementing lazy loading for images and reducing unnecessary scripts.' 
          : performanceScore > 70 
            ? 'Improve page speed by optimizing images, enabling compression, leveraging browser caching, and minimizing render-blocking resources.' 
            : 'Page speed requires immediate attention. Optimize images, enable compression, leverage browser caching, minimize CSS/JS, and consider AMP or server-side improvements.'
      },
      {
        id: 'keyword-usage',
        category: 'important',
        title: 'Keyword Usage',
        description: 'Primary keywords appear in important HTML elements',
        status: Math.random() > 0.5 ? 'pass' : 'warning',
        impact: 7,
        details: 'Analysis of keyword placement in title, meta description, headings, and content.',
        recommendation: 'Ensure your primary keywords appear naturally in the title tag, meta description, H1, early in the content, and several times throughout the page. Avoid keyword stuffing.'
      },
      {
        id: 'internal-links',
        category: 'important',
        title: 'Internal Linking',
        description: 'Page has sufficient internal links with descriptive anchor text',
        status: Math.random() > 0.6 ? 'pass' : 'warning',
        impact: 6,
        details: Math.random() > 0.6 
          ? 'Good distribution of internal links with descriptive anchor text.' 
          : 'Some improvement needed in internal linking structure.',
        recommendation: 'Create a logical internal linking structure that guides users to related content and helps search engines understand your site hierarchy. Use descriptive anchor text that includes target keywords.'
      },
      {
        id: 'content-quality',
        category: 'critical',
        title: 'Content Quality',
        description: 'Content is comprehensive, unique, and valuable to users',
        status: contentScore > 85 ? 'pass' : contentScore > 70 ? 'warning' : 'fail',
        impact: 10,
        details: `Content quality assessment score: ${contentScore}/100`,
        recommendation: contentScore > 85 
          ? 'Continue to produce high-quality, comprehensive content that addresses user intent. Consider expanding with related topics.' 
          : contentScore > 70 
            ? 'Enhance content depth and breadth. Address user questions more comprehensively and include supporting facts, statistics, and examples.' 
            : 'Significant content improvement needed. Create in-depth, valuable content that thoroughly covers the topic and provides unique insights.'
      },
      {
        id: 'social-tags',
        category: 'good',
        title: 'Social Meta Tags',
        description: 'OpenGraph and Twitter Card tags are properly implemented',
        status: metaTags.ogTitle && metaTags.ogDescription && metaTags.ogImage ? 'pass' : 'warning',
        impact: 5,
        details: metaTags.ogTitle && metaTags.ogDescription && metaTags.ogImage 
          ? 'OpenGraph tags found and properly configured.' 
          : 'Some or all OpenGraph tags are missing.',
        recommendation: 'Implement complete OpenGraph and Twitter Card tags for better social media sharing. Include title, description, image, and URL tags.'
      },
      {
        id: 'structured-data',
        category: 'good',
        title: 'Structured Data',
        description: 'Appropriate schema markup is implemented',
        status: Math.random() > 0.5 ? 'pass' : 'warning',
        impact: 6,
        details: Math.random() > 0.5 
          ? 'Schema markup detected for organization and page type.' 
          : 'Limited or no schema markup detected.',
        recommendation: 'Implement relevant schema markup for your content type (e.g., Article, Product, FAQ, How-to, Local Business). This helps search engines understand your content and may enable rich results.'
      },
      {
        id: 'canonical-tag',
        category: 'important',
        title: 'Canonical Tag',
        description: 'Canonical tag is properly implemented',
        status: metaTags.canonical ? 'pass' : 'fail',
        impact: 7,
        details: metaTags.canonical 
          ? `Canonical tag points to: ${metaTags.canonical}` 
          : 'No canonical tag found.',
        recommendation: metaTags.canonical 
          ? 'Canonical tag is properly implemented. Continue to use canonical tags to prevent duplicate content issues.' 
          : 'Implement canonical tags to identify the preferred version of pages with similar or duplicate content.'
      },
      {
        id: 'url-structure',
        category: 'important',
        title: 'URL Structure',
        description: 'URL is clean, descriptive, and includes keywords',
        status: url.length < 75 && !url.includes('?') ? 'pass' : 'warning',
        impact: 6,
        details: `Current URL: ${url}`,
        recommendation: 'Use clean, descriptive URLs that include relevant keywords. Avoid parameters, special characters, and unnecessary depth. Keep URLs concise and logical.'
      }
    ];
    
    return {
      url,
      scanTime: new Date(),
      score: {
        overall: overallScore,
        performance: performanceScore,
        onPage: onPageScore,
        technical: technicalScore,
        content: contentScore
      },
      checks,
      keywords,
      metaTags,
      headings
    };
  };

  const getFilteredChecks = () => {
    if (!result) return [];
    
    return result.checks.filter(check => {
      const matchesCategory = filterCategory === 'all' || check.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || check.status === filterStatus;
      return matchesCategory && matchesStatus;
    });
  };

  const exportReport = () => {
    if (!result) return;
    
    // Create markdown report
    let report = `# SEO Analysis Report for ${result.url}\n`;
    report += `Generated on ${result.scanTime.toLocaleString()}\n\n`;
    
    report += `## Overall Score: ${result.score.overall}/100\n\n`;
    report += `- Performance: ${result.score.performance}/100\n`;
    report += `- On-Page SEO: ${result.score.onPage}/100\n`;
    report += `- Technical SEO: ${result.score.technical}/100\n`;
    report += `- Content Quality: ${result.score.content}/100\n\n`;
    
    report += `## Critical Issues\n\n`;
    result.checks.filter(check => check.category === 'critical' && (check.status === 'fail' || check.status === 'warning'))
      .forEach(check => {
        report += `### ${check.title}\n`;
        report += `Status: ${check.status === 'fail' ? '❌ Failed' : '⚠️ Warning'}\n`;
        report += `${check.description}\n`;
        report += `**Details:** ${check.details}\n`;
        report += `**Recommendation:** ${check.recommendation}\n\n`;
      });
    
    report += `## Important Improvements\n\n`;
    result.checks.filter(check => check.category === 'important' && (check.status === 'fail' || check.status === 'warning'))
      .forEach(check => {
        report += `### ${check.title}\n`;
        report += `Status: ${check.status === 'fail' ? '❌ Failed' : '⚠️ Warning'}\n`;
        report += `${check.description}\n`;
        report += `**Details:** ${check.details}\n`;
        report += `**Recommendation:** ${check.recommendation}\n\n`;
      });
    
    report += `## Meta Tags\n\n`;
    report += `- **Title:** ${result.metaTags?.title}\n`;
    report += `- **Description:** ${result.metaTags?.description}\n`;
    report += `- **Robots:** ${result.metaTags?.robots}\n`;
    report += `- **Canonical:** ${result.metaTags?.canonical}\n\n`;
    
    report += `## Heading Structure\n\n`;
    report += `### H1 Headings\n`;
    result.headings?.h1.forEach(h => report += `- ${h}\n`);
    report += `\n### H2 Headings\n`;
    result.headings?.h2.forEach(h => report += `- ${h}\n`);
    report += `\n### H3 Headings\n`;
    result.headings?.h3.forEach(h => report += `- ${h}\n`);
    
    report += `\n## Detected Keywords\n\n`;
    result.keywords?.forEach(k => report += `- ${k}\n`);
    
    report += `\n---\n`;
    report += `Generated by LB Computer Help SEO Analyzer Tool`;
    
    // Create blob and download
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const sanitizedUrlForFilename = result.url.replace(/[^\w.-]/g, '_');
    a.href = url;
    a.download = `seo-report-${sanitizedUrlForFilename}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Track export
    trackToolUsage('SeoAnalyzer', 'export_report', { url: result.url });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: SeoCheck['status']) => {
    switch(status) {
      case 'pass':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'fail':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">AI-Powered SEO Analyzer</h2>
        
        <div className="flex mb-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., example.com or https://example.com)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isAnalyzing}
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !url}
            className={`px-4 py-2 rounded-r-md text-white font-medium ${
              isAnalyzing || !url
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-center max-w-md">
              Analyzing website SEO factors... This typically takes 30-45 seconds for a comprehensive analysis.
            </p>
          </div>
        )}
      </div>
      
      {result && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">
                SEO Analysis: <span className="text-blue-600">{result.url}</span>
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Analyzed on {result.scanTime.toLocaleString()}
              </p>
            </div>
            
            <button
              onClick={exportReport}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              Export Report
            </button>
          </div>
          
          {/* Overall Score */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-medium text-lg">Overall SEO Score</h4>
                <p className="text-gray-600 text-sm mb-4 md:mb-0">
                  Based on performance, content, technical, and on-page factors
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className={`text-4xl font-bold ${getScoreColor(result.score.overall)}`}>
                  {result.score.overall}/100
                </p>
                <p className="text-sm text-gray-500">
                  {result.score.overall >= 80 
                    ? 'Excellent' 
                    : result.score.overall >= 60 
                      ? 'Needs Improvement' 
                      : 'Poor'}
                </p>
              </div>
            </div>
            
            {/* Score bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  result.score.overall >= 80 
                    ? 'bg-green-500' 
                    : result.score.overall >= 60 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                }`}
                style={{ width: `${result.score.overall}%` }}
              ></div>
            </div>
            
            {/* Subcategory scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">Performance</h5>
                <p className={`text-xl font-bold ${getScoreColor(result.score.performance)}`}>
                  {result.score.performance}/100
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">On-Page SEO</h5>
                <p className={`text-xl font-bold ${getScoreColor(result.score.onPage)}`}>
                  {result.score.onPage}/100
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">Technical SEO</h5>
                <p className={`text-xl font-bold ${getScoreColor(result.score.technical)}`}>
                  {result.score.technical}/100
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">Content Quality</h5>
                <p className={`text-xl font-bold ${getScoreColor(result.score.content)}`}>
                  {result.score.content}/100
                </p>
              </div>
            </div>
          </div>
          
          {/* Meta Tags Summary */}
          <div className="mb-6">
            <h4 className="font-medium text-lg mb-3">Meta Tag Information</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Title Tag ({result.metaTags?.title?.length || 0} chars)</h5>
                  <p className="text-sm bg-white p-2 rounded border border-gray-200">
                    {result.metaTags?.title || 'Not found'}
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Meta Description ({result.metaTags?.description?.length || 0} chars)</h5>
                  <p className="text-sm bg-white p-2 rounded border border-gray-200">
                    {result.metaTags?.description || 'Not found'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-sm">
                <h5 className="font-medium text-gray-500 mb-1">Detected Keywords</h5>
                <div className="flex flex-wrap gap-2">
                  {result.keywords?.map((keyword, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Findings & Recommendations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-lg">SEO Checks & Recommendations</h4>
              
              <div className="flex space-x-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="all">All categories</option>
                  <option value="critical">Critical</option>
                  <option value="important">Important</option>
                  <option value="good">Good practice</option>
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="all">All status</option>
                  <option value="pass">Passes</option>
                  <option value="warning">Warnings</option>
                  <option value="fail">Failures</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {getFilteredChecks().map((check) => (
                <div key={check.id} className="border rounded-md overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {getStatusIcon(check.status)}
                      </div>
                      <div>
                        <h5 className="font-medium flex items-center">
                          {check.title}
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                            check.category === 'critical' 
                              ? 'bg-red-100 text-red-800' 
                              : check.category === 'important' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {check.category}
                          </span>
                          <span className="ml-2 text-gray-400 text-xs">Impact: {check.impact}/10</span>
                        </h5>
                        <p className="text-sm text-gray-600">{check.description}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                        check.status === 'pass' 
                          ? 'bg-green-100 text-green-800' 
                          : check.status === 'warning' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : check.status === 'fail' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                      }`}>
                        {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t">
                    {check.details && (
                      <div className="mb-3">
                        <span className="font-medium">Details: </span>
                        <span className="text-gray-700">{check.details}</span>
                      </div>
                    )}
                    {check.recommendation && (
                      <div className="bg-blue-50 text-blue-800 p-3 rounded-md">
                        <span className="font-medium">Recommendation: </span>
                        <span>{check.recommendation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {getFilteredChecks().length === 0 && (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No checks match your current filters.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-md text-sm">
            <p className="font-medium mb-1">SEO Analysis Disclaimer:</p>
            <p>
              This analysis provides general SEO recommendations but does not replace a comprehensive SEO strategy.
              For best results, combine these insights with industry-specific knowledge and regular monitoring.
              This demo uses simulated results for educational purposes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}