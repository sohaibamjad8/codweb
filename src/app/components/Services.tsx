import { motion } from 'motion/react';
import { Palette, Layout, Smartphone, Globe, Package, Sparkles } from 'lucide-react';
import { MagneticElement } from './MagneticElement';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Crafting unique visual identities that capture your essence and resonate with your audience.',
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful interfaces that users love to interact with.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Design',
    description: 'Designing seamless experiences for iOS and Android that engage on the go.',
  },
  {
    icon: Globe,
    title: 'Web Design',
    description: 'Building responsive websites that look stunning on every screen size.',
  },
  {
    icon: Package,
    title: 'Product Design',
    description: 'Developing comprehensive product strategies from concept to completion.',
  },
  {
    icon: Sparkles,
    title: 'Motion Design',
    description: 'Bringing designs to life with captivating animations and interactions.',
  },
];

export function Services() {
  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FED201]/10 rounded-full blur-3xl"
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
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#FED201] tracking-wider text-sm font-bold uppercase">WHAT WE DO</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white">Our Expertise</h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            We offer a comprehensive range of design services to help your brand stand out
            in the digital landscape.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <MagneticElement key={service.title} strength={0.15}>
              <motion.div
                className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-[#FED201]/50 transition-all duration-300 cursor-pointer h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#FED201]/20 flex items-center justify-center mb-6 group-hover:bg-[#FED201] transition-colors duration-300">
                  <service.icon className="h-7 w-7 text-[#FED201] group-hover:text-black transition-colors duration-300" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            </MagneticElement>
          ))}
        </div>
      </div>
    </section>
  );
}