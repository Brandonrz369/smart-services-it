import EmergencyPageClient from "@/components/EmergencyPageClient"; // Import the new client component
import type { Metadata } from "next";

// Metadata for Emergency Page (Remains in Server Component)
export const metadata: Metadata = {
  title: "Emergency IT Support Long Beach | Fast Response | LB Computer Help",
  description: "Urgent IT support in Long Beach. Fast response for ransomware, server failures, network outages, and data loss emergencies. Call LB Computer Help now.",
  keywords: "emergency IT support Long Beach, urgent computer help Long Beach, ransomware recovery Long Beach, server down Long Beach, network outage Long Beach, emergency data recovery Long Beach, 24/7 IT support Long Beach, immediate tech support Long Beach", // Page-specific keywords
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
