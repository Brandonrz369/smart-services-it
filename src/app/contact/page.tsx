import SmartContactClient from "@/components/SmartContactClient"; // Import the new client component
import type { Metadata } from "next";

// Metadata for Contact Page
export const metadata: Metadata = {
  title: "Contact Smart Services IT | Home & Business Computer Repair",
  description: "Contact Smart Services IT for home and business computer repair and IT solutions. Get a free quote.",
  keywords: "contact Smart Services IT, computer repair, IT solutions, free quote"
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
            "name": "Smart Services IT",
            "@id": "https://smartservicesit.store",
            "url": "https://smartservicesit.store",
            "telephone": "+1-800-386-5777",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Main Street",
              "addressLocality": "Hicksville",
              "addressRegion": "NY",
              "postalCode": "11801",
              "addressCountry": "US"
            },
            "areaServed": {
              "@type": "City",
              "name": "Hicksville"
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
      <SmartContactClient /> {/* Use the new client component */}
      {/* Render the JSON-LD Schema */}
      <ContactPageJsonLd />
    </>
  );
}
