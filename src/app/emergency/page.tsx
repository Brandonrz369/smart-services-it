"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";

export default function EmergencyServicesPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Emergency Banner */}
      <div className="relative py-24 bg-gradient-to-r from-red-700 to-red-500 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Emergency IT Support
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Fast response when technology problems can&apos;t wait
          </p>
          <div className="mt-8">
            <Link
              href="tel:2133496790"
              className="inline-flex items-center px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition duration-300 text-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
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
            </Link>
          </div>
        </div>
      </div>

      {/* Urgent Services Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">When Minutes Matter</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our emergency IT support service is designed to get your
                business back online quickly when technical disasters strike.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-red-500 shadow-md h-full">
                <div className="text-red-500 mb-4">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Rapid Response</h3>
                <p className="text-gray-600">
                  We prioritize emergency calls and aim to respond within 30
                  minutes during business hours, and within 2 hours after hours.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-red-500 shadow-md h-full">
                <div className="text-red-500 mb-4">
                  <svg
                    className="w-12 h-12"
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
                <h3 className="text-xl font-bold mb-2">Data Protection</h3>
                <p className="text-gray-600">
                  Our emergency procedures prioritize data protection, ensuring
                  your valuable information is preserved during recovery.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-red-500 shadow-md h-full">
                <div className="text-red-500 mb-4">
                  <svg
                    className="w-12 h-12"
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
                <h3 className="text-xl font-bold mb-2">Remote & Onsite</h3>
                <p className="text-gray-600">
                  We offer both remote support for immediate assistance and
                  onsite emergency visits when hands-on intervention is
                  required.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Emergency Scenarios */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Common Emergency Scenarios
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We&apos;re equipped to handle a wide range of urgent IT
                situations.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn direction="left">
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        Ransomware & Malware Attacks
                      </h3>
                      <p className="text-gray-600">
                        Immediate containment and recovery from malicious
                        software and ransomware incidents. We help isolate
                        affected systems, assess the damage, and implement
                        recovery procedures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        Network/Internet Outages
                      </h3>
                      <p className="text-gray-600">
                        Rapid resolution of network failures affecting your
                        business operations. We diagnose connection issues,
                        coordinate with ISPs, and implement temporary solutions
                        when needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        Server/System Failures
                      </h3>
                      <p className="text-gray-600">
                        Emergency assistance for critical system failures affecting {/* Changed repair of -> assistance for */}
                        business applications. We work quickly to restore
                        services, implement workarounds, and resolve hardware or
                        software issues.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        Data Loss & Accessibility {/* Changed Recovery -> Accessibility */}
                      </h3>
                      <p className="text-gray-600">
                        Urgent data accessibility consultation for accidental deletions {/* Changed recovery services -> accessibility consultation */}
                        or storage failures. Our specialized tools and processes
                        help consult on retrieving lost data and implement safeguards against {/* Changed retrieve -> consult on retrieving */}
                        future incidents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pricing & Response Time */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Emergency Response SLA
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our commitment to rapid response when you need it most.
              </p>
            </div>
          </FadeIn>

          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-4 bg-gray-100 text-left text-lg font-medium text-gray-800">
                    Service Level
                  </th>
                  <th className="px-6 py-4 bg-gray-100 text-left text-lg font-medium text-gray-800">
                    Response Time
                  </th>
                  <th className="px-6 py-4 bg-gray-100 text-left text-lg font-medium text-gray-800">
                    Availability
                  </th>
                  <th className="px-6 py-4 bg-gray-100 text-left text-lg font-medium text-gray-800">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-md text-gray-900 font-medium">
                    Business Hours Emergency
                  </td>
                  <td className="px-6 py-4 text-md text-gray-800">
                    30 minutes or less
                  </td>
                  <td className="px-6 py-4 text-md text-gray-800">
                    Mon-Fri, 6AM - 6PM
                    <br />
                    Sat, 6AM - 6PM
                  </td>
                  <td className="px-6 py-4 text-md text-gray-800">$225/hour</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-md text-gray-900 font-medium">
                    After Hours Emergency
                  </td>
                  <td className="px-6 py-4 text-md text-gray-800">
                    2 hours or less
                  </td>
                  <td className="px-6 py-4 text-md text-gray-800">
                    Evenings, Weekends,
                    <br />
                    and Holidays
                  </td>
                  <td className="px-6 py-4 text-md text-gray-800">$275/hour</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-md text-gray-900 font-medium">
                    MSP Clients
                  </td>
                  <td className="px-6 py-4 text-md text-gray-800">
                    Priority response
                  </td>
                  <td className="px-6 py-4 text-md text-gray-800">
                    24/7 depending on plan
                  </td>
                  <td className="px-6 py-4 text-md text-gray-800">
                    Included in service plan
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 italic">
              * One-hour minimum for all emergency services. Travel time may
              apply for onsite visits.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Contact CTA */}
      <section className="py-16 px-4 md:px-8 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">
              Need Emergency IT Support Now?
            </h2>
            <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
              Our technicians are ready to help resolve your urgent IT issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:2133496790"
                className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition duration-300 flex items-center justify-center text-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                Call (213) 349-6790
              </Link>
              <Link
                href="sms:2133496790"
                className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center text-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Text for Support
              </Link>
            </div>
            <p className="mt-8 text-sm text-red-200">
              For non-emergency support, please{" "}
              <Link href="/contact" className="underline hover:text-white">
                contact us here
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 mb-16">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Emergency Support FAQ</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Answers to common questions about our emergency IT services.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">
                  What qualifies as an IT emergency?
                </h3>
                <p className="text-gray-600">
                  An IT emergency is any technical issue that significantly
                  impacts your business operations and requires immediate
                  attention. This includes system-wide outages, ransomware
                  attacks, email service disruptions, server crashes, or any
                  other critical infrastructure failure.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">
                  How quickly can you respond to an emergency?
                </h3>
                <p className="text-gray-600">
                  During business hours, we aim to respond within 30 minutes of
                  your call. For after-hours emergencies, our response time is
                  typically within 2 hours. MSP clients receive priority
                  response according to their service level agreement.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">
                  What should I do while waiting for emergency support?
                </h3>
                <p className="text-gray-600">
                  Document the issue in detail, including when it started and
                  any error messages. Don&apos;t restart affected systems unless
                  instructed to do so, as this might cause data loss. If
                  it&apos;s a potential security incident, disconnect affected
                  systems from the network if possible.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">
                  How are emergency services billed?
                </h3>
                <p className="text-gray-600">
                  Emergency services are billed at an hourly rate with a
                  one-hour minimum. We provide a clear estimate before beginning
                  work whenever possible. MSP clients may have emergency
                  services included in their support plan, depending on their
                  service tier.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
