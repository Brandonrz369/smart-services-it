"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

// Mock case study data - In a real app, this would be fetched from a CMS or API
const caseStudies = [
  {
    id: "retail-network-upgrade",
    title: "Retail Network Infrastructure Upgrade",
    industry: "Retail",
    client: "Harbor View Shopping Center",
    location: "Hicksville, NY",
    challenge:
      "A multi-location retail chain with 6 stores across Southern California was experiencing frequent network outages and slow POS transactions. Their existing network infrastructure was over 8 years old, causing reliability issues during peak shopping hours. With outdated security measures, they were also concerned about PCI compliance and payment data security.",
    approach: [
      "Conducted comprehensive network assessment to identify bottlenecks and security vulnerabilities",
      "Designed redundant network architecture with failover capabilities at each location",
      "Implemented enterprise-grade firewall and security solutions with PCI compliance in mind",
      "Deployed centralized monitoring system for real-time visibility across all locations",
      "Executed phased implementation to minimize business disruption",
    ],
    solution:
      "We implemented a complete network infrastructure redesign with a focus on high availability and security. Each location received redundant internet connections with automatic failover, enterprise-grade firewall protection, and a centralized network monitoring system. The new architecture included traffic prioritization for POS systems and a secure segregated network for payment processing.",
    results: [
      "99.9% uptime since implementation, eliminating lost sales due to network outages",
      "68% faster transaction processing, improving customer experience during checkout",
      "35% reduction in IT support calls related to network connectivity issues",
      "Full PCI DSS compliance achieved across all locations",
      "Centralized monitoring providing early warning of potential issues",
    ],
    testimonial: {
      quote:
        "The network upgrade has dramatically improved our operations. Transactions are faster, our staff can focus on customers instead of technical issues, and we have peace of mind knowing our systems are secure and reliable.",
      author: "Michael Chen",
      title: "Director of Operations, Harbor View Shopping Center",
    },
    keyTechnologies: [
      "Cisco Meraki SD-WAN",
      "Dual ISP failover configuration",
      "Enterprise-grade firewalls with IPS",
      "Traffic prioritization (QoS)",
      "Network monitoring and analytics",
    ],
    featuredImage: "/images/case-studies/retail-network.jpg",
    galleryImages: [
      "/images/case-studies/retail-network-1.jpg",
      "/images/case-studies/retail-network-2.jpg",
      "/images/case-studies/retail-network-3.jpg",
    ],
    logo: "/images/case-studies/retail-logo.png",
    featured: true,
  },
  {
    id: "accounting-firm-cloud-migration",
    title: "Accounting Firm Cloud Migration",
    industry: "Finance",
    client: "Pacific Financial Partners",
    location: "Los Angeles, CA",
    challenge:
      "A growing accounting firm with 25 employees needed to enable secure remote work capabilities while maintaining strict compliance with financial data regulations. Their legacy on-premises systems were difficult to access remotely, limiting flexibility and hindering growth. With sensitive client financial information, security was a paramount concern.",
    approach: [
      "Performed detailed analysis of existing workflows and compliance requirements",
      "Developed phased migration plan with minimal business disruption",
      "Implemented Microsoft 365 with enhanced security controls",
      "Created custom security policies and compliance frameworks",
      "Provided comprehensive staff training on new systems",
    ],
    solution:
      "We designed and implemented a comprehensive cloud migration to Microsoft 365 with enhanced security controls. The solution included multi-factor authentication, advanced threat protection, and custom security policies aligned with financial industry regulations. The phased approach allowed for testing and validation at each stage, ensuring business continuity throughout the transition.",
    results: [
      "100% remote work capability for all staff members",
      "40% reduction in IT infrastructure costs by eliminating on-premises servers",
      "Passed independent security audit with zero findings",
      "Improved collaboration with secure document sharing and co-authoring",
      "Enhanced disaster recovery capabilities with automatic cloud backups",
    ],
    testimonial: {
      quote:
        "The cloud migration has transformed how we work. Our team can now securely access client files from anywhere, allowing us to be more responsive and flexible. The cost savings have been substantial, and we have greater confidence in our security posture.",
      author: "Sarah Johnson",
      title: "Managing Partner, Pacific Financial Partners",
    },
    keyTechnologies: [
      "Microsoft 365 Business Premium",
      "Azure Information Protection",
      "Microsoft Defender for Office 365",
      "SharePoint Online with custom security policies",
      "Azure Multi-Factor Authentication",
    ],
    featuredImage: "/images/case-studies/accounting-cloud.jpg",
    galleryImages: [
      "/images/case-studies/accounting-cloud-1.jpg",
      "/images/case-studies/accounting-cloud-2.jpg",
      "/images/case-studies/accounting-cloud-3.jpg",
    ],
    logo: "/images/case-studies/accounting-logo.png",
    featured: true,
  },
  {
    id: "healthcare-data-security",
    title: "Healthcare Provider Data Security Overhaul",
    industry: "Healthcare",
    client: "Westside Medical Associates",
    location: "Santa Monica, CA",
    challenge:
      "A medical practice with 15 physicians needed to strengthen data security and achieve HIPAA compliance after identifying potential vulnerabilities in their existing systems. They faced increasing cybersecurity threats targeted at healthcare providers and needed a comprehensive solution that would protect patient data while maintaining operational efficiency.",
    approach: [
      "Conducted thorough security assessment and HIPAA compliance gap analysis",
      "Developed and implemented a zero-trust security architecture",
      "Deployed endpoint protection across all devices accessing medical records",
      "Implemented comprehensive audit logging and monitoring",
      "Delivered staff security awareness training program",
    ],
    solution:
      "We implemented a zero-trust security model with multi-layered protection for patient data. The solution included next-generation endpoint protection, network segmentation, comprehensive audit logging, and automated compliance monitoring. We also developed and delivered a security awareness training program for all staff members to address the human element of cybersecurity.",
    results: [
      "Achieved full HIPAA compliance with documentation",
      "95% reduction in security incidents and potential vulnerabilities",
      "Enhanced protection of sensitive patient data",
      "Streamlined access controls with single sign-on and multi-factor authentication",
      "Improved staff security awareness with measurable behavior changes",
    ],
    testimonial: {
      quote:
        "The security overhaul has given us confidence that our patient data is protected to the highest standards. The solution balances robust security with usability, ensuring our physicians and staff can focus on patient care rather than IT issues.",
      author: "Dr. Robert Chen",
      title: "Medical Director, Westside Medical Associates",
    },
    keyTechnologies: [
      "Zero-trust security architecture",
      "Next-generation endpoint protection",
      "Healthcare-specific security monitoring",
      "Multi-factor authentication",
      "Security awareness training platform",
    ],
    featuredImage: "/images/case-studies/healthcare-security.jpg",
    galleryImages: [
      "/images/case-studies/healthcare-security-1.jpg",
      "/images/case-studies/healthcare-security-2.jpg",
      "/images/case-studies/healthcare-security-3.jpg",
    ],
    logo: "/images/case-studies/healthcare-logo.png",
    featured: false,
  },
];

