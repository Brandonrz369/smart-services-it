'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function BookingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className={`min-h-screen bg-white text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Banner */}
      <div className="relative py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/images/tech-background.svg')] bg-repeat opacity-5"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Schedule a consultation or service call with our IT experts
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <FadeIn direction="right">
                <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
                  <h2 className="text-xl font-bold mb-4">Why Book with Us?</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 font-medium">Flexible scheduling that works around your time</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 font-medium">Expert technicians qualified to handle any IT issue</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 font-medium">Remote or on-site services available</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 font-medium">Clear pricing with no hidden fees</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-bold mb-4">Need Help?</h2>
                  <p className="text-gray-600 mb-4">
                    If you have questions about booking or need immediate assistance, our team is here to help.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className="text-gray-700 font-medium">(213) 349-6790</p>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-700 font-medium">support@lbcomputerhelp.com</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link 
                      href="/contact"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <span>Visit Contact Page</span>
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-2">
              <FadeIn direction="left">
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Schedule Your Appointment</h2>
                  <div className="h-[700px]">
                    {/* Direct iframe solution for more reliable embedding */}
                    <iframe 
                      src="https://calendly.com/lbcomputerhelp-support/30min?embed=true&hide_gdpr_banner=1&background_color=ffffff&text_color=333333&primary_color=2563eb"
                      width="100%"
                      height="650px"
                      frameBorder="0"
                      title="Schedule Appointment"
                      className="min-h-[650px]"
                      allow="camera; microphone; autoplay; encrypted-media; fullscreen;"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Booking FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What happens after I book?</h3>
              <p className="text-gray-600">
                After booking, you&apos;ll receive a confirmation email with appointment details. Our team will reach out if any additional information is needed before your scheduled time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How do I prepare for my appointment?</h3>
              <p className="text-gray-600">
                Make a list of issues you&apos;re experiencing, have any relevant device information ready, and ensure we can access the systems that need service.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I reschedule if needed?</h3>
              <p className="text-gray-600">
                Yes, you can reschedule through the link in your confirmation email or by calling our office at least 24 hours in advance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer remote support?</h3>
              <p className="text-gray-600">
                Yes, many issues can be resolved with remote support. During your scheduled time, we&apos;ll guide you through establishing a secure remote connection if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emergency Support Banner */}
      <section className="py-12 px-4 md:px-8 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-4">Need Urgent IT Support?</h2>
            <p className="text-lg mb-6 text-red-100 max-w-2xl mx-auto">
              Don&apos;t wait for a scheduled appointment if you have a critical IT emergency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/emergency" 
                className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition duration-300 flex items-center justify-center"
              >
                Emergency Support
              </Link>
              <Link 
                href="tel:2133496790" 
                className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}