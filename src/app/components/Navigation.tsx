import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { MagneticElement } from './MagneticElement';
import codwebLogo from 'figma:asset/3b904c5bbeb733f1db0717bb4a00d9ace41a0b6d.png';

interface NavigationProps {
  onGetStartedClick?: () => void;
}

export function Navigation({ onGetStartedClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Services', 'Work', 'About', 'Contact'];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={codwebLogo} 
                alt="Codweb Studio" 
                className="h-8 md:h-10 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <MagneticElement key={item} strength={0.25}>
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide cursor-pointer"
                    whileHover={{ y: -2 }}
                  >
                    {item}
                  </motion.a>
                </MagneticElement>
              ))}
              <MagneticElement strength={0.3}>
                <Button 
                  size="sm" 
                  className="bg-white text-black hover:bg-gray-200"
                  onClick={onGetStartedClick}
                >
                  Get Started
                </Button>
              </MagneticElement>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white z-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-gradient-to-br from-gray-900 to-black border-l border-white/10 z-40 md:hidden shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Drawer Content */}
              <div className="flex flex-col h-full pt-24 px-6 pb-8">
                {/* Navigation Items */}
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="py-4 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all text-lg tracking-wide border border-transparent hover:border-[#FED201]/20"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>

                {/* Get Started Button */}
                <motion.div
                  className="mt-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Button
                    size="lg"
                    className="w-full bg-[#FED201] text-black hover:bg-[#FED201]/90"
                    onClick={() => {
                      setIsOpen(false);
                      onGetStartedClick?.();
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>

                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FED201]/10 rounded-full blur-3xl -z-10" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}