// Complete the case studies with manufacturing, law firm, and real estate that are missing from the mock data
const fullCaseStudies = [
  ...caseStudies,
  {
    id: "manufacturing-erp-integration",
    title: "Manufacturing ERP Integration",
    industry: "Manufacturing",
    client: "Advanced Manufacturing Solutions",
    location: "Torrance, CA",
    challenge:
      "A manufacturing company with 120 employees struggled with disconnected systems causing inventory management and production planning issues. Legacy systems operated in isolation, leading to data duplication, inconsistencies, and inefficient workflows that impacted production schedules and customer delivery timelines.",
    approach: [
      "Performed comprehensive assessment of existing manufacturing systems and workflows",
      "Designed custom integration solution connecting production floor systems with inventory management",
      "Developed real-time data exchange between ERP, MRP, and warehouse management systems",
      "Implemented phased deployment strategy to minimize production disruption",
      "Provided comprehensive staff training on the integrated systems",
    ],
    solution:
      "We designed and implemented a custom ERP integration solution that connected previously isolated systems for a unified flow of information. This included real-time data synchronization between production floor equipment, inventory management, and sales order processing. The solution featured custom API development, automated data validation, and a centralized dashboard for cross-department visibility.",
    results: [
      "27% increase in production efficiency through improved scheduling and resource allocation",
      "42% reduction in inventory errors and associated costs",
      "Real-time visibility across departments improved decision-making capabilities",
      "35% decrease in order fulfillment time",
      "Elimination of manual data re-entry, reducing administrative overhead",
    ],
    testimonial: {
      quote:
        "The integration has transformed our operations by eliminating the information silos that were holding us back. We now have real-time visibility across our entire production process, and the improvements in efficiency and accuracy have been dramatic.",
      author: "Thomas Wilson",
      title: "Operations Director, Advanced Manufacturing Solutions",
    },
    keyTechnologies: [
      "Custom API development",
      "ERP/MRP system integration",
      "Real-time data synchronization",
      "IoT sensors for production tracking",
      "Centralized business intelligence dashboard",
    ],
    featuredImage: "/images/case-studies/manufacturing-erp.jpg",
    galleryImages: [
      "/images/case-studies/manufacturing-erp-1.jpg",
      "/images/case-studies/manufacturing-erp-2.jpg",
      "/images/case-studies/manufacturing-erp-3.jpg",
    ],
    logo: "/images/case-studies/manufacturing-logo.png",
    featured: false,
  },
  {
    id: "law-firm-disaster-recovery",
    title: "Law Firm Disaster Recovery Implementation",
    industry: "Legal",
    client: "Pacific Law Partners",
    location: "Los Angeles, CA",
    challenge:
      "A law firm with 35 attorneys experienced critical data loss after hardware failure with inadequate backup systems. They lost access to case files and important legal documents, disrupting ongoing cases and creating potential liability issues. The firm needed an immediate solution to recover data and implement robust protection against future incidents.",
    approach: [
      "Conducted emergency data recovery operations on failed storage systems",
      "Designed comprehensive business continuity and disaster recovery plan",
      "Implemented automated backup solution with multi-site replication",
      "Established regular recovery testing protocols and documentation",
      "Provided staff training on data protection procedures",
    ],
    solution:
      "We deployed a comprehensive disaster recovery solution featuring automated backups with both onsite and cloud-based redundancy. The system includes incremental backups every 15 minutes with point-in-time recovery capability, offsite replication to secure data centers, and automated testing to verify backup integrity. We also established quarterly recovery drills to ensure all systems can be restored within the required timeframes.",
    results: [
      "Successfully recovered 98% of critical data from failed systems",
      "Achieved 15-minute recovery time objective for critical systems",
      "100% data protection coverage across all practice areas",
      "Implemented quarterly recovery testing protocols with documented procedures",
      "Eliminated risk of single-point failure with multi-site redundancy",
    ],
    testimonial: {
      quote:
        "After experiencing a devastating data loss, the new disaster recovery system has given us peace of mind. The recovery process was remarkably efficient, and we now have confidence that our critical client data is protected regardless of what happens.",
      author: "Jennifer Martinez",
      title: "Managing Partner, Pacific Law Partners",
    },
    keyTechnologies: [
      "Multi-site backup replication",
      "Point-in-time recovery capability",
      "Automated backup verification",
      "Immutable backup technology for ransomware protection",
      "Recovery time orchestration",
    ],
    featuredImage: "/images/case-studies/law-firm-recovery.jpg",
    galleryImages: [
      "/images/case-studies/law-firm-recovery-1.jpg",
      "/images/case-studies/law-firm-recovery-2.jpg",
      "/images/case-studies/law-firm-recovery-3.jpg",
    ],
    logo: "/images/case-studies/law-firm-logo.png",
    featured: false,
  },
  {
    id: "real-estate-mobile-workforce",
    title: "Real Estate Mobile Workforce Solution",
    industry: "Real Estate",
    client: "Coastal Properties Group",
    location: "Hicksville, NY",
    challenge:
      "A growing real estate agency with 40 agents needed to equip their mobile workforce with secure, reliable access to property systems and documents while in the field. Agents were struggling with inconsistent access to MLS listings, client information, and document signing tools, resulting in delays and lost opportunities.",
    approach: [
      "Assessed existing workflows and identified key mobile functionality requirements",
      "Designed comprehensive mobile solution with secure access to critical systems",
      "Implemented mobile device management for security and compliance",
      "Integrated e-signature and document management platforms",
      "Developed custom training program for agent onboarding",
    ],
    solution:
      "We deployed a comprehensive mobile workforce solution that provides agents with secure access to all critical systems from any location. The solution includes managed mobile devices with advanced security controls, seamless integration with the agency's CRM system, document management with e-signature capabilities, and real-time synchronization of property data. A centralized management console allows IT staff to monitor, support, and secure all devices remotely.",
    results: [
      "89% faster document processing for offers and contracts",
      "65% increase in agent responsiveness to client inquiries",
      "Secure compliance with real estate regulations for remote transactions",
      "47% reduction in lead response time",
      "31% increase in agent productivity through improved mobile workflows",
    ],
    testimonial: {
      quote:
        "This mobile solution has completely transformed how our agents work. They can now handle every aspect of the client relationship while in the field - from accessing property information to closing deals. The increased efficiency and responsiveness has given us a significant competitive advantage.",
      author: "David Rodriguez",
      title: "Broker/Owner, Coastal Properties Group",
    },
    keyTechnologies: [
      "Mobile device management (MDM)",
      "Secure document management",
      "E-signature integration",
      "CRM mobile synchronization",
      "Location-based property data access",
    ],
    featuredImage: "/images/case-studies/real-estate-mobile.jpg",
    galleryImages: [
      "/images/case-studies/real-estate-mobile-1.jpg",
      "/images/case-studies/real-estate-mobile-2.jpg",
      "/images/case-studies/real-estate-mobile-3.jpg",
    ],
    logo: "/images/case-studies/real-estate-logo.png",
    featured: false,
  },
];

