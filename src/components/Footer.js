'use client'

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
      <footer className="bg-gray-200 pt-16 pb-8 font-nunito">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          {/* Main Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Logo Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get2AI</h2>
              <p className="text-gray-600">Bringing Advanced IT Solutions within Your Reach.</p>
            </div>
            
            {/* Services */}  
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Services</h3>
              <ul className="space-y-3">
                <li><a href="/services/network-assessment-audit-optimization" className="text-gray-600 hover:text-gray-900">Network Assessment Audit Optimization</a></li>
                <li><a href="/services/sustainable-it-infrastructure" className="text-gray-600 hover:text-gray-900">Sustainable IT Infrastructure</a></li>
                <li><a href="/services/secure-digital-transformation-process-automation" className="text-gray-600 hover:text-gray-900">Secure Digital Transformation Process Automation</a></li>
                <li><a href="/services/secure-ai-insertion-network-transformation" className="text-gray-600 hover:text-gray-900">Secure AI Insertion Network Transformation</a></li>
                <li><a href="/services/on-demand-network-consultancy" className="text-gray-600 hover:text-gray-900">On Demand Network Consultancy</a></li>
              </ul>
            </div>

            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Information</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="text-gray-600 hover:text-gray-900">About Get2AI Technologies</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
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
                © 2025 Get2AI. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <a href="/privacy-legal?section=privacy" className="hover:text-gray-900">Privacy Policy</a>
                <span>|</span>
                <a href="/privacy-legal?section=terms" className="hover:text-gray-900">Legal Terms</a>
                {/* <span>|</span>
                <a href="#" className="hover:text-gray-900">Site Map</a> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer