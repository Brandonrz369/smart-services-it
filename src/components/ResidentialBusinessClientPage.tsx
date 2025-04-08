"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FloatingShapes from "@/components/FloatingShapes";
import TypewriterEffect from "@/components/TypewriterEffect";
import ServiceCard from "@/components/ServicesCard";
import TestimonialCarousel, {
  Testimonial,
} from "@/components/TestimonialCarousel";
import RevealText from "@/components/RevealText";

// Define the props if needed, though this component might not need props initially
// interface ResidentialBusinessClientPageProps {}

export default function ResidentialBusinessClientPage(/* props: ResidentialBusinessClientPageProps */) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Selected Safe Testimonials
  const testimonials: Testimonial[] = [
     {
      text: "I am beyond impressed with the service I received from Brandon at LB Computer Help. He went above and beyond to find the perfect router for our office that could prioritize our fax machine and phones. Since the new setup, we've already noticed a significant improvement in call quality.",
      name: "Alondra S.",
      role: "Office Manager",
      image: "/images/testimonials/client1.jpg",
      source: "google",
    },
    {
      text: "I had such a great experience with LB Computer Help! My laptop was running super slow, and I needed it fixed ASAP. They were able to diagnose the issue quickly and optimize my system, making it run like new again. The service was fast, professional, and hassle-free.",
      name: "Judith C.",
      role: "Small Business Owner",
      image: "/images/testimonials/client4.jpg",
      source: "nextdoor",
    },
    // Add more compliant testimonials if available
  ];

  // Revised Compliant Service Definitions (Problem/Solution Focused)
  const services = [
    {
      title: "Mac/PC Screen Problems?", // Slightly broader title
      description: "Cracked screen, dim display, flickering, or other physical concerns? We offer expert diagnostics & discuss configuration/component options.", // More direct about physical issues
      icon: "🖥️",
      features: ["Cracked/Damaged Screen Assessment", "Display Issue Diagnostics", "Configuration Options", "Component Consultation", "Transparent Quotes"], // More specific features
      category: "hardware",
    },
    {
      title: "Laptop Battery Draining Fast?",
      description: "Extend your device's life with battery performance assessment and optimization.",
      icon: "🔋",
      features: ["Battery Health Check", "Performance Optimization", "Power Setting Config", "Longevity Tips"],
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
      icon: "🛡️", // Changed icon
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
      icon: "🧩", // Changed icon
      features: ["Software Installation", "Configuration Help", "Compatibility Checks", "Troubleshooting Assistance"],
      category: "software",
    },
     {
      title: "Considering Hardware Upgrades?",
      description: "Need new components installed or configured? We offer professional assessment and installation.",
      icon: "⚙️",
      features: ["Component Assessment", "Installation Service", "Configuration & Testing", "Compatibility Guidance"],
      category: "hardware",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Hero Section - Revised */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
           <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero-background.jpg')",
              mixBlendMode: "overlay",
              opacity: 0.4,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900"></div>
          <FloatingShapes />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white">
              Long Beach Computer Help: <br /> Expert Assistance for Your Tech Challenges
            </h1>
            <div className="text-2xl md:text-3xl lg:text-4xl text-blue-200 mb-6">
               <TypewriterEffect
                  texts={[
                    "Device Diagnostics",
                    "System Optimization",
                    "Hardware Configuration",
                    "Network Setup",
                    "Data Consultation",
                    "Security Assessment",
                  ]}
                  className="text-2xl md:text-3xl lg:text-4xl text-blue-200"
                />
            </div>
            <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Facing computer troubles in Long Beach? From slow Macs and PCs to screen issues, battery drain, or network problems, LB Computer Help offers expert diagnostics, configuration, optimization, and consultation services. Get reliable, local computer help with transparent pricing.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
             <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="#services"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center"
                >
                  <span>Explore Solutions</span>
                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </Link>
                <Link
                  href="#contact"
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center"
                >
                  <span>Get Diagnostic Quote</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </Link>
              </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Section - Revised */}
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Solutions for Common Computer Problems in Long Beach
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide expert diagnostics, configuration, and optimization services for a wide range of computer issues faced by Long Beach residents and businesses.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> {/* Changed to 4 columns for better fit */}
            {services.map((service, index) => (
              <FadeIn key={service.title} direction="up" delay={index * 0.05}> {/* Reduced delay */}
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

       {/* Trust & Transparency Section */}
      <section id="trust" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Reliable Service & Clear Pricing
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We believe in transparency, expertise, and dependable computer help in Long Beach.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Pricing */}
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                <ul className="text-gray-600 space-y-1 text-left px-4 flex-grow">
                  <li><strong>Diagnostic Assessment:</strong> $99 (Flat Fee)</li>
                  <li><strong>Hourly Assistance/Config/Optimization:</strong> $125/hour</li>
                  <li><strong>IT Consultation:</strong> $150/hour</li>
                  <li><strong>Device Setup Services:</strong> Starting at $199</li>
                </ul>
                 <p className="text-gray-500 text-sm mt-4">Clear quotes provided before work begins.</p>
              </div>
            </FadeIn>

            {/* Credentials */}
             <FadeIn direction="up" delay={0.2}>
               <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                <h3 className="text-xl font-semibold mb-2">Local & Certified</h3>
                 <div className="text-gray-600 flex-grow">
                   <p>LB Computer Help</p>
                   <p>927 Magnolia Ave #2, Long Beach, CA 90813</p>
                   <p>(213) 349-6790</p>
                   <p className="mt-2">Serving Long Beach Since 2018</p>
                   {/* Add Certification Badges/Text Here if applicable */}
                 </div>
               </div>
             </FadeIn>

             {/* Disclaimer */}
             <FadeIn direction="up" delay={0.3}>
               <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <h3 className="text-xl font-semibold mb-2">Independent Service Provider</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  LB Computer Help is an independent company providing expert tech assistance and guidance. We are not affiliated with Microsoft, Apple, Dell, HP, or any other hardware or software provider. Our recommendations are based on industry best practices and your specific needs.
                </p>
               </div>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Hear From Your Long Beach Neighbors
              </h2>
            </FadeIn>
          </div>
          <FadeIn direction="up">
            <TestimonialCarousel testimonials={testimonials} />
          </FadeIn>
        </div>
      </section>

      {/* Contact Section - Revised */}
      <section id="contact" className="py-20 px-4 bg-gray-900 text-white">
         <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get Professional Computer Help in Long Beach Today
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Ready for solutions? Contact us for a consultation or assessment quote. We offer reliable computer help near you.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             {/* Contact Info Column */}
             <div>
               <FadeIn direction="right">
                  <div className="space-y-8">
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                      </div>
                      <div><h3 className="font-semibold text-lg">Phone</h3><p className="text-gray-300">(213) 349-6790</p></div>
                    </div>
                    {/* Email */}
                     <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                       </div>
                       <div><h3 className="font-semibold text-lg">Email</h3><p className="text-gray-300">support@lbcomputerhelp.com</p></div>
                     </div>
                     {/* Address */}
                     <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                       </div>
                       <div><h3 className="font-semibold text-lg">Address</h3><p className="text-gray-300">927 Magnolia Ave #2<br />Long Beach, CA 90813</p></div>
                     </div>
                     {/* Hours */}
                     <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                       </div>
                       <div><h3 className="font-semibold text-lg">Business Hours</h3><p className="text-gray-300">Mon-Sat: 6 AM - 6 PM<br />Sunday: Closed</p></div>
                     </div>
                  </div>
               </FadeIn>
             </div>

             {/* Form Column - Quick Inquiry */}
             <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
               <h3 className="text-2xl font-bold mb-6 text-white">Quick Inquiry</h3>
               <form action="https://formspree.io/f/xzzeddgr" method="POST">
                 <input type="hidden" name="_next" value="https://lbcomputerhelp.com/thanks" />
                 <input type="hidden" name="page_source" value="Residential-Business Quick Form" />

                 <div className="space-y-4">
                   <div>
                     <label htmlFor="quick_name_rb" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                     <input type="text" id="quick_name_rb" name="name" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
                   </div>
                   <div>
                     <label htmlFor="quick_email_rb" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                     <input type="email" id="quick_email_rb" name="email" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your email" />
                   </div>
                   <div>
                     <label htmlFor="quick_phone_rb" className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                     <input type="tel" id="quick_phone_rb" name="phone" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your phone number" />
                   </div>
                   <div>
                     <label htmlFor="quick_help_rb" className="block text-sm font-medium text-gray-300 mb-1">How can we help?</label>
                     <textarea id="quick_help_rb" name="message" rows={3} required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Briefly describe your issue"></textarea>
                   </div>
                 </div>
                 <button type="submit" className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300 flex items-center justify-center">
                   Submit Inquiry
                 </button>
               </form>
             </div>
           </div>
         </div>
      </section>
    </div>
  );
}
