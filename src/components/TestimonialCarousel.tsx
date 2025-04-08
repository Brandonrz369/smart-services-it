"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  image?: string;
  source?: "google" | "yelp" | "facebook" | "thumbtack" | "nextdoor";
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
  className = "",
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto-rotation
  useEffect(() => {
    if (!autoPlay) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set up next slide timeout
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, interval);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, autoPlay, interval, testimonials.length]);

  // Navigation handlers
  const handlePrev = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className={`${className} relative`}>
      {/* Main testimonial content */}
      <div className="bg-white rounded-lg shadow-sm p-6 relative">
        {/* Source logo (if available) */}
        {testimonials[current].source && (
          <div className="absolute top-2 right-2">
            {testimonials[current].source === "google" && (
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 512 512">
                  <path
                    d="M256 0C114.84 0 0 114.84 0 256C0 397.16 114.84 512 256 512C397.16 512 512 397.16 512 256C512 114.84 397.16 0 256 0Z"
                    fill="#6FBE66"
                  />
                  <path
                    d="M363.68 195.76L363.44 195.52C335.52 165.92 303.2 149.92 256 149.92C208.8 149.92 176.48 166.16 148.56 195.76L148.32 195.52L111.2 159.04V352H152.8V221.92C175.52 200 212.96 190.24 256 190.24C299.04 190.24 336.48 200 359.2 222.16V352H400.8V159.04L363.68 195.76Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
            {testimonials[current].source === "yelp" && (
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 512 512">
                  <path
                    d="M256 0C114.84 0 0 114.84 0 256C0 397.16 114.84 512 256 512C397.16 512 512 397.16 512 256C512 114.84 397.16 0 256 0Z"
                    fill="#D32323"
                  />
                  <path
                    d="M280.64 169.68L359.52 244.88C361.44 246.72 362.64 249.12 362.8 251.84C362.96 254.56 362.08 257.12 360.32 259.12L332.24 292.08C330.24 294.4 327.52 295.68 324.56 295.68C318.56 295.68 313.68 290.8 313.68 284.8C313.68 282.56 314.32 280.48 315.52 278.64L334.64 254.96L269.76 194.32L251.04 277.68C250.08 282.32 246.4 285.68 241.76 286.32C237.12 287.04 232.32 284.88 230.16 280.8L197.84 225.76C196.64 223.92 196 221.84 196 219.52C196 213.52 200.88 208.64 206.88 208.64C209.84 208.64 212.56 209.92 214.64 212.24L241.12 249.76L258.56 171.52C259.52 166.88 263.2 163.52 267.84 162.96C272.48 162.24 277.28 164.4 279.44 168.48C280 168.88 280.32 169.28 280.64 169.68Z"
                    fill="white"
                  />
                  <path
                    d="M210.56 316.56C213.84 315.84 217.44 316.96 219.92 319.28L249.92 342.32C252 343.92 253.36 346.32 253.76 349.04C254.16 351.76 253.6 354.48 252 356.72L220 404.32C218.24 406.96 215.52 408.72 212.32 409.12C207.2 409.68 202.48 406.16 201.92 401.04C201.76 399.68 201.92 398.4 202.32 397.12L225.2 348.16L196.16 325.68C194.08 324.08 192.72 321.68 192.32 318.96C191.92 316.24 192.48 313.52 194.08 311.28L208.48 289.12C210.24 286.32 213.04 284.64 216.32 284.32C221.92 283.76 226.72 287.92 227.36 293.68C227.52 295.2 227.36 296.8 226.88 298.24L217.28 321.52C215.04 320.16 212.8 318.32 210.56 316.56Z"
                    fill="white"
                  />
                  <path
                    d="M201.76 258.8L151.04 269.44C146.4 270.4 142.24 268.16 140.4 264.16C138.56 260.16 139.68 255.52 143.04 252.64L187.68 213.76C189.6 212.16 192.32 211.28 195.04 211.44C197.76 211.68 200.32 212.88 202.16 214.96L227.68 244.8C228.96 246.4 229.76 248.32 229.76 250.48C229.76 256.48 224.88 261.36 218.88 261.36C216.8 261.36 214.72 260.72 213.04 259.68L192.32 244.48L150.08 277.28L205.92 265.84C210.56 264.88 215.36 267.68 216.48 272.16C217.6 276.64 215.12 281.44 210.64 282.48L128.96 302.08C128.8 302.08 128.56 302.08 128.4 302.24C128.32 302.24 128.24 302.24 128.24 302.24C124.4 303.04 120.72 301.36 118.48 298.16C116.4 295.2 116 291.36 117.76 288.08L118.16 287.28C119.68 284.48 122.4 282.64 125.44 282.16L196.96 265.2C198.56 264.8 200.16 264.08 201.76 258.8Z"
                    fill="white"
                  />
                  <path
                    d="M281.6 357.44L297.12 337.44C299.04 335.04 301.84 333.52 304.96 333.36C310.08 333.04 314.56 336.88 314.88 342C314.96 343.2 314.88 344.48 314.56 345.68L304.32 387.28C302.96 392.56 298.08 395.92 292.8 394.56C287.52 393.12 284.16 388.32 285.52 383.04L293.92 348.24L279.2 366.96C277.28 369.36 274.4 370.88 271.36 371.04C266.24 371.36 261.76 367.52 261.44 362.4C261.36 361.2 261.44 359.92 261.76 358.72L271.76 318.4C273.12 313.12 277.92 309.76 283.2 311.12C288.48 312.48 291.84 317.36 290.48 322.64L282.56 353.28C282.24 354.72 281.92 356.08 281.6 357.44Z"
                    fill="white"
                  />
                  <path
                    d="M339.52 384.4L333.6 334.24C332.96 329.6 335.92 325.28 340.4 324.32C341.28 324.16 342.16 324.08 342.96 324.08C346.8 324.08 350.32 326.4 351.52 329.92L374.08 389.44C375.52 393.28 373.68 397.68 369.84 399.2C366 400.72 361.6 398.8 360.08 394.96L342.64 348.48L348.16 394.32C348.8 399.04 345.76 403.36 341.28 404.4C336.64 405.36 332.08 402.4 331.04 397.76L323.36 354.56L312.64 380.48C311.2 384.32 306.8 386.08 302.96 384.64C299.12 383.12 297.36 378.72 298.8 374.88L317.28 331.04C318.24 328.64 320.08 326.88 322.4 326C324.8 325.04 327.44 325.28 329.68 326.56C331.76 327.76 333.2 329.76 333.76 332.08L339.68 382.24C339.68 382.96 339.6 383.68 339.52 384.4Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
            {testimonials[current].source === "facebook" && (
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 512 512">
                  <path
                    d="M256 0C114.84 0 0 114.84 0 256C0 397.16 114.84 512 256 512C397.16 512 512 397.16 512 256C512 114.84 397.16 0 256 0Z"
                    fill="#1877F2"
                  />
                  <path
                    d="M355.6 330.4L367.36 256H296.32V208C296.32 188.32 306.08 169.28 337.28 169.28H370.4V105.28C370.4 105.28 341.76 100 314.56 100C258.24 100 221.44 134.72 221.44 199.36V256H156.64V330.4H221.44V512C234.56 514.72 248.16 516 262.24 516C276.32 516 289.92 514.72 303.04 512V330.4H355.6Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
            {testimonials[current].source === "thumbtack" && (
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 512 512">
                  <rect width="512" height="512" rx="256" fill="#FFFFFF" />
                  <path
                    d="M415.47 140.75L371.26 96.53C359.87 85.15 341.15 85.15 329.77 96.53L227.79 198.51L141.13 111.85L119.15 133.83L205.81 220.49L103.83 322.47C92.45 333.85 92.45 352.57 103.83 363.96L148.04 408.17C159.43 419.55 178.15 419.55 189.53 408.17L291.51 306.19L378.17 392.85L400.15 370.87L313.49 284.21L415.47 182.23C426.85 170.85 426.85 152.13 415.47 140.75Z"
                    fill="#009FD9"
                  />
                </svg>
              </div>
            )}
            {testimonials[current].source === "nextdoor" && (
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 512 512">
                  <rect width="512" height="512" rx="256" fill="#8BBF3D" />
                  <path
                    d="M142 142H370V370H142V142ZM256 182L182 256L256 330L330 256L256 182Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Fixed height testimonial text container */}
        <div className="min-h-[100px] flex items-center justify-center">
          <div className="relative max-h-[100px] overflow-y-auto">
            <p className="text-gray-700 italic text-base md:text-lg text-center">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>
          </div>
        </div>

        {/* Author info */}
        <div className="text-center mt-4">
          {testimonials[current].image && (
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
              <Image
                src={testimonials[current].image || ""}
                alt={testimonials[current].name}
                className="object-cover"
                width={64}
                height={64}
              />
            </div>
          )}
          <p className="font-semibold text-gray-900">
            {testimonials[current].name}
          </p>
          <p className="text-sm text-gray-500">{testimonials[current].role}</p>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Previous testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Pagination indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-blue-600 w-6" : "bg-gray-300"}`}
              onClick={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setCurrent(index);
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Next testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
