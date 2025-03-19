'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  image?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export default function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
  className = '',
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoPlay) return;
    
    // Clear any existing timeout first
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, interval);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, autoPlay, interval, testimonials.length]);

  const handlePrev = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="relative h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-full flex flex-col items-center justify-center py-6 px-4 text-center"
          >
            <div className="mb-6">
            </div>
            <p className="text-gray-700 italic mb-6 text-base line-clamp-5 md:line-clamp-4 max-h-36 overflow-y-auto">&ldquo;{testimonials[current].text}&rdquo;</p>
            <div>
              {testimonials[current].image && (
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={testimonials[current].image} alt={testimonials[current].name} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="font-semibold text-gray-900">{testimonials[current].name}</p>
              <p className="text-sm text-gray-500">{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${index === current ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white transition-colors"
        aria-label="Previous testimonial"
      >
        <svg className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white transition-colors"
        aria-label="Next testimonial"
      >
        <svg className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
