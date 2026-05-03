import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { MagneticElement } from "./MagneticElement";
import { ParticleBackground } from "./ParticleBackground";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-abstract-colorful-ink-in-water-7836/1080p.mp4"
          type="video/mp4"
        />
      </video>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FED201]/10 via-black/90 to-black/80" />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated circles */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-[#FED201]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-[#FED201]/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-8 tracking-tight leading-none">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span
                className="block text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black italic bg-gradient-to-r from-[#FED201] via-[#FED201] to-[#FFE44D] bg-clip-text text-transparent"
                style={{
                  fontWeight: 900,
                  WebkitTextStroke:
                    "2px rgba(254, 210, 1, 0.3)",
                  textShadow:
                    "0 0 100px rgba(254, 210, 1, 0.6)",
                  letterSpacing: "-0.02em",
                }}
              >
                Crafting
              </span>
              {/* Outlined text effect */}
              <motion.span
                className="absolute inset-0 block text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black italic text-transparent"
                style={{
                  WebkitTextStroke:
                    "1px rgba(255, 255, 255, 0.1)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Crafting
              </motion.span>
            </motion.div>
            <motion.span
              className="block text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider text-white mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontWeight: 900,
                letterSpacing: "0.05em",
              }}
            >
              Digital Dreams
            </motion.span>
          </h1>

          <motion.p
            className="max-w-3xl mx-auto mb-12 text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Transforming ideas into stunning digital realities
            through innovative design, creative thinking, and
            meticulous attention to detail.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {/* Animated Gradient Button */}
            <MagneticElement strength={0.4}>
              <motion.a
                href="#footer"
                className="relative px-6 py-4 text-base font-bold text-black group overflow-hidden rounded-full cursor-pointer inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-[#FED201]" />
                <span className="relative z-10 flex items-center">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)",
                  }}
                />
              </motion.a>
            </MagneticElement>

            {/* Glassmorphism Button */}
            <MagneticElement strength={0.4}>
              <motion.a
                href="#work"
                className="relative px-6 py-4 text-base font-bold text-white group rounded-full border-2 border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  View Our Work
                </span>
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FED201]/10" />
              </motion.a>
            </MagneticElement>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}