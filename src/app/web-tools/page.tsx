"use client";

import React, { useState, useEffect } from "react";
import SimpleContactForm from "@/components/SimpleContactForm";
import FormDebugger from "@/components/FormDebugger";
import FormLogger from "@/components/FormLogger";
import SpeedTest from "@/components/SpeedTest";
import NetworkTools from "@/components/NetworkTools";
import ColorGenerator from "@/components/ColorGenerator";
import PasswordGenerator from "@/components/PasswordGenerator";
import DomainLookup from "@/components/DomainLookup";
import ImageCompressor from "@/components/ImageCompressor";
import SeoAnalyzer from "@/components/SeoAnalyzer";
import TechTermExplainer from "@/components/TechTermExplainer"; // Import the new component

export default function WebTools() {
  const [activeTab, setActiveTab] = useState<
    | "simple"
    | "debug"
    | "logs"
    | "speed"
    | "network"
    | "color"
    | "password"
    | "domain"
    | "image"
    | "seo"
    | "explain" // Add new tab state
  >("simple");

  // Check URL parameters for direct tool navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      const tool = params.get("tool");

      if (tab) {
        switch (tab) {
          case "simple":
          case "debug":
          case "logs":
          case "speed":
          case "network":
          case "color":
          case "password":
          case "domain":
          case "image":
          case "seo":
            setActiveTab(tab);
            break;
        }
      } else if (tool) {
        // Handle admin tool redirects
        switch (tool) {
          case "seo":
            setActiveTab("seo");
            break;
          case "network":
            setActiveTab("network");
            break;
          case "utilities":
            setActiveTab("color"); // Default to color generator for utilities
            break;
        }
      }
    }
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-center">Web Tools & Testing</h1>
        <div className="mt-4 flex gap-4">
          <a
            href="/admin/login"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Admin Login
          </a>
          <a
            href="/admin/web-tools"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Advanced Tools
          </a>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap border-b border-gray-200">
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "simple"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("simple")}
            data-tool="simple"
          >
            Form Test
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "debug"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("debug")}
            data-tool="debug"
          >
            Form Debug
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "logs"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("logs")}
            data-tool="logs"
          >
            Form Logs
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "speed"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("speed")}
            data-tool="speed"
          >
            Speed Test
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "network"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("network")}
            data-tool="network"
          >
            Network
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "seo"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("seo")}
            data-tool="seo"
          >
            SEO
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "color"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("color")}
            data-tool="color"
          >
            Colors
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "password"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("password")}
            data-tool="password"
          >
            Password
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "domain"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("domain")}
            data-tool="domain"
          >
            Domain
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "image"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("image")}
            data-tool="image"
          >
            Images
          </button>
          {/* New Explain Term Tab Button */}
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === "explain"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("explain")}
            data-tool="explain"
          >
            Explain Term
          </button>
        </div>
      </div>

      {/* Simple Form Tab */}
      {activeTab === "simple" && (
        <div className="max-w-md mx-auto">
          <div className="mb-8 bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Form Submission Test</h2>
            <p className="text-gray-600 mb-4">
              This page contains a simple contact form that submits to FormSpree
              for testing purposes.
            </p>
          </div>

          <SimpleContactForm />
        </div>
      )}

      {/* Debug Form Tab */}
      {activeTab === "debug" && (
        <div>
          <div className="mb-8 bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">FormSpree Debugger</h2>
            <p className="text-gray-600 mb-4">
              Use this tool to test your FormSpree configuration with different
              submission methods and custom fields. The debugger provides
              detailed logs to help diagnose submission issues.
            </p>
          </div>

          <FormDebugger />
        </div>
      )}

      {/* Form Logs Tab */}
      {activeTab === "logs" && (
        <div>
          <div className="mb-8 bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Form Submission Logs</h2>
            <p className="text-gray-600 mb-4">
              This panel shows logs from form submissions across the entire
              website. Use this to track and debug form submissions from any
              page.
            </p>
          </div>

          <FormLogger />
        </div>
      )}

      {/* Speed Test Tab */}
      {activeTab === "speed" && (
        <div>
          <div className="mb-8 bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Network Speed Test</h2>
            <p className="text-gray-600 mb-4">
              Test your internet connection speed and performance. This tool
              measures ping, download, and upload speeds to help diagnose
              connectivity issues.
            </p>
          </div>

          <SpeedTest />
        </div>
      )}

      {/* Network Tools Tab */}
      {activeTab === "network" && (
        <div>
          <div className="mb-8 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Network Diagnostic Tools
            </h2>
            <p className="text-gray-600 mb-4">
              This section provides various network diagnostic tools including
              ping, DNS lookup, and traceroute to help identify and troubleshoot
              network connectivity issues.
            </p>
          </div>

          <NetworkTools />
        </div>
      )}

      {/* Color Generator Tab */}
      {activeTab === "color" && (
        <div>
          <div className="mb-8 bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Color Palette Generator
            </h2>
            <p className="text-gray-600 mb-4">
              Generate harmonious color palettes for your design projects. This
              tool offers various palette types including analogous,
              monochromatic, triadic, and complementary color schemes.
            </p>
          </div>

          <ColorGenerator />
        </div>
      )}

      {/* Password Generator Tab */}
      {activeTab === "password" && (
        <div>
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Strong Password Generator
            </h2>
            <p className="text-gray-600 mb-4">
              Create secure, random passwords with customizable options for
              length and character types. The generator includes strength
              indicators and password history.
            </p>
          </div>

          <PasswordGenerator />
        </div>
      )}

      {/* Domain Lookup Tab */}
      {activeTab === "domain" && (
        <div>
          <div className="mb-8 bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Domain & DNS Lookup</h2>
            <p className="text-gray-600 mb-4">
              Retrieve DNS records, IP addresses, and WHOIS information for any
              domain name. This tool provides detailed insights into domain
              configurations.
            </p>
          </div>

          <DomainLookup />
        </div>
      )}

      {/* Image Compressor Tab */}
      {activeTab === "image" && (
        <div>
          <div className="mb-8 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Image Compression Tool
            </h2>
            <p className="text-gray-600 mb-4">
              Optimize images by reducing their file size while maintaining
              quality. Compress JPG, PNG, WebP, and GIF files for faster website
              loading.
            </p>
          </div>

          <ImageCompressor />
        </div>
      )}

      {/* SEO Analyzer Tab */}
      {activeTab === "seo" && (
        <div>
          <div className="mb-8 bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">SEO Analyzer Tool</h2>
            <p className="text-gray-600 mb-4">
              Analyze websites for SEO best practices and receive actionable
              recommendations to improve search engine rankings and visibility.
            </p>
          </div>

          <SeoAnalyzer />
        </div>
      )}

      {/* Explain Term Tab */}
      {activeTab === "explain" && (
        <div>
          <div className="mb-8 bg-teal-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Tech Term Explainer</h2>
            <p className="text-gray-600 mb-4">
              Enter an IT or technology term to get a simple explanation using our research AI.
            </p>
          </div>
          <TechTermExplainer />
        </div>
      )}
    </div>
  );
}
