'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SimpleMobileNav from './SimpleMobileNav';

interface DropdownItem {
  href: string;
  label: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  textColor: string;
}

// Reusable dropdown component for navigation
function NavDropdown({ label, items, textColor }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center ${textColor} hover:text-blue-500 transition-colors font-medium`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg 
          className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-100">
          <div className="py-1">
            {items.map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
  
  // Navigation dropdown items
  const servicesItems = [
    { href: "/#services", label: "Services Overview" },
    { href: "/services", label: "Services & Pricing" },
    { href: "/book", label: "Book Appointment" }
  ];
  
  const resourcesItems = [
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/web-tools", label: "Web Tools" }
  ];
  
  const companyItems = [
    { href: "/#about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/emergency", label: "Emergency Support" }
  ];
  
  // Check if admin is logged in
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check admin status from localStorage
    const adminAuth = localStorage.getItem('adminAuthenticated');
    setIsAdmin(adminAuth === 'true');
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {isEmergencyVisible && (
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 py-1">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full px-2 py-0.5 text-white text-xs mr-2 text-[10px] sm:text-xs whitespace-nowrap">24/7 SUPPORT</div>
                <a href="tel:2133496790" className="text-white text-[10px] sm:text-sm hover:underline flex items-center whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  (213) 349-6790
                </a>
              </div>
              <div className="flex items-center">
                <Link href="/emergency" className="text-white text-[10px] sm:text-xs hover:underline flex items-center mr-3 whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Emergency Services
                </Link>
                <button 
                  onClick={() => setIsEmergencyVisible(false)} 
                  className="text-white/80 hover:text-white ml-2"
                  aria-label="Close emergency banner"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3" viewBox="0 0 20 20" fill="currentColor">
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
            {/* Services Dropdown */}
            <NavDropdown 
              label="Services" 
              items={servicesItems} 
              textColor={linkTextColor()}
            />
            
            {/* Resources Dropdown */}
            <NavDropdown 
              label="Resources" 
              items={resourcesItems} 
              textColor={linkTextColor()}
            />
            
            {/* Company Dropdown */}
            <NavDropdown 
              label="Company" 
              items={companyItems} 
              textColor={linkTextColor()}
            />
            
            <Link 
              href="/emergency" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors font-medium ml-2"
            >
              Emergency
            </Link>
            
            <Link 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium ml-2"
            >
              Contact
            </Link>
            
            {/* Admin link - only visible when logged in */}
            {isAdmin && (
              <Link 
                href="/admin/forms" 
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors font-medium ml-2"
              >
                Admin
              </Link>
            )}
          </nav>
          <SimpleMobileNav />
        </div>
      </div>
    </div>
  );
}