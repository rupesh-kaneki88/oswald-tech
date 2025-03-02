'use client'

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
        // Reset form
        setFormData({
          name: '',
          email: '',
          organization: '',
          message: ''
        });
      } else {
        setSubmitStatus({ success: false, message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Image Section - 60vh */}

        <div className="relative h-[90vh] w-full bg-white overflow-hidden font-sans">
            <img 
            src="/contact-hero.jpg" 
            alt="Contact Osvan Technologies" 
            className="absolute top-0 left-0 w-full h-full object-cover"
            />
  
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
                    Contact
                    </h1>
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-base text-white mb-6">
                        Osvan Technologies
                    </h2>
                    <p className="text-l md:text-2xl font-thin text-white max-w-3xl">
                        Reach Out and Transform Your Business with us.          
                    </p>
                </motion.div>
                </div>
            </div>
            </div>

        {/* contact form */}

            <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="group relative bg-white  overflow-hidden mx-4 md:mx-16 lg:mx-28 my-12 -mt-20"
            >
                    <div className='flex flex-col md:flex-row bg-white font-sans justify-center p-4 lg:p-8 '>
                        <p className='text-lg md:text-2xl font-base text-gray-700  text-center mx-8 mt-4 lg:mx-44'>
                            Have questions or need assistance? Fill out the form below and our team will get back to you shortly.
                            
                        </p>
                    </div>

                    {/* form */}

                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                        {/* Success or Error Message */}
                        {submitStatus.message && (
                            <div className={`p-4 mb-6 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input */}
                            <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                                placeholder="Your Name *"
                            />
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                                placeholder="Your Email *"
                            />
                            </div>

                            {/* Organization Input */}
                            <div className="relative">
                            <input
                                type="text"
                                id="organization"
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                                placeholder="Your Organization (Optional)"
                            />
                            </div>

                            {/* Message Input */}
                            <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500 resize-none"
                                placeholder="Tell us about your project *"
                            ></textarea>
                            </div>

                             {/* Submit Button - Transparent, No Rounded Corners, Centered */}
                            <div className="flex justify-center">
                              <button
                                  type="submit"
                                  disabled={true}
                                  // disabled={isSubmitting}
                                  className="text-gray-800 border-b-2  hover:border-gray-800 uppercase tracking-wider font-medium py-2 px-4 transition duration-300 ease-in-out disabled:text-gray-400"
                              >
                                  {isSubmitting ? 'Sending...' : 'Send Message'}
                              </button>
                            </div>
                        </form>
                    </div>

        
            </motion.div>
        


      {/* Contact Form and Information Section */}
        <div className="container mx-auto py-16 px-4 justify-center p-4 lg:p-8">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-base text-gray-700 text-center mx-8 -mt-8 lg:mx-44">
                Contact Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center p-4 lg:p-16 font-sans">
                {/* Headquarters */}
                <div className="flex flex-col h-full ">
                <h3 className="text-2xl font-semibold font-sans mb-4 text-gray-800">Headquarters</h3>
                <div className="bg-gray-50 p-6 rounded-lg flex-grow">
                    <div className="flex items-start mb-4">
                    <MapPin className="mr-4 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">
                        4 September Place,  <br />
                        Brampton, <br />
                        Ontario L6R 0L8, Canada, 
                    </p>
                    </div>

                    <div className="flex items-center mb-4">
                    <Phone className="mr-4 text-blue-600 flex-shrink-0" />
                    <p className="text-gray-700">+1 (416)-556-7435 | +1(905)-619-1782</p>
                    </div>

                    <div className="flex items-center mb-4">
                    <Mail className="mr-4 text-blue-600 flex-shrink-0" />
                    <p className="text-gray-700">contact@osvantechnologies.ca</p>
                    </div>

                    <div className="flex items-center">
                    <Globe className="mr-4 text-blue-600 flex-shrink-0" />
                    <p className="text-gray-700">www.net2ai.com</p>
                    </div>
                </div>
                </div>

                {/* Business Hours */}
                <div className="flex flex-col h-full">
                <h3 className="text-2xl font-semibold font-sans mb-4 text-gray-800">Business Hours</h3>
                <div className="bg-gray-50 p-6 rounded-lg flex-grow">
                    <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-600">Monday - Friday:</div>
                    <div className="text-gray-800">9:00 AM - 5:00 PM</div>

                    <div className="text-gray-600">Saturday:</div>
                    <div className="text-gray-800">Closed</div>

                    <div className="text-gray-600">Sunday:</div>
                    <div className="text-gray-800">Closed</div>
                    </div>
                </div>
                </div>
            </div>
        </div>

      
    
    </>
  );
};

export default Contact;