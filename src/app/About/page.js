'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.2 });

    const cards = [
        {
        //   type: 'RESEARCH REPORT',
        //   icon: <FileText className="w-6 h-6" />,
          title: 'Team',
          description: "Our team consists of passionate and skilled professionals dedicated to delivering exceptional service. With expertise in project management, web development, software development, digital marketing, and beyond, we work collaboratively to provide innovative solutions that drive success for our clients.",
          action: 'Try service',
          bgImage: './About1.jpg'
        },
        {
        //   type: 'VIDEO',
        //   icon: <Play className="w-6 h-6" />,
          title: 'Approach',
          description: "We take a customer-centric approach in everything we do. By working closely with our clients to understand their unique needs and goals, we develop tailored solutions that drive success. Our commitment is to deliver results that not only meet but exceed our client's expectations.",
          action: 'Try service',
          bgImage: './About2.jpg'
        },
        {
        //   type: 'RESEARCH REPORT',
        //   icon: <FileText className="w-6 h-6" />,
          title: `Vision`,
          description: 'We strive to be a trusted leader in delivering innovative and dependable IT solutions that empower businesses to succeed in an increasingly digital world. We aim to help our clients achieve long-term success by offering cutting-edge technology and exceptional service. Through strong partnerships and a relentless pursuit of excellence, we aspire to be the trusted choice for businesses looking to leverage technology for growth and transformation.',
          action: 'Try service',
          bgImage: './About3.jpg'
        },
        {
        //   type: 'RESEARCH REPORT',
        //   icon: <FileText className="w-6 h-6" />,
            title: `Mission`,
            description: 'Our mission is to provide businesses with innovative, reliable, and cost-effective IT solutions that drive growth, enhance efficiency, and ensure security. We are committed to delivering exceptional service, fostering long-term relationships, and helping our clients navigate the digital landscape with confidence. By leveraging our expertise and customer-centric approach, we aim to make technology an enabler for businesses to achieve their goals and thrive in a fast-paced world.',
            action: 'Try service',
            bgImage: './About4.jpg'
        },
        
      ];

    return(
        <>
        <div className="relative h-screen w-full bg-white overflow-hidden">
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
            <source src="/About.webm" type="video/webm" />
            <source src="/About.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </motion.video>
  
          <Navbar />
          <div className="absolute inset-0 bg-black/30" />
  
          <div className="absolute inset-0 px-4 md:px-16 lg:px-28 z-10">
            <div className="absolute top-16 left-0 w-full px-4 md:px-16">
              <hr className="border-t-2 border-gray-300 my-4" />
            </div>
  
            <div className="h-full flex flex-col font-sans justify-center max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-left p-4 md:p-8 lg:p-16"
              >
                <h1 className="text-xs md:text-base lg:text-base font-semibold text-white lg:mb-4">
                  ABOUT
                </h1>
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-base text-white mb-6">
                    Osvan Technologies
                </h2>
                <p className="text-l md:text-2xl font-thin text-white max-w-3xl">
                    Empowering Business Goals with Transformative Technology Solutions.                </p>
              </motion.div>
            </div>
          </div>
        </div>
  
        {/* after video div */}
         <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="group relative bg-white  overflow-hidden mx-4 md:mx-16 lg:mx-28 my-12 -mt-8"
            >
            <div className='flex flex-col md:flex-row bg-white font-sans justify-center p-4 lg:p-8 '>
                <p className='text-lg md:text-2xl font-base text-gray-700  text-center mx-8 mt-12 lg:mx-44'>
                    At Osvan Technology, we are a service-driven organization dedicated to helping our clients achieve their business goals by leveraging cutting-edge technologies across the wired, wireless, and mobile spaces, including 5G. Our approach is vendor-neutral, focusing on delivering impactful, tailored solutions with the expertise of certified industry professionals.                
                </p>
            </div>

        </motion.div>

        {/* scrolling details */}
        <section className="w-full min-h-screen bg-white lg:py-16 py-8 px-8 lg:px-20">
            <div className="flex flex-col lg:flex-row lg:flex-row-reverse gap-14 lg:gap-22 md:mx-10 sm:mx-5">
                {/* Fixed column */}
                <div className="justify-center items-center flex flex-col text-wrap lg:sticky top-0 max-h-screen lg:p-4 bg-white">
                <h2 className="lg:text-6xl text-3xl text-gray-900 mb-2 font-sans font-light">
                    Driving Innovation Across Wired, Wireless, and Mobile Ecosystems.
                </h2>
                <p className="text-gray-600 font-sans text-lg my-8">
                With extensive experience across multiple domains, we offer customized solutions for on-prem, hybrid, and cloud environments. 
                Our proven track record in implementing AI-augmented digital technologies ensures that we deliver solutions that are not only innovative but also cost-effective, meeting your unique needs and fitting within your budget.
                </p>
                </div>

                {/* Scrollable column */}
                <div className="justify-center items-center bg-white flex flex-col lg:p-4">
                    {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        className="group relative lg:h-[360px] lg:w-[620px] md:w-[420px] md:h-[220px] sm:h-[80px] sm:w-[120px] my-4 overflow-hidden cursor-pointer bg-white"
                        whileHover="hover"
                        initial="initial"
                        variants={{
                        initial: { scale: 1 },
                        }}
                    >
                        {/* Background Image */}
                        <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 "
                        style={{
                            backgroundImage: `url(${card.bgImage})`,
                            backgroundColor: 'rgba(0, 0, 0, 0.0)',
                            backgroundBlendMode: 'overlay',
                        }}
                        />
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />
                        
                        {/* Content */}
                        <div className="relative h-full p-8 flex flex-col justify-between text-white z-10">
                            <div className="relative inline-block">
                                <h3 className="text-2xl font-normal font-sans mb-4 leading-tight">
                                    {card.title}
                                </h3>
                            {/* Animated underline */}
                            <div className="absolute bottom-[15px] left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full" />
                        </div>
                        <div className="overflow-hidden">
                            <p 
                                className="text-md lg:text-lg text-gray-200 font-sans transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                            >
                                {card.description}
                            </p>
                        </div>
                        </div>
                    </motion.div>
                    ))}

                </div>
            </div>
        </section>

        {/* Connect div */}
        {/* Connect div */}
        <div className='flex w-full bg-white justify-center items-center'>
        <div
            className="relative w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{
            backgroundImage: `url('./About-foot.webp')`, // Make sure the image path is correct
            backgroundSize: 'cover', // Ensure the image covers the width
            backgroundPosition: 'center', // Keep the image centered horizontally
            height: '300px', // Adjust height as per your requirement
            }}
        >
           <div className='absolute inset-y-0 left-0 flex flex-col justify-center font-sans mx-8 sm:mx-16 md:mx-28'>
                <h2 className='font-thin text-3xl sm:text-4xl md:text-5xl text-white'>
                    Ready to take the next step?
                </h2>

                <div className='flex items-center mt-4 text-white'>
                    <Link href="/contact">
                        <span className='text-3xl sm:text-4xl md:text-5xl font-bold underline mr-2'>Connect</span>
                    </Link>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl'>with us</h2>
                </div>
            </div>

        </div>
        
        </div>


      </>
    )
}

export default About