export default function CaseStudyDetailPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [caseStudy, setCaseStudy] = useState<(typeof caseStudies)[0] | null>(
    null,
  );
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    // Find the case study by slug from the full list
    const study = fullCaseStudies.find((s) => s.id === slug);
    if (study) {
      setCaseStudy(study);
    }
    setIsLoaded(true);
  }, [slug]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen py-24 px-4 md:px-8 bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Case Study Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The case study you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <Link
            href="/case-studies"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header Banner */}
      <div className="relative py-24 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="inline-block bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium mb-4">
              {caseStudy.industry} CASE STUDY
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {caseStudy.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative h-12 w-24 bg-white rounded-md overflow-hidden flex items-center justify-center p-1">
                {caseStudy.logo ? (
                  <Image
                    src={caseStudy.logo}
                    alt={`${caseStudy.client} logo`}
                    className="object-contain h-full w-full"
                    width={80}
                    height={40}
                    onError={(e) => {
                      // Fallback for missing or incorrectly formatted images
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "/images/case-studies-placeholder/placeholder.svg";
                      target.style.objectFit = "contain";
                      target.style.padding = "5px";
                    }}
                  />
                ) : (
                  <div className="text-blue-600 font-bold">
                    {caseStudy.client
                      .split(" ")
                      .map((word: string) => word[0])
                      .join("")}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold">{caseStudy.client}</div>
                <div className="text-sm text-blue-200">
                  {caseStudy.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Content */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FadeIn delay={0.1} direction="up">
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Challenge
                  </h2>
                  <p className="text-gray-700">{caseStudy.challenge}</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} direction="up">
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Our Approach
                  </h2>
                  <ul className="space-y-3">
                    {caseStudy.approach.map((step: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.3} direction="up">
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Solution
                  </h2>
                  <p className="text-gray-700">{caseStudy.solution}</p>
                </div>
              </FadeIn>

              {/* Image Gallery */}
              {caseStudy.galleryImages &&
                caseStudy.galleryImages.length > 0 && (
                  <FadeIn delay={0.35} direction="up">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Project Gallery
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {caseStudy.galleryImages.map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 shadow-md"
                          >
                            <Image
                              src={image}
                              alt={`${caseStudy.title} - Gallery image ${index + 1}`}
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              fill
                              sizes="(max-width: 768px) 100vw, 30vw"
                              onError={(e) => {
                                // Fallback for missing or incorrectly formatted images
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "/images/case-studies-placeholder/placeholder.svg";
                                target.style.objectFit = "contain";
                                target.style.padding = "20px";
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}

              <FadeIn delay={0.4} direction="up">
                <div className="bg-blue-600 text-white rounded-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Results & Outcomes
                  </h2>
                  <div className="space-y-4">
                    {caseStudy.results.map((result: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <svg
                          className="h-6 w-6 text-blue-300 mt-0.5 mr-3 flex-shrink-0"
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
                        <p className="text-blue-50">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {caseStudy.testimonial && (
                <FadeIn delay={0.5} direction="up">
                  <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
                    <svg
                      className="h-8 w-8 text-blue-400 mb-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-lg italic mb-6">
                      {caseStudy.testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {caseStudy.testimonial.author
                            .split(" ")
                            .map((name: string) => name[0])
                            .join("")}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">
                          {caseStudy.testimonial.author}
                        </div>
                        <div className="text-sm text-gray-400">
                          {caseStudy.testimonial.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>

            <div className="lg:col-span-1">
              <FadeIn delay={0.2} direction="right">
                <div className="sticky top-28 space-y-8">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Key Technologies
                    </h3>
                    <ul className="space-y-2">
                      {caseStudy.keyTechnologies.map(
                        (tech: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <svg
                              className="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">{tech}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Need Similar Solutions?
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Contact us to discuss how we can help your business
                      overcome similar challenges with tailored IT solutions.
                    </p>
                    <div className="space-y-3">
                      <a
                        href="tel:8003865777"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center"
                      >
                        <svg
                          className="h-4 w-4 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        (800) 386-5777
                      </a>
                      <a
                        href="/contact"
                        className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg font-medium flex items-center justify-center"
                      >
                        Schedule Consultation
                      </a>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Related Industries
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Retail",
                        "Finance",
                        "Healthcare",
                        "Manufacturing",
                        "Legal",
                      ]
                        .filter((ind) => ind !== caseStudy.industry)
                        .slice(0, 4)
                        .map((industry, idx) => (
                          <Link
                            key={idx}
                            href={`/case-studies?industry=${industry.toLowerCase()}`}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-full"
                          >
                            {industry}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <FadeIn>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">
                  Explore More Case Studies
                </h3>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                >
                  View All Case Studies
                  <svg
                    className="h-5 w-5 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {fullCaseStudies
                  .filter((s) => s.id !== slug)
                  .slice(0, 3)
                  .map((study) => (
                    <Link
                      key={study.id}
                      href={`/case-studies/${study.id}`}
                      className="block"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
                        <div className="relative h-40 bg-gray-200">
                          <Image
                            src={study.featuredImage}
                            alt={study.title}
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, 30vw"
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
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                            {study.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {study.challenge.split(".")[0]}.
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today to discuss how we can help you achieve similar
            results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:8003865777"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Call (800) 386-5777
            </a>
            <a
              href="/contact"
              className="px-6 py-3 bg-white border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
