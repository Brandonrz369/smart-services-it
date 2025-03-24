'use client';

import { useEffect } from 'react';

export default function AdminWebToolsLayout({ children }: { children: React.ReactNode }) {
  // Handle URL parameters in the layout
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get URL parameters
      const params = new URLSearchParams(window.location.search);
      const tool = params.get('tool');
      
      // If we have a tool parameter, find and click the button
      if (tool) {
        setTimeout(() => {
          const buttons = document.querySelectorAll('button');
          for (const button of buttons) {
            if (button.textContent?.toLowerCase().includes(tool.toLowerCase())) {
              button.click();
              break;
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