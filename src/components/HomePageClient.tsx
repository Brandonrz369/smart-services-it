"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FloatingShapes from "@/components/FloatingShapes";
import TypewriterEffect from "@/components/TypewriterEffect";
import ServicesCard from "@/components/ServicesCard";
import TestimonialCarousel, {
  Testimonial,
} from "@/components/TestimonialCarousel";
import RevealText from "@/components/RevealText";
import ParallaxEffect from "@/components/ParallaxEffect";
import ServiceAssessmentModal from "@/components/ServiceAssessmentModal";

declare global {
  interface Window {
    gtag_report_conversion: (url?: string) => void;
  }
}

interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
  category: string;
}

interface HomePageClientProps {
  services: Service[];
  testimonials: Testimonial[];
}

export default function HomePageClient({ services, testimonials }: HomePageClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("all");
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const heroImages = [
    '/images/hero-background.jpg',
    '/images/hero-ab-test-smartservices-1.jpg',
    '/images/hero-ab-test-smartservices-2.jpg'
  ];

  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    let slideshowTimer: NodeJS.Timeout;
    
    if (!isPaused) {
      slideshowTimer = setInterval(() => {
        setCurrentSlide((prevSlide) => 
          prevSlide === heroImages.length - 1 ? 0 : prevSlide + 1
        );
      }, 5000); // 5 seconds interval for slideshow
    }
    
    return () => {
      if (slideshowTimer) clearInterval(slideshowTimer);
    };
  }, [isPaused, heroImages.length]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredServices =
    serviceFilter === "all"
      ? services
      : services.filter((service) => service.category === serviceFilter);

  const handleFormSubmitClick = () => {
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion();
    }
    setFormSubmitted(true);
  };
  
  // Removed slide navigation functions since we only have one image


  return (
    <div
      className={`min-h-screen font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Hero Section */}
      <section 
        className="relative h-screen min-h-[800px] flex items-center bg-gradient-to-r from-primary-dark via-primary to-primary-light"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          
          {/* Slideshow hero background with slide transitions */}
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url('${image}')`,
                mixBlendMode: "overlay",
                zIndex: currentSlide === index ? 1 : 0,
                opacity: currentSlide === index ? 1 : 0
              }}
            ></div>
          ))}
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark"></div>
          <FloatingShapes />
          
          {/* Navigation arrows */}
          <button 
            onClick={() => setCurrentSlide(prev => prev === 0 ? heroImages.length - 1 : prev - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all duration-200"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => setCurrentSlide(prev => prev === heroImages.length - 1 ? 0 : prev + 1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all duration-200"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Slide indicators and controls */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20">
            <div className="flex items-center space-x-3">
              {/* Pause/Play button */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 transition-all duration-200 mr-2"
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              >
                {isPaused ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              
              {/* Slide indicators */}
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
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
                  We come to you in 2 hours. We fix all major issues. Smart Services IT offers same-day computer repair solutions.
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
                            alt="Happy client testimonial for Smart Services IT"
                            width={48}
                            height={48}
                            className="rounded-full border-2 border-white"
                          />
                          <Image
                            src="/images/testimonials/client2.jpg"
                            alt="Satisfied client of Smart Services IT"
                            width={48}
                            height={48}
                            className="rounded-full border-2 border-white"
                          />
                          <Image
                            src="/images/testimonials/client3.jpg"
                            alt="Client review for Smart Services IT services"
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
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-gray-300">
                            Trusted by businesses across Hicksville, Nassau County, and all of Long Island
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
                        <div className="h-full w-full rounded-xl bg-primary opacity-20"></div>
                      </div>
                      <div className="relative z-10 bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-6 bg-primary text-white">
                          <h3 className="text-2xl font-bold mb-1">
                            Request IT Support
                          </h3>
                          <p className="text-white">
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
                              value="https://smartservicesit.store/thanks"
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
                                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
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
                                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
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
                                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
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
                                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
                                  placeholder="Briefly describe your issue"
                                ></textarea>
                              </div>
                            </div>

                            <button
                              type="submit"
                              onClick={handleFormSubmitClick}
                              className="mt-6 w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300"
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
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                Hicksville, Nassau County, Long Island, and surrounding areas
                within 50 miles.
              </p>
            </FadeIn>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setServiceFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  serviceFilter === "all"
                    ? "bg-primary text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all duration-300`}
              >
                All Services
              </button>
              <button
                onClick={() => setServiceFilter("business")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  serviceFilter === "business"
                    ? "bg-primary text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all duration-300`}
              >
                Business IT
              </button>
              <button
                onClick={() => setServiceFilter("support")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  serviceFilter === "support"
                    ? "bg-primary text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all duration-300`}
              >
                IT Support
              </button>
            </div>
          </div>

          {/* Service Cards - Updated to match design in screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <span className="text-4xl">💻</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Mac/PC Screen Problems?</h3>
              <p className="text-gray-600">Cracked screen, dim display, flickering? Expert diagnostics & configuration/component options.</p>
              <Link 
                href="/services"
                className="inline-block text-primary hover:text-primary-dark mt-4 font-medium transition-colors flex items-center"
              >
                Learn More
                <svg 
                  className="w-5 h-5 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Computer Running Slow?</h3>
              <p className="text-gray-600">Frustrated with sluggish performance? Our optimization services can boost speed.</p>
              <Link 
                href="/services"
                className="inline-block text-primary hover:text-primary-dark mt-4 font-medium transition-colors flex items-center"
              >
                Learn More
                <svg 
                  className="w-5 h-5 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <span className="text-4xl">💾</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can't Access Your Files?</h3>
              <p className="text-gray-600">Difficulties accessing data? We provide consultation on accessibility options and backup strategies.</p>
              <Link 
                href="/services"
                className="inline-block text-primary hover:text-primary-dark mt-4 font-medium transition-colors flex items-center"
              >
                Learn More
                <svg 
                  className="w-5 h-5 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <span className="text-4xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Worried About Security Threats?</h3>
              <p className="text-gray-600">Concerned about malware or strange behavior? Get a system security assessment and cleanup assistance.</p>
              <Link 
                href="/services"
                className="inline-block text-primary hover:text-primary-dark mt-4 font-medium transition-colors flex items-center"
              >
                Learn More
                <svg 
                  className="w-5 h-5 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <span className="text-4xl">🌐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Wi-Fi or Network Problems?</h3>
              <p className="text-gray-600">Experiencing connectivity issues? We offer network setup, configuration, and optimization.</p>
              <Link 
                href="/services"
                className="inline-block text-primary hover:text-primary-dark mt-4 font-medium transition-colors flex items-center"
              >
                Learn More
                <svg 
                  className="w-5 h-5 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <span className="text-4xl">❌</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Software Conflicts or Setup Needs?</h3>
              <p className="text-gray-600">Need help installing or configuring software? We provide expert assistance.</p>
              <Link 
                href="/services"
                className="inline-block text-primary hover:text-primary-dark mt-4 font-medium transition-colors flex items-center"
              >
                Learn More
                <svg 
                  className="w-5 h-5 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all transform hover:scale-105 duration-300 shadow-md"
            >
              View All Services
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
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
                  About Smart Services IT
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    Welcome to Smart Services IT, where technology meets personalized service. Established in 2015 and based in Hicksville, New York, we are committed to delivering top-quality tech support and IT solutions to businesses and individuals across Nassau County, Long Island, and all areas within 50 miles of Hicksville. With over a decade of experience and a focus on reliability, efficiency, and customer satisfaction, we aim to provide services that empower our clients to navigate the digital world with ease.
                  </p>
                  <p>
                    At Smart Services IT, we specialize in a range of IT services tailored to meet the unique needs of our clients. Whether it's troubleshooting technical issues, setting up advanced systems, or providing ongoing IT support, our team of experts is here to ensure that your technology works seamlessly. We are passionate about solving complex tech problems while offering the best customer experience.
                  </p>
                  <p>
                    Smart Services IT offers comprehensive IT support that's more cost-effective than maintaining an in-house team. We're here for you 24/7, delivering fast, reliable service. We respond within minutes, not hours or days, ensuring that your business operations remain smooth and uninterrupted. As an external team with diverse resources, we provide more reliability and flexibility than relying on a single in-house IT staff member.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <svg
                        className="w-6 h-6 text-primary" 
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p>Tailored IT solutions for your specific needs</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p>Secure and reliable services</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.161M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.161m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p>Expert team at your service</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p>Advanced security solutions</p>
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
                    className="px-6 py-3 bg-white text-primary border border-primary rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Reliable Service & Clear Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe in transparency, expertise, and dependable computer help in Hicksville and across New York.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Transparent Pricing */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="text-primary">
                  <svg 
                    className="w-12 h-12" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M18 5V3C18 2.44772 17.5523 2 17 2H7C6.44772 2 6 2.44772 6 3V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18 14V16C18 16.5523 17.5523 17 17 17H7C6.44772 17 6 16.5523 6 16V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M11 22H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 17V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="2" y="5" width="20" height="9" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 10.5H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-center">Transparent Pricing</h3>
              
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Diagnostic Assessment:</span>
                  <span className="text-gray-700">$99</span>
                </div>
                <p className="text-sm text-gray-600">Flat fee for computer issue diagnostics</p>
                
                <div className="flex justify-between pt-2">
                  <span className="font-medium">Hourly Support Rates:</span>
                  <span className="text-gray-700">$125/hr</span>
                </div>
                <p className="text-sm text-gray-600">For computer assistance, configuration, and optimization services</p>
                
                <div className="flex justify-between pt-2">
                  <span className="font-medium">IT Consultation:</span>
                  <span className="text-gray-700">$150/hr</span>
                </div>
                <p className="text-sm text-gray-600">For expert IT consulting and strategy</p>
              </div>
              
              <p className="text-gray-500 text-sm mt-4">
                No hidden fees, just clear, competitive rates for New York IT services.
              </p>
            </div>

            {/* Local & Certified */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="text-primary">
                  <svg 
                    className="w-12 h-12" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M9 12L11 14L15 10M12 3L13.9101 4.87127C14.8686 5.78334 16.3844 5.77668 17.3349 4.85657L19 3.23607L20.7639 5L19.1434 6.66513C18.2233 7.61563 18.2167 9.13139 19.1287 10.0899L21 12L19.1287 13.9101C18.2167 14.8686 18.2233 16.3844 19.1434 17.3349L20.7639 19L19 20.7639L17.3349 19.1434C16.3844 18.2233 14.8686 18.2167 13.9101 19.1287L12 21L10.0899 19.1287C9.13139 18.2167 7.61563 18.2233 6.66513 19.1434L5 20.7639L3.23607 19L4.85657 17.3349C5.77668 16.3844 5.78334 14.8686 4.87127 13.9101L3 12L4.87127 10.0899C5.78334 9.13139 5.77668 7.61563 4.85657 6.66513L3.23607 5L5 3.23607L6.66513 4.85657C7.61563 5.77668 9.13139 5.78334 10.0899 4.87127L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-center">Local & Certified</h3>
              
              <div className="space-y-4 text-center">
                <p className="text-gray-700">Your trusted New York computer experts.</p>
                
                <div>
                  <p className="text-gray-700">Located at:</p>
                  <p className="font-medium">123 Main Street</p>
                  <p className="font-medium">Hicksville, NY 11801</p>
                </div>
                
                <div>
                  <p className="text-gray-700">Call us at:</p>
                  <p className="font-medium">(800) 386-5777</p>
                </div>
                
                <p className="text-gray-700 pt-2">Proudly serving the New York community since 2015.</p>
              </div>
            </div>

            {/* Independent Service Provider */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="text-primary">
                  <svg 
                    className="w-12 h-12" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-center">Independent Service Provider</h3>
              
              <p className="text-gray-700">
                Smart Services IT offers expert tech assistance and guidance, independent of any hardware or software vendor affiliations.
              </p>
              
              <p className="text-gray-700 mt-4">
                We provide unbiased recommendations based on industry best practices and tailored solutions for your specific needs in New York and beyond.
              </p>
            </div>
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
                    <div className="flex-shrink-0 w-8 h-8">
                      <svg
                        className="w-8 h-8"
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
                      <p className="text-gray-300">(800) 386-5777</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8">
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-300">support@smartservicesit.store</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8">
                      <svg
                        className="w-8 h-8"
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
                      <h3 className="font-semibold text-lg">Location</h3>
                      <p className="text-gray-300">
                        454 S Broadway
                        <br />
                        Hicksville, NY 11801
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8">
                      <svg
                        className="w-8 h-8"
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
                      <h3 className="font-semibold text-lg">Hours</h3>
                      <p className="text-gray-300">
                        Monday-Friday: 10 AM - 7 PM
                        <br />
                        Saturday: 10 AM - 7 PM
                        <br />
                        Sunday: 10 AM - 7 PM
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div
              className={`bg-gray-800 rounded-xl p-8 shadow-lg transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <form
                action="https://formspree.io/f/xzzeddgr"
                method="POST"
                className="space-y-4"
              >
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
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact_name"
                      name="name"
                      required
                      className="w-full bg-gray-700 border-gray-600 text-white rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact_email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact_email"
                      name="email"
                      required
                      className="w-full bg-gray-700 border-gray-600 text-white rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contact_phone"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact_phone"
                    name="phone"
                    required
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contact_service"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Service Needed <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="contact_service"
                    name="service"
                    required
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
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
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact_message"
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  Send Message
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