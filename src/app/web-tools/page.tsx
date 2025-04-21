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
          <div className="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold mb-2">Form Submission Test</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Use this basic form to perform a simple end-to-end test of the Formspree submission process. It includes standard fields and submits directly to the configured endpoint.
            </p>
          </div>

          <SimpleContactForm />
        </div>
      )}

      {/* Debug Form Tab */}
      {activeTab === "debug" && (
        <div>
          <div className="mb-8 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h2 className="text-xl font-semibold mb-2">FormSpree Debugger</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Test Formspree configurations with various methods (POST, AJAX) and custom data. This tool helps diagnose integration issues by showing detailed submission attempts and responses. Ideal for developers setting up new forms.
            </p>
          </div>

          <FormDebugger />
        </div>
      )}

      {/* Form Logs Tab */}
      {activeTab === "logs" && (
        <div>
          <div className="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold mb-2">Form Submission Logs</h2>
            <p className="text-gray-600 mb-4 text-sm">
              View a real-time stream of form submission events captured from across the website. Useful for monitoring form activity, identifying errors, and confirming successful submissions without checking email or backend logs.
            </p>
          </div>

          <FormLogger />
        </div>
      )}

      {/* Speed Test Tab */}
      {activeTab === "speed" && (
        <div>
          <div className="mb-8 bg-green-50 p-4 rounded-lg border border-green-100">
            <h2 className="text-xl font-semibold mb-2">Network Speed Test</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Check your current internet connection's performance. This tool measures latency (ping), download speed, and upload speed against nearby servers to help identify potential network bottlenecks or ISP issues.
            </p>
          </div>

          <SpeedTest />
        </div>
      )}

      {/* Network Tools Tab */}
      {activeTab === "network" && (
        <div>
          <div className="mb-8 bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h2 className="text-xl font-semibold mb-2">
              Network Diagnostic Tools
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Utilize standard network utilities like Ping (check host reachability and latency), DNS Lookup (find IP addresses for domains), and Traceroute (map the network path to a destination) to diagnose connectivity problems.
            </p>
          </div>

          <NetworkTools />
        </div>
      )}

      {/* Color Generator Tab */}
      {activeTab === "color" && (
        <div>
          <div className="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold mb-2">
              Color Palette Generator
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Create visually appealing color schemes for web design or branding. Enter a base color or generate random palettes based on different color harmony rules (analogous, monochromatic, triadic, complementary).
            </p>
          </div>

          <ColorGenerator />
        </div>
      )}

      {/* Password Generator Tab */}
      {activeTab === "password" && (
        <div>
          <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-2">
              Strong Password Generator
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Generate strong, random passwords to enhance security. Customize the length and include/exclude character types (uppercase, lowercase, numbers, symbols). Includes a password strength indicator.
            </p>
          </div>

          <PasswordGenerator />
        </div>
      )}

      {/* Domain Lookup Tab */}
      {activeTab === "domain" && (
        <div>
          <div className="mb-8 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <h2 className="text-xl font-semibold mb-2">Domain & DNS Lookup</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Investigate domain names. Look up essential DNS records (A, MX, NS, TXT), find the domain's IP address, and retrieve public WHOIS registration information to check ownership and configuration details.
            </p>
          </div>

          <DomainLookup />
        </div>
      )}

      {/* Image Compressor Tab */}
      {activeTab === "image" && (
        <div>
          <div className="mb-8 bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h2 className="text-xl font-semibold mb-2">
              Image Compression Tool
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Reduce image file sizes for faster web page loading without significant quality loss. Upload JPG, PNG, WebP, or GIF files and apply compression to optimize them for web use.
            </p>
          </div>

          <ImageCompressor />
        </div>
      )}

      {/* SEO Analyzer Tab */}
      {activeTab === "seo" && (
        <div>
          <div className="mb-8 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <h2 className="text-xl font-semibold mb-2">SEO Analyzer Tool</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Perform a basic SEO audit of any webpage. Enter a URL to check for common on-page SEO factors like title tags, meta descriptions, header usage, keyword density, and image alt text, receiving recommendations for improvement.
            </p>
          </div>

          <SeoAnalyzer />
        </div>
      )}

      {/* Explain Term Tab */}
      {activeTab === "explain" && (
        <div>
          <div className="mb-8 bg-teal-50 p-4 rounded-lg border border-teal-100">
            <h2 className="text-xl font-semibold mb-2">Tech Term Explainer</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Confused by technical jargon? Enter an IT or technology term (e.g., DNS, VPN, Firewall, SSD) and get a clear, simple explanation powered by our research AI to help you understand complex concepts.
            </p>
          </div>
          <TechTermExplainer />
        </div>
      )}
    </div>
  );
}
