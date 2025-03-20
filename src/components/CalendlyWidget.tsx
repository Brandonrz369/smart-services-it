'use client';

import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    // Load the Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Clean up on unmount
    return () => {
      document.body.removeChild(script);
      // Remove any Calendly-related elements
      const calendlyElements = document.querySelectorAll('[data-calendly]');
      calendlyElements.forEach(el => el.remove());
    };
  }, []);

  useEffect(() => {
    // Initialize Calendly when the script is loaded
    if (containerRef.current && window.Calendly) {
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
    }
  }, [url]);

  return (
    <div 
      ref={containerRef} 
      className="calendly-inline-widget" 
      data-testid="calendly-embed"
      style={{
        minWidth: '320px',
        height: height,
        width: width
      }}
    />
  );
}