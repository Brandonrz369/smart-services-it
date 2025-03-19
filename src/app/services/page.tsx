'use client';

import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import FadeIn from '@/components/FadeIn';
// import RevealText from '@/components/RevealText';

const servicesDetail = [
  {
    title: "Laptop & Desktop Repair",
    description: "Professional diagnostics and repairs at your home or office.",
    icon: "💻",
    features: [
      "Screen Replacement",
      "Hardware Upgrades",
      "Software Troubleshooting",
      "Virus/Malware Removal",
      "Data Recovery"
    ],
    pricing: [
      { service: "Basic Diagnostic", price: "$49", description: "Identify issues with your system" },
      { service: "System Optimization", price: "$79", description: "Speed up a slow computer" },
      { service: "Screen Replacement", price: "From $129", description: "Replace damaged laptop screens" },
      { service: "Hardware Upgrade", price: "From $99", description: "RAM, SSD, and component upgrades" },
      { service: "Virus Removal", price: "$89", description: "Remove malware and secure your system" }
    ],
    category: "residential",
    longDescription: "Our comprehensive laptop and desktop repair services cover everything from hardware failures to software issues. We work with all major brands including Apple, Dell, HP, Lenovo, and more. Our experienced technicians can diagnose and fix problems quickly, getting your computer back up and running with minimal downtime. We offer both in-home service and pickup options for your convenience."
  },
  {
    title: "Managed IT Services (MSP)",
    description: "Complete IT management for businesses of all sizes.",
    icon: "🏢",
    features: [
      "IT Infrastructure Management",
      "Proactive Monitoring",
      "Strategic IT Planning",
      "Security Solutions",
      "Cloud Service Implementation"
    ],
    pricing: [
      { service: "Basic MSP Plan", price: "From $299/mo", description: "For businesses with 1-5 employees" },
      { service: "Standard MSP Plan", price: "From $499/mo", description: "For businesses with 6-15 employees" },
      { service: "Premium MSP Plan", price: "From $999/mo", description: "For businesses with 16-30 employees" },
      { service: "Enterprise MSP Plan", price: "Custom", description: "For businesses with 30+ employees" },
      { service: "On-demand IT Support", price: "$125/hr", description: "As-needed IT assistance" }
    ],
    category: "business",
    longDescription: "Our Managed IT Services provide comprehensive technology management for your business, allowing you to focus on your core operations. We handle everything from day-to-day IT support to strategic planning and implementation. Our proactive approach helps prevent issues before they impact your business, while our 24/7 monitoring ensures rapid response to any emerging problems. We tailor our MSP plans to your specific business needs and budget."
  },
  {
    title: "Mobile Device Repair",
    description: "Expert repairs for smartphones and tablets.",
    icon: "📱",
    features: [
      "Screen & Glass Repairs",
      "Battery Replacements",
      "Charging Port Fixes",
      "Software Issues",
      "Data Transfer"
    ],
    pricing: [
      { service: "Phone Screen Repair", price: "From $79", description: "For most popular models" },
      { service: "Battery Replacement", price: "From $59", description: "Restore battery life" },
      { service: "Charging Port Repair", price: "From $69", description: "Fix connection issues" },
      { service: "Water Damage Treatment", price: "From $99", description: "Recovery from liquid damage" },
      { service: "Data Recovery", price: "From $79", description: "Retrieve important information" }
    ],
    category: "residential",
    longDescription: "We provide expert repair services for all major smartphone and tablet brands, including Apple iPhone, iPad, Samsung Galaxy devices, and more. From cracked screens to battery replacements, our technicians use high-quality parts and precise techniques to get your mobile devices working perfectly again. We also offer data transfer services to help you move information between devices or recover data from damaged units."
  },
  {
    title: "Network & Server Solutions",
    description: "Business-grade networking and server management.",
    icon: "🔧",
    features: [
      "Server Setup & Maintenance",
      "Network Security",
      "Business Continuity Planning",
      "Microsoft 365 Management",
      "VPN & Remote Access"
    ],
    pricing: [
      { service: "Network Assessment", price: "$249", description: "Comprehensive evaluation of current setup" },
      { service: "Server Installation", price: "From $799", description: "Hardware and software setup" },
      { service: "Network Security Implementation", price: "From $599", description: "Firewall and security configuration" },
      { service: "Wireless Network Setup", price: "From $399", description: "Enterprise WiFi solutions" },
      { service: "Cloud Server Migration", price: "From $999", description: "Move to cloud infrastructure" }
    ],
    category: "business",
    longDescription: "Our network and server solutions help businesses establish reliable, secure, and high-performance IT infrastructure. We handle everything from initial network design to ongoing maintenance and security. Our team has extensive experience with Windows Server, Linux, virtualization technologies, and cloud platforms. We also implement comprehensive security measures to protect your valuable business data and ensure business continuity in case of any disruptions."
  },
  {
    title: "Data Recovery & Backup",
    description: "Secure solutions for critical business and personal data.",
    icon: "💾",
    features: [
      "Hard Drive Recovery",
      "Cloud Backup Solutions",
      "Automated Backup Systems",
      "Raid Recovery",
      "Emergency Data Recovery"
    ],
    pricing: [
      { service: "Basic Data Recovery", price: "From $149", description: "For accessible hard drives" },
      { service: "Advanced Data Recovery", price: "From $299", description: "For damaged storage media" },
      { service: "RAID Recovery", price: "From $499", description: "For server RAID arrays" },
      { service: "Cloud Backup Setup", price: "From $99", description: "Automated offsite backup" },
      { service: "Business Continuity Plan", price: "From $599", description: "Comprehensive backup strategy" }
    ],
    category: "both",
    longDescription: "Our data recovery and backup services help both businesses and individuals protect their valuable information and recover from data loss situations. We use advanced tools and techniques to retrieve data from damaged or corrupted storage media, including hard drives, SSDs, memory cards, and RAID arrays. We also implement robust backup solutions to prevent future data loss, with options for both local and cloud-based backups that run automatically."
  },
  {
    title: "Smart Home & Devices",
    description: "Setup and support for all your connected devices.",
    icon: "🏠",
    features: [
      "Smart Watch Repairs",
      "Earbud/Headphone Fixes",
      "Voice Assistant Setup",
      "Smart Home Configuration",
      "IoT Device Support"
    ],
    pricing: [
      { service: "Smart Watch Repair", price: "From $69", description: "Battery and screen replacements" },
      { service: "Earbud/Headphone Repair", price: "From $49", description: "Fix audio and charging issues" },
      { service: "Smart Home Setup", price: "From $99", description: "Voice assistants and hub configuration" },
      { service: "Smart Lighting Installation", price: "From $129", description: "Connected lighting systems" },
      { service: "Multi-device Integration", price: "From $179", description: "Creating seamless smart home ecosystems" }
    ],
    category: "residential",
    longDescription: "Our smart home and device services help you get the most from your connected technology. We repair and support a wide range of smart devices including watches, earbuds, speakers, and home automation systems. Our technicians can set up and configure voice assistants like Amazon Alexa and Google Home, integrate smart lighting, thermostats, security systems, and other IoT devices. We also offer custom solutions to create a seamless connected home experience."
  },
  {
    title: "Business IT Consulting",
    description: "Strategic technology guidance for your organization.",
    icon: "📊",
    features: [
      "IT Strategy Development",
      "Technology Assessment",
      "Cost Optimization",
      "Vendor Management",
      "Compliance Solutions"
    ],
    pricing: [
      { service: "IT Assessment", price: "$499", description: "Comprehensive technology evaluation" },
      { service: "Technology Roadmap", price: "$999", description: "Strategic planning for 1-3 years" },
      { service: "Vendor Selection", price: "From $599", description: "Find the right technology partners" },
      { service: "Compliance Audit", price: "From $1,299", description: "Ensure regulatory compliance" },
      { service: "IT Budget Planning", price: "From $799", description: "Optimize technology spending" }
    ],
    category: "business",
    longDescription: "Our IT consulting services provide strategic guidance to help businesses make informed technology decisions. We work with organizations of all sizes to develop IT strategies that align with business goals, optimize technology investments, and implement solutions that drive growth and efficiency. Our consultants have extensive experience across various industries and can help with everything from technology assessments to compliance requirements and digital transformation initiatives."
  },
  {
    title: "Remote Support Options",
    description: "Get help without leaving your home or office.",
    icon: "🌐",
    features: [
      "Remote Diagnostics",
      "Software Installation",
      "Security Scanning",
      "System Optimization",
      "Quick Problem Resolution"
    ],
    pricing: [
      { service: "Quick Fix Session", price: "$39", description: "30-minute remote support" },
      { service: "Standard Remote Support", price: "$70/hr", description: "For general issues" },
      { service: "Remote System Cleanup", price: "$89", description: "Performance optimization" },
      { service: "Software Installation", price: "From $49", description: "Remote setup and configuration" },
      { service: "Security Scan & Cleanup", price: "$79", description: "Identify and remove threats" }
    ],
    category: "both",
    longDescription: "Our remote support services provide convenient assistance without requiring an in-person visit. Using secure connection tools, our technicians can access your computer remotely to diagnose and fix a wide range of issues. This is ideal for software problems, system optimization, malware removal, and general troubleshooting. Remote support offers a fast response time and is often more cost-effective than on-site visits for many common computer problems."
  }
];

