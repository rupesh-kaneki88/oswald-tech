'use client'

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import ServiceData from '@/providers/ServiceData';

// This would go in your .env.local file
// NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// First, create the file structure:
// app/services/[serviceId]/page.js

export default function ServiceDetails({ serviceId }) {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 

  // Get the current service or redirect if not found
  const service = ServiceData[serviceId];
  if (!service) {
    router.push('/services');
    return null;
  }

  const handlePaymentClick = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handlePaymentSubmit = async () => {
    setIsLoading(true);
    
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
      
      const { sessionId } = await response.json();
      
      // Redirect to success page with the session ID
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error initiating payment:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-[100vh] lg:h-[80vh]  w-full overflow-hidden">
        <img 
          src={service.img} 
          alt={service.title} 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute top-8 left-8 z-10">
          <Link href="/services" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-white cursor-pointer"
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
            className="text-center max-w-4xl"
          >
            <h1 
                className="text-3xl md:text-5xl font-bold text-white mb-6"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
            >
              {service.title}
            </h1>
            <p 
                className="text-xl text-white/90 max-w-3xl mx-auto"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}    
            >
              {service.desc}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl -my-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-4xl font-semibold mb-6">Service Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {service.fullDesc}
              </p>

              <h3 className="text-xl md:text-3xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl md:text-3xl font-semibold mb-4">Benefits</h3>
              <ul className="space-y-3 mb-8">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Pricing/CTA */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm sticky top-8"
            >
              <h3 className="text-xl font-semibold mb-4">Service Package</h3>
              <div className="flex items-end mb-6">
                <span className="text-3xl font-bold">${service.price}</span>
                {/* <span className="text-3xl font-bold">₹{service.price}</span> */}
                <span className="text-gray-500 ml-2">only</span>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-gray-700">
                  Our {service.title} package provides all the features and benefits listed, with expert support from our team.
                </p>
                <p className="text-gray-700">
                  Get started today and experience the difference our professional {service.title.toLowerCase()} can make for your business.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePaymentClick}
                className="w-full py-3 bg-blue-600 text-white rounded-md font-medium
                         hover:bg-blue-700 transition-colors duration-300"
              >
                Get Started Now
              </motion.button>

              <p className="text-sm text-gray-500 mt-4 text-center">
                One time payment
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Payment Summary</h3>
            
            <div className="border-t border-b py-4 my-4">
              <div className="flex justify-between mb-2">
                <span>Service:</span>
                <span className="font-medium">{service.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium">₹{service.price}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Select Payment Method</h4>
              
              <div className="space-y-2">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="mr-3" defaultChecked />
                  <span>Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="mr-3" />
                  <span>UPI</span>
                </label>
                
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="mr-3" />
                  <span>Net Banking</span>
                </label>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={closePaymentModal}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePaymentSubmit}
                  disabled={isLoading}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                           disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Proceed to Pay'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}