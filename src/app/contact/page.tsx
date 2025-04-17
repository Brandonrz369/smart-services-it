import ContactPageClient from "@/components/ContactPageClient"; // Import the new client component
import type { Metadata } from "next";

// Metadata for Contact Page (Remains in Server Component)
export const metadata: Metadata = {
  title: "Contact LB Computer Help | Long Beach IT Support",
  description: "Contact LB Computer Help in Long Beach for IT support, computer services, and managed IT solutions. Call, email, or schedule an appointment online.",
  keywords: "contact LB Computer Help, Long Beach IT support contact, schedule computer repair Long Beach, business IT support Long Beach contact, managed services Long Beach contact, LB Computer Help phone, Long Beach tech support", // Updated page-specific keywords
};

// LocalBusiness Schema for Contact Page
function ContactPageJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage", // Specific type for contact pages
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "LB Computer Help",
            "@id": "https://lbcomputerhelp.com", // Use the main business ID
            "url": "https://lbcomputerhelp.com",
            "telephone": "(213) 349-6790",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "927 Magnolia Ave #2",
              "addressLocality": "Long Beach",
              "addressRegion": "CA",
              "postalCode": "90813",
              "addressCountry": "US"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "06:00",
                "closes": "18:00"
              }
            ],
            "areaServed": {
              "@type": "City",
              "name": "Long Beach"
            }
          }
        }),
      }}
    />
  );
}


// Main Server Component for the page
export default function ContactPage() {
  return (
    <>
      {/* Render the Client Component which contains the interactive parts */}
      <ContactPageClient />
      {/* Render the JSON-LD Schema */}
      <ContactPageJsonLd />
    </>
  );
}
