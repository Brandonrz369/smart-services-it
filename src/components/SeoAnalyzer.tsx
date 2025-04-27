"use client";

import React, { useState } from "react";
import { trackToolUsage } from "@/lib/analytics";
import {
  generateMockSeoAnalysis,
  type SeoCheck,
  type SeoResult,
} from "@/lib/mockSeoAnalysis"; // Import from new file

export default function SeoAnalyzer() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SeoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<
    "all" | "critical" | "important" | "good"
  >("all");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pass" | "fail" | "warning"
  >("all");

  const handleAnalyze = async () => {
    if (!url) return;

    // Validate URL
    let targetUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      targetUrl = "https://" + url;
    }

    try {
      new URL(targetUrl);
    } catch { // Removed unused 'e' variable
      setError("Please enter a valid URL");
      return;
    }

    // Reset states
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    // Track analysis start
    trackToolUsage("SeoAnalyzer", "analysis_start", { url: targetUrl });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate mock SEO analysis data
      const mockResult = generateMockSeoAnalysis(targetUrl);
      setResult(mockResult);

      // Track analysis completion
      trackToolUsage("SeoAnalyzer", "analysis_complete", {
        url: targetUrl,
        score: mockResult.score.overall,
        passedChecks: mockResult.checks.filter((c) => c.status === "pass")
          .length,
        failedChecks: mockResult.checks.filter((c) => c.status === "fail")
          .length,
      });
    } catch (err) {
      console.error("SEO analysis error:", err);
      setError("Failed to analyze the website. Please try again.");

      // Track error
      trackToolUsage("SeoAnalyzer", "analysis_error", {
        url: targetUrl,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Removed generateMockSeoAnalysis function (moved to src/lib/mockSeoAnalysis.ts)

  const getFilteredChecks = () => {
    if (!result) return [];

    return result.checks.filter((check) => {
      const matchesCategory =
        filterCategory === "all" || check.category === filterCategory;
      const matchesStatus =
        filterStatus === "all" || check.status === filterStatus;
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
    result.checks
      .filter(
        (check) =>
          check.category === "critical" &&
          (check.status === "fail" || check.status === "warning"),
      )
      .forEach((check) => {
        report += `### ${check.title}\n`;
        report += `Status: ${check.status === "fail" ? "❌ Failed" : "⚠️ Warning"}\n`;
        report += `${check.description}\n`;
        report += `**Details:** ${check.details}\n`;
        report += `**Recommendation:** ${check.recommendation}\n\n`;
      });

    report += `## Important Improvements\n\n`;
    result.checks
      .filter(
        (check) =>
          check.category === "important" &&
          (check.status === "fail" || check.status === "warning"),
      )
      .forEach((check) => {
        report += `### ${check.title}\n`;
        report += `Status: ${check.status === "fail" ? "❌ Failed" : "⚠️ Warning"}\n`;
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
    result.headings?.h1.forEach((h) => (report += `- ${h}\n`));
    report += `\n### H2 Headings\n`;
    result.headings?.h2.forEach((h) => (report += `- ${h}\n`));
    report += `\n### H3 Headings\n`;
    result.headings?.h3.forEach((h) => (report += `- ${h}\n`));

    report += `\n## Detected Keywords\n\n`;
    result.keywords?.forEach((k) => (report += `- ${k}\n`));

    report += `\n---\n`;
    report += `Generated by Smart Services IT SEO Analyzer Tool`;

    // Create blob and download
    const blob = new Blob([report], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const sanitizedUrlForFilename = result.url.replace(/[^\w.-]/g, "_");
    a.href = url;
    a.download = `seo-report-${sanitizedUrlForFilename}-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Track export
    trackToolUsage("SeoAnalyzer", "export_report", { url: result.url });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusIcon = (status: SeoCheck["status"]) => {
    switch (status) {
      case "pass":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "fail":
        return (
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "pending":
        return (
          <svg
            className="w-5 h-5 text-gray-400 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
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
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
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
              Analyzing website SEO factors... This typically takes 30-45
              seconds for a comprehensive analysis.
            </p>
          </div>
        )}
      </div>

      {result && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">
                SEO Analysis:{" "}
                <span className="text-blue-600">{result.url}</span>
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
                <p
                  className={`text-4xl font-bold ${getScoreColor(result.score.overall)}`}
                >
                  {result.score.overall}/100
                </p>
                <p className="text-sm text-gray-500">
                  {result.score.overall >= 80
                    ? "Excellent"
                    : result.score.overall >= 60
                      ? "Needs Improvement"
                      : "Poor"}
                </p>
              </div>
            </div>

            {/* Score bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  result.score.overall >= 80
                    ? "bg-green-500"
                    : result.score.overall >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${result.score.overall}%` }}
              ></div>
            </div>

            {/* Subcategory scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">
                  Performance
                </h5>
                <p
                  className={`text-xl font-bold ${getScoreColor(result.score.performance)}`}
                >
                  {result.score.performance}/100
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">
                  On-Page SEO
                </h5>
                <p
                  className={`text-xl font-bold ${getScoreColor(result.score.onPage)}`}
                >
                  {result.score.onPage}/100
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">
                  Technical SEO
                </h5>
                <p
                  className={`text-xl font-bold ${getScoreColor(result.score.technical)}`}
                >
                  {result.score.technical}/100
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">
                  Content Quality
                </h5>
                <p
                  className={`text-xl font-bold ${getScoreColor(result.score.content)}`}
                >
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
                  <h5 className="text-sm font-medium text-gray-500 mb-1">
                    Title Tag ({result.metaTags?.title?.length || 0} chars)
                  </h5>
                  <p className="text-sm bg-white p-2 rounded border border-gray-200">
                    {result.metaTags?.title || "Not found"}
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">
                    Meta Description (
                    {result.metaTags?.description?.length || 0} chars)
                  </h5>
                  <p className="text-sm bg-white p-2 rounded border border-gray-200">
                    {result.metaTags?.description || "Not found"}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm">
                <h5 className="font-medium text-gray-500 mb-1">
                  Detected Keywords
                </h5>
                <div className="flex flex-wrap gap-2">
                  {result.keywords?.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
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
              <h4 className="font-medium text-lg">
                SEO Checks & Recommendations
              </h4>

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
                <div
                  key={check.id}
                  className="border rounded-md overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center">
                      <div className="mr-3">{getStatusIcon(check.status)}</div>
                      <div>
                        <h5 className="font-medium flex items-center">
                          {check.title}
                          <span
                            className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              check.category === "critical"
                                ? "bg-red-100 text-red-800"
                                : check.category === "important"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {check.category}
                          </span>
                          <span className="ml-2 text-gray-400 text-xs">
                            Impact: {check.impact}/10
                          </span>
                        </h5>
                        <p className="text-sm text-gray-600">
                          {check.description}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                          check.status === "pass"
                            ? "bg-green-100 text-green-800"
                            : check.status === "warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : check.status === "fail"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {check.status.charAt(0).toUpperCase() +
                          check.status.slice(1)}
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
                  <p className="text-gray-500">
                    No checks match your current filters.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-md text-sm">
            <p className="font-medium mb-1">SEO Analysis Disclaimer:</p>
            <p>
              This analysis provides general SEO recommendations but does not
              replace a comprehensive SEO strategy. For best results, combine
              these insights with industry-specific knowledge and regular
              monitoring. This demo uses simulated results for educational
              purposes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
