'use client'

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const PrivacyLegal = () => {
  const privacyRef = useRef(null);
  const termsRef = useRef(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for section parameter in URL and scroll to appropriate section
    const section = searchParams.get('section');
    if (section === 'privacy' && privacyRef.current) {
      privacyRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'terms' && termsRef.current) {
      termsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);

  return (
    <>
      <div className="relative h-[50vh] w-full bg-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900 to-gray-700"
          transition={{ duration: 1 }}
        />

        <Navbar />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 px-4 md:px-16 lg:px-28 z-10">
          <div className="absolute top-16 left-0 w-full px-4 md:px-16">
            <hr className="border-t-2 border-gray-300 my-4" />
          </div>

          <div className="h-full flex flex-col font-sans justify-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-left p-4 mt-8 md:p-8 lg:p-16"
            >
              <h1 className="text-xs md:text-base lg:text-base font-semibold text-white lg:mb-4">
                LEGAL
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-base text-white mb-6">
                Privacy Policy & Terms of Service
              </h2>
              <p className="text-l md:text-2xl font-thin text-white max-w-3xl">
                Our commitment to transparency and protecting your information.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation tabs for sections */}
      <div className="sticky top-0 bg-white shadow-md z-20">
        <div className="container mx-auto px-4 md:px-16 lg:px-28">
          <div className="flex space-x-8 py-4">
            <Link href="/privacy-legal?section=privacy" scroll={false} className="text-lg font-medium hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/privacy-legal?section=terms" scroll={false} className="text-lg font-medium hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-16 lg:px-28 py-12">
        {/* Privacy Policy Section */}
        <section 
          ref={privacyRef} 
          id="privacy" 
          className="mb-16 scroll-mt-24"
        >
          <h2 className="text-3xl font-light text-gray-900 mb-8 pb-4 border-b border-gray-200">Privacy Policy</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">1. Introduction</h3>
              <p className="text-gray-600">
                At Osvan Technologies ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">2. Information We Collect</h3>
              <p className="text-gray-600 mb-3">
                We may collect several types of information from and about users of our website, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Personal identifiers such as name, email address, phone number, and company name.</li>
                <li>Usage data including IP address, browser type, operating system, and pages visited.</li>
                <li>Marketing and communications preferences.</li>
                <li>Any other information you choose to provide us through forms or other communications.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">3. How We Use Your Information</h3>
              <p className="text-gray-600 mb-3">
                We use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide, maintain, and improve our services.</li>
                <li>Process transactions and send related information.</li>
                <li>Respond to your comments, questions, and requests.</li>
                <li>Send you technical notices, updates, security alerts, and support messages.</li>
                <li>Communicate with you about products, services, offers, and events.</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">4. Cookies and Tracking Technologies</h3>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">5. Data Sharing and Disclosure</h3>
              <p className="text-gray-600 mb-3">
                We may share your personal information in the following situations:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>With service providers who perform services on our behalf.</li>
                <li>To comply with legal obligations.</li>
                <li>To protect and defend our rights and property.</li>
                <li>With your consent or at your direction.</li>
                <li>With business partners for marketing purposes, if you have provided consent.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">6. Data Security</h3>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">7. Your Data Protection Rights</h3>
              <p className="text-gray-600 mb-3">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>The right to access, update, or delete your information.</li>
                <li>The right to rectification if your information is inaccurate or incomplete.</li>
                <li>The right to object to our processing of your personal data.</li>
                <li>The right to request restriction of processing of your personal data.</li>
                <li>The right to data portability.</li>
                <li>The right to withdraw consent where we rely on consent to process your personal information.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">8. Children's Privacy</h3>
              <p className="text-gray-600">
                Our services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">9. Changes to This Privacy Policy</h3>
              <p className="text-gray-600">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">10. Contact Us</h3>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at privacy@osvantechnologies.com or through the Contact page on our website.
              </p>
            </div>

            <p className="text-gray-500 italic mt-6">Last Updated: March 6, 2025</p>
          </div>
        </section>

        {/* Terms of Service Section */}
        <section 
          ref={termsRef} 
          id="terms" 
          className="scroll-mt-24"
        >
          <h2 className="text-3xl font-light text-gray-900 mb-8 pb-4 border-b border-gray-200">Terms of Service</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">1. Agreement to Terms</h3>
              <p className="text-gray-600">
                By accessing or using our website and services, you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms, you must not access or use our services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">2. Services Description</h3>
              <p className="text-gray-600">
                Osvan Technologies provides technology solutions across wired, wireless, and mobile spaces. Our services include but are not limited to consulting, implementation, support, and maintenance of technology solutions. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">3. User Responsibilities</h3>
              <p className="text-gray-600 mb-3">
                When using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide accurate and complete information.</li>
                <li>Maintain the confidentiality of any account credentials.</li>
                <li>Be responsible for all activities that occur under your account.</li>
                <li>Use our services in compliance with applicable laws and regulations.</li>
                <li>Not engage in any activity that disrupts or interferes with our services.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">4. Intellectual Property Rights</h3>
              <p className="text-gray-600 mb-3">
                Our website and its contents, features, and functionality are owned by Osvan Technologies and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p className="text-gray-600">
                You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any materials from our website without our prior written consent, except for temporary storage in your computer's cache memory or downloading for personal, non-commercial use.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">5. User Content</h3>
              <p className="text-gray-600 mb-3">
                If you submit, upload, or share any content through our services ("User Content"), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material.
              </p>
              <p className="text-gray-600">
                You represent and warrant that you own or control all rights in your User Content and have the right to grant the license above. You understand that your User Content may be viewed by other users and may be transferred unencrypted.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">6. Prohibited Uses</h3>
              <p className="text-gray-600 mb-3">
                You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                <li>To impersonate or attempt to impersonate Osvan Technologies, our employees, or any other person.</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of our services.</li>
                <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of our services.</li>
                <li>To use our services in connection with any unlawful purpose.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">7. Warranty Disclaimers</h3>
              <p className="text-gray-600">
                Our services are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">8. Limitation of Liability</h3>
              <p className="text-gray-600">
                To the fullest extent permitted by law, Osvan Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use our services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">9. Indemnification</h3>
              <p className="text-gray-600">
                You agree to defend, indemnify, and hold harmless Osvan Technologies, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of our services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">10. Governing Law and Jurisdiction</h3>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions. Any legal suit, action, or proceeding arising out of or related to these Terms or our services shall be instituted exclusively in the federal courts of [Your State/Country] or the courts of [Your State/County], and you irrevocably submit to the jurisdiction of such courts.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">11. Changes to Terms</h3>
              <p className="text-gray-600">
                We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when we post them. Your continued use of our services following the posting of revised Terms means that you accept and agree to the changes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">12. Contact Information</h3>
              <p className="text-gray-600">
                Questions about the Terms of Service should be sent to us at legal@osvantechnologies.com or through the Contact page on our website.
              </p>
            </div>

            <p className="text-gray-500 italic mt-6">Last Updated: March 6, 2025</p>
          </div>
        </section>
      </div>

     
    </>
  );
};

export default PrivacyLegal;