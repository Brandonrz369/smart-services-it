"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 text-sm flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-medium mr-4">24/7 SUPPORT</span>
          <a 
            href="tel:8003865777" 
            className="flex items-center hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (800) 386-5777
          </a>
        </div>
        <div>
          <a 
            href="/emergency" 
            className="flex items-center hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Emergency Services
            <span className="ml-1">&times;</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`w-full bg-white py-4 px-4 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-primary text-2xl font-bold">
            Smart Services IT
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="relative group">
              <button className="px-3 py-2 text-gray-700 hover:text-primary flex items-center">
                Services
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 origin-top">
                <Link href="/services" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Computer Services</Link>
                <Link href="/services#it-support" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">IT Support</Link>
                <Link href="/services#managed-services" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Managed Services</Link>
                <Link href="/services#data-solutions" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Data Solutions</Link>
                <Link href="/emergency" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Emergency Support</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="px-3 py-2 text-gray-700 hover:text-primary flex items-center">
                Resources
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 origin-top">
                <Link href="/blog" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Blog</Link>
                <Link href="/faqs" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">FAQs</Link>
                <Link href="/tools" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Tech Tools</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="px-3 py-2 text-gray-700 hover:text-primary flex items-center">
                Company
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 origin-top">
                <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About Us</Link>
                <Link href="/testimonials" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Testimonials</Link>
                <Link href="/privacy" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Privacy Policy</Link>
                <Link href="/terms" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Terms of Service</Link>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/emergency" className="px-4 py-2 text-white bg-secondary hover:bg-secondary-dark rounded-md transition-colors">
              Emergency
            </Link>
            <Link href="/contact" className="px-4 py-2 text-white bg-primary hover:bg-primary-dark rounded-md transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4 pb-4`}>
          <div className="flex flex-col">
            <div className="py-2 border-b border-gray-200">
              <button className="w-full flex justify-between items-center py-2 px-4 text-left">
                <span>Services</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="pl-4 mt-2">
                <Link href="/services" className="block py-2">Computer Services</Link>
                <Link href="/services#it-support" className="block py-2">IT Support</Link>
                <Link href="/services#managed-services" className="block py-2">Managed Services</Link>
                <Link href="/services#data-solutions" className="block py-2">Data Solutions</Link>
                <Link href="/emergency" className="block py-2">Emergency Support</Link>
              </div>
            </div>

            <div className="py-2 border-b border-gray-200">
              <button className="w-full flex justify-between items-center py-2 px-4 text-left">
                <span>Resources</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="pl-4 mt-2">
                <Link href="/blog" className="block py-2">Blog</Link>
                <Link href="/faqs" className="block py-2">FAQs</Link>
                <Link href="/tools" className="block py-2">Tech Tools</Link>
              </div>
            </div>

            <div className="py-2 border-b border-gray-200">
              <button className="w-full flex justify-between items-center py-2 px-4 text-left">
                <span>Company</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="pl-4 mt-2">
                <Link href="/about" className="block py-2">About Us</Link>
                <Link href="/testimonials" className="block py-2">Testimonials</Link>
                <Link href="/privacy" className="block py-2">Privacy Policy</Link>
                <Link href="/terms" className="block py-2">Terms of Service</Link>
              </div>
            </div>

            <div className="py-4 flex flex-col space-y-3">
              <Link href="/emergency" className="text-center py-2 text-white bg-secondary hover:bg-secondary-dark rounded-md transition-colors">
                Emergency
              </Link>
              <Link href="/contact" className="text-center py-2 text-white bg-primary hover:bg-primary-dark rounded-md transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}