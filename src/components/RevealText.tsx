"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  once?: boolean;
  delay?: number;
}

export default function RevealText({
  text,
  children,
  className = "",
  once = true,
  delay = 0,
}: RevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  // Handle either text prop or children
  const content = text ? text.split(" ") : [];

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text ? (
        // If text prop is provided, split into words with animation
        content.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-1"
            variants={child}
          >
            {word}{" "}
          </motion.span>
        ))
      ) : (
        // If children are provided, use them directly
        <motion.div variants={child} className="inline-block">
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
