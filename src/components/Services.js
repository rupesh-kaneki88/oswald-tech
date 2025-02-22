'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

const Services = () => {

    return(
    <div className="relative h-screen w-full overflow-hidden">
         {/* Video Background */}
        <AnimatePresence mode="wait">
            <motion.video
                key='0'
                src='./Services.mp4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoTransition}
            />
        </AnimatePresence>
    </div>
    )
}

export default Services