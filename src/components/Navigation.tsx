'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SimpleMobileNav from './SimpleMobileNav';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  
  // Check if we're on home page and handle scroll event
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if current page is home page
    setIsHomePage(window.location.pathname === '/' || window.location.pathname === '');
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackgroundColor = () => {
    if (isHomePage) {
      return isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4';
    } else {
      return 'bg-blue-600 py-4';
    }
  };

  const textColor = () => {
    if (isHomePage) {
      return isScrolled ? 'text-blue-600' : 'text-white';
    } else {
      return 'text-white';
    }
  };

  const linkTextColor = () => {
    if (isHomePage) {
      return isScrolled ? 'text-gray-700' : 'text-white';
    } else {
      return 'text-white';
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackgroundColor()}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className={`font-bold text-xl ${textColor()}`}>
          LB Computer Help
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/#services" 
            className={`${linkTextColor()} hover:text-blue-500 transition-colors font-medium`}
          >
            Services
          </Link>
          <Link 
            href="/blog" 
            className={`${linkTextColor()} hover:text-blue-500 transition-colors font-medium`}
          >
            Blog
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
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium ml-2"
          >
            Contact
          </Link>
        </nav>
        <SimpleMobileNav isScrolled={isHomePage && isScrolled} />
      </div>
    </div>
  );
}