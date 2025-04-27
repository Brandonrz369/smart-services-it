// src/app/residential-business/page.tsx
// This is now a Server Component

import ResidentialBusinessClientPage from "@/components/ResidentialBusinessClientPage"; // Import the updated client component

// Define Metadata for this specific page (Enhanced Semantic Scope)
export const metadata = {
  title: "Solutions for Home and Office | Smart Services America", // Updated title
  description:
    "Smart Services America offers expert technology solutions for home and office, from support to recommendations.", // Updated description
  keywords:
    "home technology solutions, office technology solutions, personal computer help, small business IT support, Smart Services America", // Updated keywords
};

// Schema Markup Component (Enhanced Scope)
function ResidentialBusinessJsonLd() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness", // Keep LocalBusiness type
    name: "Smart Services America", // Updated name
    image: "", // Add logo URL if available (update if needed)
    "@id": "https://smartservicesit.store", // Updated ID
    url: "https://smartservicesit.store", // Updated URL
    telephone: "+1-800-386-5777", // Updated phone number
    priceRange: "$$ - $$$", // Keep general price range for now
    address: {
      "@type": "PostalAddress",
      streetAddress: "454 s Broadway", // Updated street address
      addressLocality: "Hicksville", // Updated locality
      addressRegion: "NY", // Updated region
      postalCode: "11801", // Updated postal code
      addressCountry: "US", // Keep country
    },
    openingHoursSpecification: [ // Keep opening hours for now
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "18:00",
      },
    ],
    sameAs: [ // Update social media links if available for Smart Services America
      // "https://facebook.com/smartservicesamerica",
      // "https://instagram.com/smartservicesamerica",
    ],
  };

  // Revised Service Schemas (Simplified based on smartservicesit.store categories)
  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Home Technology Solutions", // Updated service type
      description: "Solutions for personal use, covering a wide range of technologies, from speeding up your computer to setting up your smart TV, along with education and support tailored to your needs.", // Updated description
      provider: { "@id": "https://smartservicesit.store" }, // Updated provider ID
      areaServed: { "@type": "City", name: "Hicksville" }, // Updated area served
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Small Business IT Support", // Updated service type
      description: "For small businesses and entrepreneurs, Smart Services America serves as your personal IT support team, offering fast, same-day service.", // Updated description
      provider: { "@id": "https://smartservicesit.store" }, // Updated provider ID
      areaServed: { "@type": "City", name: "Hicksville" }, // Updated area served
    },
    // Removed specific service schemas for simplicity, aligning with smartservicesit.store structure
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      {serviceSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// The main page component renders the client component and the schema markup
export default function ResidentialBusinessPage() {
  return (
    <>
      <ResidentialBusinessClientPage />
      <ResidentialBusinessJsonLd />
    </>
  );
}
