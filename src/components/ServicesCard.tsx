"use client";

import { useState } from "react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features?: string[];
  className?: string;
  link?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  features = [],
  className = "",
  link = "/services"
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Render the icon as text (emoji)
  const renderIcon = () => {
    return (
      <div className="text-4xl mb-4">
        {icon}
      </div>
    );
  };

  return (
    <div 
      className={`bg-white p-6 rounded-lg shadow-md h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderIcon()}
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      {features.length > 0 && (
        <div className="mt-auto mb-4 space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg 
                className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      )}
      
      <Link 
        href={link}
        className="inline-block text-primary hover:text-primary-dark mt-auto font-medium transition-colors flex items-center"
      >
        Learn More
        <svg 
          className="w-5 h-5 ml-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>
      </Link>
    </div>
  );
}
