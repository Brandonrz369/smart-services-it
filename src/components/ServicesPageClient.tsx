"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PricingCalculator from "@/components/PricingCalculator";

// Define the interface for the service details
interface ServiceDetail {
  title: string;
  description: string;
  icon: string;
  image?: string; // Make image optional if not all services have one
  features: string[];
  pricing: { service: string; price: string; description: string }[];
  category: string;
  longDescription: string;
}

// Define the props for the client component
interface ServicesPageClientProps {
  servicesDetail: ServiceDetail[]; // Expect servicesDetail array as a prop
}

export default function ServicesPageClient({ servicesDetail }: ServicesPageClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  const [showPricingCalculator, setShowPricingCalculator] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter services based on the passed-in data and current filter
  const filteredServices = servicesDetail.filter((service) => {
    if (categoryFilter === "all") return true;
    return service.category === categoryFilter || service.category === "both";
  });

  return (
    <div
      className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header Banner (Consider moving this to the Server Component if static) */}
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
                onClick={() => setCategoryFilter("all")}
                className={`px-6 py-3 text-sm font-medium ${categoryFilter === "all" ? "text-white bg-blue-600" : "text-blue-600 bg-white"} border border-blue-600 rounded-l-lg hover:bg-blue-700 hover:text-white transition duration-300`}
              >
                All Services
              </button>
              <button
                onClick={() => setCategoryFilter("business")}
                className={`px-6 py-3 text-sm font-medium ${categoryFilter === "business" ? "text-white bg-blue-600" : "text-blue-600 bg-white"} border-t border-b border-r border-blue-600 hover:bg-blue-700 hover:text-white transition duration-300`}
              >
                Business & MSP
              </button>
              <button
                onClick={() => setCategoryFilter("residential")}
                className={`px-6 py-3 text-sm font-medium ${categoryFilter === "residential" ? "text-white bg-blue-600" : "text-blue-600 bg-white"} border-t border-b border-r border-blue-600 rounded-r-lg hover:bg-blue-700 hover:text-white transition duration-300`}
              >
                Residential
              </button>
            </div>
          </div>

          {/* Interactive Pricing Calculator */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Need help estimating costs?
                </h3>
                <p className="text-gray-600 mb-4 md:mb-0">
                  Use our interactive pricing calculator to get instant
                  estimates for our services.
                </p>
              </div>
              <button
                onClick={() => setShowPricingCalculator(!showPricingCalculator)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-flex items-center"
              >
                {showPricingCalculator
                  ? "Hide Calculator"
                  : "Show Pricing Calculator"}
                <svg
                  className={`ml-2 h-5 w-5 transition-transform ${showPricingCalculator ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {showPricingCalculator && (
              <div className="mb-10">
                <PricingCalculator />
              </div>
            )}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">
                      Key Features:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="h-4 w-4 mt-0.5 mr-2 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
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
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
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
              <h2 className="text-2xl font-bold text-gray-900">
                {activeService.title}
              </h2>
              <button
                onClick={() => setActiveService(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  About This Service
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {activeService.longDescription}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  Pricing Information
                </h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activeService.pricing.map((item, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.service}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.price}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * Prices may vary based on specific requirements and
                  complexity. Contact us for a personalized quote.
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <a
                  href="#contact" // Assuming contact section exists on the page or link to /contact
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 mr-4 active:bg-blue-800 active:scale-95"
                  onClick={() => {
                    setActiveService(null); // Close the modal first
                    // Optional: Smooth scroll if contact section is on the same page
                    // setTimeout(() => {
                    //   document
                    //     .getElementById("contact")
                    //     ?.scrollIntoView({ behavior: "smooth" });
                    // }, 100);
                  }}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services, policies, and
              procedures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl mx-auto">
            {/* FAQ Items */}
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
              <p className="text-gray-600">Our services come with a 90-day warranty on labor. If any issue arises with our service within this period, we will address it at no additional charge. Specific component warranties may vary and will be clearly explained.</p>
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

      {/* Case Studies Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            See Our Services in Action
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Check out our client success stories to see real-world examples of
            how our services have helped businesses overcome challenges and
            achieve their goals.
          </p>

          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md"
          >
            View Client Case Studies
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact" // Ensure this ID exists if used for internal links
        className="py-20 px-4 md:px-8 bg-blue-600 text-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation or to schedule a service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:2133496790"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center gap-2 active:bg-gray-200 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (213) 349-6790
            </a>
            <a
              href="mailto:support@lbcomputerhelp.com"
              className="bg-transparent hover:bg-blue-700 text-white border border-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center gap-2 active:bg-blue-800 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
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
