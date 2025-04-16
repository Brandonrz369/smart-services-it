import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script"; // Import the Script component
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";
import { FormLoggerProvider } from "@/components/FormLogger";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LB Computer Help | Professional IT Services & Computer Assistance",
  description:
    "Expert IT support, computer services, and managed services for businesses and residential clients throughout Long Beach and Los Angeles County.",
  keywords:
    "Long Beach computer support, LB device troubleshooting, Mac screen assistance Long Beach, laptop battery service Long Beach, slow PC optimization Long Beach, data recovery consultation Long Beach, home network setup Long Beach, virus protection services Long Beach, business IT support Long Beach, computer diagnostic Long Beach, hardware configuration Long Beach, local tech help Long Beach, computer technical assistance Long Beach, residential computer services Long Beach, PC support Long Beach, computer help online Long Beach", // Refined keyword list
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-[100vw]`}
      >
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "LB Computer Help",
              "image": "", // Add logo URL if available
              "@id": "https://lbcomputerhelp.com",
              "url": "https://lbcomputerhelp.com",
              "telephone": "(213) 349-6790",
              "priceRange": "$$ - $$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "927 Magnolia Ave #2",
                "addressLocality": "Long Beach",
                "addressRegion": "CA",
                "postalCode": "90813",
                "addressCountry": "US"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "06:00",
                  "closes": "18:00"
                }
              ],
              "sameAs": [
                "https://facebook.com/lbcomputerhelp",
                "https://instagram.com/lbcomputerhelp"
              ]
            }),
          }}
        />
        <FormLoggerProvider>
          <Navigation />
          <main className="min-h-screen pt-20">{children}</main>

          <ChatBot />

          <footer className="bg-gray-900 text-white relative z-10">
            <div className="container mx-auto px-4 md:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">LB Computer Help</h3>
                  <p className="text-gray-300 mb-4">
                    Professional IT support and computer services in Long
                    Beach and throughout Los Angeles County.
                  </p>
                  <p className="text-gray-300">
                    © {new Date().getFullYear()} LB Computer Help. All rights
                    reserved.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Services</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/services"
                        className="text-gray-300 hover:text-white transition"
                      >
                        Computer Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services"
                        className="text-gray-300 hover:text-white transition"
                      >
                        IT Support
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services"
                        className="text-gray-300 hover:text-white transition"
                      >
                        Managed Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services"
                        className="text-gray-300 hover:text-white transition"
                      >
                        Data Solutions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/emergency"
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        Emergency Support
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
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
                      <span className="text-gray-300">(213) 349-6790</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-300">
                        support@lbcomputerhelp.com
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                      <div>
                        <span className="text-gray-300">
                          927 Magnolia Ave #2
                        </span>
                        <br />
                        <span className="text-gray-300">
                          Long Beach, CA 90813
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Hours</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-300">Monday-Friday: 6AM - 6PM</li>
                    <li className="text-gray-300">Saturday: 6AM - 6PM</li>
                    <li className="text-gray-300">Sunday: Closed</li>
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
              {/* Trust & Transparency Section */}
              <div className="mt-12 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                {/* Pricing */}
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">Transparent Pricing</h4>
                  <ul className="text-gray-400 space-y-1">
                    <li>Diagnostic Assessment: $99</li>
                    <li>Hourly Assistance: $125/hr</li>
                    <li>IT Consultation: $150/hr</li>
                    {/* Add more key prices if desired */}
                  </ul>
                </div>
                {/* Certified */}
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">Local & Certified</h4>
                  <p className="text-gray-400">LB Computer Help</p>
                  <p className="text-gray-400">927 Magnolia Ave #2, Long Beach, CA 90813</p>
                  <p className="text-gray-400">Serving Long Beach Since 2018</p>
                  <p className="text-gray-400 mt-1 font-medium">Fully Insured</p>
                  {/* Add Certifications */}
                </div>
                {/* Disclaimer */}
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">Independent Service Provider</h4>
                  <p className="text-gray-400">
                    LB Computer Help is an independent company providing expert tech assistance. We are not affiliated with Microsoft, Apple, Dell, HP, or others. Recommendations are based on best practices and your needs.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </FormLoggerProvider>

        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16853780718"
        />
        {/* Seobility Verification Meta Tag */}
        <meta name="seobility" content="2c1caf48b548cfc6f9a4828c80f1c74a" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16853780718');
          `}
        </Script>
        {/* Google Ads Lead Form Conversion Event Snippet */}
        <Script id="google-ads-lead-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16853780718/c4TrCL2P97UaEO6RweQ-',
                  'value': 1.0,
                  'currency': 'USD',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
        {/* Google Analytics 4 (GA4) */}
        <Script id="google-analytics-4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C7LHNFKCEG');
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
