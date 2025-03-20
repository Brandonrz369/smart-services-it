'use client';

import { useEffect, useRef, useState } from 'react';

// Add TypeScript declaration for the Calendly global object
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string | number | boolean | null | undefined>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

interface CalendlyWidgetProps {
  url: string;
  height?: string;
  width?: string;
}

export default function CalendlyWidget({
  url,
  height = '630px',
  width = '100%'
}: CalendlyWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    if (window.Calendly) {
      setIsScriptLoaded(true);
      return;
    }
    
    // Load the Calendly script if not already present
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      script.onerror = () => setScriptError(true);
      document.head.appendChild(script);
      
      // Clean up on unmount only if we added the script
      return () => {
        try {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
        } catch (error) {
          console.error('Error removing Calendly script:', error);
        }
      };
    } else {
      // Script already exists, just mark as loaded
      setIsScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Initialize Calendly when the script is loaded
    if (containerRef.current && isScriptLoaded && window.Calendly) {
      try {
        window.Calendly.initInlineWidget({
          url: url,
          parentElement: containerRef.current,
          prefill: {},
          utm: {
            utmSource: 'website',
            utmMedium: 'direct',
            utmCampaign: 'booking_page'
          }
        });
      } catch (error) {
        console.error('Error initializing Calendly widget:', error);
        setScriptError(true);
      }
    }
  }, [url, isScriptLoaded]);

  if (scriptError) {
    return (
      <div className="w-full p-6 bg-gray-100 rounded-lg border border-gray-300 text-center">
        <p className="text-gray-700 mb-4">Unable to load the appointment scheduler.</p>
        <p className="text-gray-700 mb-4">Please try again later or contact us directly:</p>
        <a href="tel:2133496790" className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-block">
          Call (213) 349-6790
        </a>
      </div>
    );
  }

  return (
    <div className="calendly-container">
      {!isScriptLoaded && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="calendly-inline-widget" 
        data-testid="calendly-embed"
        style={{
          minWidth: '320px',
          height: height,
          width: width,
          display: isScriptLoaded ? 'block' : 'none'
        }}
      />
    </div>
  );
}