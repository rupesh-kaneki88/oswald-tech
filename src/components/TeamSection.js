'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '@/providers/TeamData';

const TeamSection = () => {
  const [activeTeamMember, setActiveTeamMember] = useState(null);

  const handleTeamMemberClick = (id) => {
    if (activeTeamMember === id) {
      setActiveTeamMember(null);
    } else {
      setActiveTeamMember(id);
    }
  };

  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4 md:px-16 lg:px-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Our Leadership</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals driving innovation and excellence at Osvan Technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div 
                className="relative cursor-pointer" 
                onClick={() => handleTeamMemberClick(member.id)}
                role="button"
                aria-expanded={activeTeamMember === member.id}
                aria-controls={`member-details-${member.id}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTeamMemberClick(member.id);
                  }
                }}
              >
                <div className="aspect-w-4 aspect-h-3 relative h-80 w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={`Photo of ${member.name}, ${member.position} at Osvan Technologies`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-2xl font-medium text-white">{member.name}</h3>
                  <p className="text-white/80">{member.position}</p>
                </div>
              </div>

              <motion.div
                id={`member-details-${member.id}`}
                className="p-6"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeTeamMember === member.id ? 'auto' : 0,
                  opacity: activeTeamMember === member.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Biography</h4>
                  <p className="text-gray-700">{member.bio}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Education</h4>
                  <p className="text-gray-700">{member.education}</p>
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                >
                  Connect on LinkedIn
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;