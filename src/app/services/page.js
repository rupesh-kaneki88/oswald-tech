'use client'

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import ServiceData from '@/providers/ServiceData';

const ServiceCard = ({ service, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.2 });
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="group relative bg-white rounded-lg shadow-lg overflow-hidden mx-4 md:mx-16 lg:mx-28 my-12"
      >
        <div className={`flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image */}
          <div className="relative lg:w-1/2">
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-[300px] lg:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105 opacity-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              {/* Description */}
            <div className="absolute bottom-0 left-0 w-full mb-8 p-8">
              <motion.div
                className="font-nunito text-md lg:text-lg text-gray-200 font-nunito transform translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-transform duration-500 ease-out"
              >
                {service.fullDesc.length > 250 ? `${service.fullDesc.substring(0, 250)}...` : service.fullDesc}
              </motion.div>
            </div>
          </div>
  
          {/* Content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4 flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
              {service.title}
            </h2>
            {/* <p className="text-gray-600 text-lg leading-relaxed">
              {service.desc.split('.')[0] + '.'}
            </p> */}
            {/* <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`} passHref> */}
            <Link href={`/services/${service.id}`} passHref>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className=" py-3 hover:bg-transparent transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10 text-2xl font-thin font-nunito">Explore Service</span>
                <div className="absolute bottom-[8px] left-0 w-0 h-[2px] bg-yellow-400 mx-0 transition-all duration-300 ease-out group-hover:w-full" />

              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };
  

const Services = () => {
  // Convert the object into an array of service objects
  const services = Object.values(ServiceData);

  useEffect(()=>{
    document.title ="Get2AI | Services"
  },[])

  return (
    <>

      <div className="relative h-[75vh] w-full bg-white overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-black" // Ensure black background
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
        >
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop
            preload='auto'
          >
            <source src="/Services-page.webm" type="video/webm" />
            <source src="/Services-page.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </motion.div>

        <Navbar />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 px-4 md:px-16 lg:px-28">
          <div className="absolute top-16 left-0 w-full px-4 md:px-16">
            <hr className="border-t-2 border-gray-300 my-4" />
          </div>

          <div className="h-full flex flex-col font-nunito justify-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-left p-4 md:p-8 lg:p-16 mt-32"
            >
              <h1 className="text-xs md:text-base lg:text-base font-semibold text-white lg:mb-4">
                SERVICES
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-base text-white mb-6">
                Empowering Your Business with Comprehensive IT Solutions
              </h2>
              <p className="text-l md:text-2xl font-thin text-white max-w-3xl">
                We provide essential services to optimize your technology, from network support and cloud services to security and IT consulting, ensuring your systems run efficiently and securely.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-4 font-nunito">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </>
  );
};

export default Services;