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
      <section className="relative h-screen min-h-[800px] flex items-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero-background-new.png')",
              mixBlendMode: "overlay",
              opacity: 0.4,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900"></div>
          <FloatingShapes />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <FadeIn direction="up">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5">
                  <span className="text-white">LB</span>
                  <span className="text-orange-400"> Computer</span>
                  <span className="text-white"> Help</span>
                  <br />
                  <TypewriterEffect
                    texts={[
                      "Expert IT Support in Long Beach",
                      "Computer Services for Businesses & Homes",
                      "Reliable Network Solutions",
                    ]}
                    className="text-3xl md:text-4xl lg:text-5xl text-blue-200"
                  />
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                  Your trusted local provider for expert IT support, computer services,
                  and network solutions in Long Beach and Los Angeles County. Fast, reliable, and affordable tech help for homes and businesses.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <a
                  href="tel:2133496790"
                  className="inline-flex items-center text-2xl font-bold text-white mb-6 hover:text-orange-400 transition-colors group"
                >
                  <svg
                    className="w-6 h-6 mr-2 text-orange-400 group-hover:animate-ping"
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
                  (213) 349-6790
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
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center"
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
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center"
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
                        alt="Happy client testimonial for LB Computer Help"
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-white"
                      />
                      <Image
                        src="/images/testimonials/client2.jpg"
                        alt="Satisfied client of LB Computer Help"
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-white"
                      />
                      <Image
                        src="/images/testimonials/client3.jpg"
                        alt="Client review for LB Computer Help services"
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
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-300">
                        Trusted by 200+ businesses in Long Beach
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
                    <div className="h-full w-full rounded-xl bg-orange-500 opacity-20"></div>
                  </div>
                  <div className="relative z-10 bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <h3 className="text-2xl font-bold mb-1">
                        Request IT Support
                      </h3>
                      <p className="text-blue-100">
                        Fill out the form for a quick response
                      </p>
                    </div>
                    <div className="p-6">
                      <form
                        action="https://formspree.io/f/xzzeddgr"
                        method="POST"
                      >
                        {/* Redirect back to our site after submission */}
                        <input
                          type="hidden"
                          name="_next"
                          value="https://lbcomputerhelp.com/thanks"
                        />

                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="Your name"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="Your email"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="Your phone number"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="help"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              How can we help? <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              id="help"
                              name="message"
                              rows={3}
                              required
                              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="Briefly describe your issue"
                            ></textarea>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
                          onClick={handleFormSubmitClick} // Updated onClick handler
                        >
                          Submit Request
                        </button>
                        {formSubmitted && (
                          <p className="mt-4 text-sm text-green-600">
                            Thank you! Your request is being submitted. You will be redirected shortly.
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
              className="w-6 h-6 text-blue-600"
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
                Long Beach.
              </p>
            </FadeIn>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setServiceFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  serviceFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all duration-300`}
              >
                All Services
              </button>
              <button
                onClick={() => setServiceFilter("business")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  serviceFilter === "business"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all duration-300`}
              >
                Business IT
              </button>
              <button
                onClick={() => setServiceFilter("support")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  serviceFilter === "support"
                    ? "bg-blue-600 text-white"
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
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 duration-300 shadow-md"
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
                      alt="LB Computer Help Team providing IT support in Long Beach"
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
                  About LB Computer Help
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    Since 2018, LB Computer Help has been the go-to provider for comprehensive IT solutions in Long Beach and Los Angeles County. We offer a wide range of services, including computer repair, network setup, data recovery, and cybersecurity solutions, tailored to meet the needs of both businesses and individuals.
                  </p>
                  <p>
                    Our dedicated team combines deep technical expertise with exceptional customer service. We specialize in proactive IT support and managed services, ensuring your technology infrastructure runs smoothly and efficiently. We take a personal approach to understanding your unique business IT solutions and challenges.
                  </p>
                  <p>
                    Whether you're a growing business in need of managed IT services or a home user requiring emergency computer assistance, LB Computer Help is ready to deliver prompt, professional on-site and remote support at competitive rates.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600"
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
                      <h3 className="font-semibold">Same-day Service</h3>
                      <p className="text-gray-500 text-sm">
                        For urgent tech issues
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600"
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
                      <h3 className="font-semibold">Data Security</h3>
                      <p className="text-gray-500 text-sm">
                        Protect your business data
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Expert Team</h3>
                      <p className="text-gray-500 text-sm">
                        Certified IT professionals
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600"
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
                      <h3 className="font-semibold">90-Day Warranty</h3>
                      <p className="text-gray-500 text-sm">
                        On parts and labor
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
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/services"
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
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
                  <li><strong>Diagnostic Assessment:</strong> $99 flat fee for computer issue diagnostics</li>
                  <li><strong>Hourly Support Rates:</strong> $125/hour for computer assistance, configuration, and optimization services</li>
                  <li><strong>IT Consultation Services:</strong> $150/hour for expert IT consulting and strategy</li>
                </ul>
                 <p className="text-gray-500 text-sm mt-4">Upfront, transparent pricing. Diagnostic assessment for a flat fee of $99. Hourly rates for assistance, configuration, and optimization at $125/hour. IT consultation at $150/hour. No hidden fees, just clear, competitive rates for Long Beach IT services.</p>
              </div>
            </FadeIn>

            {/* Credentials */}
             <FadeIn direction="up" delay={0.2}>
               <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                <h3 className="text-xl font-semibold mb-2">Local & Certified</h3>
                 <div className="text-gray-600 flex-grow">
                   <p>Your local Long Beach computer experts.</p>
                   <p>Located at 927 Magnolia Ave #2, Long Beach, CA 90813.</p>
                   <p>Call us at (213) 349-6790 for certified and insured IT support.</p>
                   <p className="mt-2">Proudly serving the Long Beach community since 2018.</p>
                 </div>
               </div>
             </FadeIn>

             {/* Disclaimer */}
             <FadeIn direction="up" delay={0.3}>
               <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <h3 className="text-xl font-semibold mb-2">Independent Service Provider</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  Independent and unbiased IT service provider. LB Computer Help offers expert tech assistance and guidance, independent of any hardware or software vendor affiliations. We provide unbiased recommendations based on industry best practices and tailored solutions for your specific needs in Long Beach.
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
                    <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
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
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-gray-300">(213) 349-6790</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-300">
                        support@lbcomputerhelp.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
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
                      <h3 className="font-semibold text-lg">Address</h3>
                      <p className="text-gray-300">
                        927 Magnolia Ave #2
                        <br />
                        Long Beach, CA 90813
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
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
                      <h3 className="font-semibold text-lg">Business Hours</h3>
                      <p className="text-gray-300">
                        Monday-Friday: 6 AM - 6 PM
                        <br />
                        Saturday: 6 AM - 6 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div
              className={`bg-gray-800 rounded-xl p-8 shadow-lg transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

              <form action="https://formspree.io/f/xzzeddgr" method="POST">
                {/* Redirect back to our site after submission */}
                <input
                  type="hidden"
                  name="_next"
                  value="https://lbcomputerhelp.com/thanks"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="contact_name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact_name"
                      name="name"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact_email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact_email"
                      name="email"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contact_phone"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="contact_phone"
                    name="phone"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contact_service"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Service Needed
                  </label>
                  <select
                    id="contact_service"
                    name="service"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a service</option>
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
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact_message"
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your issue or question"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300 flex items-center justify-center"
                >
                  Request IT Support
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
