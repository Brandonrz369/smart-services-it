import ServicesPageClient from "@/components/ServicesPageClient"; // Import the new client component
import type { Metadata } from "next";

// Metadata for Services Page (Remains in Server Component)
export const metadata: Metadata = {
  title: "Our IT Services | LB Computer Help | Long Beach",
  description: "Explore comprehensive IT services from LB Computer Help in Long Beach: Computer diagnostics, managed IT, mobile device assistance, network solutions, data recovery consultation, and more.",
  keywords: "Long Beach IT services, computer repair Long Beach, managed IT services Long Beach, MSP Long Beach, business IT support Long Beach, network support Long Beach, cybersecurity services Long Beach, data recovery Long Beach, IT consulting Long Beach, remote IT support Long Beach, laptop repair Long Beach, mobile device repair Long Beach, tech support Long Beach", // Updated page-specific keywords
};

// Service data (can stay here or be moved to a lib file)
const servicesDetail = [
    {
    title: "Laptop & Desktop Services",
    description: "Professional diagnostics and solutions at your home or office.",
    icon: "💻",
    image: "/images/services/computer-services.jpg",
    features: [
      "Screen Solutions",
      "Hardware Upgrades",
      "Software Troubleshooting",
      "Security Cleanup Assistance",
      "Data Accessibility Consultation",
    ],
    pricing: [
      { service: "Basic Diagnostic", price: "$49", description: "Identify issues with your system" },
      { service: "System Optimization", price: "$79", description: "Speed up a slow computer" },
      { service: "Screen Assessment & Options", price: "From $129", description: "Assess damaged laptop screens & discuss options" },
      { service: "Hardware Upgrade", price: "From $99", description: "RAM, SSD, and component upgrades" },
      { service: "Security Cleanup", price: "$89", description: "Assistance removing threats & securing your system" },
    ],
    category: "residential",
    longDescription: "Our comprehensive laptop and desktop services cover everything from hardware component issues to software problems. We work with all major brands including Apple, Dell, HP, Lenovo, and more. Our experienced technicians can diagnose issues quickly, offering effective solutions to get your computer performing optimally with minimal downtime. We offer both in-home service and pickup options for your convenience.",
  },
  {
    title: "Managed IT Services (MSP)",
    description: "Complete IT management for businesses of all sizes.",
    icon: "🏢",
    image: "/images/services/managed-it.jpg",
    features: ["IT Infrastructure Management", "Proactive Monitoring", "Strategic IT Planning", "Security Solutions", "Cloud Service Implementation"],
    pricing: [
      { service: "Basic MSP Plan", price: "From $299/mo", description: "For businesses with 1-5 employees" },
      { service: "Standard MSP Plan", price: "From $499/mo", description: "For businesses with 6-15 employees" },
      { service: "Premium MSP Plan", price: "From $999/mo", description: "For businesses with 16-30 employees" },
      { service: "Enterprise MSP Plan", price: "Custom", description: "For businesses with 30+ employees" },
      { service: "On-demand IT Support", price: "$125/hr", description: "As-needed IT assistance" },
    ],
    category: "business",
    longDescription: "Our Managed IT Services provide comprehensive technology management for your business, allowing you to focus on your core operations. We handle everything from day-to-day IT support to strategic planning and implementation. Our proactive approach helps prevent issues before they impact your business, while our 24/7 monitoring ensures rapid response to any emerging problems. We tailor our MSP plans to your specific business needs and budget.",
  },
   {
    title: "Mobile Device Services",
    description: "Expert assistance for smartphones and tablets.",
    icon: "📱",
    image: "/images/services/mobile-support.jpg",
    features: ["Screen & Glass Solutions", "Battery Replacements", "Charging Port Assistance", "Software Issues", "Data Transfer"],
    pricing: [
      { service: "Phone Screen Assessment", price: "From $79", description: "Assess screen issues for most popular models" },
      { service: "Battery Replacement", price: "From $59", description: "Restore battery life" },
      { service: "Charging Port Service", price: "From $69", description: "Address connection issues" },
      { service: "Water Damage Assessment", price: "From $99", description: "Assistance with liquid damage incidents" },
      { service: "Data Accessibility", price: "From $79", description: "Help retrieving important information" },
    ],
    category: "residential",
    longDescription: "We provide expert services for all major smartphone and tablet brands, including Apple iPhone, iPad, Samsung Galaxy devices, and more. From cracked screens to battery replacements, our technicians use high-quality parts and precise techniques to get your mobile devices working optimally again. We also offer data transfer services to help you move information between devices or consult on data accessibility from damaged units.",
  },
  {
    title: "Network & Server Solutions",
    description: "Business-grade networking and server management.",
    icon: "🔧",
    image: "/images/services/network-support.jpg",
    features: ["Server Setup & Maintenance", "Network Security", "Business Continuity Planning", "Microsoft 365 Management", "VPN & Remote Access"],
    pricing: [
      { service: "Network Assessment", price: "$249", description: "Comprehensive evaluation of current setup" },
      { service: "Server Installation", price: "From $799", description: "Hardware and software setup" },
      { service: "Network Security Implementation", price: "From $599", description: "Firewall and security configuration" },
      { service: "Wireless Network Setup", price: "From $399", description: "Enterprise WiFi solutions" },
      { service: "Cloud Server Migration", price: "From $999", description: "Move to cloud infrastructure" },
    ],
    category: "business",
    longDescription: "Our network and server solutions help businesses establish reliable, secure, and high-performance IT infrastructure. We handle everything from initial network design to ongoing maintenance and security. Our team has extensive experience with Windows Server, Linux, virtualization technologies, and cloud platforms. We also implement comprehensive security measures to protect your valuable business data and ensure business continuity in case of any disruptions.",
  },
  {
    title: "Data Solutions & Backup",
    description: "Secure solutions for critical business and personal data.",
    icon: "💾",
    image: "/images/services/data-solutions.jpg",
    features: ["Data Accessibility Consultation", "Cloud Backup Solutions", "Automated Backup Systems", "RAID Accessibility Consultation", "Emergency Data Consultation"],
    pricing: [
      { service: "Basic Data Consultation", price: "From $149", description: "For accessible hard drives" },
      { service: "Advanced Data Consultation", price: "From $299", description: "For damaged storage media" },
      { service: "RAID Consultation", price: "From $499", description: "For server RAID arrays" },
      { service: "Cloud Backup Setup", price: "From $99", description: "Automated offsite backup" },
      { service: "Business Continuity Plan", price: "From $599", description: "Comprehensive backup strategy" },
    ],
    category: "both",
    longDescription: "Our data solutions and backup services help both businesses and individuals protect their valuable information and consult on options for data loss situations. We use advanced tools and techniques to assist with accessing data from potentially damaged or corrupted storage media, including hard drives, SSDs, memory cards, and RAID arrays. We also implement robust backup solutions to prevent future data loss, with options for both local and cloud-based backups that run automatically.",
  },
  {
    title: "Smart Home & Devices",
    description: "Setup and assistance for all your connected devices.",
    icon: "🏠",
    image: "/images/services/remote-support.jpg",
    features: ["Smart Watch Assistance", "Earbud/Headphone Solutions", "Voice Assistant Setup", "Smart Home Configuration", "IoT Device Support"],
    pricing: [
      { service: "Smart Watch Service", price: "From $69", description: "Battery and screen related assistance" },
      { service: "Earbud/Headphone Service", price: "From $49", description: "Address audio and charging issues" },
      { service: "Smart Home Setup", price: "From $99", description: "Voice assistants and hub configuration" },
      { service: "Smart Lighting Installation", price: "From $129", description: "Connected lighting systems" },
      { service: "Multi-device Integration", price: "From $179", description: "Creating seamless smart home ecosystems" },
    ],
    category: "residential",
    longDescription: "Our smart home and device services help you get the most from your connected technology. We provide assistance and support for a wide range of smart devices including watches, earbuds, speakers, and home automation systems. Our technicians can set up and configure voice assistants like Amazon Alexa and Google Home, integrate smart lighting, thermostats, security systems, and other IoT devices. We also offer custom solutions to create a seamless connected home experience.",
  },
  {
    title: "Business IT Consulting",
    description: "Strategic technology guidance for your organization.",
    icon: "📊",
    image: "/images/services/it-consulting.jpg",
    features: ["IT Strategy Development", "Technology Assessment", "Cost Optimization", "Vendor Management", "Compliance Solutions"],
    pricing: [
      { service: "IT Assessment", price: "$499", description: "Comprehensive technology evaluation" },
      { service: "Technology Roadmap", price: "$999", description: "Strategic planning for 1-3 years" },
      { service: "Vendor Selection", price: "From $599", description: "Find the right technology partners" },
      { service: "Compliance Audit", price: "From $1,299", description: "Ensure regulatory compliance" },
      { service: "IT Budget Planning", price: "From $799", description: "Optimize technology spending" },
    ],
    category: "business",
    longDescription: "Our IT consulting services provide strategic guidance to help businesses make informed technology decisions. We work with organizations of all sizes to develop IT strategies that align with business goals, optimize technology investments, and implement solutions that drive growth and efficiency. Our consultants have extensive experience across various industries and can help with everything from technology assessments to compliance requirements and digital transformation initiatives.",
  },
  {
    title: "Remote Assistance Options",
    description: "Get help without leaving your home or office.",
    icon: "🌐",
    features: ["Remote Diagnostics", "Software Installation", "Security Scanning", "System Optimization", "Quick Problem Resolution"],
    pricing: [
      { service: "Quick Assistance Session", price: "$39", description: "30-minute remote assistance" },
      { service: "Standard Remote Assistance", price: "$70/hr", description: "For general issues" },
      { service: "Remote System Cleanup", price: "$89", description: "Performance optimization" },
      { service: "Software Installation", price: "From $49", description: "Remote setup and configuration" },
      { service: "Security Scan & Cleanup", price: "$79", description: "Identify and address potential threats" },
    ],
    category: "both",
    longDescription: "Our remote assistance services provide convenient help without requiring an in-person visit. Using secure connection tools, our technicians can access your computer remotely to diagnose and address a wide range of issues. This is ideal for software problems, system optimization, security checks, and general troubleshooting. Remote assistance offers a fast response time and is often more cost-effective than on-site visits for many common computer problems.",
  },
];

// Service Schema Markup Component for this page (Remains in Server Component)
function ServicesPageJsonLd() {
  const serviceSchemas = servicesDetail.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title, // Use the service title
    description: service.longDescription, // Use the long description
    provider: { "@id": "https://lbcomputerhelp.com" }, // Reference the main business ID
    areaServed: { "@type": "City", name: "Long Beach" },
    // Optionally add offers if pricing is consistent or representative
    // offers: service.pricing.map(p => ({
    //   "@type": "Offer",
    //   priceSpecification: {
    //     "@type": "PriceSpecification",
    //     price: p.price.replace(/[^0-9.]/g, ''), // Extract numeric price if possible
    //     priceCurrency: "USD"
    //   }
    // }))
  }));

  return (
    <>
      {serviceSchemas.map((schema, index) => (
        <script
          key={`service-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// Main Server Component for the page
export default function ServicesPage() {
  return (
    <>
      {/* Render the Client Component which contains the interactive parts */}
      {/* Pass the servicesDetail data as a prop */}
      <ServicesPageClient servicesDetail={servicesDetail} />
      {/* Render the JSON-LD Schema */}
      <ServicesPageJsonLd />
    </>
  );
}
