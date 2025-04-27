"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RevealText from "@/components/RevealText";

declare global {
  interface Window {
    gtag_report_conversion: (url?: string) => void;
  }
}

interface ServiceDetail {
  title: string;
  description: string;
  icon: string;
  features: string[];
  pricing: { service: string; price: string; description: string }[];
  category: string;
  longDescription: string;
}

interface ServicesPageClientProps {
  servicesDetail: ServiceDetail[];
}

export default function ServicesPageClient({ servicesDetail }: ServicesPageClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);



  return (
    <div
    >
      {/* Header Banner - Blended */}
      <div className="relative py-24 bg-primary text-white"> {/* Styled with primary color */}
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Keep overlay */}
        {/* Removed background image */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1> {/* Updated heading */}
          <p className="text-xl max-w-3xl mx-auto">
            Welcome to the Smart Services America Resources page! Here, you’ll find valuable guides, articles, and FAQs to help you navigate the world of technology. Whether you need troubleshooting tips, tech advice, or step-by-step instructions, we have you covered.
          </p> {/* Updated text */}
        </div>
      </div>

      {/* Tech Guides Section - Added */}
      <section className="py-16 px-4 md:px-8 bg-gray-50"> {/* Keep gray background */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tech Guides
            </h2> {/* Added heading */}
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our in-depth guides provide step-by-step instructions for resolving common tech problems. From setting up your home network to protecting your data, we have the resources you need.
            </p> {/* Added text */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl mx-auto"> {/* Adjusted grid */}
            {/* Tech Guide Items (Based on scraped content) */}
             <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Troubleshoot Wi-Fi Issues</h3>
              <p className="text-gray-600">Is your Wi-Fi slow or not working? This guide walks you through steps to troubleshoot and fix common Wi-Fi problems.</p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Setting Up a New Computer: A Step-by-Step Guide</h3>
              <p className="text-gray-600">Just bought a new computer? Follow our guide to get your machine set up properly and start using it right away.</p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Backup Best Practices</h3>
              <p className="text-gray-600">Protect your valuable data by learning how to set up regular backups, whether to the cloud or an external drive.</p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Optimizing Your Home Network for Speed and Security</h3>
              <p className="text-gray-600">Boost your home internet performance while keeping your network safe from potential threats.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Blended */}
      <section className="py-16 px-4 md:px-8 bg-white"> {/* Adjusted background */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2> {/* Keep heading */}
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Here are some common questions we receive, along with quick answers to help you find the solutions you need.
            </p> {/* Updated text */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl mx-auto">
            {/* FAQ Items (Based on scraped content) */}
             <div className="bg-gray-50 p-6 rounded-lg shadow-md"> {/* Adjusted background */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How can I get tech support from Smart Services America?</h3> {/* Updated text */}
              <p className="text-gray-600">You can reach us through our contact form or call our hotline at +1-800-386-5777 for immediate assistance.</p> {/* Updated text and phone number */}
            </div>
             <div className="bg-gray-50 p-6 rounded-lg shadow-md"> {/* Adjusted background */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What should I do if my computer won't turn on?</h3> {/* Updated text */}
              <p className="text-gray-600">Check the power cable, make sure the outlet is working, and try holding down the power button for 10 seconds.</p> {/* Updated text */}
            </div>
             <div className="bg-gray-50 p-6 rounded-lg shadow-md"> {/* Adjusted background */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I update my antivirus software?</h3> {/* Updated text */}
              <p className="text-gray-600">Open your antivirus program and navigate to the settings or update section to check for and install the latest updates.</p> {/* Updated text */}
            </div>
             <div className="bg-gray-50 p-6 rounded-lg shadow-md"> {/* Adjusted background */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What are the benefits of backing up my data?</h3> {/* Updated text */}
              <p className="text-gray-600">Backing up your data ensures that you won’t lose important files if your device malfunctions, is lost, or gets hacked.</p> {/* Updated text */}
            </div>
             {/* Removed other FAQ items not on smartservicesit.store */}
          </div>
        </div>
      </section>

      {/* Removed Service Details Modal */}
      {/* Removed Case Studies Section */}
      {/* Removed CTA Section */}
    </div>
  );
}
