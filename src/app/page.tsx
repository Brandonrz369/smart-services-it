'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import FloatingShapes from '@/components/FloatingShapes';
import TypewriterEffect from '@/components/TypewriterEffect';
import ServiceCard from '@/components/ServicesCard';
// import StatsSection from '@/components/StatsSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import RevealText from '@/components/RevealText';
import ParallaxEffect from '@/components/ParallaxEffect';
import SimpleMobileNav from '@/components/SimpleMobileNav';
import ServiceAssessmentModal from '@/components/ServiceAssessmentModal';

// Schema markup for SEO
function BusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "LB Computer Help",
          "image": "",
          "@id": "",
          "url": "https://lbcomputerhelp.com",
          "telephone": "(213) 349-6790",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "927 Magnolia Ave #2",
            "addressLocality": "Long Beach",
            "addressRegion": "CA",
            "postalCode": "90813",
            "addressCountry": "US"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "06:00",
              "closes": "18:00"
            }
          ],
          "sameAs": ["https://facebook.com/lbcomputerhelp", "https://instagram.com/lbcomputerhelp"]
        })
      }}
    />
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [serviceFilter, setServiceFilter] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  
  // Handle page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Basic scroll handler for header transparency
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xzzeddgr', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success
        setIsSubmitting(false);
        alert("Thank you for your message! We'll get back to you shortly.");
        form.reset();
      } else {
        // Error
        const data = await response.json();
        throw new Error(data.error || 'Form submission failed');
      }
    } catch (error) {
      setIsSubmitting(false);
      alert(`Error: ${error instanceof Error ? error.message : 'Something went wrong'}`);
    }
  };
  
  const testimonials = [
    {
      text: "I am beyond impressed with the service I received from Brandon at LB Computer Help. He went above and beyond to find the perfect router for our office that could prioritize our fax machine and phones. Since the new setup, we've already noticed a significant improvement in call quality.",
      name: "Alondra S.",
      role: "Office Manager"
    },
    {
      text: "As a boutique law firm handling sensitive client information daily, finding reliable IT support is critical. When we experienced a server failure before a major trial, Brandon responded immediately. The recovery was completed ahead of schedule, allowing our legal team to access critical documents well before our court deadline.",
      name: "Jonathan H.",
      role: "Visionary Law Group"
    },
    {
      text: "Brandon was super kind and helpful! He fixed my printer issues which I was having for about 3 weeks in just 30 minutes! He not only was super helpful but also walked me through the process so I can fix it on my own next time.",
      name: "Emma R.",
      role: "Residential Client"
    },
    {
      text: "I had such a great experience with LB Computer Help! My laptop was running super slow, and I needed it fixed ASAP. They were able to diagnose the issue quickly and optimize my system, making it run like new again. The service was fast, professional, and hassle-free.",
      name: "Judith C.",
      role: "Small Business Owner"
    },
    {
      text: "I'm so impressed with their data recovery service. After my hard drive failed, I thought all my files were gone for good, but they managed to recover everything quickly. I'm so relieved to have my data back.",
      name: "Luke T.",
      role: "Photographer"
    }
  ];

  const services = [
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

  // Stats - removed from display as requested

  return (
    <div className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Sticky Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className={`font-bold text-xl ${isScrolled ? 'text-blue-600' : 'text-white'}`}>LB Computer Help</span>
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#services" 
              className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-500 transition-colors font-medium`}
            >
              Services
            </a>
            <Link 
              href="/blog" 
              className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-500 transition-colors font-medium`}
            >
              Blog
            </Link>
            <Link 
              href="/emergency" 
              className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-orange-400 transition-colors font-medium text-orange-300`}
            >
              Emergency
            </Link>
            <a 
              href="#about" 
              className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-500 transition-colors font-medium`}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium ml-2"
            >
              Contact
            </a>
          </nav>
          <SimpleMobileNav isScrolled={isScrolled} />
        </div>
      </div>
      
      {/* Floating CTA for mobile */}
      <div className="floating-cta md:hidden">
        <a 
          href="tel:2133496790" 
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
          aria-label="Call us"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </a>
      </div>
      {/* Hero Section */}
      <header id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden">
                <Image 
          src="/images/hero-background.jpg" 
          alt="Technology Background" 
          className="absolute inset-0 object-cover z-0" 
          fill
          sizes="100vw"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-blue-900/80 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,rgba(0,0,0,0)_70%)] z-0"></div>
        <FloatingShapes count={8} className="z-0 opacity-30" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <FadeIn direction="down" delay={0.3} duration={0.8}>
            <motion.h1 
              className="text-4xl md:text-6xl mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                delay: 0.5,
                duration: 0.8
              }}
            >
              <span className="hero-title">
                LB Computer Help
              </span>
            </motion.h1>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.6} duration={0.8}>
            <div className="h-16 text-xl md:text-2xl mb-10 font-medium">
              <div className="typewriter-bg text-white">
                <TypewriterEffect 
                  texts={[
                    "Professional IT Support & Repair",
                    "Managed Services for Businesses",
                    "Expert Computer & Mobile Device Repair",
                    "On-Site Support for Home & Office"
                  ]}
                  speed={40}
                  delay={2000}
                  repeat={true}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="tel:2133496790" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (213) 349-6790
              </motion.a>
              <motion.button
                onClick={() => setIsAssessmentOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" />
                </svg>
                Get IT Assessment
              </motion.button>
            </div>
          </FadeIn>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 z-10"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{ x: "-50%" }}
        >
          <motion.a 
            href="#services" 
            className="text-white inline-block"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.a>
        </motion.div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional IT services for businesses and residential clients throughout Long Beach and Los Angeles County
            </p>
            <div className="mt-4 flex flex-col sm:flex-row max-w-3xl mx-auto gap-3">
              <div className="bg-blue-100 border-l-4 border-blue-600 p-4 flex-1 text-left rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-blue-900 font-medium">Complete Managed IT Services for Businesses</p>
                </div>
              </div>
              <div className="bg-orange-100 border-l-4 border-orange-500 p-4 flex-1 text-left rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-orange-800 font-medium">Same-day emergency support available!</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <button 
                onClick={() => setServiceFilter('all')}
                className={`px-4 py-2 text-sm font-medium ${serviceFilter === 'all' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'} border border-blue-600 rounded-l-lg hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500`}
              >
                All Services
              </button>
              <button 
                onClick={() => setServiceFilter('business')}
                className={`px-4 py-2 text-sm font-medium ${serviceFilter === 'business' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'} border-t border-b border-r border-blue-600 hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500`}
              >
                Business (MSP)
              </button>
              <button 
                onClick={() => setServiceFilter('residential')}
                className={`px-4 py-2 text-sm font-medium ${serviceFilter === 'residential' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'} border-t border-b border-r border-blue-600 rounded-r-lg hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500`}
              >
                Residential
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.filter(service => {
              if (serviceFilter === 'all') return true;
              if (serviceFilter === 'business') {
                return ['Managed IT Services (MSP)', 'Network & Server Solutions', 'Business IT Consulting', 'Data Recovery & Backup'].includes(service.title);
              }
              if (serviceFilter === 'residential') {
                return ['Laptop & Desktop Repair', 'Mobile Device Repair', 'Smart Home & Devices', 'Remote Support Options'].includes(service.title);
              }
              return true;
            }).map((service, index) => (
              <div 
                key={index} 
                className={`${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${300 + index * 100}ms`, transition: 'all 0.5s ease' }}
              >
                <ServiceCard 
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/services" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm10.293-4.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L12.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              View Complete Service Catalog
            </a>
          </div>
        </div>
      </section>

      {/* MSP Services Highlight */}
      <section id="business-services" className="py-16 px-4 md:px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium mb-4">MANAGED SERVICES</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete IT Solutions For Your Business</h2>
            <p className="max-w-3xl mx-auto text-gray-300">
              From comprehensive infrastructure management to strategic IT planning, we provide everything your business needs to thrive in today&apos;s digital landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition duration-300">
              <div className="mb-4 text-blue-400 text-3xl">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Security & Compliance</h3>
              <p className="text-gray-300 mb-4">Protect your business with enterprise-grade security solutions and compliance management.</p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 Threat Monitoring
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Data Protection
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Regulatory Compliance
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition duration-300">
              <div className="mb-4 text-blue-400 text-3xl">☁️</div>
              <h3 className="text-xl font-semibold mb-3">Cloud Services</h3>
              <p className="text-gray-300 mb-4">Modernize your business with scalable cloud solutions and Microsoft 365 integration.</p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Microsoft 365 Management
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cloud Migration
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Backup & Disaster Recovery
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition duration-300">
              <div className="mb-4 text-blue-400 text-3xl">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Proactive Support</h3>
              <p className="text-gray-300 mb-4">Prevent issues before they impact your business with our proactive monitoring.</p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 System Monitoring
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Predictive Maintenance
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority Response
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Schedule an IT Consultation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose LB Computer Help?</h2>
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">Trusted by Businesses & Homeowners</div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Personalized Service</h3>
                    <p className="text-gray-600">Direct access to your technician with personalized attention to your unique needs.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Fast Response</h3>
                    <p className="text-gray-600">Mobile and in-home services with rapid response times to minimize your downtime.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Transparent Approach</h3>
                    <p className="text-gray-600">Clear communication, detailed explanations, and no hidden fees.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">90-Day Warranty</h3>
                    <p className="text-gray-600">All our repairs come with a 90-day warranty on parts and labor for your peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xl font-bold rounded-lg px-3 py-1 shadow">
                    <span>5.0</span>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-4">Based on 48 Verified Reviews</p>
              </div>
              
              <div className="h-72">
                <TestimonialCarousel 
                  testimonials={testimonials}
                  autoPlay={true}
                  interval={5000}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Stats Section removed as requested */}

      {/* Areas Served */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <RevealText 
              text="Areas We Serve" 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              delay={0.2}
            />
            <FadeIn direction="up" delay={0.4}>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Providing comprehensive IT services for businesses and residential clients throughout Long Beach and Los Angeles County
              </p>
            </FadeIn>
          </div>
          
          <div className={`bg-gray-50 rounded-xl p-8 shadow transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Long Beach", "Lakewood", "Signal Hill", "Seal Beach", 
                "Los Alamitos", "Carson", "Belmont Shore", "Naples", 
                "Bixby Knolls", "Alamitos Beach", "California Heights", "Wrigley",
                "Downtown Long Beach", "Los Angeles", "Torrance", "Redondo Beach"
              ].map((area, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{area}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Insights Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <RevealText 
              text="Tech Insights & Resources" 
              className="text-3xl md:text-4xl font-bold mb-4"
              delay={0.2}
            />
            <FadeIn direction="up" delay={0.4}>
              <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                Visit our blog for expert advice, tips, and industry insights to help you make informed technology decisions
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.3} direction="up" className="h-full">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                <div className="h-48 relative">
                  <Image
                    src="/images/blog/cybersecurity.jpg"
                    alt="Cybersecurity"
                    className="rounded-t-xl object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center text-white">
                    <span className="text-xl font-bold drop-shadow-md">Security</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">Featured</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Securing Your Small Business in the Digital Age</h3>
                  <p className="text-gray-600 mb-4 flex-grow">Learn essential cybersecurity measures every small business should implement to protect against common threats.</p>
                  <Link href="/blog/securing-your-small-business" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                    Read Article
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.5} direction="up" className="h-full">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                <div className="h-48 relative">
                  <Image
                    src="/images/blog/windows11.jpg"
                    alt="Windows 11 Productivity Features"
                    className="rounded-t-xl object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-orange-500/30 flex items-center justify-center text-white">
                    <span className="text-xl font-bold drop-shadow-md">Productivity</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">10 Windows 11 Features That Will Boost Your Productivity</h3>
                  <p className="text-gray-600 mb-4 flex-grow">Discover hidden Windows 11 features and settings that can significantly improve your daily workflow.</p>
                  <Link href="/blog/windows-11-productivity" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                    Read Article
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.7} direction="up" className="h-full">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                <div className="h-48 relative">
                  <Image
                    src="/images/blog/cloud-storage.jpg"
                    alt="Cloud Storage Solutions"
                    className="rounded-t-xl object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-blue-400/30 flex items-center justify-center text-white">
                    <span className="text-xl font-bold drop-shadow-md">Cloud</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Comparing Cloud Storage Solutions for Businesses</h3>
                  <p className="text-gray-600 mb-4 flex-grow">A comprehensive comparison of popular cloud storage options to help you choose the right one for your business needs.</p>
                  <Link href="/blog/cloud-storage-solutions" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                    Read Article
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-blue-50"
            >
              View All Articles
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-gray-900 text-white relative overflow-hidden">
        <ParallaxEffect speed={0.3} className="absolute inset-0 z-0">
          <FloatingShapes count={8} className="opacity-30" />
        </ParallaxEffect>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <RevealText 
                text="Contact Us" 
                className="text-3xl md:text-4xl font-bold mb-6"
              />
              <p className="text-gray-300 mb-8">
                Need IT support for your business or help with personal technology? We&apos;re just a call, text, or email away.
              </p>
              
              {/* IT Assessment CTA */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-xl p-6 mb-8 shadow-lg">
                <h3 className="text-xl font-bold mb-2">
                  Not sure what service you need?
                </h3>
                <p className="mb-4 text-gray-100">
                  Take our quick IT assessment to get personalized recommendations based on your specific needs.
                </p>
                <button
                  onClick={() => setIsAssessmentOpen(true)}
                  className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Start IT Assessment
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone/Text</h3>
                    <a href="tel:2133496790" className="text-gray-300 hover:text-white transition">(213) 349-6790</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <a href="mailto:support@lbcomputerhelp.com" className="text-gray-300 hover:text-white transition">support@lbcomputerhelp.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-gray-300">927 Magnolia Ave #2<br />Long Beach, CA 90813</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <p className="text-gray-300">Monday-Friday: 6 AM - 6 PM<br />Saturday: 6 AM - 6 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`bg-gray-800 rounded-xl p-8 shadow-lg transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Service Needed</label>
                  <select 
                    id="service" 
                    name="service"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a service</option>
                    <option>Managed IT Services (MSP)</option>
                    <option>Computer Repair</option>
                    <option>Network & Server Support</option>
                    <option>Business IT Consulting</option>
                    <option>Smartphone/Tablet Repair</option>
                    <option>Data Recovery</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={4} 
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your issue or question"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300 flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : "Request IT Support"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Remove spacer div as it was causing the white bar */}
      
      {/* Schema.org markup for search engines */}
      <BusinessJsonLd />
      
      {/* Service Assessment Modal */}
      <ServiceAssessmentModal 
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />
    </div>
  );
}