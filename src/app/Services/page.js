'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

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
          </div>
  
          {/* Content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4 flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
              {service.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {service.desc.split('.')[0] + '.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 px-6 py-2 bg-black text-white rounded-md self-start 
                       hover:bg-blue-600 transition-colors duration-300"
            >
              Explore Service
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };
  

const Services = () => {
  const services = [
    {
      title: "Project Management",
      desc: "Technologies, we provide expert project management services to ensure your projects are completed on time, within scope, and on budget. Our experienced team collaborates with you to deliver tailored solutions, clear communication, and effective planning, ensuring your business objectives are achieved with minimal disruption.",
      img: "/service1.jpg"
    },
    {
      title: "Network Support & Maintenance",
      desc: "We offer comprehensive network support and maintenance services to ensure your business's network runs smoothly and securely. Whether you're setting up a new network or need help troubleshooting and optimizing an existing one, our expert team is here to assist. We provide proactive monitoring, regular maintenance, and quick resolution of issues to minimize downtime and keep your systems performing at their best.",
      img: "/service2.jpg"
    },
    {
      title: "Software Development",
      desc: "We design custom software solutions tailored to streamline your business processes. Our team is available to consult with you or your staff whenever issues arise. Whether you need remote or on-site assistance, we provide seamless support to ensure your software operates smooth",
      img: "/service3.jpg"
    },
    {
      title: "Cloud Service & Data Backup",
      desc: "Maximize efficiency and security with our comprehensive cloud solutions and data backup services. We provide scalable cloud infrastructure that ensures your business data is easily accessible and protected. Our automated, secure backup solutions give you peace of mind by safeguarding your critical information against data loss, system failures, or disasters, with reliable recovery options when you need them most.",
      img: "/service4.jpg"
    },
    {
      title: "Network & Website Security",
      desc: "At Osvan Technologies, we prioritize the security of your business's network and online presence. Our comprehensive security solutions include network protection, website security, and proactive measures to safeguard your sensitive data. From firewall setup and malware protection to secure web applications and encryption, we ensure your systems are resilient against cyber threats.",
      img: "/service5.jpg"
    },
    {
      title: "IT Consulting",
      desc: "At Osvan Technologies, we prioritize the security of your business's network and online presence. Our comprehensive security solutions include network protection, website security, and proactive measures to safeguard your sensitive data. From firewall setup and malware protection to secure web applications and encryption, we ensure your systems are resilient against cyber threats.",
      img: "/service6.jpg"
    }
  ];

  return (
    <>
      <div className="relative h-screen w-full bg-white overflow-hidden">
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
        >
          <source src="./Services.mp4" type="video/mp4" />
        </motion.video>

        <Navbar />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 px-4 md:px-16 lg:px-28">
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">
                Services
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin text-white mb-6">
                Empowering Your Business with Comprehensive IT Solutions
              </h2>
              <p className="text-xl md:text-2xl font-thin text-white max-w-3xl">
                We provide essential services to optimize your technology, from network support and cloud services to security and IT consulting, ensuring your systems run efficiently and securely.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </>
  );
};

export default Services;