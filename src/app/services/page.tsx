import ServicesPageClient from "@/components/ServicesPageClient"; // Import the new client component
import type { Metadata } from "next";

// Metadata for Resources Page
export const metadata: Metadata = {
  title: "Resources | Smart Services America", // Updated title
  description: "Welcome to the Smart Services America Resources page! Here, you'll find valuable guides, articles, and FAQs to help you navigate the world of technology.", // Updated description
  keywords: "technology guides, tech articles, computer help FAQ, IT support resources, Smart Services America resources", // Updated keywords
};

// Service data (can stay here or be moved to a lib file) - Keep for now, might be used by the client component
const servicesDetail = [
    {
    title: "Laptop & Desktop Services",
    description: "Professional diagnostics and solutions at your home or office.",
    icon: "💻",
    image: "/images/services/computer-services-new.png",
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
    image: "/images/services/managed-it-new.png",
    features: ["IT Infrastructure Management", "Proactive Monitoring", "Strategic IT Planning", "Security Solutions", "Cloud Service Implementation"],
    pricing: [
      { service: "Basic MSP Plan", price: "From $299/mo", description: "For businesses with 1-5 employees" },
      { service: "Standard MSP Plan", price: "From $499/mo", description: "For businesses with 6-15 employees" },
      { service: "Premium MSP Plan", price: "From $999/mo", description: "For businesses with 16-30 employees" },
      { service: "Enterprise MSP Plan", price: "Custom", description: "For businesses with 30+ employees" },
      { service: "On-demand IT Support", price: "$125/hr", description: "As-needed IT assistance" },
    ],
    category: "business",
    longDescription: "Focus on your core operations while we handle your technology. Our Managed IT Services (MSP) provide comprehensive IT management tailored for businesses in Hicksville. Wondering **why use managed services?** We offer **fixed fee IT support in Hicksville**, providing predictable monthly costs that can significantly **reduce IT costs** (potentially 25-45%) compared to traditional models. Our service includes **proactive IT monitoring for your small business in Hicksville**, aiming to **improve uptime** and operational efficiency by preventing issues before they impact you. Benefit from robust **cybersecurity managed services in Hicksville**, including proactive threat management that reduces security incidents. Gain access to certified expertise and enterprise-grade tools without the overhead of a large in-house team. We handle everything from infrastructure management and strategic planning to cloud services and security, ensuring your IT aligns with your business goals. Let Smart Services IT be your strategic IT partner.",
  },
   {
    title: "Mobile Device Services",
    description: "Expert assistance for smartphones and tablets.",
    icon: "📱",
    image: "/images/services/mobile-support-new.png",
    features: ["Screen & Glass Solutions", "Battery Replacements", "Charging Port Assistance", "Software Issues", "Data Transfer"],
    pricing: [
      { service: "Phone Screen Assessment", price: "From $79", description: "Assess screen issues for most popular models" },
      { service: "Battery Replacement", price: "From $69", description: "Replace aging batteries for better performance" },
      { service: "Charging Port Repair", price: "From $89", description: "Fix charging connection issues" },
      { service: "Software Troubleshooting", price: "$59", description: "Resolve software glitches and problems" },
      { service: "Data Transfer", price: "$49", description: "Move data between devices safely" },
    ],
    category: "residential",
    longDescription: "Our mobile device services cover smartphones and tablets from all major manufacturers including Apple, Samsung, Google, and more. We provide expert assistance with hardware issues like screen repairs and battery replacements, as well as software problems including system optimizations and data recovery. Our technicians can help with both scheduled appointments and emergency services to get your essential devices working properly as quickly as possible.",
  },
  {
    title: "Network & Server Support",
    description: "Setup, troubleshooting, and maintenance for business networks.",
    icon: "🔌",
    image: "/images/services/network-support-new.png",
    features: ["Network Infrastructure Design", "Router & Switch Configuration", "Server Management", "Network Security", "Wireless Optimization"],
    pricing: [
      { service: "Network Assessment", price: "$199", description: "Comprehensive evaluation of existing network" },
      { service: "Wireless Network Setup", price: "From $299", description: "Professional WiFi installation and optimization" },
      { service: "Server Maintenance", price: "From $149/mo", description: "Ongoing server management and monitoring" },
      { service: "Network Security Audit", price: "$399", description: "Identify vulnerabilities in your network" },
      { service: "On-site Network Support", price: "$125/hr", description: "Expert assistance with network issues" },
    ],
    category: "business",
    longDescription: "Our network and server support services ensure your business infrastructure runs smoothly. We handle everything from initial network design and implementation to ongoing maintenance and troubleshooting. Our experts work with all types of networks including wired, wireless, and hybrid setups. We can help configure equipment, optimize performance, implement security measures, and resolve connectivity issues. We also provide server setup, maintenance, monitoring, and virtualization services to keep your critical business applications available and performing optimally.",
  },
  {
    title: "Data Recovery & Backup",
    description: "Protect and restore your valuable information.",
    icon: "💾",
    image: "/images/services/data-solutions-new.png",
    features: ["Hard Drive Recovery", "Cloud Backup Solutions", "Disaster Recovery Planning", "Data Migration", "Secure Data Disposal"],
    pricing: [
      { service: "Data Recovery Assessment", price: "$99", description: "Evaluate recovery options for your data" },
      { service: "Basic Data Recovery", price: "From $199", description: "Recover data from functioning drives" },
      { service: "Advanced Data Recovery", price: "From $399", description: "Recover data from damaged or failing drives" },
      { service: "Cloud Backup Setup", price: "$149", description: "Configure secure cloud backup solutions" },
      { service: "Backup Strategy Consulting", price: "$199", description: "Develop a comprehensive backup plan" },
    ],
    category: "support",
    longDescription: "Data is often the most valuable asset for both businesses and individuals. Our data recovery and backup services help protect that critical information and restore it when problems occur. We offer recovery services for all storage devices including hard drives, SSDs, USB drives, and memory cards. We can help retrieve deleted files, recover from formatting errors, and even address physical damage. We also specialize in implementing reliable backup solutions using both local and cloud-based approaches to prevent data loss in the first place.",
  },
  {
    title: "IT Consulting",
    description: "Strategic technology guidance for businesses.",
    icon: "📊",
    image: "/images/services/it-consulting-new.png",
    features: ["Technology Assessment", "IT Strategy Development", "Digital Transformation", "Software Selection", "Process Optimization"],
    pricing: [
      { service: "Initial IT Consultation", price: "$199", description: "Discuss current challenges and potential solutions" },
      { service: "Technology Assessment", price: "$499", description: "Comprehensive review of existing IT infrastructure" },
      { service: "IT Strategy Development", price: "From $999", description: "Create a roadmap for your technology needs" },
      { service: "Software Selection Assistance", price: "$399", description: "Find the right software solutions for your business" },
      { service: "Digital Transformation Planning", price: "Custom", description: "Plan and implement digital transformation initiatives" },
    ],
    category: "business",
    longDescription: "Our IT consulting services provide strategic guidance to help businesses leverage technology effectively. We work with organizations of all sizes to assess current IT infrastructure, identify opportunities for improvement, and develop comprehensive technology strategies. Our consultants can help with vendor selection, software evaluation, technology budgeting, and project management. We specialize in helping businesses use technology to increase efficiency, reduce costs, improve customer experiences, and gain competitive advantages in their markets.",
  },
  {
    title: "Remote Support",
    description: "Convenient assistance without an on-site visit.",
    icon: "🖥️",
    image: "/images/services/remote-support-new.png",
    features: ["Software Troubleshooting", "System Optimization", "Security Updates", "Email Setup", "Remote Diagnostics"],
    pricing: [
      { service: "Quick Remote Support", price: "$49", description: "15-30 minute session for simple issues" },
      { service: "Standard Remote Support", price: "$89", description: "Up to 1 hour of remote assistance" },
      { service: "Extended Remote Support", price: "$159", description: "Up to 2 hours for complex issues" },
      { service: "Software Installation", price: "$59", description: "Remote setup of software applications" },
      { service: "Remote Training Session", price: "$79/hr", description: "Learn how to use your technology effectively" },
    ],
    category: "support",
    longDescription: "Our remote support services provide convenient assistance without requiring an on-site visit. Using secure remote access technology, our technicians can connect to your computer system to diagnose and resolve a wide range of issues. This approach often allows for faster response times and lower costs compared to traditional on-site visits. We can help with software installation, configuration problems, performance optimization, virus removal, email setup, and many other common technology challenges. Remote support is ideal for less complex issues and situations where physical hardware intervention isn't required.",
  },
  {
    title: "Smart Home Setup",
    description: "Connect and optimize your home technology.",
    icon: "🏠",
    image: "/images/services/smart-home-new.png",
    features: ["Smart Speaker Installation", "Home Automation", "Smart Lighting Setup", "Security Camera Config", "Streaming Device Setup"],
    pricing: [
      { service: "Smart Device Setup", price: "$79", description: "Configure individual smart home devices" },
      { service: "Smart Home Hub Installation", price: "$129", description: "Setup and configure central control systems" },
      { service: "Smart Home Security Package", price: "From $249", description: "Setup cameras, doorbells, and security devices" },
      { service: "Smart Entertainment Package", price: "From $199", description: "Configure TVs, streaming, and audio systems" },
      { service: "Complete Smart Home Assessment", price: "$159", description: "Evaluate options for home automation" },
    ],
    category: "residential",
    longDescription: "Our smart home setup services help you connect and optimize the technology in your home. We work with all major brands and platforms including Amazon Alexa, Google Home, Apple HomeKit, Samsung SmartThings, and more. Our technicians can help install and configure a wide range of devices including smart speakers, thermostats, lighting, security cameras, doorbells, locks, and entertainment systems. We also provide guidance on creating automation routines and ensuring all your devices work together seamlessly. Let us help you build a more convenient, efficient, and secure connected home.",
  }
];

// Default export for the page component
export default function ServicesPage() {
  return <ServicesPageClient servicesDetail={servicesDetail} />;
}