"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";

// Declare gtag_report_conversion function for TypeScript
declare global {
  interface Window {
    gtag_report_conversion: (url?: string) => void;
  }
}

export default function SmartContactClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      // Call Google Ads conversion tracking (keep for now)
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      }

      // Submit to Formspree (keep for now)
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus("success");
        // Optionally reset form fields here if needed
        form.reset();
      } else {
        // Try to get error from Formspree response
        const data = await response.json();
        console.error("Formspree error:", data);
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus("error");
    }
  };


  return (
    <div
      className={`min-h-screen bg-white text-gray-800 font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Contact Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We Fix Technology. It's As Simple As That. Free Quote
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn direction="right">
              <div className="space-y-6">
                {/* Contact Details */}
                 <div className="flex items-start">
                  <div className="bg-primary p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Phone Number</h3>
                    <p className="text-gray-800 mb-1">+1-800-386-5777</p>
                  </div>
                </div>
                 <div className="flex items-start">
                  <div className="bg-primary p-3 rounded-full mr-4">
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <p className="text-gray-800 mb-1">support@smartservicesit.store</p>
                  </div>
                </div>
                 <div className="flex items-start">
                  <div className="bg-primary p-3 rounded-full mr-4">
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Address</h3>
                    <p className="text-gray-800 mb-1">123 Main Street</p>
                    <p className="text-gray-800 mb-1">Hicksville, NY 11801</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="bg-gray-50 rounded-xl p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                {formStatus === "success" ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    {/* Success Message */}
                    <div className="text-green-500 mx-auto mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700 mb-4">Thank you for contacting Smart Services IT. We'll get back to you as soon as possible.</p>
                    <button onClick={() => setFormStatus("idle")} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300">Send Another Message</button>
                  </div>
                ) : formStatus === "error" ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    {/* Error Message */}
                     <div className="text-red-500 mx-auto mb-4">
                       <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     </div>
                     <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
                     <p className="text-red-700 mb-4">We couldn't send your message. Please try again or contact us directly at +1-800-386-5777.</p>
                     <button onClick={() => setFormStatus("idle")} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">Try Again</button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} action="https://formspree.io/f/xzzeddgr" method="POST" className="space-y-6">
                    {/* Form Fields */}
                    <input type="hidden" name="_next" value="https://smartservicesit.store/thanks" />
                    <input type="text" name="_gotcha" style={{ display: "none" }} />
                     <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label> {/* Removed asterisk */}
                      <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Your name" /> {/* Styled focus color */}
                    </div>
                     <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label> {/* Removed asterisk */}
                      <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Your email address" /> {/* Styled focus color */}
                    </div>
                     <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label> {/* Removed asterisk */}
                      <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Please describe what you need help with..."></textarea> {/* Styled focus color */}
                    </div>
                     {/* Removed consent checkbox */}
                     <button
                       type="submit"
                       disabled={formStatus === 'submitting'} // Disable button while submitting
                       className={`w-full py-3 px-4 font-bold rounded-lg transition duration-300 ${
                         formStatus === 'submitting'
                           ? 'bg-gray-400 cursor-not-allowed'
                           : 'bg-primary text-white hover:bg-primary-dark' // Styled with primary color
                       }`}
                     >
                       {formStatus === 'submitting' ? 'Sending...' : 'Send'} {/* Updated button text */}
                     </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
