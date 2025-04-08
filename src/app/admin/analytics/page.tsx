"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
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
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
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
              href="/admin/web-tools"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Web Tools
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
          Track usage metrics for all tools and services
        </p>
      </header>

      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <AnalyticsDashboard />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Export Options</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm">
              Export analytics data for reporting purposes:
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  // Export analytics data as JSON
                  const analyticsData = localStorage.getItem("toolUsageEvents");
                  if (analyticsData) {
                    const blob = new Blob([analyticsData], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `analytics-export-${new Date().toISOString().split("T")[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }
                }}
              >
                Export JSON
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={() => {
                  // Export analytics data as CSV
                  const analyticsData = localStorage.getItem("toolUsageEvents");
                  if (analyticsData) {
                    try {
                      const events = JSON.parse(analyticsData);
                      let csv = "Tool,Action,Timestamp,Metadata\n";

                      events.forEach((event: any) => {
                        const timestamp = new Date(
                          event.timestamp,
                        ).toISOString();
                        const metadata = event.metadata
                          ? JSON.stringify(event.metadata).replace(/,/g, ";")
                          : "";
                        csv += `${event.tool},${event.action},${timestamp},"${metadata}"\n`;
                      });

                      const blob = new Blob([csv], { type: "text/csv" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `analytics-export-${new Date().toISOString().split("T")[0]}.csv`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    } catch (e) {
                      console.error("Error exporting CSV:", e);
                    }
                  }
                }}
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Admin Resources</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm">Access other admin dashboards and tools:</p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/forms"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Form Submissions Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/web-tools"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Web Tools Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/web-tools"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                  Public Web Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
