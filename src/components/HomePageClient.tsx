"use client"; // Mark as Client Component

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
import ParallaxEffect from "@/components/ParallaxEffect";
import ServiceAssessmentModal from "@/components/ServiceAssessmentModal";

// Declare gtag_report_conversion function for TypeScript
declare global {
  interface Window {
    gtag_report_conversion: (url?: string) => void;
  }
}

// Define the interface for service data
interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
  category: string;
}

// Define the props for the client component
interface HomePageClientProps {
  services: Service[];
  testimonials: Testimonial[];
}

export default function HomePageClient({ services, testimonials }: HomePageClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("all");
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // State for submission feedback
  const [heroBackground, setHeroBackground] = useState('');

  useEffect(() => {
    const images = [
      '/images/hero-background-new.png', // Original image
      '/images/hero-ab-test-smartservices-1.jpg', // New image 1
      '/images/hero-ab-test-smartservices-2.jpg', // New image 2
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    setHeroBackground(images[randomIndex]);
  }, []);

  // Handle page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter services based on selected category
  const filteredServices =
    serviceFilter === "all"
      ? services
      : services.filter((service) => service.category === serviceFilter);

  // Handle form submission click
  const handleFormSubmitClick = () => {
    setFormSubmitted(true); // Set submitted state
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion();
    }
    // Note: Actual submission is handled by Formspree via form action
    // We just provide feedback here.
  };


  return (
    <div
      className={`min-h-screen font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center bg-gradient-to-r from-primary-dark via-primary to-primary-light">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${heroBackground}')`, // Use state variable
              mixBlendMode: "overlay",
              opacity: 0.4,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark"></div>
          <FloatingShapes />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <FadeIn direction="up">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5">
                  <span className="text-white">Smart Services</span>
                  <span className="text-white"> IT</span>
                  <br />
                  <TypewriterEffect
                    texts={[
                      "We Fix Technology. It's As Simple As That.",
                      "Home & Business Computer Repair",
                      "Expert IT Support",
                    ]}
                    className="text-3xl md:text-4xl lg:text-5xl text-white"
                  />
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                  We come to you in 2 hours. We fix all major issues. Smart Services America offers same-day computer repair solutions.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <a
                  href="tel:8003865777"
                  className="inline-flex items-center px-8 py-4 bg-[#f97316] text-white rounded-lg font-semibold hover:bg-[#ea580c] transform hover:scale-105 transition-all duration-300 shadow-lg mb-6 border-2 border-white"
                >
                  <svg
                    className="w-6 h-6 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  (800) 386-5777
                </a>

                <div className="mb-8 flex flex-col md:flex-row gap-4 md:gap-6">
                  <p className="flex items-center text-white">
                    <span className="flex items-center justify-center bg-green-500 text-white rounded-full w-5 h-5 mr-2 text-xs">
                      ✓
                    </span>
                    <span className="font-medium">Same-Day Service</span>
                  </p>
                  <p className="flex items-center text-white">
                    <span className="flex items-center justify-center bg-green-500 text-white rounded-full w-5 h-5 mr-2 text-xs">
                      ✓
                    </span>
                    <span className="font-medium">Transparent Pricing</span>
                  </p>
                  <p className="flex items-center text-white">
                    <span className="flex items-center justify-center bg-green-500 text-white rounded-full w-5 h-5 mr-2 text-xs">
                      ✓
                    </span>
                    <span className="font-medium">100% Guaranteed</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 sm:flex-row">
                  <Link
                    href="/services"
                    className="px-8 py-4 bg-[#2563eb] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center border-2 border-white"
                  >
                    <span>View Services & Pricing</span>
                    <svg
                      className="w-5 h-5 ml-2 animate-bounce-x"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={() => setIsAssessmentOpen(true)}
                    className="px-8 py-4 bg-[#f97316] text-white rounded-lg font-semibold hover:bg-[#ea580c] transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center border-2 border-white"
                  >
                    <span>IT Assessment</span>
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </button>
                    </div>
                  </FadeIn>

                  <FadeIn direction="up" delay={0.3}>
                    <div className="mt-12">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex -space-x-2">
                          <Image
                            src="/images/testimonials/client1.jpg"
                            alt="Happy client testimonial for Smart Services IT" // Keep alt text for now
                            width={48}
                            height={48}
                            className="rounded-full border-2 border-white"
                          />
                          <Image
                            src="/images/testimonials/client2.jpg"
                            alt="Satisfied client of Smart Services IT" // Keep alt text for now
                            width={48}
                            height={48}
                            className="rounded-full border-2 border-white"
                          />
                          <Image
                            src="/images/testimonials/client3.jpg"
                            alt="Client review for Smart Services IT services" // Keep alt text for now
                            width={48}
                            height={48}
                            className="rounded-full border-2 border-white"
                          />
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className="w-5 h-5 text-yellow-400" // Keep yellow stars
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-gray-300">
                            Trusted by businesses across New York and beyond
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                <div className="hidden lg:block">
                  <FadeIn direction="left">
                    <div className="relative">
                      <div className="absolute inset-0 transform translate-x-6 translate-y-6">
                        <div className="h-full w-full rounded-xl bg-primary opacity-20"></div> // Styled with primary color
                      </div>
                      <div className="relative z-10 bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-6 bg-primary text-white"> // Styled with primary color
                          <h3 className="text-2xl font-bold mb-1">
                            Request IT Support // Keep text for now
                          </h3>
                          <p className="text-white"> // Styled with white text
                            Fill out the form for a quick response // Keep text for now
                          </p>
                        </div>
                        <div className="p-6">
                          <form
                            action="https://formspree.io/f/smartservicesit" 
                            method="POST"
                          >
                            {/* Redirect back to our site after submission */}
                            <input
                              type="hidden"
                              name="_next"
                              value="https://smartservicesit.store/thanks" // Keep redirect for now
                            />

                            <div className="space-y-4">
                              <div>
                                <label
                                  htmlFor="name"
                                  className="block text-sm font-medium text-gray-700 mb-1" // Keep gray text for labels
                                >
                                  Name <span className="text-red-500">*</span> // Keep red asterisk
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  required
                                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary" // Styled with primary focus color
                                  placeholder="Your name" // Keep placeholder
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-700 mb-1" // Keep gray text for labels
                                >
                                  Email <span className="text-red-500">*</span> // Keep red asterisk
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  required
                                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary" // Styled with primary focus color
                                  placeholder="Your email" // Keep placeholder
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="phone"
                                  className="block text-sm font-medium text-gray-700 mb-1" // Keep gray text for labels
                                >
                                  Phone <span className="text-red-500">*</span> // Keep red asterisk
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  required
                                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary" // Styled with primary focus color
                                  placeholder="Your phone number" // Keep placeholder
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="help"
                                  className="block text-sm font-medium text-gray-700 mb-1" // Keep gray text for labels
                                >
                                  How can we help? <span className="text-red-500">*</span> // Keep red asterisk
                                </label>
                                <textarea
                                  id="help"
                                  name="message"
                                  rows={3}
                                  required
                                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary" // Styled with primary focus color
                                  placeholder="Briefly describe your issue" // Keep placeholder
                                ></textarea>
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="mt-6 w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-md" // Styled with primary color
                              onClick={handleFormSubmitClick} // Keep click handler
                            >
                              Submit Request // Keep button text
                            </button>
                            {formSubmitted && (
                              <p className="mt-4 text-sm text-green-600"> // Keep green text
                                Thank you! Your request is being submitted. You will be redirected shortly. // Keep text
                              </p>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-gray-900/5 shadow-lg rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary" // Styled with primary color
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our IT Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From hardware assistance to managed IT solutions, we provide
                comprehensive tech services for businesses and individuals in
                Hicksville, New York and surrounding areas.
              </p>
            </FadeIn>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setServiceFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  serviceFilter === "all"
                    ? "bg-primary text-white" // Styled with primary color
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all duration-300`}
              >
                All Services
              </button>
              <button
                onClick={() => setServiceFilter("business")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  serviceFilter === "business"
                    ? "bg-primary text-white" // Styled with primary color
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all duration-300`}
              >
                Business IT
              </button>
              <button
                onClick={() => setServiceFilter("support")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  serviceFilter === "support"
                    ? "bg-primary text-white" // Styled with primary color
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all duration-300`}
              >
                IT Support
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <FadeIn key={service.title} direction="up" delay={index * 0.1}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                />
              </FadeIn>
            ))}
          </div>

          <div className="mt-14 text-center">
            <FadeIn direction="up">
              <Link
                href="/services"
                className="inline-flex items-center px-6 py-3 bg-[#2563eb] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all transform hover:scale-105 duration-300 shadow-md border-2 border-white"
              >
                View All Services
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <ParallaxEffect>
                <div className="relative">
                  <div className="absolute inset-0 transform translate-x-4 translate-y-4 rounded-2xl bg-blue-500 opacity-20"></div>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src="/images/team/technician1.jpg"
                      alt="Smart Services IT team providing expert tech support"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </ParallaxEffect>
            </div>

            <div className="lg:w-1/2">
              <FadeIn direction="right">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  About Smart Services America
                </h2> // Updated heading text
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    Welcome to Smart Services America, where technology meets personalized service. Based in Hicksville, New York, we are committed to delivering top-quality tech support and IT solutions to businesses and individuals alike. With a focus on reliability, efficiency, and customer satisfaction, we aim to provide services that empower our clients to navigate the digital world with ease.
                  </p> // Updated text content
                  <p>
                    At Smart Services America, we specialize in a range of IT services tailored to meet the unique needs of our clients. Whether it’s troubleshooting technical issues, setting up advanced systems, or providing ongoing IT support, our team of experts is here to ensure that your technology works seamlessly. We are passionate about solving complex tech problems while offering the best customer experience.
                  </p> // Updated text content
                  <p>
                    Smart Services America offers comprehensive IT support that’s more cost-effective than maintaining an in-house team. We’re here for you 24/7, delivering fast, reliable service. We respond within minutes, not hours or days, ensuring that your business operations remain smooth and uninterrupted. As an external team with diverse resources, we provide more reliability and flexibility than relying on a single in-house IT staff member.
                  </p> // Updated text content
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center"> // Styled with primary-light color
                        <svg
                          className="w-6 h-6 text-primary-dark" // Styled with primary-dark color
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Expertise</h3> // Updated text
                      <p className="text-gray-500 text-sm"> // Keep gray text
                        Our team brings years of experience and technical know-how to every job, ensuring that you get the best possible solutions. // Updated text
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center"> // Styled with primary-light color
                        <svg
                          className="w-6 h-6 text-primary-dark" // Styled with primary-dark color
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Customer-Centric Approach</h3> // Updated text
                      <p className="text-gray-500 text-sm"> // Keep gray text
                        We believe in building long-lasting relationships with our clients, offering personalized services tailored to their unique needs. // Updated text
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center"> // Styled with primary-light color
                        <svg
                          className="w-6 h-6 text-primary-dark" // Styled with primary-dark color
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.161M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.161m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Prompt and Efficient Service</h3> // Updated text
                      <p className="text-gray-500 text-sm"> // Keep gray text
                        Whether it's a quick fix or a complex IT project, we work swiftly and efficiently to get you back on track. // Updated text
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center"> // Styled with primary-light color
                        <svg
                          className="w-6 h-6 text-primary-dark" // Styled with primary-dark color
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Affordable Solutions</h3> // Updated text
                      <p className="text-gray-500 text-sm"> // Keep gray text
                        High-quality tech support shouldn’t break the bank. We provide top-notch services at competitive prices. // Updated text
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients have to
                say about our IT services.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up">
            <TestimonialCarousel testimonials={testimonials} />
          </FadeIn>

          <div className="mt-16 text-center">
            <RevealText>
              <div className="inline-block bg-white rounded-xl p-6 shadow-lg">
                <p className="font-semibold text-xl mb-3">
                  Ready to experience reliable IT support?
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-[#f97316] text-white rounded-lg font-semibold hover:bg-[#ea580c] transition-all duration-300 border-2 border-white"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/services"
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300" // Keep gray button
                  >
                    View Services
                  </Link>
                </div>
              </div>
            </RevealText>
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
                We believe in transparency, expertise, and dependable computer help in Hicksville and across New York.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Pricing */}
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> // Styled with primary color
                <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3> // Keep text
                 <ul className="text-gray-600 space-y-1 text-left px-4 flex-grow"> // Keep gray text
                  <li><strong>Diagnostic Assessment:</strong> $99 flat fee for computer issue diagnostics</li> // Keep text
                  <li><strong>Hourly Support Rates:</strong> $125/hour for computer assistance, configuration, and optimization services</li> // Keep text
                  <li><strong>IT Consultation Services:</strong> $150/hour for expert IT consulting and strategy</li> // Keep text
                </ul>
                 <p className="text-gray-500 text-sm mt-4">Upfront, transparent pricing. Diagnostic assessment for a flat fee of $99. Hourly rates for assistance, configuration, and optimization at $125/hour. IT consultation at $150/hour. No hidden fees, just clear, competitive rates for New York IT services.</p> // Keep text
              </div>
            </FadeIn>

            {/* Credentials */}
             <FadeIn direction="up" delay={0.2}>
               <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg> // Styled with primary color
                <h3 className="text-xl font-semibold mb-2">Local & Certified</h3> // Keep text
                 <div className="text-gray-600 flex-grow"> // Keep gray text
                   <p>Your trusted New York computer experts.</p> // Keep text
                   <p>Located at 123 Main Street, Hicksville, NY 11801.</p> // Keep text
                   <p>Call us at (800) 386-5777 for certified and insured IT support.</p>
                   <p className="mt-2">Proudly serving the New York community since 2015.</p> // Keep text
                 </div>
               </div>
             </FadeIn>

             {/* Disclaimer */}
             <FadeIn direction="up" delay={0.3}>
               <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> // Styled with primary color
                <h3 className="text-xl font-semibold mb-2">Independent Service Provider</h3> // Keep text
                <p className="text-gray-600 text-sm flex-grow"> // Keep gray text
                  Independent and unbiased IT service provider. Smart Services IT offers expert tech assistance and guidance, independent of any hardware or software vendor affiliations. We provide unbiased recommendations based on industry best practices and tailored solutions for your specific needs in New York and beyond. // Keep text
                </p>
               </div>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Need technical support or have questions about our services?
                We're here to help.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <FadeIn direction="right">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-primary rounded-full p-3"> // Styled with primary color
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white" // Keep white text
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3> // Keep text
                      <p className="text-gray-300">(213) 349-6790</p> // Keep text
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-primary rounded-full p-3"> // Styled with primary color
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white" // Keep white text
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3> // Keep text
                      <p className="text-gray-300">
                        support@smartservicesit.store // Keep text
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-primary rounded-full p-3"> // Styled with primary color
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white" // Keep white text
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Address</h3> // Keep text
                      <p className="text-gray-300">
                        123 Main Street
                        <br />
                        Hicksville, NY 11801 // Keep text
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-primary rounded-full p-3"> // Styled with primary color
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white" // Keep white text
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Business Hours</h3> // Keep text
                      <p className="text-gray-300">
                        Monday-Friday: 6 AM - 6 PM
                        <br />
                        Saturday: 6 AM - 6 PM
                        <br />
                        Sunday: Closed // Keep text
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div
              className={`bg-gray-800 rounded-xl p-8 shadow-lg transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3> // Keep text

              <form action="https://formspree.io/f/smartservicesit" method="POST"> // Keep form action
                {/* Redirect back to our site after submission */}
                <input
                  type="hidden"
                  name="_next"
                  value="https://smartservicesit.store/thanks"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="contact_name"
                      className="block text-sm font-medium text-gray-300 mb-1" // Keep gray text
                    >
                      Name // Keep text
                    </label>
                    <input
                      type="text"
                      id="contact_name"
                      name="name"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" // Styled with primary focus color
                      placeholder="Your name" // Keep placeholder
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact_email"
                      className="block text-sm font-medium text-gray-300 mb-1" // Keep gray text
                    >
                      Email // Keep text
                    </label>
                    <input
                      type="email"
                      id="contact_email"
                      name="email"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" // Styled with primary focus color
                      placeholder="Your email" // Keep placeholder
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contact_phone"
                    className="block text-sm font-medium text-gray-300 mb-1" // Keep gray text
                  >
                    Phone // Keep text
                  </label>
                  <input
                    type="tel"
                    id="contact_phone"
                    name="phone"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" // Styled with primary focus color
                      placeholder="Your phone number" // Keep placeholder
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="contact_service"
                      className="block text-sm font-medium text-gray-300 mb-1" // Keep gray text
                    >
                      Service Needed // Keep text
                    </label>
                    <select
                      id="contact_service"
                      name="service"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" // Styled with primary focus color
                    >
                      <option value="">Select a service</option> // Keep options
                      <option>Managed IT Services (MSP)</option>
                      <option>Computer Services</option>
                      <option>Network & Server Support</option>
                      <option>Business IT Consulting</option>
                      <option>Smartphone/Tablet Assistance</option>
                      <option>Data Solutions</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="contact_message"
                      className="block text-sm font-medium text-gray-300 mb-1" // Keep gray text
                    >
                      Message // Keep text
                    </label>
                    <textarea
                      id="contact_message"
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" // Styled with primary focus color
                      placeholder="Describe your issue or question" // Keep placeholder
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300 flex items-center justify-center" // Styled with primary color
                  >
                    Request IT Support // Keep button text
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Service Assessment Modal */}
        <ServiceAssessmentModal
          isOpen={isAssessmentOpen}
          onClose={() => setIsAssessmentOpen(false)}
        />
      </div>
    );
  }
