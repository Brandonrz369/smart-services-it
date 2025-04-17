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
    longDescription: "Focus on your core operations while we handle your technology. Our Managed IT Services (MSP) provide comprehensive, proactive IT management tailored for businesses in Long Beach. Benefit from predictable monthly costs (potentially reducing IT expenses by 25-45% compared to traditional models), enhanced cybersecurity with proactive threat management (reducing security incidents significantly), and improved operational efficiency through 24/7 monitoring that minimizes costly downtime. Gain access to certified expertise and enterprise-grade tools without the overhead of a large in-house team. We handle everything from infrastructure management and strategic planning to cloud services and security, ensuring your IT aligns with your business goals. Let us be your strategic IT partner.",
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
    longDescription: "Establish a reliable, secure, and high-performance IT backbone for your business with our Network & Server Solutions. We design, implement, and manage robust infrastructure, incorporating current best practices like network segmentation and zero-trust principles to enhance security. Our team ensures your systems utilize modern, encrypted protocols (like SMB 3.1.1+) while disabling outdated ones (like SMBv1) to minimize vulnerabilities. We have deep expertise in Windows Server, Linux, virtualization, and cloud platforms, implementing redundancy and proactive monitoring to maximize uptime and performance. Trust us to protect your valuable business data and ensure business continuity through comprehensive security measures and resilient network design.",
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
    longDescription: "Protect your critical business and personal data from loss, corruption, or ransomware. With many businesses failing after significant data loss, a robust strategy is essential. We implement comprehensive Data Solutions & Backup services following best practices like the 3-2-1 rule (3 copies, 2 media types, 1 offsite). Our solutions leverage automated cloud and hybrid backups for reliability, security (including encryption and ransomware resilience), and scalability. We consult on accessing data from various media and design tailored Business Continuity Plans (BCP) with clear Recovery Point Objectives (RPO) and Recovery Time Objectives (RTO) to minimize downtime and keep your operations running.",
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
    longDescription: "Navigate the complexities of modern technology with our strategic Business IT Consulting. We help SMBs align IT with business goals, focusing on key areas like digital transformation (leveraging AI and automation), cloud strategy (optimizing hybrid/multi-cloud environments), and robust cybersecurity posture assessments (implementing zero-trust principles and ensuring compliance). Our expert consultants guide you through technology assessments, cost optimization, vendor management, and the implementation of solutions that drive growth, efficiency, and resilience in today's evolving digital landscape.",
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
