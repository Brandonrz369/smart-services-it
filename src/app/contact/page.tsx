import ContactPageClient from "@/components/ContactPageClient"; // Import the new client component
import type { Metadata } from "next";

// Metadata for Contact Page (Remains in Server Component)
export const metadata: Metadata = {
  title: "Contact LB Computer Help | Long Beach IT Support",
  description: "Contact LB Computer Help in Long Beach for IT support, computer services, and managed IT solutions. Call, email, or schedule an appointment online.",
  keywords: "contact computer help Long Beach, IT support contact Long Beach, schedule computer service Long Beach, LB Computer Help phone number, Long Beach tech support contact", // Page-specific keywords
};

// Main Server Component for the page
export default function ContactPage() {
  return (
    <>
      {/* Render the Client Component which contains the interactive parts */}
      <ContactPageClient />
      {/* Add any necessary JSON-LD Schema here if applicable */}
    </>
  );
}
