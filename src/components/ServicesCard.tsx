'use client';

import { useState, useEffect } from 'react';
import { motion, LazyMotion, domAnimation, m } from 'framer-motion';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features?: string[];
  className?: string;
  onlyShowFeaturesOnHover?: boolean; 
}

export default function ServiceCard({
  icon,
  title,
  description,
  features = [],
  className = '',
  onlyShowFeaturesOnHover = true,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const featureVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { opacity: 1, height: 'auto', marginTop: 16 },
  };

  // For mobile devices, always show features regardless of hover state
  const shouldShowFeatures = features.length > 0 && 
    (!onlyShowFeaturesOnHover || isHovered || isMobile);

  return (
    <motion.div
      className={`service-card bg-white rounded-xl p-6 shadow-lg ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LazyMotion features={domAnimation}>
        <m.div 
          className="service-icon text-4xl mb-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </m.div>
      </LazyMotion>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {shouldShowFeatures && (
        <motion.div
          className="mt-4 space-y-2"
          variants={featureVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
        >
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <svg className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 text-sm md:text-base">{feature}</span>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
