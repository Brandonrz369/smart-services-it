// src/app/residential-business/page.tsx
// This is now a Server Component

import ResidentialBusinessClientPage from "@/components/ResidentialBusinessClientPage"; // Import the updated client component

// Define Metadata for this specific page (Enhanced Semantic Scope)
export const metadata = {
  title: "Long Beach Computer Help | Device Assistance & Solutions | LB Computer Help",
  description:
    "Expert computer help in Long Beach. Diagnostics, configuration, optimization & consultation for Mac/PC issues: slow performance, screen problems, battery drain, data access, network setup & more. Transparent pricing.",
  keywords:
    "long beach computer help, lb computer help near me, computer assistance Long Beach, device solutions Long Beach, macbook screen options Long Beach, laptop battery performance Long Beach, slow pc help Long Beach, data access consultation Long Beach, network setup Long Beach, local tech experts Long Beach, computer diagnostic pricing, hardware configuration Long Beach", // Added more keywords
};

// Schema Markup Component (Enhanced Scope)
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

  // Revised Service Schemas
  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Hardware Diagnostic & Assessment",
      description: "Identify issues with Mac/PC screens (including cracked/damaged displays, flickering, dimness), batteries, boot problems, or other components. Get clear options and pricing for solutions in Long Beach.", // Enhanced description
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
      offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", price: "99", priceCurrency: "USD" } }
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
      serviceType: "System Performance Optimization",
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
      serviceType: "System Security Assessment & Cleanup Assistance",
      description: "Assessment for security threats, malware checks, and assistance with system cleanup for enhanced protection.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Network Setup & Configuration",
      description: "Reliable setup, configuration, and optimization for home and small business Wi-Fi and wired networks.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Software Configuration Assistance",
      description: "Expert help with installing, configuring, or troubleshooting software applications and operating systems.",
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

// The main page component renders the client component and the schema markup
export default function ResidentialBusinessPage() {
  return (
    <>
      <ResidentialBusinessClientPage />
      <ResidentialBusinessJsonLd />
    </>
  );
}
