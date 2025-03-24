import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "LB Computer Help | Professional IT Services & Computer Repair",
  description: "Expert IT support, computer repair, and managed services for businesses and residential clients throughout Long Beach and Los Angeles County.",
  keywords: "computer repair, IT support, managed IT services, MSP, laptop repair, Long Beach, Los Angeles, data recovery, smartphone repair",
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
        <FormLoggerProvider>
          <Navigation />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          
          <ChatBot />
          
          <footer className="bg-gray-900 text-white relative z-10">
          <div className="container mx-auto px-4 md:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">LB Computer Help</h3>
                <p className="text-gray-300 mb-4">Professional IT support and computer repair services in Long Beach and throughout Los Angeles County.</p>
                <p className="text-gray-300">© {new Date().getFullYear()} LB Computer Help. All rights reserved.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Services</h3>
                <ul className="space-y-2">
                  <li><Link href="/services" className="text-gray-300 hover:text-white transition">Computer Repair</Link></li>
                  <li><Link href="/services" className="text-gray-300 hover:text-white transition">IT Support</Link></li>
                  <li><Link href="/services" className="text-gray-300 hover:text-white transition">Managed Services</Link></li>
                  <li><Link href="/services" className="text-gray-300 hover:text-white transition">Data Recovery</Link></li>
                  <li><Link href="/emergency" className="text-red-400 hover:text-red-300 transition">Emergency Support</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-300">(213) 349-6790</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300">support@lbcomputerhelp.com</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <span className="text-gray-300">927 Magnolia Ave #2</span><br />
                      <span className="text-gray-300">Long Beach, CA 90813</span>
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
          </div>
        </footer>
        </FormLoggerProvider>
      </body>
    </html>
  );
}
