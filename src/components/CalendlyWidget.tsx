"use client";

import { useState } from "react";

interface CalendlyWidgetProps {
  url: string;
  height?: string;
  width?: string;
}

export default function CalendlyWidget({
  url,
  height = "630px",
  width = "100%",
}: CalendlyWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Convert Calendly URL to iframe embed URL by adding embed=true
  const getEmbedUrl = (originalUrl: string) => {
    // Handle null case
    if (!originalUrl) return "";

    try {
      // Create a URL object to properly handle the URL
      const urlObj = new URL(originalUrl);

      // Set the embed parameter and other styling parameters
      urlObj.searchParams.set("embed", "true");
      urlObj.searchParams.set("hide_gdpr_banner", "1");
      urlObj.searchParams.set("background_color", "ffffff");
      urlObj.searchParams.set("text_color", "333333");
      urlObj.searchParams.set("primary_color", "2563eb");

      return urlObj.toString();
    } catch (e) {
      // If URL parsing fails, fall back to the original method
      console.error("Error parsing Calendly URL:", e);

      // Remove any query parameters and add our own
      const baseUrl = originalUrl.split("?")[0];
      return `${baseUrl}?embed=true&hide_gdpr_banner=1&background_color=ffffff&text_color=333333&primary_color=2563eb`;
    }
  };

  // Safe URL handling
  const embedUrl = url ? getEmbedUrl(url) : "";

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className="calendly-container">
      {isLoading && (
        <div className="flex justify-center items-center" style={{ height }}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error ? (
        <div
          className="w-full p-6 bg-gray-100 rounded-lg border border-gray-300 text-center"
          style={{ height }}
        >
          <p className="text-gray-700 mb-4">
            Unable to load the appointment scheduler.
          </p>
          <p className="text-gray-700 mb-4">
            Please try again later or contact us directly:
          </p>
          <a
            href="tel:8003865777"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-block"
          >
            Call (800) 386-5777
          </a>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          width={width}
          height={height}
          frameBorder="0"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{
            display: isLoading ? "none" : "block",
            minHeight: height,
          }}
          data-testid="calendly-iframe"
          title="Schedule Appointment"
          allow="camera; microphone; autoplay; encrypted-media; fullscreen;"
        />
      )}
    </div>
  );
}
