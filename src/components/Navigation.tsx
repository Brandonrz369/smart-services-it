'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SimpleMobileNav from './SimpleMobileNav';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isEmergencyVisible, setIsEmergencyVisible] = useState(true);
  
  // Check if we're on home page and handle scroll event
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if current path is home page
    const path = window.location.pathname;
    const isHome = path === '/' || path === '';
    setIsHomePage(isHome);
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Immediate check for scroll position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force consistent style regardless of page
  const navBackgroundColor = () => {
    if (isHomePage) {
      // Always use fully opaque background to avoid transparency issues
      return isScrolled ? 'bg-white shadow-md' : 'bg-white';
    } else {
      // Always visible white background for non-home pages
      return 'bg-white shadow-lg';
    }
  };

  const textColor = () => {
    // Always use dark text since we now always have a background
    if (isHomePage) {
      return 'text-blue-600';
    } else {
      return 'text-blue-600';
    }
  };

  const linkTextColor = () => {
    // Always use dark text since we now always have a background
    if (isHomePage) {
      return 'text-gray-700';
    } else {
      return 'text-gray-700';
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {isEmergencyVisible && (
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 py-1">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full px-2 py-0.5 text-white text-xs mr-2">24/7 SUPPORT</div>
                <a href="tel:2133496790" className="text-white text-sm hover:underline flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (213) 349-6790
                </a>
              </div>
              <div className="flex items-center">
                <Link href="/emergency" className="text-white text-xs hover:underline flex items-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Emergency Service
                </Link>
                <button 
                  onClick={() => setIsEmergencyVisible(false)} 
                  className="text-white/80 hover:text-white"
                  aria-label="Close emergency banner"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`${navBackgroundColor()} py-2`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className={`font-bold text-xl ${textColor()}`}>
            LB Computer Help
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/#services" 
              className={`${linkTextColor()} hover:text-blue-500 transition-colors font-medium`}
            >
              Services
            </Link>
            <Link 
              href="/services" 
              className={`${linkTextColor()} hover:text-blue-500 transition-colors font-medium`}
            >
              Services & Pricing
            </Link>
            <Link 
              href="/case-studies" 
              className={`${linkTextColor()} hover:text-blue-500 transition-colors font-medium`}
            >
              Case Studies
            </Link>
            <Link 
              href="/blog" 
              className={`${linkTextColor()} hover:text-blue-500 transition-colors font-medium`}
            >
              Blog
            </Link>
            <Link 
              href="/web-tools" 
              className={`${linkTextColor()} hover:text-blue-500 transition-colors font-medium`}
            >
              Web Tools
            </Link>
            <Link 
              href="/book" 
              className={`${linkTextColor()} hover:text-blue-500 transition-colors font-medium`}
            >
              Book Appointment
            </Link>
            <Link 
              href="/emergency" 
              className={`${linkTextColor()} hover:text-orange-400 transition-colors font-medium text-orange-300`}
            >
              Emergency
            </Link>
            <Link 
              href="/#about" 
              className={`${linkTextColor()} hover:text-blue-500 transition-colors font-medium`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium ml-2"
            >
              Contact
            </Link>
          </nav>
          <SimpleMobileNav />
        </div>
      </div>
    </div>
  );
}