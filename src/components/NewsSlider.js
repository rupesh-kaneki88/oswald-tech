'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { newsItems } from '../providers/NewsItems';

const NewsSlider = () => {
  

  return (
    <div className="relative w-full py-16 bg-white font-sans">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between mb-8 mx-6">
          <h2 className="text-2xl font-light text-gray-900">Latest News</h2>
          <h1 className="text-4xl text-gray-900 ">New possibilities that make industry headlines.</h1>
          {/* <div className="flex gap-4">
            <button 
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div> */}
        </div>

        <div className=" overflow-hidden w-full">
          <div className="flex animate-marquee gap-6">
            {newsItems.concat(newsItems).map((item, index) => (  // Duplicate items for seamless looping
              <motion.div
                key={index}
                className="min-w-[300px] md:min-w-[400px] bg-white p-6 rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-600">{item.date}</span>
                  <span className="text-sm font-medium text-gray-800">{item.source}</span>
                </div>
                <h3 className="text-xl text-gray-900 mb-4">{item.title}</h3>
                {/* <motion.span 
                  className="text-blue-600 inline-flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  Read More →
                </motion.span> */}
                <motion.span 
                  className="text-gray-600 font-italic inline-flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  Stay tuned
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSlider;
