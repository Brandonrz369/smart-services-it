'use client';

import { useEffect } from 'react';

export default function WebToolsLayout({ children }: { children: React.ReactNode }) {
  // Handle URL parameters in the layout
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get URL parameters
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      const tool = params.get('tool');
      
      // If we have tab or tool parameter, find and click the button
      if (tab || tool) {
        setTimeout(() => {
          const selector = tab 
            ? `button[data-tool="${tab}"]` 
            : tool 
              ? `button[data-tool="${tool}"]` 
              : null;
          
          if (selector) {
            const button = document.querySelector(selector) as HTMLButtonElement;
            if (button) {
              button.click();
            }
          }
        }, 100);
      }
    }
  }, []);

  return (
    <div>
      {children}
    </div>
  );
}