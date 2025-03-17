'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '@/providers/TeamData';

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleImageClick = (member) => {
    if (selectedMember?.id === member.id) {
      setSelectedMember(null);  // Reset if same member is clicked
    } else {
      setSelectedMember(member);  // Set member if clicked
    }
  };

    const [isFaded, setIsFaded] = useState(false);
  
    // Handle video end event
    const handleVideoEnd = () => {
      setIsFaded(true);
      // Wait for the fade out effect to finish, then reset and start the video again
      setTimeout(() => {
        setIsFaded(false);
      }, 1000); // The duration of fade-out (1 second in this case)
    };

  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4 md:px-16 lg:px-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-regular text-gray-900 mb-4">Our Leadership</h2>
          <p className="md:text-2xl text-xl text-gray-500 font-light max-w-3xl mx-auto">
            Meet the dedicated professionals driving innovation and excellence at Get2AI Technologies.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column: Team Member Photos */}
          {/* <div className="flex flex-wrap justify-center gap-12">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className={`group cursor-pointer transition-all duration-150ms ${
                  selectedMember?.id === member.id ? 'scale-110' : ''
                }`}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: selectedMember?.id === member.id ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleImageClick(member)}
              >
                <div className={`w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden relative ${
                  selectedMember?.id === member.id ? 'ring-2 ring-yellow-500 ring-offset-2' : 'bg-gray-300'
                }`}>
                  <img
                    src={member.image}
                    alt={`${member.name}'s photo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 text-center font-medium opacity-0 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-transform duration-500 ease-out">{member.name}</p>
                <p className="mt-1 text-center font-extralight opacity-0 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-transform duration-500 ease-out">{member.position}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Team Member Details */}
          {/* <div className="flex flex-col justify-center">
            {selectedMember ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-semibold text-gray-900">{selectedMember.name}</h3>
                <p className="text-xl font-medium text-gray-700">{selectedMember.position}</p>
                
                <div>
                  <p className="text-gray-600 mb-6">{selectedMember.bio}</p>
                  
                  <h4 className="text-xl font-medium text-gray-900 mb-2">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedMember.expertise.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="text-xl font-medium text-gray-900 mb-2">Education</h4>
                  <p className="text-gray-700 mb-6">{selectedMember.education}</p>
                  
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    aria-label={`Visit ${selectedMember.name}'s LinkedIn profile`}
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xl text-gray-600"
              >
                Discover the people and thinking behind our business. Together with our clients, we strive to create a safer, smarter world by harnessing the power of deep expertise and advanced technology.
              </motion.p>
            )}
          </div> */} 

          {/* General data */}

          {/* left column */}
          <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-transparent"
              >
                <p className='text-lg md:text-2xl font-light text-gray-900  text-left'>
                  Our team is driven by experienced leaders with a strong focus on customer success, innovation, and technology solutions. We combine deep technical expertise with strategic vision to deliver results across complex and dynamic environments. Our team's diverse skills cover areas such as project management, cloud technologies, networking, data science, AI, and more. With a commitment to driving growth and profitability, we leverage advanced tools and methodologies to create smarter, safer solutions for our clients.
                </p>
              </motion.div>
          </div>

          {/* right column */}
          <div className="flex flex-wrap justify-center gap-12">
               {/* video */}
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative"
                >

                  <motion.video
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isFaded ? 0 : 1 }}
                      className="  object-cover"
                      autoPlay
                      muted
                      playsInline
                      loop
                      transition={{ duration: 1 }}  // Add this from Services
                      preload='auto'
                      onEnded={handleVideoEnd}
                  >
                      <source src="/teams.webm" type="video/webm" />
                      <source src="/teams.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                  </motion.video>
                </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;