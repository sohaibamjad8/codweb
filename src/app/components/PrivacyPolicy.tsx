import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';
import codwebLogo from 'figma:asset/3b904c5bbeb733f1db0717bb4a00d9ace41a0b6d.png';

interface PrivacyPolicyProps {
  onBack?: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "We collect information you provide directly to us when you create an account, submit inquiries, or communicate with us. This may include your name, email address, phone number, company information, and any other information you choose to provide.",
        "We automatically collect certain information about your device when you use our services, including your IP address, browser type, operating system, referring URLs, and information about your usage of our services.",
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "We use the information we collect to provide, maintain, and improve our services, to process your requests and transactions, and to send you technical notices, updates, security alerts, and support messages.",
        "We may also use your information to communicate with you about products, services, offers, promotions, and events, and provide news and information we think will be of interest to you.",
        "We use information collected through cookies and other tracking technologies to understand your preferences, improve your experience on our site, and provide personalized content and advertisements.",
      ]
    },
    {
      icon: Eye,
      title: "Information Sharing and Disclosure",
      content: [
        "We do not share your personal information with third parties except as described in this privacy policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.",
        "We may disclose information if we believe disclosure is in accordance with, or required by, any applicable law or legal process, including lawful requests by public authorities to meet national security or law enforcement requirements.",
        "We may share information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.",
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights and Choices",
      content: [
        "You may update, correct, or delete your account information at any time by logging into your account or contacting us. You may also opt out of receiving promotional communications from us by following the instructions in those messages.",
        "Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our services.",
        "Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your personal information, or to object to or restrict certain processing of your information.",
      ]
    },
    {
      icon: Shield,
      title: "Data Security",
      content: [
        "We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable and we cannot guarantee the security of our systems 100%.",
        "Any information you transmit to us is done at your own risk. We recommend that you do not disclose your password to anyone and that you change your password regularly.",
        "We will notify you of any data breaches that may affect your personal information in accordance with applicable laws and regulations.",
      ]
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: [
        "If you have any questions about this Privacy Policy, please contact us at hello@codweb.ae or call us at +971 56 599 8667.",
        "Our office is located at Al Qouz, Dubai, UAE. We aim to respond to all inquiries within 48 hours during business days.",
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-[#FED201] transition-colors"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
          
          <img src={codwebLogo} alt="Codweb Studio" className="h-8 w-auto" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#FED201]/10 border border-[#FED201]/20 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Shield className="w-10 h-10 text-[#FED201]" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#FED201] to-[#FFE44D] bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Last updated: January 13, 2026
          </p>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            At Codweb Studio, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#FED201]/10 border border-[#FED201]/20 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-[#FED201]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white flex-1">
                  {section.title}
                </h2>
              </div>

              {/* Content */}
              <div className="space-y-4 ml-16">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-400 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Decorative accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#FED201]/20 rounded-tr-xl" />
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#FED201]/10 to-[#FED201]/5 border border-[#FED201]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Changes to This Privacy Policy</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
          </p>
          <p className="text-gray-400 leading-relaxed">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-500 text-sm">
            © 2025 Codweb Studio. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
