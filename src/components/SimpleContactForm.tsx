'use client';

import { useEffect, useState } from 'react';

export default function SimpleContactForm() {
  const [isMobile, setIsMobile] = useState(false);
  const [formSubmitted, _setFormSubmitted] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = 
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      
      setIsMobile(mobile);
    };
    
    checkMobile();
  }, []);
  
  // Handle form submission logging
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Log the form submission attempt
    try {
      const formData = new FormData(e.currentTarget);
      const formDataObj: Record<string, string> = {};
      
      formData.forEach((value, key) => {
        if (typeof value === 'string') {
          formDataObj[key] = value;
        }
      });
      
      // Remove honeypot field from logging
      delete formDataObj['_gotcha'];
      
      // Send to our API for logging
      fetch('/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_name: 'simple_contact_form',
          form_data: formDataObj
        })
      }).catch(err => {
        console.error('Error logging form submission:', err);
      });
    } catch (err) {
      console.error('Error preparing form data for logging:', err);
    }
    
    // Allow the default form submission to continue
    return true;
  };
  
  // Show success message if form submitted
  if (formSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h2>
          <p className="text-gray-600 mb-4">Thank you for contacting us. We'll be in touch soon.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h2>
      
      {/* Super-simple form that works on all devices */}
      <form
        action="https://formspree.io/f/xzzeddgr"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        {/* If mobile, open in same window */}
        {!isMobile && (
          <input type="hidden" name="_next" value="https://lbcomputerhelp.com/thanks" />
        )}
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        
        {/* Include a honeypot field to prevent spam */}
        <input type="text" name="_gotcha" style={{ display: 'none' }} />
        
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}