import HomePageClient from "@/components/HomePageClient"; // Import the new client component
import type { Metadata } from "next";
import type { Testimonial } from "@/components/TestimonialCarousel"; // Import Testimonial type if defined there

// Metadata for the Homepage (Remains in Server Component)
export const metadata: Metadata = {
  title: "Smart Services IT | Hicksville NY IT Support & Computer Services",
  description:
    "Your trusted source for computer services, IT support, managed services, and tech solutions in Hicksville, NY and surrounding areas including Nassau County and all of Long Island.",
  keywords:
    "Hicksville IT support, Smart Services IT, computer repair NY, managed services NY, IT support Hicksville, IT support Nassau County, IT support Long Island, laptop repair Hicksville, business IT solutions, computer diagnostic pricing, hardware configuration, network setup New York, data recovery services",
};

// Define the interface for service data (can be moved to a shared types file)
interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
  category: string;
}

// Schema markup for SEO (Remains in Server Component)
function BusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Smart Services IT",
          image: "", // Consider adding a logo URL here later
          "@id": "https://smartservicesit.store",
          url: "https://smartservicesit.store",
          telephone: "(800) 386-5777",
          address: {
            "@type": "PostalAddress",
            streetAddress: "454 S Broadway",
            addressLocality: "Hicksville",
            addressRegion: "NY",
            postalCode: "11801",
            addressCountry: "US",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
              ],
              opens: "06:00",
              closes: "18:00",
            },
          ],
          sameAs: [
            "https://facebook.com/lbcomputerhelp",
            "https://instagram.com/lbcomputerhelp",
          ],
        }),
      }}
    />
  );
}

