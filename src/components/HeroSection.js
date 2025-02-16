'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

const HeroSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const videos = [
    '/art3A.mp4',
    '/art5.mp4',
    '/art10.mp4',
    '/art7.mp4',
    '/art8.mp4',
    '/art9.mp4'
  ];

  const words = ['Challenging', 'Exploring', 'Discovering', 'Innovating'];

  // Memoized transition handlers
  const handleVideoTransition = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  }, [videos.length]);

  const handleWordTransition = useCallback(() => {
    setCurrentWordIndex((prevIndex) => 
      prevIndex === words.length - 1 ? 0 : prevIndex + 1
    );
  }, [words.length]);

  useEffect(() => {
    const videoInterval = setInterval(handleVideoTransition, 4000);
    const wordInterval = setInterval(handleWordTransition, 3000);

    return () => {
      clearInterval(videoInterval);
      clearInterval(wordInterval);
    };
  }, [handleVideoTransition, handleWordTransition]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Horizontal Lines */}
      <div className="absolute inset-0 z-10">
        <div className="h-full mx-8 lg:mx-16 flex flex-col justify-between">
          <div className="w-full h-px bg-white/20" />
          <div className="w-full h-px bg-white/20" />
          <div className="w-full h-px bg-white/20" />
        </div>
      </div>

      {/* Video Background */}
      <AnimatePresence mode="wait">
        {videos.map((video, index) => (
          currentVideoIndex === index && (
            <motion.video
              key={video}
              src={video}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoTransition}
            />
          )
        ))}
      </AnimatePresence>
        {/* Navigation */}
        <Navbar />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content Container with Margins */}
      <div className="absolute inset-0 mx-8 lg:mx-28">
        
        {/* Hero Content */}
        <motion.div 
          className="h-full flex flex-col justify-center items-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

        {/* Horizontal Line */}
        <div className="absolute top-16 left-0 w-full">
            <hr className="border-t-2 border-gray-300 my-4 z-20" />
        </div>
          <div className="text-center">
            <AnimatePresence mode="wait">
                <motion.h1
                    key={words[currentWordIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-light mb-2 pb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
                    style={{ lineHeight: '1' }} // optional, try adjusting line-height
                >
                    {words[currentWordIndex]}
                </motion.h1>
            </AnimatePresence>

            
            <h1 className="text-4xl md:text-6xl font-light mb-4">
               Feasible
            </h1>

            <motion.p 
              className="text-lg md:text-xl max-w-2xl mx-auto mb-8 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Transformative tech and expert consulting to drive your business forward.
            </motion.p>

            <button className="border-2 border-white px-6 md:px-8 py-3 hover:bg-white hover:text-black transition-colors relative overflow-hidden group">
              <span className="relative z-10">Explore With Us</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;