"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import RevealText from "@/components/RevealText";

const caseStudies = [
  {
    id: "retail-network-upgrade",
    title: "Retail Network Infrastructure Upgrade",
    industry: "Retail",
    challenge:
      "A multi-location retail chain was experiencing frequent network outages and slow POS transactions.",
    solution:
      "Complete network infrastructure redesign with redundant connections and real-time monitoring.",
    results: [
      "99.9% uptime since implementation",
      "68% faster transaction processing",
      "35% reduction in IT support calls",
    ],
    image: "/images/case-studies/retail-network.jpg",
    logo: "/images/case-studies/retail-logo.png",
    featured: true,
  },
  {
    id: "accounting-firm-cloud-migration",
    title: "Accounting Firm Cloud Migration",
    industry: "Finance",
    challenge:
      "Growing accounting firm needed to enable secure remote work while maintaining compliance requirements.",
    solution:
      "Phased migration to Microsoft 365 with enhanced security controls and custom compliance policies.",
    results: [
      "100% remote work capability",
      "40% reduction in IT infrastructure costs",
      "Passed security audit with zero findings",
    ],
    image: "/images/case-studies/accounting-cloud.jpg",
    logo: "/images/case-studies/accounting-logo.png",
    featured: true,
  },
  {
    id: "healthcare-data-security",
    title: "Healthcare Provider Data Security Overhaul",
    industry: "Healthcare",
    challenge:
      "Medical office needed to strengthen data security and achieve HIPAA compliance.",
    solution:
      "Implemented zero-trust security model with endpoint protection and staff security awareness training.",
    results: [
      "Achieved HIPAA compliance",
      "95% reduction in security incidents",
      "Enhanced patient data protection",
    ],
    image: "/images/case-studies/healthcare-security.jpg",
    logo: "/images/case-studies/healthcare-logo.png",
    featured: false,
  },
  {
    id: "manufacturing-erp-integration",
    title: "Manufacturing ERP Integration",
    industry: "Manufacturing",
    challenge:
      "Manufacturing company struggled with disconnected systems causing inventory and production issues.",
    solution:
      "Custom ERP integration connecting production floor systems with inventory management and sales.",
    results: [
      "27% increase in production efficiency",
      "42% reduction in inventory errors",
      "Real-time visibility across departments",
    ],
    image: "/images/case-studies/manufacturing-erp.jpg",
    logo: "/images/case-studies/manufacturing-logo.png",
    featured: false,
  },
  {
    id: "law-firm-disaster-recovery",
    title: "Law Firm Disaster Recovery Implementation",
    industry: "Legal",
    challenge:
      "Law firm experienced critical data loss after hardware failure with inadequate backup systems.",
    solution:
      "Comprehensive disaster recovery solution with automated backups, offsite replication, and rapid recovery testing.",
    results: [
      "15-minute recovery time objective achieved",
      "100% data protection coverage",
      "Quarterly recovery testing protocols",
    ],
    image: "/images/case-studies/law-firm-recovery.jpg",
    logo: "/images/case-studies/law-firm-logo.png",
    featured: false,
  },
  {
    id: "real-estate-mobile-workforce",
    title: "Real Estate Mobile Workforce Solution",
    industry: "Real Estate",
    challenge:
      "Real estate agency needed to equip agents with secure, reliable mobile access to property systems.",
    solution:
      "Deployed managed mobile device solution with secure access to CRM, document management, and e-signature platforms.",
    results: [
      "89% faster document processing",
      "65% increase in agent responsiveness",
      "Secure compliance with real estate regulations",
    ],
    image: "/images/case-studies/real-estate-mobile.jpg",
    logo: "/images/case-studies/real-estate-logo.png",
    featured: false,
  },
];

export default function CaseStudiesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [industryFilter, setIndustryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Extract unique industries for filter
  const industries = [
    "all",
    ...new Set(caseStudies.map((study) => study.industry.toLowerCase())),
  ];

  // Filter case studies based on industry and search query
  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesIndustry =
      industryFilter === "all" ||
      study.industry.toLowerCase() === industryFilter.toLowerCase();
    const matchesSearch =
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.challenge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  // Get featured case studies
  const featuredStudies = caseStudies.filter((study) => study.featured);

  return (
    <div
      className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header Banner */}
      <div className="relative py-24 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Client Success Stories
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Real-world technology solutions that helped businesses overcome
            challenges and achieve growth
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 md:px-8 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search case studies..."
                  className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {industries.map((industry, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition duration-300 ${
                    industryFilter === industry
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setIndustryFilter(industry)}
                >
                  {industry === "all"
                    ? "All Industries"
                    : industry.charAt(0).toUpperCase() + industry.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      {industryFilter === "all" && searchQuery === "" && (
        <section className="py-16 px-4 md:px-8 bg-gray-50 border-b">
          <div className="max-w-6xl mx-auto">
            <RevealText
              text="Featured Success Stories"
              className="text-3xl font-bold text-gray-900 mb-12 text-center"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredStudies.map((study, index) => (
                <FadeIn key={study.id} delay={0.2 * index} direction="up">
                  <Link href={`/case-studies/${study.id}`} className="block">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative h-64">
                        <Image
                          src={study.image}
                          alt={study.title}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          onError={(e) => {
                            // Fallback for missing or incorrectly formatted images
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "/images/case-studies-placeholder/placeholder.svg";
                            target.style.objectFit = "contain";
                            target.style.padding = "20px";
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                            {study.industry}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {study.title}
                        </h3>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                            Challenge:
                          </h4>
                          <p className="text-gray-700">{study.challenge}</p>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                            Solution:
                          </h4>
                          <p className="text-gray-700">{study.solution}</p>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                            Results:
                          </h4>
                          <ul className="text-gray-700 space-y-1">
                            {study.results.map((result, i) => (
                              <li key={i} className="flex items-start">
                                <svg
                                  className="h-5 w-5 mr-2 text-green-500 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span>{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-6 text-center">
                          <span className="inline-flex items-center text-blue-600 font-medium">
                            View Full Case Study
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Case Studies */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {industryFilter === "all"
              ? "All Case Studies"
              : `${industryFilter.charAt(0).toUpperCase() + industryFilter.slice(1)} Industry Solutions`}
          </h2>

          {filteredCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((study, index) => (
                <FadeIn
                  key={study.id}
                  delay={0.1 * index}
                  direction="up"
                  className="h-full"
                >
                  <Link
                    href={`/case-studies/${study.id}`}
                    className="block h-full"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                      <div className="relative h-48">
                        <Image
                          src={study.image}
                          alt={study.title}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          onError={(e) => {
                            // Fallback for missing or incorrectly formatted images
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "/images/case-studies-placeholder/placeholder.svg";
                            target.style.objectFit = "contain";
                            target.style.padding = "20px";
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {study.industry}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                          {study.title}
                        </h3>

                        <div className="mb-4 flex-grow">
                          <p className="text-gray-700 text-sm">
                            {study.challenge}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <span className="inline-flex items-center text-blue-600 font-medium text-sm">
                            View Case Study
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No case studies found
              </h3>
              <p className="mt-1 text-gray-500">
                Try changing your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setIndustryFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-blue-700 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
              Let&apos;s discuss how our IT solutions can address your specific
              challenges and help your business succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:8003865777"
                className="px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.986.836l.74 4.435a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call (800) 386-5777
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-blue-600 border border-white text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
