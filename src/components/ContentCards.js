'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Play, Newspaper, HandPlatter } from 'lucide-react';
import Link from 'next/link';

const ContentCards = () => {
  const cards = [
    {
      type: 'Get2AI',
      icon: <HandPlatter className="w-6 h-6" />,
      title: 'On Demand Digital Network Consultancy Services from Certified Experts',
      description: 'Access expert digital network consulting services tailored to your needs, available whenever you require them.',
      action: 'Explore',
      bgImage: '/digi-network.jpg',
      link: '/services/on-demand-network-consultancy'
    },
    {
      type: 'Get2AI',
      icon: <HandPlatter className="w-6 h-6" />,
      title: 'Network (Wired | Wireless | Mobile ) Assessment | Audit with Optimization.',
      description: "Comprehensive assessment and audit of wired, wireless, and mobile networks, with optimization strategies to improve performance and security.",
      action: 'Explore',
      bgImage: '/network.jpg',
      link: '/services/network-assessment-audit-optimization'
    },
    {
      type: 'Get2AI',
      icon: <HandPlatter className="w-6 h-6" />,
      title: 'Transform to Sustainable IT infrastructure.',
      description: 'Modernize your IT infrastructure with eco-friendly solutions that enhance efficiency and sustainability.',
      action: 'Explore',
      bgImage: '/transform.jpg',
      link: '/services/sustainable-it-infrastructure'
    },
    {
      type: 'Get2AI',
      icon: <HandPlatter className="w-6 h-6" />,
      title: `Secure Digital Transformation through Process Automation`,
      description: 'Leverage automation to securely transform your digital processes, boosting efficiency and reducing risk.',
      action: 'Explore',
      bgImage: '/security.jpg',
      link: '/services/secure-digital-transformation-process-automation'
    },
    {
      type: 'Get2AI',
      icon: <HandPlatter className="w-6 h-6" />,
      title: 'Secure AI insertion for Network Transformation',
      description: 'Integrate AI solutions into your network to enhance performance, security, and scalability.',
      action: 'Explore',
      bgImage: '/AI.jpg',
      link: '/services/secure-ai-insertion-network-transformation'
    },
    
  ];

  return (
    <section className="w-full bg-white mt-16 px-8 lg:px-16 font-nunito">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((card, index) => (
          <Link href={card.link} passHref key={index}>
            <motion.div
              className="group relative h-[480px] overflow-hidden cursor-pointer"
              whileHover="hover"
              initial="initial"
              variants={{
                hover: { scale: 1.08 },
                initial: { scale: 1 }
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 group-hover:blur"
                style={{ 
                  backgroundImage: `url(${card.bgImage})`,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backgroundBlend: 'overlay'
                }}
              />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />
              
              {/* Content */}
              <div className="relative h-full p-8 -mt-4 flex flex-col justify-between text-white z-10">
                {/* Top Content */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {card.icon}
                    <span className="text-sm font-medium">{card.type}</span>
                  </div>
                  <h3 className="text-2xl font-light mb-4 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm font-light text-gray-100 transform opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-transform duration-300 ease-out">
                    {card.description}
                  </p>
                </div>
                
                  {/* Action Link */}
                  <motion.div
                    className="inline-flex items-center gap-2"
                    variants={{
                      hover: { y: 10 },
                      initial: { y: 100 }
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentCards;