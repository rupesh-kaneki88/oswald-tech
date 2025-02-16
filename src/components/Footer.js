'use client'

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
      <footer className="bg-gray-200 pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          {/* Main Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Logo Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Osvan Technology</h2>
              <p className="text-gray-600">Bringing Advanced IT Solutions within Your Reach.</p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Capabilities</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Industries</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Perspectives</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Information</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About Osvan Tech</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
              </ul>
            </div>
            
            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-gray-900"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-600 hover:text-gray-900"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-600 hover:text-gray-900"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-gray-600 hover:text-gray-900"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-600 hover:text-gray-900"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                © 2025 General Dynamics Information Technology, Inc., a General Dynamics Company.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-gray-900">Legal Terms</a>
                <span>|</span>
                <a href="#" className="hover:text-gray-900">Site Map</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer