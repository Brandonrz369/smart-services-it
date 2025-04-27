import EmergencyPageClient from "@/components/EmergencyPageClient"; // Import the new client component
import type { Metadata } from "next";

// Metadata for Emergency Page (Remains in Server Component)
export const metadata: Metadata = {
  title: "Emergency IT Support Hicksville | Fast Response | Smart Services IT",
  description: "Urgent IT support in Hicksville. Fast response for ransomware, server failures, network outages, and data loss emergencies. Call Smart Services IT now.",
  keywords: "emergency IT support Hicksville, urgent computer help Hicksville, ransomware recovery Hicksville, server down Hicksville, network outage Hicksville, emergency data recovery Hicksville, 24/7 IT support Hicksville, immediate tech support Hicksville", // Page-specific keywords
};

// Main Server Component for the page
export default function EmergencyPage() {
  return (
    <>
      {/* Render the Client Component which contains the interactive parts */}
      <EmergencyPageClient />
      {/* Add any necessary JSON-LD Schema here if applicable */}
    </>
  );
}
