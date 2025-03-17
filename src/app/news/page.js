'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';


const News = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const [isFaded, setIsFaded] = useState(false);

    useEffect(() => {
        document.title = 'Get2AI | News'
    }, [])

  // Handle video end event
  const handleVideoEnd = () => {
    setIsFaded(true);
    // Wait for the fade out effect to finish, then reset and start the video again
    setTimeout(() => {
      setIsFaded(false);
    }, 1000); // The duration of fade-out (1 second in this case)
  };

  return(
    <>
        <div className="relative h-[65vh] w-full bg-white overflow-hidden font-nunito">
            <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                loop
                transition={{ duration: 1 }}  // Add this from Services
                preload='auto'
            >
                <source src="/news-hero.webm" type="video/webm" />
                <source src="/news-hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </motion.video>
              
            <Navbar />
            <div className="absolute inset-0 bg-black/30" />

             <div className="absolute inset-0 px-4 md:px-16 lg:px-28 z-10">
                <div className="absolute top-16 left-0 w-full px-4 md:px-36">
                <hr className="border-t-2 border-gray-300 my-4" />
                </div>
    
                <div className="h-full flex flex-col font-nunito justify-center max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-left p-4 md:p-8 lg:p-16"
                >
                    <h1 className="text-xs md:text-base lg:text-base font-semibold text-white tracking-wider lg:mb-4">
                        NEWS
                    </h1>
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-base text-white mb-6">
                        Get2AI Technologies
                    </h2>
                    <p className="text-l md:text-2xl font-extralight text-white max-w-3xl">
                        Making the mission, making headlines.          
                    </p>
                </motion.div>
                </div>
            </div>
        </div>

        {/* after hero */}
        <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="group relative bg-white  overflow-hidden mx-4 md:mx-16 lg:mx-28 my-12 -mt-20"
        >
            <div className='flex flex-col md:flex-row bg-white font-nunito justify-center p-4 lg:p-8 '>
                <p className='text-lg md:text-[1.75rem] font-light text-gray-700  text-center mx-8 mt-4 lg:mx-44 leading-tight'>
                Welcome to our News and Updates section! Stay tuned for the latest announcements, innovations, and progress from Get2AI Technologies. Our goal is to keep you informed about the exciting developments in the tech world, particularly in network optimization, digital transformation, and cutting-edge AI technologies.
                </p>
            </div>
                    
        </motion.div>

        {/* Grid part */}
        <div className="container mx-auto  py-8 max-w-6xl -mt-4 font-nunito">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Left Column - Details */}
                <div className="lg:col-span-2 ">
                    {/* Overview Section */}
                    <motion.div
                      ref={ref}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                      className="mb-16"
                      id="overview"
                    >
                        <div className="flex items-center mb-10">
                            <h2 className="text-3xl md:text-6xl font-light">Together we deliver the critical missions that change our world.</h2>
                        </div>

                        {/* video */}
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                        >

                        <motion.video
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isFaded ? 0 : 1 }}
                            className="  object-cover"
                            autoPlay
                            muted
                            playsInline
                            loop
                            transition={{ duration: 1 }}  // Add this from Services
                            preload='auto'
                            onEnded={handleVideoEnd}
                        >
                            <source src="/news.webm" type="video/webm" />
                            <source src="/news.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </motion.video>
                        </motion.div>
                    </motion.div>
                </div>

                {/* right column */}
                <div className="lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 "
                    >
                        <p className='text-lg md:text-2xl font-light text-gray-900  text-left  mt-48 '>
                        We are currently preparing new updates, and more exciting news will be uploaded soon! We are working on providing insightful articles and company news to keep you ahead in the world of technology. Stay tuned for exclusive announcements regarding our new service offerings, upcoming events, and achievements.                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    </>
  )
}

export default News