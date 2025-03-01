'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '#industries' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '#contact' }
  ];

  const NavLink = ({ href, children }) => (
    <motion.a
      href={href}
      className="relative text-white group px-2 py-1"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-0 w-full h-0.5 bg-white origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );

  return (
    <nav className="sticky top-0 w-full z-50 bg-transparent font-sans">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <motion.a
            href="/"
            className="text-white text-xl font-bold font-sans"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Home"
          >
            Osvan Technology
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          id="mobile-menu"
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0,
            y: isMenuOpen ? 0 : -20 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-black/90 px-4 py-6 rounded-lg mb-4">
            <div className="flex flex-col items-center gap-6">
              {menuItems.map((item) => (
                <NavLink key={item.name} href={item.href}>
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;