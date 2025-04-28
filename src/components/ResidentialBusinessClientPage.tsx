
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FloatingShapes from "@/components/FloatingShapes";
import TypewriterEffect from "@/components/TypewriterEffect";
import ServicesCard from "@/components/ServicesCard";
import TestimonialCarousel, {
  Testimonial,
} from "@/components/TestimonialCarousel";
import RevealText from "@/components/RevealText";

declare global {
  interface Window {
    gtag_report_conversion: (url?: string) => void;
  }
}


export default function ResidentialBusinessClientPage(/* props: ResidentialBusinessClientPageProps */) {
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
        form.reset();
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

  const testimonials: Testimonial[] = [
     {
      text: "Our medical office relies heavily on our computer systems, and when our network had issues, Smart Services IT provided exceptional support. Alex arrived promptly, understood our HIPAA compliance requirements, and resolved our connectivity problems while ensuring all our sensitive patient data remained secure. The service was fast, professional, and reasonably priced.",
      name: "Dr. Emily P.",
      role: "Healthcare Professional",
      image: "/images/testimonials/client1.jpg",
      source: "google",
    },
    {
      text: "Smart Services IT saved my small accounting business during tax season! Our main workstation was infected with ransomware, and I was panicking about losing client data. They responded within 30 minutes of my call, worked after hours to clean the system, and recovered all our files. I've since recommended them to several colleagues.",
      name: "Robert C.",
      role: "CPA & Business Owner",
      image: "/images/testimonials/client4.jpg",
      source: "nextdoor",
    },
  ];

  const services = [
    {
      title: "Solutions for Personal Use",
      description: "Our home solutions cover a wide range of technologies, from speeding up your computer to setting up your smart TV, along with education and support tailored to your needs.",
      category: "personal",
    },
    {
      title: "Solutions for Small Businesses",
      description: "For small businesses and entrepreneurs, Smart Services America serves as your personal IT support team, offering fast, same-day service.",
      category: "business",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Hero Section - Blended */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center bg-gradient-to-r from-primary-dark via-primary to-primary-light">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
           <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              mixBlendMode: "overlay",
              opacity: 0.4,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark"></div>
          <FloatingShapes />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white">
              We Fix Technology. It's As Simple As That.
            </h1> {/* Updated headline */}
            <div className="text-2xl md:text-3xl lg:text-4xl text-white mb-6"> {/* Updated text color */}
               <TypewriterEffect
                  texts={[
                    "Home & Business Computer Repair",
                    "Expert IT Support",
                    "Reliable Network Solutions",
                    "Free Quote",
                  ]}
                />
            </div>
            <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              We Come To You in 2 Hours. We Fix All Major Issues. Smart Services America offers same-day computer repair solutions.
            </p> {/* Updated text content */}
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
             <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 shadow-md flex items-center">
                  <span>Get a Free Quote</span> {/* Updated button text */}
                </Link>
                {/* Removed second button for simplicity */}
              </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Section - Blended */}
      <section id="services" className="py-20 px-4 bg-gray-50"> {/* Keep gray background for now */}
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Technology Solutions for Home and Office
              </h2> {/* Updated heading */}
              <p className="text-gray-600 max-w-2xl mx-auto">
                Smart Services America ensures your technology runs smoothly with expert solutions, from support to recommendations.
              </p> {/* Updated text */}
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Changed to 2 columns to match smartservicesit.store structure */}
            {services.map((service, index) => (
              <FadeIn key={service.title} direction="up" delay={index * 0.1}> {/* Adjusted delay */}
                <ServicesCard
                  title={service.title}
                  description={service.description}
                  icon=""
                  features={[]}
                />
              </FadeIn>
            ))}
          </div>
           {/* Removed "View All Services" button for simplicity */}
        </div>
      </section>

       {/* Trust & Transparency Section - Blended */}
      <section id="trust" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Much More Than Just Tech Support
              </h2> {/* Updated heading */}
              <p className="text-gray-600 max-w-2xl mx-auto">
                Smart Services America is all about real people helping real people improve the way technology fits into their lives. Our friendly, US-based team is ready to tackle any computer repair or tech challenge with same-day service from the comfort of your home. We’ll earn your trust with our reliable, secure and accessible approach.
              </p> {/* Updated text */}
            </FadeIn>
          </div>

          {/* Removed the 3-column grid with icons and text for simplicity */}
           <div className="text-center"> {/* Added text-center for the remaining content */}
             <FadeIn direction="up">
               <p className="text-gray-600 max-w-2xl mx-auto"> {/* Keep this paragraph or update */}
                 At Smart Services America, our customers always come first. We ask every client about their experience and share their feedback with you here. Read on to see what our clients have to say!
               </p>
             </FadeIn>
           </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50"> {/* Keep gray background */}
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2> {/* Updated heading */}
            </FadeIn>
          </div>
          <FadeIn direction="up">
            <TestimonialCarousel testimonials={testimonials} /> {/* Keep existing testimonials for now */}
          </FadeIn>
           {/* Removed call to action block for simplicity */}
        </div>
      </section>

      {/* Contact Section - Blended */}
      <section id="contact" className="py-20 px-4 bg-gray-900 text-white"> {/* Keep dark background */}
         <div className="container mx-auto max-w-4xl"> {/* Adjusted max-width */}
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Connect
              </h2> {/* Updated heading */}
              <p className="text-gray-300 max-w-2xl mx-auto">
                {/* Keep or update introductory text if needed */}
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12"> {/* Keep 2 columns */}
            {/* Contact Info Column - Blended */}
             <div>
               <FadeIn direction="right">
                  <div className="space-y-6"> {/* Adjusted spacing */}
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-primary p-3 rounded-full mr-4"> {/* Styled with primary color */}
                        <svg
                          className="w-6 h-6 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div><h3 className="font-semibold text-lg">Phone Number</h3><p className="text-gray-300">+1-800-386-5777</p></div> {/* Updated phone number */}
                    </div>
                    {/* Email */}
                     <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 bg-primary p-3 rounded-full mr-4"> {/* Styled with primary color */}
                        <svg
                          className="w-6 h-6 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                       </div>
                       <div><h3 className="font-semibold text-lg">Email</h3><p className="text-gray-300">info@smartservicesamerica.com</p></div> {/* Updated email */}
                     </div>
                     {/* Address */}
                     <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 bg-primary p-3 rounded-full mr-4"> {/* Styled with primary color */}
                        <svg
                          className="w-6 h-6 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                       </div>
                       <div><h3 className="font-semibold text-lg">Address</h3><p className="text-gray-300">454 s Broadway<br />Hicksville, NY 11801</p></div> {/* Updated address */}
                     </div>
                     {/* Removed Hours */}
                  </div>
               </FadeIn>
             </div>

             {/* Form Column - Blended */}
             <div className="bg-gray-800 rounded-xl p-8 shadow-lg"> {/* Keep dark background */}
               <h3 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h3> {/* Keep heading */}
               <form onSubmit={handleFormSubmit} action="https://formspree.io/f/xzzeddgr" method="POST">
                 <input type="hidden" name="page_source" value="Residential-Business Page Form" /> {/* Updated source */}

                 <div className="space-y-4">
                   <div>
                     <label htmlFor="name_rb" className="block text-sm font-medium text-gray-300 mb-1">Name</label> {/* Removed asterisk, updated id */}
                     <input type="text" id="name_rb" name="name" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Your name" /> {/* Styled focus color */}
                   </div>
                   <div>
                     <label htmlFor="email_rb" className="block text-sm font-medium text-gray-300 mb-1">Email</label> {/* Removed asterisk, updated id */}
                     <input type="email" id="email_rb" name="email" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Your email" /> {/* Styled focus color */}
                   </div>
                   {/* Removed Phone Number field */}
                   {/* Removed Service Needed field */}
                   <div>
                     <label htmlFor="message_rb" className="block text-sm font-medium text-gray-300 mb-1">Message</label> {/* Removed asterisk, updated id */}
                     <textarea id="message_rb" name="message" rows={5} required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Please describe what you need help with..."></textarea> {/* Styled focus color */}
                   </div>
                   {/* Removed consent checkbox */}
                 </div>
                 <button
                   type="submit"
                   className={`mt-6 w-full py-3 px-4 bg-primary text-white font-bold rounded-lg transition duration-300 ${
                     formStatus === 'submitting'
                       ? 'bg-gray-400 cursor-not-allowed'
                       : 'hover:bg-primary-dark'
                   }`}
                 >
                   {formStatus === 'submitting' ? 'Sending...' : 'Send'} {/* Updated button text */}
                 </button>
               </form>
             </div>
           </div>
         </div>
      </section>
    </div>
  );
}
