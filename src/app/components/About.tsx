import { motion } from "motion/react";
import {
  Award,
  Users,
  Briefcase,
  Heart,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { MagneticElement } from "./MagneticElement";
import { useState } from "react";
import { ConversationalForm } from "./ConversationalForm";

const stats = [
  {
    icon: Briefcase,
    value: "200+",
    label: "Projects Completed",
  },
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Awards Won" },
  { icon: Heart, value: "100%", label: "Passion Driven" },
];

export function About() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-black text-white overflow-hidden">
      <ConversationalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-[#FED201]/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FED201]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FED201]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#FED201] tracking-wider text-sm font-bold uppercase">
              ABOUT US
            </span>
            <h2 className="mt-4 mb-8 text-4xl md:text-5xl lg:text-6xl font-bold">
              Crafting Digital Excellence Since 2015
            </h2>
            <p className="text-gray-400 mb-6 text-lg">
              We are a passionate team of designers,
              strategists, and creative thinkers dedicated to
              transforming brands through exceptional design.
              Our mission is to create meaningful experiences
              that resonate with audiences and drive results.
            </p>
            <p className="text-gray-400 mb-8 text-lg">
              Every project we undertake is an opportunity to
              push boundaries, challenge conventions, and
              deliver work that exceeds expectations. We believe
              great design is not just about aesthetics—it's
              about solving problems and creating value.
            </p>

            <div className="flex gap-4 flex-wrap">
              <MagneticElement strength={0.2}>
                <motion.button
                  onClick={() => setIsFormOpen(true)}
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
              </MagneticElement>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <MagneticElement key={stat.label} strength={0.15}>
                <motion.div
                  className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(254, 210, 1, 0.5)",
                  }}
                >
                  <stat.icon className="h-8 w-8 text-[#FED201] mb-4" />
                  <div className="mb-2 text-3xl md:text-4xl font-bold">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-400">
                    {stat.label}
                  </p>
                </motion.div>
              </MagneticElement>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}