// Service Schema Markup Component (Remains in Server Component)
function ServiceJsonLd() {
  const serviceSchemas = [
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Hardware Diagnostic & Assessment",
      description: "Identify issues with Mac/PC screens, batteries, boot problems, or other components. Get clear options and pricing for solutions in Hicksville.",
      provider: { "@id": "https://smartservicesit.store" },
      areaServed: { "@type": "City", name: "Hicksville" },
      offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", price: "99", priceCurrency: "USD" } }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "System Performance Optimization",
      description: "Improve speed and battery life for your Mac or PC through expert optimization techniques and software configuration.",
      provider: { "@id": "https://smartservicesit.store" },
      areaServed: { "@type": "City", name: "Hicksville" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Data Accessibility Consultation",
      description: "Assistance and guidance for accessing files on malfunctioning devices. Includes data backup strategy advice.",
      provider: { "@id": "https://smartservicesit.store" },
      areaServed: { "@type": "City", name: "Hicksville" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "System Security Assessment & Cleanup Assistance",
      description: "Assessment for security threats, malware checks, and assistance with system cleanup for enhanced protection.",
      provider: { "@id": "https://smartservicesit.store" },
      areaServed: { "@type": "City", name: "Hicksville" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Network Setup & Configuration",
      description: "Reliable setup, configuration, and optimization for home and small business Wi-Fi and wired networks.",
      provider: { "@id": "https://smartservicesit.store" },
      areaServed: { "@type": "City", name: "Hicksville" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Software Configuration Assistance",
      description: "Expert help with installing, configuring, or troubleshooting software applications and operating systems.",
      provider: { "@id": "https://smartservicesit.store" },
      areaServed: { "@type": "City", name: "Hicksville" },
    },
  ];

  return (
    <>
      {serviceSchemas.map((schema, index) => (
        <script
          key={`service-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// Main Server Component for the page
export default function Home() {
  // Data defined in Server Component
  const testimonials: Testimonial[] = [
     {
      text: "I can't thank Michael from Smart Services IT enough for the incredible same-day support! Our office server crashed right before an important client presentation, and he was at our location within an hour. Not only did he recover all our data, but he identified and fixed several security vulnerabilities we didn't know about. Since then, we've signed up for their monthly maintenance plan, and our systems have never run better.",
      name: "James T.",
      role: "Small Business Owner",
      image: "/images/testimonials/client1.jpg",
      source: "google",
    },
    {
      text: "After struggling with slow internet speeds and WiFi dead zones in my home office for months, I called Smart Services IT on a recommendation. Technician Sarah diagnosed the issues quickly, reconfigured my network, and installed a mesh system that now gives me perfect coverage throughout my house. She explained everything clearly without the technical jargon.",
      name: "Linda R.",
      role: "Marketing Consultant",
      image: "/images/testimonials/client2.jpg",
      source: "yelp",
    },
    {
      text: "As a senior citizen not very comfortable with technology, I was relieved to find Smart Services IT. Technician Jason came to my home to help with my computer and printer issues. He was patient, respectful, and took the time to show me how to prevent similar problems in the future. He even wrote down simple instructions for me to follow!",
      name: "Margaret W.",
      role: "Residential Client",
      image: "/images/testimonials/client3.jpg",
      source: "facebook",
    },
    {
      text: "Smart Services IT saved my small accounting business during tax season! Our main workstation was infected with ransomware, and I was panicking about losing client data. They responded within 30 minutes of my call, worked after hours to clean the system, and recovered all our files. I've since recommended them to several colleagues.",
      name: "Robert C.",
      role: "CPA & Business Owner",
      image: "/images/testimonials/client4.jpg",
      source: "nextdoor",
    },
    {
      text: "I've tried several IT services in Hicksville, but Smart Services IT is by far the best. When my laptop wouldn't boot up, I was sure I'd lost years of family photos and important documents. Their technician not only recovered everything but upgraded my system to prevent future failures. Same day service as promised!",
      name: "Thomas G.",
      role: "Residential Client",
      source: "thumbtack",
    },
  ];

  const services: Service[] = [
     {
      title: "Mac/PC Screen Problems?",
      description: "Cracked screen, dim display, flickering? Expert diagnostics & configuration/component options.",
      icon: "🖥️",
      features: ["Cracked/Damaged Screen Assessment", "Display Issue Diagnostics", "Configuration Options", "Component Consultation", "Transparent Quotes"],
      category: "hardware",
    },
    {
      title: "Computer Running Slow?",
      description: "Frustrated with sluggish performance? Our optimization services can boost speed.",
      icon: "🚀",
      features: ["Performance Tune-up", "Software Cleanup", "Hardware Config Review", "Startup Optimization"],
      category: "optimization",
    },
    {
      title: "Can't Access Your Files?",
      description: "Difficulties accessing data? We provide consultation on accessibility options and backup strategies.",
      icon: "💾",
      features: ["Data Accessibility Consult", "Boot Diagnostics", "Backup Strategy Advice", "System Configuration Review"],
      category: "data",
    },
    {
      title: "Worried About Security Threats?",
      description: "Concerned about malware or strange behavior? Get a system security assessment and cleanup assistance.",
      icon: "🛡️",
      features: ["Security Assessment", "Malware/Adware Check", "System Cleanup Assistance", "Security Hardening Tips"],
      category: "security",
    },
    {
      title: "Wi-Fi or Network Problems?",
      description: "Experiencing connectivity issues? We offer network setup, configuration, and optimization.",
      icon: "🌐",
      features: ["Network Diagnostics", "Router/Modem Setup", "Wi-Fi Optimization", "Guest Network Config"],
      category: "network",
    },
     {
      title: "Software Conflicts or Setup Needs?",
      description: "Need help installing or configuring software? We provide expert assistance.",
      icon: "🧩",
      features: ["Software Installation", "Configuration Help", "Compatibility Checks", "Troubleshooting Assistance"],
      category: "software",
    },
  ];

  return (
    <>
      {/* Render the Client Component, passing data as props */}
      <HomePageClient services={services} testimonials={testimonials} />
      {/* Render Schema Markup */}
      <BusinessJsonLd />
      <ServiceJsonLd />
    </>
  );
}
