'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface Stat {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

interface StatsSectionProps {
  title: string;
  subtitle?: string;
  stats: Stat[];
  className?: string;
}

export default function StatsSection({
  title,
  subtitle,
  stats,
  className = '',
}: StatsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className={`py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p 
              className="text-lg text-blue-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter 
                  end={stat.value} 
                  duration={2000} 
                  prefix={stat.prefix || ''} 
                  suffix={stat.suffix || ''} 
                />
              </div>
              <div className="text-blue-100">{stat.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
