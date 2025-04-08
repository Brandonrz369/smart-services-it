"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SeoAnalyzer from "@/components/SeoAnalyzer";
import FormDebugger from "@/components/FormDebugger";
import FormLogger from "@/components/FormLogger";
import SecurityScanner from "@/components/SecurityScanner";

export default function AdminWebTools() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "seo" | "security" | "network" | "utilities" | "forms"
  >("seo");
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("adminAuthenticated") === "true";
    const authTime = Number(localStorage.getItem("adminAuthTime") || "0");
    const timeNow = Date.now();

    // If not authenticated or session expired (more than 1 hour), redirect to login
    if (!isAuthenticated || timeNow - authTime > 3600000) {
      localStorage.removeItem("adminAuthenticated");
      localStorage.removeItem("adminAuthTime");
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminAuthTime");
    router.push("/admin/login");
  };

  // Check URL parameters for direct tool access
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tool = params.get("tool");

      if (tool) {
        switch (tool) {
          case "seo":
            setActiveTab("seo");
            break;
          case "security":
            setActiveTab("security");
            break;
          case "network":
            setActiveTab("network");
            break;
          case "utilities":
            setActiveTab("utilities");
            break;
        }
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Web Tools</h1>
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
            <Link
              href="/admin/forms"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Forms Dashboard
            </Link>
            <Link
              href="/admin/analytics"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Analytics
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Advanced diagnostic and optimization tools for website management
        </p>
      </header>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("seo")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "seo"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            SEO Tools
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "security"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Security Scanner
          </button>
          <button
            onClick={() => setActiveTab("network")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "network"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Network Diagnostics
          </button>
          <button
            onClick={() => setActiveTab("utilities")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "utilities"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Utilities
          </button>
          <button
            onClick={() => setActiveTab("forms")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "forms"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Form Testing
          </button>
        </nav>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <Link
          href="/web-tools"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Public Web Tools
        </Link>

        <Link
          href={`/web-tools?tool=${activeTab}`}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
        >
          Open Current Tool in Public View
        </Link>
      </div>

      {/* SEO Tools Tab */}
      {activeTab === "seo" && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">SEO Analyzer</h2>
            <p className="text-gray-600">
              Comprehensive SEO analysis tool to identify optimization
              opportunities and improve search rankings.
            </p>
          </div>

          <SeoAnalyzer />
        </div>
      )}

      {/* Security Scanner Tab */}
      {activeTab === "security" && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Security Scanner</h2>
            <p className="text-gray-600">
              Scan for common security vulnerabilities and receive
              recommendations for hardening your website security.
            </p>
          </div>

          <SecurityScanner />
        </div>
      )}

      {/* Network Diagnostics Tab */}
      {activeTab === "network" && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Network Diagnostics</h2>
            <p className="text-gray-600">
              Advanced network troubleshooting tools for diagnosing connectivity
              issues and optimizing performance.
            </p>
          </div>

          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
            <p className="mb-2 font-medium">Network Diagnostics Coming Soon</p>
            <p>
              This feature is currently under development and will be available
              in the next update.
            </p>
          </div>
        </div>
      )}

      {/* Utilities Tab */}
      {activeTab === "utilities" && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Web Utilities</h2>
            <p className="text-gray-600">
              Collection of useful utilities for website administrators,
              including image optimization, code validation, and more.
            </p>
          </div>

          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
            <p className="mb-2 font-medium">Web Utilities Coming Soon</p>
            <p>
              This feature is currently under development and will be available
              in the next update.
            </p>
          </div>
        </div>
      )}

      {/* Form Testing Tab */}
      {activeTab === "forms" && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Form Testing Tools</h2>
            <p className="text-gray-600">
              Advanced tools for testing, debugging, and monitoring form
              submissions.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-medium mb-4">Form Debugger</h3>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 mb-2">
                Use this debugger to test FormSpree configurations with
                different submission methods and custom fields. Get detailed
                logs to diagnose issues with your forms.
              </p>
            </div>
            <FormDebugger />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Form Submission Logs</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 mb-2">
                View and analyze form submission logs from across the website.
                This helps track submission patterns and troubleshoot issues.
              </p>
            </div>
            <FormLogger />
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Quick Access</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm">
              Access specific tools directly with these links:
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/web-tools?tab=debug"
                  className="text-blue-600 hover:underline"
                >
                  Form Debugger
                </Link>
              </li>
              <li>
                <Link
                  href="/web-tools?tab=logs"
                  className="text-blue-600 hover:underline"
                >
                  Form Submission Logs
                </Link>
              </li>
              <li>
                <Link
                  href="/web-tools?tab=network"
                  className="text-blue-600 hover:underline"
                >
                  Network Diagnostic Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/web-tools?tab=domain"
                  className="text-blue-600 hover:underline"
                >
                  Domain & DNS Lookup
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Admin Resources</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm">Additional resources and documentation:</p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/forms"
                  className="text-blue-600 hover:underline"
                >
                  Form Submission Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="https://developers.google.com/search/docs"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google SEO Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://search.google.com/search-console"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Search Console
                </a>
              </li>
              <li>
                <a
                  href="https://www.ssllabs.com/ssltest/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SSL Server Test
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
