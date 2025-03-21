'use client';

import { useState, FormEvent } from 'react';

export default function SimpleContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  // Regular form with a hidden success message that's shown after return
  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg 
          className="w-12 h-12 text-green-500 mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
        <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-700">Thank you for contacting us. We&apos;ll get back to you shortly.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Send Another Message
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h2>
      
      {/* Traditional HTML form that submits directly to FormSpree */}
      <form 
        action="https://formspree.io/f/xzzeddgr" 
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          
          // Get the form element
          const form = e.target as HTMLFormElement;
          
          // Create a hidden iframe to submit the form
          const iframe = document.createElement('iframe');
          iframe.name = 'hidden-form-submit';
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
          
          // Set up the form to target the iframe
          form.target = 'hidden-form-submit';
          
          // Set up a success handler for when the iframe loads
          iframe.onload = () => {
            setIsSuccess(true);
            form.reset();
            
            // Remove the iframe after a delay
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 1000);
          };
          
          // Submit the form
          form.submit();
        }}
      >
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
        
        {/* Hidden field for FormSpree to identify the form */}
        <input type="hidden" name="_form_name" value="simple_contact_form" />
        
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