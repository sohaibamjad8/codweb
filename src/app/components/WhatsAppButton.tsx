import { motion } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '+971565998667';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=Hello! I'm interested in your services.`;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 bg-green-400/50 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* WhatsApp Icon */}
        <motion.div
          className="relative z-10"
          animate={{
            rotate: isHovered ? 15 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle className="h-8 w-8 text-white fill-white" />
        </motion.div>

        {/* Ripple effect on hover */}
        <motion.div
          className="absolute inset-0 bg-white/30 rounded-full"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={isHovered ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0.5 }}
          transition={{ duration: 0.6 }}
        />
      </motion.a>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-20 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-green-600" />
          <span className="font-medium">Chat with us!</span>
        </div>
        <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white transform rotate-45" />
      </motion.div>

      {/* Notification dot (optional - shows availability) */}
      <motion.div
        className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
