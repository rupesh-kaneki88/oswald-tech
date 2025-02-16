'use client'

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const NewsSlider = () => {
  const sliderRef = useRef(null);

  const newsItems = [
    {
      date: '2024-09-09',
      source: 'The Washington Post',
      title: 'Osvan Tech Named as a 2024 Top 10 Workplace',
      logo: '/wp-logo.png'
    },
    {
      date: '2024-06-24',
      source: 'Defense News',
      title: "Osvan Tech's Project Enigma inches toward production contract",
      logo: '/defense-logo.png'
    },
    {
      date: '2024-06-03',
      source: 'Federal News Network',
      title: 'How AI goes from proof of concept to tool in production',
      logo: '/federal-logo.png'
    },
    {
      date: '2024-05-18',
      source: 'Forbes',
      title: 'Why Employee Mental Health Is A Priority At Osvan Tech',
      logo: '/forbes-logo.png'
    }
  ];

  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-light text-gray-900">Latest News</h2>
          <h1 className="text-3xl font-semibold text-gray-900">New possibilities that make industry headlines.</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              className="min-w-[300px] md:min-w-[400px] bg-white p-6 rounded-lg shadow-sm cursor-pointer"
              whileHover={{ y: -5 }}
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gray-600">{item.date}</span>
                <span className="text-sm font-medium text-gray-800">{item.source}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
              <motion.span 
                className="text-blue-600 inline-flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                Read More →
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSlider;
