import { motion } from "motion/react";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import FooterLogo from "../imports/FooterLogo1";

interface FooterProps {
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onFormOpen?: () => void;
}

export function Footer({ onPrivacyClick, onTermsClick, onFormOpen }: FooterProps) {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  const quickLinks = ["Services", "Work", "About", "Contact"];
  const services = [
    "Branding",
    "UI/UX Design",
    "Web Design",
    "Mobile Apps",
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FED201]/10 via-black to-black" />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#FED201]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FED201]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Top Section with CTA */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="mb-6 text-5xl md:text-6xl lg:text-7xl font-extrabold relative inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Glowing background effect */}
            <motion.div
              className="absolute inset-0 bg-[#FED201] blur-3xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Text with gradient */}
            <span className="relative bg-gradient-to-r from-[#FED201] via-[#FFE44D] to-[#FED201] bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]">
              Ready to Start Your Project?
            </span>
          </motion.h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Let's collaborate to bring your vision to life with
            exceptional design and innovation.
          </p>
          <motion.button
            onClick={onFormOpen}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FED201] rounded-full text-black font-bold group relative overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="relative z-10 h-5 w-5" />
            <span className="relative z-10">
              Start Your Project Brief
            </span>
            <ArrowUpRight className="relative z-10 h-5 w-5 group-hover:rotate-45 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              className="mb-6 w-40"
              whileHover={{ scale: 1.05 }}
            >
              <FooterLogo />
            </motion.div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Codweb crafts exceptional digital experiences for
              forward-thinking brands. Innovation meets design
              excellence.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="relative w-12 h-12 rounded-full border border-white/20 backdrop-blur-sm bg-white/5 flex items-center justify-center group overflow-hidden"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                  }}
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-[#FED201] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <social.icon className="h-5 w-5 relative z-10 text-gray-400 group-hover:text-black transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6 bg-gradient-to-r from-[#FED201] to-[#FFE44D] bg-clip-text text-transparent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                  }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm group inline-flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-[#FED201] transition-all duration-300" />
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-6 bg-gradient-to-r from-[#FFE44D] to-[#FED201] bg-clip-text text-transparent">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                  }}
                >
                  <span className="text-gray-400 text-sm inline-flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#FED201]" />
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="mb-6 bg-gradient-to-r from-[#FED201] to-[#FFE44D] bg-clip-text text-transparent">
              Contact
            </h4>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start gap-3 text-gray-400 text-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Mail className="h-5 w-5 text-[#FED201] flex-shrink-0 mt-0.5" />
                <span className="hover:text-white transition-colors">
                  hello@codweb.ae
                </span>
              </motion.li>
              <motion.li
                className="flex items-start gap-3 text-gray-400 text-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Phone className="h-5 w-5 text-[#FED201] flex-shrink-0 mt-0.5" />
                <span className="hover:text-white transition-colors">
                  +971 56 599 8667
                </span>
              </motion.li>
              <motion.li
                className="flex items-start gap-3 text-gray-400 text-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <MapPin className="h-5 w-5 text-[#FED201] flex-shrink-0 mt-0.5" />
                <span className="hover:text-white transition-colors">
                  Dubai, United Arab Emirates
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm">
            © 2026 Codweb. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-sm relative group"
              onClick={onPrivacyClick}
            >
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FED201] group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-sm relative group"
              onClick={onTermsClick}
            >
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FED201] group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-sm relative group"
            >
              Cookie Policy
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FED201] group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </footer>
  );
}