import { motion } from 'motion/react';
import { ArrowLeft, FileText, Scale, AlertCircle, Users, Ban, RefreshCw } from 'lucide-react';
import codwebLogo from 'figma:asset/3b904c5bbeb733f1db0717bb4a00d9ace41a0b6d.png';

interface TermsOfServiceProps {
  onBack?: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  const sections = [
    {
      icon: FileText,
      title: "Agreement to Terms",
      content: [
        "By accessing or using the Codweb Studio website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.",
        "We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
        "Your continued use of our services after any such changes constitutes your acceptance of the new Terms of Service. It is your responsibility to check these Terms periodically for changes.",
      ]
    },
    {
      icon: Users,
      title: "Use of Services",
      content: [
        "You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services in any way that violates any applicable federal, state, local, or international law or regulation.",
        "You are responsible for maintaining the confidentiality of your account and password, and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password.",
        "We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion at any time without notice.",
      ]
    },
    {
      icon: Scale,
      title: "Intellectual Property Rights",
      content: [
        "The services and their original content, features, and functionality are and will remain the exclusive property of Codweb Studio and its licensors. The services are protected by copyright, trademark, and other laws of both the United Arab Emirates and foreign countries.",
        "Our trademarks, logos, and service marks may not be used in connection with any product or service without the prior written consent of Codweb Studio. You may not use our intellectual property for any commercial purpose without our express written permission.",
        "For work products created by Codweb Studio for clients, ownership and intellectual property rights will be transferred to the client upon full payment, as specified in the project agreement. Until full payment is received, all rights remain with Codweb Studio.",
      ]
    },
    {
      icon: Ban,
      title: "Prohibited Uses",
      content: [
        "You may not use our services to engage in any conduct that restricts or inhibits anyone's use or enjoyment of the services, or which, as determined by us, may harm Codweb Studio or users of the services or expose them to liability.",
        "Prohibited activities include but are not limited to: using the services for any unlawful purpose; attempting to interfere with or disrupt the services or servers or networks connected to the services; attempting to gain unauthorized access to any portion of the services; or using any robot, spider, or other automatic device to access the services.",
        "We reserve the right to terminate your access to the services immediately, without prior notice, if you engage in any prohibited use or violate these Terms of Service.",
      ]
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability",
      content: [
        "In no event shall Codweb Studio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
        "We shall not be held liable for any failure to perform our obligations under these Terms where such failure results from any cause beyond our reasonable control, including but not limited to mechanical, electronic or communications failure or degradation.",
        "Our total liability to you for any damages arising out of or related to these Terms or the services shall not exceed the amount paid by you to Codweb Studio in the twelve (12) months prior to the action giving rise to liability.",
      ]
    },
    {
      icon: RefreshCw,
      title: "Refund and Cancellation Policy",
      content: [
        "Project deposits are non-refundable once work has commenced. If you wish to cancel a project after work has begun, payment for work completed to date will be due based on the percentage of project completion.",
        "For ongoing service agreements, either party may terminate the agreement with 30 days written notice. Any prepaid fees for services not yet rendered will be refunded on a pro-rata basis.",
        "Refund requests must be submitted in writing to hello@codweb.ae. Approved refunds will be processed within 14 business days and returned using the original method of payment.",
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
            <FileText className="w-10 h-10 text-[#FED201]" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#FED201] to-[#FFE44D] bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Last updated: January 13, 2026
          </p>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Please read these Terms of Service carefully before using the Codweb Studio website and services. These terms govern your use of our services and establish the rights and obligations between you and Codweb Studio.
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

        {/* Governing Law */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#FED201]/10 to-[#FED201]/5 border border-[#FED201]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Governing Law</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            These Terms shall be governed and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Any disputes arising out of or relating to these Terms or the services shall be subject to the exclusive jurisdiction of the courts located in Dubai, UAE.
          </p>
          <h3 className="text-xl font-bold text-white mb-4 mt-6">Contact Information</h3>
          <p className="text-gray-400 leading-relaxed">
            If you have any questions about these Terms of Service, please contact us at hello@codweb.ae, call us at +971 56 599 8667, or visit our office at Al Qouz, Dubai, UAE.
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
