'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

function PaymentSuccessPageContent() {
  const searchParams = useSearchParams(); // ✅ This is now inside <Suspense>
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderDetails({
        id: 'ORD' + Math.floor(Math.random() * 1000000),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-8"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Verifying your payment...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-2">Payment Successful!</h1>
            <p className="text-gray-600 text-center mb-6">
              Thank you for your payment. Your service has been activated.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{orderDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{orderDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span>{orderDetails.time}</span>
                </div>
              </div>
            </div>
            
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
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <PaymentSuccessPageContent />
    </Suspense>
  );
}
