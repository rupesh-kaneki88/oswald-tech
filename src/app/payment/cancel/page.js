// app/payment/cancel/page.js
'use client'

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentCancelPage() {
  useEffect(()=> {
    document.title = 'Get2AI | Payment Cancellation'
  }, [])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-8"
      >
        <div className="flex justify-center mb-6">
          <XCircle size={64} className="text-yellow-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 text-center mb-6">
          Your payment process was cancelled. No charges have been made.
        </p>
        
        <div className="flex flex-col space-y-3">
          <Link href="/services" passHref>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-2 px-4 bg-blue-600 text-white rounded-md text-center
                       hover:bg-blue-700 transition-colors duration-300"
            >
              Return to Services
            </motion.a>
          </Link>
          
          <Link href="/" passHref>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-2 px-4 border border-gray-300 rounded-md text-center
                       hover:bg-gray-50 transition-colors duration-300"
            >
              Go to Homepage
            </motion.a>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}