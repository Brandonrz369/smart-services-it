'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import FadeIn from '@/components/FadeIn';
import CalendlyWidget from '@/components/CalendlyWidget';

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      // Convert FormData to a simple object
      console.log('Preparing contact form data...');
      const formObject: Record<string, string | File> = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      // Send as JSON instead of FormData
      console.log('Submitting contact form to Formspree as JSON...');
      const response = await fetch('https://formspree.io/f/xzzeddgr', {
        method: 'POST',
        body: JSON.stringify(formObject),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Formspree response status:', response.status);
      
      if (response.ok) {
        console.log('Form successfully submitted!');
        setFormStatus('success');
      } else {
        console.error('Form submission failed');
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };
  
  return (
    <div className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Contact Banner */}
      <div className="relative py-24 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/contact-background.jpg')", mixBlendMode: "overlay", opacity: 0.4 }}></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with our team for all your IT support needs
          </p>
        </div>
      </div>
      
      {/* Contact Information and Form */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <FadeIn direction="right" className="w-full lg:w-1/2">
              <div className="bg-gray-50 rounded-xl p-8 shadow-md h-full">
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Phone</h3>
                      <p className="text-gray-600 mb-1">(213) 349-6790</p>
                      <p className="text-sm text-gray-500">Available Mon-Sat, 6AM-6PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Email</h3>
                      <p className="text-gray-600 mb-1">support@lbcomputerhelp.com</p>
                      <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Address</h3>
                      <p className="text-gray-600 mb-1">927 Magnolia Ave #2</p>
                      <p className="text-gray-600 mb-1">Long Beach, CA 90813</p>
                      <p className="text-sm text-gray-500">Please call for appointment before visiting</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Hours</h3>
                      <p className="text-gray-600 mb-1">Monday-Friday: 6AM - 6PM</p>
                      <p className="text-gray-600 mb-1">Saturday: 6AM - 6PM</p>
                      <p className="text-gray-600 mb-1">Sunday: Closed</p>
                      <p className="text-sm text-gray-500 mt-2">After-hours emergency service available</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-lg font-bold mb-4">Service Area</h3>
                  <p className="text-gray-600 mb-2">
                    Proudly serving Long Beach and all of Los Angeles County, including:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['Long Beach', 'Lakewood', 'Signal Hill', 'Seal Beach', 'Los Alamitos', 
                      'Carson', 'Belmont Shore', 'Naples', 'Bixby Knolls', 'Alamitos Beach',
                      'California Heights', 'Wrigley', 'Downtown Long Beach'].map((area) => (
                      <span 
                        key={area}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {formStatus === 'success' ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="text-green-500 mx-auto mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700 mb-4">
                      Thank you for contacting LB Computer Help. We&apos;ll get back to you as soon as possible.
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : formStatus === 'error' ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <div className="text-red-500 mx-auto mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
                    <p className="text-red-700 mb-4">
                      We couldn&apos;t send your message. Please try again or contact us directly at (213) 349-6790.
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your phone number (optional)"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Service Needed
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a service</option>
                        <option value="computer-repair">Computer Repair</option>
                        <option value="network-support">Network Support</option>
                        <option value="data-recovery">Data Recovery</option>
                        <option value="virus-removal">Virus/Malware Removal</option>
                        <option value="managed-services">Managed IT Services</option>
                        <option value="emergency">Emergency Support</option>
                        <option value="consultation">IT Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Please describe what you need help with..."
                      ></textarea>
                    </div>
                    
                    <div className="flex items-start">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        required
                        className="mt-1 mr-2"
                      />
                      <label htmlFor="consent" className="text-sm text-gray-600">
                        I agree to be contacted by LB Computer Help regarding my inquiry.
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className={`w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 ${
                        formStatus === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {formStatus === 'submitting' ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Booking Calendar Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Schedule an Appointment</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Book a time for IT support or consultation directly using our online calendar. 
                Select a time that works for you, and we&apos;ll confirm your appointment.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="h-[600px] md:h-[700px]">
                <CalendlyWidget 
                  url="https://calendly.com/lbcomputerhelp-support/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=333333&primary_color=2563eb"
                  height="650px"
                  width="100%"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8 text-center">Our Location</h2>
            <div className="bg-white p-2 rounded-xl shadow-md">
              {/* Responsive iframe container with 16:9 aspect ratio */}
              <div className="relative overflow-hidden rounded-lg" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.2292133042263!2d-118.18417882391858!3d33.783694977244645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd31475bed32a5%3A0xcb59ca312167550!2s927%20Magnolia%20Ave%2C%20Long%20Beach%2C%20CA%2090813!5e0!3m2!1sen!2sus!4v1710842232461!5m2!1sen!2sus" 
                  width="600" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      
      {/* Emergency Support Banner */}
      <section className="py-16 px-4 md:px-8 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Need Urgent IT Support?</h2>
            <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
              Our emergency support team is available to help with critical IT issues.
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