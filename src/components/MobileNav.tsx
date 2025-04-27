"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface MobileNavProps {
  isScrolled: boolean;
  activeSection?: string;
}

export default function MobileNav({
  isScrolled,
  activeSection = "",
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle keyboard and click events
  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === "undefined") return;

    // Close menu on escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    // Close menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listeners
    window.addEventListener("keydown", handleEscKey);

    // Only add click handler when menu is open
    if (isOpen) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      // Prevent body scrolling when menu is open
      if (typeof document !== "undefined") {
        document.body.style.overflow = "hidden";
      }
    }

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleClickOutside);

      // Reset body scrolling when unmounted
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        className="p-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 flex flex-col gap-1">
          <span
            className={`block h-0.5 rounded transition-all duration-300 ${isScrolled ? "bg-gray-800" : "bg-white"} ${isOpen ? "transform rotate-45 translate-y-1.5" : ""}`}
          />
          <span
            className={`block h-0.5 rounded transition-all duration-300 ${isScrolled ? "bg-gray-800" : "bg-white"} ${isOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-0.5 rounded transition-all duration-300 ${isScrolled ? "bg-gray-800" : "bg-white"} ${isOpen ? "transform -rotate-45 -translate-y-1.5" : ""}`}
          />
        </div>
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b bg-blue-50">
            <span className="font-bold text-xl text-blue-600">
              Smart Services IT
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close mobile menu"
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

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-4">
              <li>
                <a
                  href="#services"
                  className={`block py-2 px-4 text-lg font-medium rounded-lg transition-colors ${
                    activeSection === "services"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block py-2 px-4 text-lg font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/emergency"
                  className="block py-2 px-4 text-lg font-medium text-orange-400 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Emergency
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className={`block py-2 px-4 text-lg font-medium rounded-lg transition-colors ${
                    activeSection === "about"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`block py-2 px-4 text-lg font-medium rounded-lg transition-colors ${
                    activeSection === "contact"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t">
            <a
              href="tel:8003865777"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (800) 386-5777
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
