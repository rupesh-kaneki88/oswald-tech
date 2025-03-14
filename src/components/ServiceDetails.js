'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, ChevronDown, ChevronUp, Star, Shield, Clock, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import ServiceData from '@/providers/ServiceData';
import { Contact } from 'lucide-react';
import { toast } from 'react-toastify'; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function ServiceDetails({ serviceId }) {
  const router = useRouter();
  const overviewRef = useRef(null);
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isFreeTrialModalOpen, setFreeTrialModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [expandedBenefit, setExpandedBenefit] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  
  
  // Get the current service or redirect if not found
  const service = ServiceData[serviceId];
  if (!service) {
    router.push('/services');
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 100);
      
      // Determine active section based on scroll position
      const sections = [
        { ref: overviewRef, id: 'overview' },
        { ref: featuresRef, id: 'features' },
        { ref: benefitsRef, id: 'benefits' },
      ];
      
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePaymentClick = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleFreeTrialClick = () => {
    setFreeTrialModalOpen(true)
  }

  const closeFreeTrialModal = () => {
    setFreeTrialModalOpen(false)
  }

  const handlePaymentSubmit = async () => {
    setIsLoading(true);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value || '';
    const organization = document.getElementById('organization').value || '';
    const serviceTitle = service.title
    const servicePrice = service.price 
    
    try {
      // Call your API route to create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: service.price,
          productName: service.title,
        }),
      });

      const emailResponse = await fetch('/api/payment-message',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          organization,
          service: serviceTitle,
          amount: servicePrice,
        })
      })
      
      const { sessionId } = await response.json();
      
      // Redirect to success page with the session ID
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });

      // email response
      const data = await emailResponse.json();

      if (emailResponse.ok) {
        setSubmitStatus({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
        toast.success('Message sent successfully!');
        setIsLoading(false)
      } else {
        setSubmitStatus({ success: false, message: data.message || 'Something went wrong. Please try again.' });
        console.log(`${data.message}`)
        toast.error("Please provide the necessary details.");
        setIsLoading(false)
      }

    } catch (error) {
      console.error('Error initiating payment:', error);
      setIsLoading(false);
    }
  };
  
  const handleFreeTrialSubmit = async () => {
    setIsLoading(true);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value || '';
    const organization = document.getElementById('organization').value || '';
    const serviceTitle = service.title
    
    try {
      const emailResponse = await fetch('/api/free-trial',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          organization,
          service: serviceTitle,
        })
      })

      // email response
      const data = await emailResponse.json();

      if (emailResponse.ok) {
        setSubmitStatus({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
        toast.success('Message received successfully, we will get back to you!');
        setIsLoading(false)
      } else {
        setSubmitStatus({ success: false, message: data.message || 'Something went wrong. Please try again.' });
        console.log(`${data.message}`)
        toast.error("Please provide the necessary details.");
        setIsLoading(false)
      }

    } catch (error) {
      console.error('Error initiating payment:', error);
      setIsLoading(false);
    }
  };

  const handleCheckAPIclick = async () => {
    try{
      const response = await fetch('/api/check-api',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'rupesh',
          email: 'rupesh@gmail.com',
          mobile: '8080909098',
        })
      })
  
      const data = await response.json()
      const {name, email, mobile} = data.body
  
      if(response.ok){
        console.log(`Received data: ${name}`)
        toast.success(`Received Data: ${name}, ${email}, ${mobile}`)
      } else {
        console.log("Did not receive any data.")
      }

    } catch(error){
      console.log('Error for check api: ',error)
    }
  }

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const toggleFeature = (index) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };
  
  const toggleBenefit = (index) => {
    setExpandedBenefit(expandedBenefit === index ? null : index);
  };
  
  // Icons that represent different features/benefits
  const featureIcons = [Star, Shield, Clock, Zap, Star, Shield, Clock];
  
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300" 
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Reading progress"
      />

      {/* Quick Nav - appears after scrolling */}
      {/* <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-white z-40 shadow-md"
          >
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <h2 className="text-lg font-medium truncate max-w-xs">{service.title}</h2>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => scrollToSection(overviewRef)}
                  className={`px-3 py-1 rounded-md text-sm ${activeSection === 'overview' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  aria-current={activeSection === 'overview' ? 'true' : 'false'}
                >
                  Overview
                </button>
                <button 
                  onClick={() => scrollToSection(featuresRef)}
                  className={`px-3 py-1 rounded-md text-sm ${activeSection === 'features' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  aria-current={activeSection === 'features' ? 'true' : 'false'}
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection(benefitsRef)}
                  className={`px-3 py-1 rounded-md text-sm ${activeSection === 'benefits' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  aria-current={activeSection === 'benefits' ? 'true' : 'false'}
                >
                  Benefits
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePaymentClick}
                  className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[100vh] lg:h-[80vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <img 
            src={service.img} 
            alt="" 
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </motion.div>
        
        <div className="absolute top-4 lg:top-8 left-8 z-10">
          <Link href="/services" passHref>
            <motion.div
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-white cursor-pointer"
              role="button"
              aria-label="Back to services"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Services</span>
            </motion.div>
          </Link>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-4xl"
          >
            <h1 
              className="text-2xl md:text-6xl font-bold text-white mb-6 mt-8"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
            >
              {service.title}
            </h1>
            <p 
              className="text-l md:text-2xl text-white/90 max-w-3xl mb-8"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}    
            >
              {service.desc}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(overviewRef)}
              className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium
                      hover:bg-blue-50 transition-colors shadow-lg"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={30} className="text-white" aria-hidden="true" />
        </motion.div>
      </div>

      {/* Main Content with Interactive Sections */}
      <div className="container mx-auto px-4 py-16 max-w-6xl -mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Overview Section */}
            <motion.div
              ref={overviewRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
              id="overview"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-xl font-bold">1</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold">Service Overview</h2>
              </div>
              
              <motion.p 
                className="text-gray-700 text-lg leading-relaxed mb-8 pl-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {service.fullDesc}
              </motion.p>
            </motion.div>

            {/* Features Section with Expandable Cards */}
            <motion.div
              ref={featuresRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
              id="features"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-green-600 text-xl font-bold">2</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold">Key Features</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-16">
                {service.features.map((feature, index) => {
                  const Icon = featureIcons[index % featureIcons.length];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow
                                ${expandedFeature === index ? 'md:col-span-2' : ''}`}
                    >
                      <button
                        onClick={() => toggleFeature(index)}
                        className="w-full p-4 flex items-start justify-between text-left"
                        aria-expanded={expandedFeature === index}
                        aria-controls={`feature-content-${index}`}
                      >
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                            <Icon size={16} className="text-green-600" aria-hidden="true" />
                          </div>
                          <span className="text-gray-800 font-medium">{feature.split(':')[0] || feature}</span>
                        </div>
                        {expandedFeature === index ? 
                          <ChevronUp size={20} className="text-gray-500" aria-hidden="true" /> : 
                          <ChevronDown size={20} className="text-gray-500" aria-hidden="true" />
                        }
                      </button>
                      
                      <AnimatePresence>
                        {expandedFeature === index && (
                          <motion.div
                            id={`feature-content-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-2 text-gray-600 ml-11">
                              {feature.includes(':') ? 
                                feature.split(':')[1].trim() : 
                                "Our comprehensive solution delivers this feature with industry-leading quality and reliability."
                              }
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Benefits Section with Animated Cards */}
            <motion.div
              ref={benefitsRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
              id="benefits"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <span className="text-purple-600 text-xl font-bold">3</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold">Benefits</h2>
              </div>
              
              <div className="space-y-4 pl-16">
                {service.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-lg p-4"
                  >
                    <button
                      onClick={() => toggleBenefit(index)}
                      className="w-full flex items-start justify-between text-left"
                      aria-expanded={expandedBenefit === index}
                      aria-controls={`benefit-content-${index}`}
                    >
                      <div className="flex items-center">
                        <Check size={20} className="text-purple-500 mr-3 flex-shrink-0" aria-hidden="true" />
                        <span className="text-gray-800 font-medium">{benefit}</span>
                      </div>
                      {expandedBenefit === index ? 
                        <ChevronUp size={20} className="text-gray-500 ml-2 flex-shrink-0" aria-hidden="true" /> : 
                        <ChevronDown size={20} className="text-gray-500 ml-2 flex-shrink-0" aria-hidden="true" />
                      }
                    </button>
                    
                    <AnimatePresence>
                      {expandedBenefit === index && (
                        <motion.div
                          id={`benefit-content-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pl-8 text-gray-600">
                            <p>This benefit provides substantial value by improving your operational efficiency and business outcomes.</p>
                            <ul className="mt-2 list-disc pl-5 space-y-1">
                              <li>Increases productivity by up to 25%</li>
                              <li>Reduces operational costs significantly</li>
                              <li>Improves customer satisfaction ratings</li>
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Pricing/CTA */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 sticky top-24"
            >
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                  Best Value
                </span>
                <h3 className="text-2xl font-bold mb-2">Service Package</h3>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-4xl font-bold">${service.price}</span>
                  <span className="text-gray-500 ml-2">only</span>
                </div>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      size={16} 
                      className="text-yellow-400 fill-yellow-400" 
                      aria-hidden="true" 
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                  <p className="text-gray-700 text-sm">
                    Complete access to all features listed above
                  </p>
                </div>
                <div className="flex items-start">
                  <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                  <p className="text-gray-700 text-sm">
                    Expert support from our dedicated team
                  </p>
                </div>
                <div className="flex items-start">
                  <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                  <p className="text-gray-700 text-sm">
                    Tailored solutions for your specific needs
                  </p>
                </div>
                <div className="flex items-start">
                  <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                  <p className="text-gray-700 text-sm">
                    Ongoing optimizations and improvements
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFreeTrialClick}
                className="w-full py-4 bg-gray-400 text-white rounded-md font-medium
                         hover:bg-gray-600 transition-colors duration-300 shadow-md mb-2"
              >
                Book your first slot free!
              </motion.button>

              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePaymentClick}
                className="w-full py-4 bg-blue-600 text-white rounded-md font-medium
                         hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                Get Started Now
              </motion.button> */}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckAPIclick}
                className="w-full py-4 bg-blue-600 text-white rounded-md font-medium
                         hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                check api
              </motion.button>


              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  One-time payment, no hidden fees
                </p>
                <p className="text-sm font-medium text-blue-600 mt-2">
                  100% Satisfaction Guarantee
                </p>
              </div>
              
              {/* Testimonial */}
              {/* <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="italic text-gray-600 text-sm">
                  "This service transformed our business operations completely. Highly recommended!"
                </div>
                <div className="mt-2 flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                  <div>
                    <div className="text-sm font-medium">Jane Smith</div>
                    <div className="text-xs text-gray-500">CTO, TechCorp</div>
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      {/* <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePaymentClick}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg z-20"
            aria-label="Get started now"
          >
            <Zap size={24} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence> */}

      {/* Payment Modal */}
      <AnimatePresence>
        {isPaymentModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={closePaymentModal}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md h-auto sm:h-full p-6 flex flex-col overflow-auto max-h-[90vh] sm:max-h-[80vh]"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="payment-modal-title"
            >
              <h3 id="payment-modal-title" className="text-xl font-semibold mb-4">Complete Your Purchase</h3>
              
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <div className="flex justify-between text-right mb-2">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{service.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-blue-600">${service.price}</span>
                </div>
              </div>

              {/* Contact Details Form */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium">Contact Details</h4>
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col space-y-2"
                  >
                    {/* <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label> */}
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                      placeholder="Your name *"
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col space-y-2"
                  >
                    {/* <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label> */}
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                      placeholder="Your email *"
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col space-y-2"
                  >
                    {/* <label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile (Optional)</label> */}
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                      placeholder="Your mobile number"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col space-y-2"
                  >
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                      placeholder="Your organization "
                    />
                  </motion.div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Select Payment Method</h4>
                
                <div className="space-y-3">
                  <motion.label 
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <input type="radio" name="payment" className="mr-3" defaultChecked />
                    <span>Credit/Debit Card</span>
                  </motion.label>
                  
                  <motion.label 
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <input type="radio" name="payment" className="mr-3" />
                    <span>UPI</span>
                  </motion.label>
                  
                  <motion.label 
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <input type="radio" name="payment" className="mr-3" />
                    <span>Net Banking</span>
                  </motion.label>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closePaymentModal}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePaymentSubmit}
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                             disabled:bg-blue-400 disabled:cursor-not-allowed font-medium"
                  >
                    {isLoading ? 'Processing...' : 'Proceed to Pay'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Free Trial Modal */}
      <AnimatePresence>
        {isFreeTrialModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={closeFreeTrialModal}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md h-auto sm:h-full p-6 flex flex-col overflow-auto max-h-[90vh] sm:max-h-[80vh]"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="Free-trial-modal-title"
            >
              <h3 id="free-trial-modal-title" className="text-xl font-semibold mb-4">Book Your Free Slot!</h3>
              
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <div className="flex justify-between text-right mb-2">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{service.title}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-blue-600">${service.price}</span>
                </div> */}
              </div>

              {/* Contact Details Form */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium">Contact Details</h4>
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col space-y-2"
                  >
                    {/* <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label> */}
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                      placeholder="Your name *"
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col space-y-2"
                  >
                    {/* <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label> */}
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                      placeholder="Your email *"
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col space-y-2"
                  >
                    {/* <label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile (Optional)</label> */}
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                      placeholder="Your mobile number"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col space-y-2"
                  >
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 px-2 py-3 text-gray-800 placeholder-gray-500"
                      placeholder="Your organization "
                    />
                  </motion.div>
                </div>
              </div>
              
              <div className="space-y-4">
                                
                <div className="flex gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeFreeTrialModal}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFreeTrialSubmit}
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                             disabled:bg-blue-400 disabled:cursor-not-allowed font-medium"
                  >
                    {isLoading ? 'Processing...' : 'Try now!'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}