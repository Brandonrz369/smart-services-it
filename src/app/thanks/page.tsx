'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const router = useRouter();
  
  // Add a redirect timer to send user back to homepage after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen pt-32 pb-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-500 p-6 text-white">
          <h1 className="text-3xl font-bold text-center">Thank You!</h1>
        </div>
        
        <div className="p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg 
              className="w-10 h-10 text-green-500" 
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
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your message has been sent successfully!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Thank you for contacting LB Computer Help. We've received your message 
            and will get back to you as soon as possible.
          </p>
          
          <p className="text-sm text-gray-500 mb-8">
            You will be automatically redirected to the homepage in 10 seconds.
          </p>
          
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}