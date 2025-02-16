'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Play, Newspaper } from 'lucide-react';

const ContentCards = () => {
  const cards = [
    {
    //   type: 'RESEARCH REPORT',
    //   icon: <FileText className="w-6 h-6" />,
      title: 'Network',
      description: '(Wired | Wireless | Mobile ) Assessment | Audit with Optimization.',
      action: 'Try service',
      bgImage: './network.jpg'
    },
    {
    //   type: 'VIDEO',
    //   icon: <Play className="w-6 h-6" />,
      title: 'Transform',
      description: 'Transform to Sustainable IT infrastructure.',
      action: 'Try service',
      bgImage: './transform.jpg'
    },
    {
    //   type: 'RESEARCH REPORT',
    //   icon: <FileText className="w-6 h-6" />,
      title: `Sercurity`,
      description: 'Secure Digital Transformation through Process Automation',
      action: 'Try service',
      bgImage: './security.jpg'
    },
    {
    //   type: 'ARTICLE',
    //   icon: <Newspaper className="w-6 h-6" />,
      title: 'Artificial Intelligence',
      description: 'Secure AI insertion for Network Transformation',
      action: 'Try service',
      bgImage: './AI.jpg'
    }
  ];

  return (
    <section className="w-full bg-white py-16 px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="group relative h-[480px] overflow-hidden rounded-lg cursor-pointer"
              whileHover="hover"
              initial="initial"
              variants={{
                hover: { scale: 1.02 },
                initial: { scale: 1 }
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${card.bgImage})`,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backgroundBlend: 'overlay'
                }}
              />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />
              
              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-between text-white z-10">
                {/* Top Content */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {card.icon}
                    <span className="text-sm font-medium">{card.type}</span>
                  </div>
                  <h3 className="text-2xl font-light mb-4 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {card.description}
                  </p>
                </div>
                
                {/* Action Link */}
                <motion.div
                  className="inline-flex items-center gap-2"
                  variants={{
                    hover: { x: 10 },
                    initial: { x: 0 }
                  }}
                >
                  <span className="text-sm font-medium">{card.action}</span>
                  <motion.span variants={{
                    hover: { x: 5 },
                    initial: { x: 0 }
                  }}>
                    →
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentCards;