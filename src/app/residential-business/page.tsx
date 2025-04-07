// src/app/residential-business/page.tsx
// This is now a Server Component

import ResidentialBusinessClientPage from "@/components/ResidentialBusinessClientPage"; // Import the new client component

// Define Metadata for this specific page (overrides layout.tsx)
// This can only be exported from a Server Component
export const metadata = {
  title: "Long Beach Computer Assistance | Device Solutions & Pricing | LB Computer Help",
  description:
    "Expert computer assistance in Long Beach. Get diagnostics, hardware configuration options, system optimization, and transparent pricing for common device issues like screen problems or battery drain.",
  keywords:
    "computer assistance Long Beach, device solutions Long Beach, hardware configuration Long Beach, PC optimization cost, Mac screen options Long Beach, laptop battery performance Long Beach, local tech experts Long Beach, computer diagnostic pricing, Long Beach computer help, lb computer help near me",
};

// Schema Markup Component - can remain here or be moved, but needs to be rendered server-side if complex
function ResidentialBusinessJsonLd() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LB Computer Help",
    image: "", // Add logo URL if available
    "@id": "https://lbcomputerhelp.com", // Use canonical URL
    url: "https://lbcomputerhelp.com/residential-business", // URL of this specific page
    telephone: "(213) 349-6790",
    priceRange: "$$ - $$$", // General price range indication
    address: {
      "@type": "PostalAddress",
      streetAddress: "927 Magnolia Ave #2",
      addressLocality: "Long Beach",
      addressRegion: "CA",
      postalCode: "90813",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://facebook.com/lbcomputerhelp",
      "https://instagram.com/lbcomputerhelp",
    ],
  };

  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Hardware Diagnostic & Assessment",
      description: "Identify issues with screens, batteries, boot problems, or other components. Get clear options and pricing for solutions in Long Beach.",
      provider: { "@id": "https://lbcomputerhelp.com" }, // Link to LocalBusiness ID
      areaServed: {
        "@type": "City",
        name: "Long Beach"
      },
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "99",
          priceCurrency: "USD",
          valueAddedTaxIncluded: "false" // Adjust if needed
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Component Configuration & Installation",
      description: "Professional installation and configuration for compatible hardware components (e.g., memory, storage) to enhance performance or address specific issues.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "System Optimization Service",
      description: "Improve speed and battery life for your Mac or PC through expert optimization techniques and software configuration.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Data Accessibility Consultation",
      description: "Assistance and guidance for accessing files on malfunctioning devices. Includes data backup strategy advice.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "IT Consulting & Guidance",
      description: "Expert advice on managing device issues, security practices, and choosing the right technology solutions.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
    },
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

// The main page component is now simple: it renders the client component and the schema markup
export default function ResidentialBusinessPage() {
  return (
    <>
      <ResidentialBusinessClientPage />
      <ResidentialBusinessJsonLd />
    </>
  );
}
