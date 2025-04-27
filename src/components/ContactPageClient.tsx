"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import CalendlyWidget from "@/components/CalendlyWidget";

declare global {
  interface Window {
    gtag_report_conversion: (url?: string) => void;
  }
}

export default function ContactPageClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      }

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
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
      className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Contact Banner */}
      <div className="relative py-24 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/contact-background.jpg')",
            mixBlendMode: "overlay",
            opacity: 0.4,
          }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact LB Computer Help in Long Beach</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Reach out for expert IT support, computer repair, and managed services in the Long Beach area.
          </p>
        </div>
      </div>

      {/* Contact Information and Form */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <FadeIn direction="right" className="w-full lg:w-1/2">
              <div className="bg-gray-50 rounded-xl p-8 shadow-md h-full">
                <h2 className="text-2xl font-bold mb-8">Long Beach IT Support Contact Details</h2>

                <div className="space-y-6">
                  {/* Contact Details */}
                   <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Phone</h3>
                      <p className="text-gray-600 mb-1">(800) 386-5777</p>
                      <p className="text-sm text-gray-500">Call for immediate <strong>computer support</strong> (Mon-Sun, 10AM-7PM)</p>
                    </div>
                  </div>
                   <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Email</h3>
                      <p className="text-gray-600 mb-1">support@smartservicesit.store</p>
                      <p className="text-sm text-gray-500">Email us for inquiries about <strong>managed services</strong> or <strong>IT consulting</strong> (Response within 24 hours)</p>
                    </div>
                  </div>
                   <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Address</h3>
                      <p className="text-gray-600 mb-1">454 S Broadway</p>
                      <p className="text-gray-600 mb-1">Hicksville, NY 11801</p>
                      <p className="text-sm text-gray-500">Visit our <strong>Hicksville</strong> office by appointment for device drop-off or consultation</p>
                    </div>
                  </div>
                   <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Hours</h3>
                      <p className="text-gray-600 mb-1">Monday-Sunday: 10AM - 7PM</p>
                      <p className="text-sm text-gray-500 mt-2">After-hours emergency service available</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-lg font-bold mb-4">Our Hicksville Service Area</h3>
                  <p className="text-gray-600 mb-2">
                    Providing on-site <strong>computer repair</strong> and <strong>IT support</strong> across Hicksville and Nassau County, including:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      "Hicksville", "Bethpage", "Plainview", "Syosset", "Jericho", "Westbury",
                      "Levittown", "East Meadow", "Farmingdale", "Garden City", "Mineola",
                      "Hempstead", "Nassau County",
                    ].map((area) => (
                      <span key={area} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Request IT Support or Computer Service</h2>

                {formStatus === "success" ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    {/* Success Message */}
                    <div className="text-green-500 mx-auto mb-4">
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700 mb-4">Thank you for contacting Smart Services IT. We'll get back to you as soon as possible.</p>
                    <button onClick={() => setFormStatus("idle")} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">Send Another Message</button>
                  </div>
                ) : formStatus === "error" ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    {/* Error Message */}
                     <div className="text-red-500 mx-auto mb-4">
                     </div>
                     <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
                     <p className="text-red-700 mb-4">We couldn't send your message. Please try again or contact us directly at (800) 386-5777.</p>
                     <button onClick={() => setFormStatus("idle")} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">Try Again</button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} action="https://formspree.io/f/xzzeddgr" method="POST" className="space-y-6">
                    {/* Form Fields */}
                    <input type="text" name="_gotcha" style={{ display: "none" }} />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                        <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                        <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Your email address" />
                      </div>
                    </div>
                     <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Your phone number (optional)" />
                    </div>
                     <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                      <select id="service" name="service" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select a service</option>
                        <option value="computer-services">Computer Services</option>
                        <option value="network-support">Network Support</option>
                        <option value="data-solutions">Data Solutions</option>
                        <option value="security-cleanup">Security Cleanup Assistance</option>
                        <option value="managed-services">Managed IT Services</option>
                        <option value="emergency">Emergency Support</option>
                        <option value="consultation">IT Consultation</option>
                        <option value="mobile-assistance">Mobile Device Assistance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                     <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
                      <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Please describe what you need help with..."></textarea>
                    </div>
                     <div className="flex items-start">
                      <input id="consent" name="consent" type="checkbox" required className="mt-1 mr-2" />
                      <label htmlFor="consent" className="text-sm text-gray-600">I agree to be contacted by Smart Services IT regarding my inquiry. <span className="text-red-500">*</span></label>
                    </div>
                     <button
                       type="submit"
                       className={`w-full py-3 px-4 font-bold rounded-lg transition duration-300 ${
                         formStatus === 'submitting'
                           ? 'bg-gray-400 cursor-not-allowed'
                           : 'bg-blue-600 text-white hover:bg-blue-700'
                       }`}
                     >
                       {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
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
              <h2 className="text-3xl font-bold mb-4">
                Schedule IT Support Online
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Book a convenient time for <strong>IT support</strong>, <strong>computer repair</strong>, or <strong>IT consultation</strong> directly using our online calendar. Select a time that works for you, and we'll confirm your appointment.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="h-[600px] md:h-[700px]">
                <CalendlyWidget
                  url="https://calendly.com/smartservicesit/tech-support"
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
            <h2 className="text-2xl font-bold mb-8 text-center">
              Visit Our Hicksville Office (By Appointment)
            </h2>
            <div className="bg-white p-2 rounded-xl shadow-md">
              {/* Responsive iframe container with 16:9 aspect ratio */}
              <div
                className="relative overflow-hidden rounded-lg"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.923884233527!2d-73.52732282403666!3d40.76638077138221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2817e1db39f17%3A0x8531d8ea24479007!2s454%20S%20Broadway%2C%20Hicksville%2C%20NY%2011801!5e0!3m2!1sen!2sus!4v1682650974256!5m2!1sen!2sus"
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
              Our emergency <strong>IT support</strong> team is available to help with critical <strong>computer service</strong> and <strong>business IT</strong> issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/emergency"
                className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition duration-300 flex items-center justify-center"
              >
                Emergency Support
              </Link>
              <Link
                href="tel:8003865777"
                className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
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
