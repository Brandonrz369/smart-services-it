'use client';

import { useState, FormEvent } from 'react';
import { submitForm } from '@/lib/form-helpers';

export default function SimpleContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      // Convert FormData to a simple object for JSON submission
      const formObject: Record<string, string> = {};
      formData.forEach((value, key) => {
        formObject[key] = value.toString();
      });
      
      console.log('Submitting form...');
      
      // Use our form submission helper
      const result = await submitForm(formObject, 'SimpleContactForm');
      
      if (result.success) {
        console.log('Form submitted successfully!');
        setIsSuccess(true);
        form.reset();
      } else {
        console.error('Form submission failed:', result.error || result.status);
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
      
      {isError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
          There was an error sending your message. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
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
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium text-white ${
            isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}