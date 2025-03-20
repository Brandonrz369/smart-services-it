'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface CalendlyWidgetProps {
  url: string;
  styles?: {
    height?: string;
    minWidth?: string;
    width?: string;
  };
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: {
      [key: string]: string;
    };
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
}

export default function CalendlyWidget({
  url,
  styles = { height: '630px', width: '100%' },
  prefill,
  utm
}: CalendlyWidgetProps) {
  useEffect(() => {
    // Initialize Calendly when component mounts
    const initCalendly = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url,
          parentElement: document.getElementById('calendly-widget'),
          prefill,
          utm,
        });
      }
    };

    // Check if Calendly is already loaded
    if (window.Calendly) {
      initCalendly();
    } else {
      // Wait for Calendly script to load
      window.addEventListener('calendly:load', initCalendly);
    }

    // Cleanup
    return () => {
      window.removeEventListener('calendly:load', initCalendly);
    };
  }, [url, prefill, utm]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.dispatchEvent(new Event('calendly:load'));
        }}
      />
      <div 
        id="calendly-widget" 
        style={styles}
        className="calendly-inline-widget"
      />
    </>
  );
}

// Add TypeScript global type definition
declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (config: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: CalendlyWidgetProps['prefill'];
        utm?: CalendlyWidgetProps['utm'];
      }) => void;
    };
  }
}