'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const videoRef = useRef(null);
  const router = useRouter();

  const videos = [
    { webm: '/art1.webm', mp4: '/art1.mp4' },
    { webm: '/art2.webm', mp4: '/art2.mp4' },
    { webm: '/art3.webm', mp4: '/art3.mp4' },
    { webm: '/art4.webm', mp4: '/art3.mp4' },
    { webm: '/art5.webm', mp4: '/art3.mp4' },
    { webm: '/art8.webm', mp4: '/art5.mp4' },
  ];

  const words = ['Challenging', 'Exploring', 'Discovering', 'Innovating'];

  // Preload all videos (hidden in DOM)
  useEffect(() => {
    videos.forEach(({ webm, mp4 }) => {
      const video = document.createElement('video');
      video.src = webm || mp4;
      video.preload = 'auto';
      video.style.display = 'none';
      document.body.appendChild(video);
    });

    return () => {
      document.querySelectorAll('video[preload="auto"]').forEach((video) => video.remove());
    };
  }, []);

  // Change video source dynamically for smooth preloaded playback
  useEffect(() => {
    if (videoRef.current) {
      const video = videos[currentVideoIndex]; // Get the correct video object
      videoRef.current.src = video.webm || video.mp4; // Set src properly
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentVideoIndex]);

  // Memoized transition handlers
  const handleVideoTransition = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  }, [videos.length]);

  const handleVideoEnd = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
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
    <div className="relative h-[65vh] w-full overflow-hidden">
      {/* Horizontal Lines */}
      <div className="absolute inset-0 z-10">
        <div className="h-full mx-8 lg:mx-36 flex flex-col justify-between">
          <div className="w-full h-px bg-white/20" />
          {/* <div className="w-full h-px bg-white/80" /> */}
          <div className="w-full h-px mb-14 bg-white/100" />
        </div>
      </div>

      {/* Video Background */}
      <AnimatePresence mode="wait">
        {videos.map((video, index) =>
          currentVideoIndex === index && (
            <motion.div
              key={video.webm} // Use video.webm as a key
              className="absolute top-0 left-0 w-full h-full bg-black" // Ensure black background
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }}
            >
              <motion.video
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                preload="auto"
              >
                <source src={videos[currentVideoIndex].webm} type="video/webm" />
                <source src={videos[currentVideoIndex].mp4} type="video/mp4" />
                Your browser does not support the video tag.
              </motion.video>
            </motion.div>
          )
        )}
      </AnimatePresence>

        {/* Navigation */}
        <Navbar />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content Container with Margins */}
      <div className="absolute inset-0 mx-8 lg:mx-36">
        
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
          <div className="text-left ">
            <AnimatePresence mode="wait">
                <motion.h1
                    key={words[currentWordIndex]}
                    initial={{  x: 100 }}
                    animate={{ x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl md:text-6xl font-normal md:px-12 mt-12 md:mt-8 pb-2 font-visuelt "
                    // className="text-6xl md:text-8xl font-normal md:px-12 pb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
                    style={{ lineHeight: '1' }} // optional, try adjusting line-height
                >
                    {words[currentWordIndex]}
                </motion.h1>
            </AnimatePresence>

            
            <h1 className="text-4xl md:text-6xl font-normal mb-4 font-nunito md:mx-12">
               Feasible.
            </h1>

            <motion.p 
              className="text-lg md:text-2xl max-w-xl mx-auto mb-8 md:px-12 font-nunito font-extralight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Transformative tech and expert consulting to drive your business forward.
            </motion.p>

            <button
              onClick={() => router.push('/contact')}
              className=" px-4 md:px-12 py-3 hover:bg-transparent transition-colors relative overflow-hidden group "
            >
              <span className="relative z-10 text-2xl font-extralight font-nunito">Connect With Us</span>
              <div className="absolute bottom-[8px] left-0 w-0 h-[2px] bg-yellow-400 mx-12 mr-20 transition-all duration-300 ease-out group-hover:w-full" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;