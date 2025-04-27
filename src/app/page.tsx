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
      text: "I am beyond impressed with the service I received from Smart Services IT. They went above and beyond to find the perfect router for our office that could prioritize our fax machine and phones. Since the new setup, we've already noticed a significant improvement in call quality.",
      name: "Alondra S.",
      role: "Office Manager",
      image: "/images/testimonials/client1.jpg",
      source: "google",
    },
    {
      text: "As a boutique law firm handling sensitive client information daily, finding reliable IT support is critical. When we experienced a server failure before a major trial, Brandon responded immediately. The recovery was completed ahead of schedule, allowing our legal team to access critical documents well before our court deadline.",
      name: "Jonathan H.",
      role: "Visionary Law Group",
      image: "/images/testimonials/client2.jpg",
      source: "yelp",
    },
    {
      text: "Brandon was super kind and helpful! He fixed my printer issues which I was having for about 3 weeks in just 30 minutes! He not only was super helpful but also walked me through the process so I can fix it on my own next time.",
      name: "Emma R.",
      role: "Residential Client",
      image: "/images/testimonials/client3.jpg",
      source: "facebook",
    },
    {
      text: "I had such a great experience with Smart Services IT! My laptop was running super slow, and I needed it fixed ASAP. They were able to diagnose the issue quickly and optimize my system, making it run like new again. The service was fast, professional, and hassle-free.",
      name: "Judith C.",
      role: "Small Business Owner",
      image: "/images/testimonials/client4.jpg",
      source: "nextdoor",
    },
    {
      text: "I'm so impressed with their data recovery service. After my hard drive failed, I thought all my files were gone for good, but they managed to recover everything quickly. I'm so relieved to have my data back.",
      name: "Luke T.",
      role: "Photographer",
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