interface ServiceDetail {
  title: string;
  description: string;
  icon: string;
  features: string[];
  pricing: { service: string; price: string; description: string; }[];
  category: string;
  longDescription: string;
}

export default function ServicesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const filteredServices = servicesDetail.filter(service => {
    if (categoryFilter === 'all') return true;
    return service.category === categoryFilter || service.category === 'both';
  });

  return (
    <div className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header Banner */}
      <div className="relative py-24 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive technology solutions for businesses and individuals
          </p>
        </div>
      </div>
      
      {/* Filter Section */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm">
              <button 
                onClick={() => setCategoryFilter('all')}
                className={`px-6 py-3 text-sm font-medium ${categoryFilter === 'all' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'} border border-blue-600 rounded-l-lg hover:bg-blue-700 hover:text-white transition duration-300`}
              >
                All Services
              </button>
              <button 
                onClick={() => setCategoryFilter('business')}
                className={`px-6 py-3 text-sm font-medium ${categoryFilter === 'business' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'} border-t border-b border-r border-blue-600 hover:bg-blue-700 hover:text-white transition duration-300`}
              >
                Business & MSP
              </button>
              <button 
                onClick={() => setCategoryFilter('residential')}
                className={`px-6 py-3 text-sm font-medium ${categoryFilter === 'residential' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'} border-t border-b border-r border-blue-600 rounded-r-lg hover:bg-blue-700 hover:text-white transition duration-300`}
              >
                Residential
              </button>
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div 
                key={index}
                className={`bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-4 w-4 mt-0.5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto">
                    <button
                      onClick={() => setActiveService(service)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                    >
                      View Details & Pricing
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Service Details Modal */}
      {activeService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{activeService.title}</h2>
              <button 
                onClick={() => setActiveService(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">About This Service</h3>
                <p className="text-gray-700 leading-relaxed">{activeService.longDescription}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Pricing Information</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activeService.pricing.map((item, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-4">* Prices may vary based on specific requirements and complexity. Contact us for a personalized quote.</p>
              </div>
              
              <div className="mt-8 flex justify-center">
                <a 
                  href="#contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 mr-4"
                >
                  Book This Service
                </a>
                <button 
                  onClick={() => setActiveService(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services, policies, and procedures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What areas do you serve?</h3>
              <p className="text-gray-600">We serve Long Beach and surrounding areas in Los Angeles County, including Lakewood, Signal Hill, Seal Beach, Los Alamitos, and nearby communities. For businesses, we offer remote support throughout Southern California.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer same-day service?</h3>
              <p className="text-gray-600">Yes, we offer same-day service for many issues, depending on our current schedule and the urgency of your situation. Emergency support is available for critical business situations with priority scheduling.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What is your warranty policy?</h3>
              <p className="text-gray-600">All repairs come with a 90-day warranty on parts and labor. If any issue arises with our repair within this period, we will fix it at no additional charge. Some services may have different warranty terms, which will be clearly explained.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do I need to bring my device to you?</h3>
              <p className="text-gray-600">We offer both on-site service at your home or business and drop-off options. For many computer issues, we can also provide remote support, accessing your system securely over the internet with your permission.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How does the MSP service work?</h3>
              <p className="text-gray-600">Our Managed Service Provider plans provide comprehensive IT support for businesses on a monthly subscription basis. This includes proactive monitoring, regular maintenance, help desk support, security management, and strategic guidance.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What forms of payment do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, cash, and digital payment methods like PayPal and Venmo. For businesses, we can also accommodate purchase orders and net payment terms with approved credit.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation or to schedule a service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:2133496790"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (213) 349-6790
            </a>
            <a 
              href="mailto:support@lbcomputerhelp.com"
              className="bg-transparent hover:bg-blue-700 text-white border border-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}