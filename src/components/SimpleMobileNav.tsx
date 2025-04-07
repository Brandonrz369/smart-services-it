"use client";

import { useState } from "react";
import Link from "next/link";

interface MobileNavProps {
  isScrolled?: boolean;
}

export default function SimpleMobileNav({}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    services: false,
    resources: false,
    company: false,
    residentialBusiness: false, // Add state for the new section
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        className="p-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 flex flex-col gap-1">
          <span className="block h-0.5 rounded transition-all duration-300 bg-gray-800" />
          <span className="block h-0.5 rounded transition-all duration-300 bg-gray-800" />
          <span className="block h-0.5 rounded transition-all duration-300 bg-gray-800" />
        </div>
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-xl overflow-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b bg-primary-50">
              <span className="font-bold text-xl text-primary-600">
                LB Computer Help
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-4">
                {/* Services Dropdown */}
                <li>
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-2 px-4 text-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                      onClick={() => toggleSection("services")}
                      type="button"
                      aria-expanded={expandedSections.services}
                    >
                      <span>Services</span>
                      <svg
                        className={`h-5 w-5 transform transition-transform ${expandedSections.services ? "rotate-180" : ""}`}
                        fill="none"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {expandedSections.services && (
                      <div className="ml-4 mt-2 border-l-2 border-blue-100 pl-4">
                        <Link
                          href="/#services"
                          className="block py-2 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Services Overview
                        </Link>
                        <Link
                          href="/services"
                          className="block py-2 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Services & Pricing
                        </Link>
                        <Link
                          href="/book"
                          className="block py-2 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Book Appointment
                        </Link>
                      </div>
                    )}
                  </div>
                </li>

                {/* Resources Dropdown */}
                <li>
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-2 px-4 text-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                      onClick={() => toggleSection("resources")}
                      type="button"
                      aria-expanded={expandedSections.resources}
                    >
                      <span>Resources</span>
                      <svg
                        className={`h-5 w-5 transform transition-transform ${expandedSections.resources ? "rotate-180" : ""}`}
                        fill="none"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {expandedSections.resources && (
                      <div className="ml-4 mt-2 border-l-2 border-blue-100 pl-4">
                        <Link
                          href="/case-studies"
                          className="block py-2 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Case Studies
                        </Link>
                        <Link
                          href="/blog"
                          className="block py-2 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Blog
                        </Link>
                        <Link
                          href="/web-tools"
                          className="block py-2 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Web Tools
                        </Link>
                      </div>
                    )}
                  </div>
                </li>

                {/* Company Dropdown */}
                <li>
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-2 px-4 text-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                      onClick={() => toggleSection("company")}
                      type="button"
                      aria-expanded={expandedSections.company}
                    >
                      <span>Company</span>
                      <svg
                        className={`h-5 w-5 transform transition-transform ${expandedSections.company ? "rotate-180" : ""}`}
                        fill="none"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {expandedSections.company && (
                      <div className="ml-4 mt-2 border-l-2 border-blue-100 pl-4">
                        <Link
                          href="/#about"
                          className="block py-2 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          About Us
                        </Link>
                        <Link
                          href="/contact"
                          className="block py-2 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Contact
                        </Link>
                      </div>
                    )}
                  </div>
                </li>

                {/* Residential/Business Dropdown */}
                <li>
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-2 px-4 text-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                      onClick={() => toggleSection("residentialBusiness")}
                      type="button"
                      aria-expanded={expandedSections.residentialBusiness}
                    >
                      <span>Residential/Business</span>
                      <svg
                        className={`h-5 w-5 transform transition-transform ${expandedSections.residentialBusiness ? "rotate-180" : ""}`}
                        fill="none"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedSections.residentialBusiness && (
                      <div className="ml-4 mt-2 border-l-2 border-blue-100 pl-4">
                        <Link
                          href="/residential-business"
                          className="block py-2 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Residential & Business Services
                        </Link>
                      </div>
                    )}
                  </div>
                </li>

                {/* Emergency Button */}
                <li>
                  <Link
                    href="/emergency"
                    className="block py-2 px-4 text-lg font-medium text-orange-500 hover:bg-orange-50 rounded-lg border border-orange-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Emergency Support
                  </Link>
                </li>
                <li className="mt-4">
                  <Link
                    href="/contact"
                    className="block py-2 px-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="p-4 border-t">
              <a
                href="tel:2133496790"
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (213) 349-6790
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
