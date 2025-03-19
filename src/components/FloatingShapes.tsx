'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ShapeProps {
  size: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
  type: 'circle' | 'square' | 'triangle';
  color: string; // Now using hex color strings instead of Tailwind class names
}

interface FloatingShapesProps {
  count?: number;
  className?: string;
}

export default function FloatingShapes({
  count = 8,
  className = '',
}: FloatingShapesProps) {
  const [shapes, setShapes] = useState<ShapeProps[]>([]);

  useEffect(() => {
    // Use our defined color palette
    const colors = [
      'var(--primary-300)',
      'var(--primary-400)',
      'var(--primary-500)',
      'var(--primary-600)',
      'var(--primary-700)',
      'var(--secondary-300)',
      'var(--secondary-400)'
    ];
    const types: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];
    
    const generatedShapes: ShapeProps[] = [];
    
    for (let i = 0; i < count; i++) {
      generatedShapes.push({
        size: Math.random() * 40 + 10,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        delay: Math.random() * 3,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setShapes(generatedShapes);
  }, [count]);

  const renderShape = (shape: ShapeProps, index: number) => {
    const { size, x, y, rotation, delay, type, color } = shape;
    const opacity = Math.random() * 0.3 + 0.1;
    
    // Remove key from the props object
    const commonProps = {
      className: `absolute backdrop-blur-sm`,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        opacity: 0.3,
      },
      initial: { opacity: 0, rotate: rotation, scale: 0 },
      animate: { 
        opacity,
        rotate: rotation + 360,
        scale: 1,
        x: [0, Math.random() * 40 - 20, 0], 
        y: [0, Math.random() * 40 - 20, 0],
      },
      transition: {
        duration: Math.random() * 10 + 15,
        repeat: Infinity,
        delay: delay,
        ease: 'easeInOut',
      },
    };
    
    switch (type) {
      case 'circle':
        return <motion.div key={index} {...commonProps} className={`${commonProps.className} rounded-full`} />;
      case 'square':
        return <motion.div key={index} {...commonProps} className={`${commonProps.className} rounded-md`} />;
      case 'triangle':
        return (
          <motion.div
            key={index}
            {...commonProps}
            className={`${commonProps.className} triangle`}
            style={{
              ...commonProps.style,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map(renderShape)}
    </div>
  );
}
