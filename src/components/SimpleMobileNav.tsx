'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MobileNavProps {
  isScrolled: boolean;
}

export default function SimpleMobileNav({ isScrolled }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button 
        className="p-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 flex flex-col gap-1">
          <span className={`block h-0.5 rounded transition-all duration-300 ${isScrolled ? 'bg-gray-800' : 'bg-white'}`} />
          <span className={`block h-0.5 rounded transition-all duration-300 ${isScrolled ? 'bg-gray-800' : 'bg-white'}`} />
          <span className={`block h-0.5 rounded transition-all duration-300 ${isScrolled ? 'bg-gray-800' : 'bg-white'}`} />
        </div>
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
          <div 
            className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-xl overflow-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b bg-primary-50">
              <span className="font-bold text-xl text-primary-600">LB Computer Help</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-4">
                <li>
                  <a 
                    href="#services" 
                    className="block py-2 px-4 text-lg font-medium text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className="block py-2 px-4 text-lg font-medium text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/emergency" 
                    className="block py-2 px-4 text-lg font-medium text-secondary-500 hover:bg-secondary-50 hover:text-secondary-600 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Emergency
                  </Link>
                </li>
                <li>
                  <a 
                    href="#about" 
                    className="block py-2 px-4 text-lg font-medium text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="block py-2 px-4 text-lg font-medium text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            <div className="p-4 border-t">
              <a 
                href="tel:2133496790" 
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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