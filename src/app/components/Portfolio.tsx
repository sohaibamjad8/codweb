import { motion, useMotionValue, useAnimation } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { PortfolioBackground } from './PortfolioBackground';
import { useState, useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Workspace Redesign',
    category: 'Interior Design',
    image: 'https://images.unsplash.com/photo-1742440710193-3547e0b9d4db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjIwNDcwOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'A modern workspace transformation',
  },
  {
    title: 'Minimal Architecture',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1549791084-5f78368b208b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MTk4ODc3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Clean lines meet modern design',
  },
  {
    title: 'Modern Living',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE5ODE5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Luxury interior solutions',
  },
  {
    title: 'Abstract Vision',
    category: 'Digital Art',
    image: 'https://images.unsplash.com/photo-1699568542306-ca1ed61891e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTk4NTIzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Creative digital experiences',
  },
  {
    title: 'Brand Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc2MTk4NTIzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Complete brand transformation',
  },
  {
    title: 'Mobile App Design',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYxOTg1MjM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Intuitive user experience design',
  },
];

export function Portfolio() {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const constraintsRef = useRef<HTMLDivElement>(null);
  
  // Triple the projects for infinite loop effect
  const infiniteProjects = [...projects, ...projects, ...projects];
  
  const CARD_WIDTH = 600; // Width of each card including gap
  const GAP = 32;
  const totalWidth = (CARD_WIDTH + GAP) * projects.length;

  useEffect(() => {
    let animationFrame: number;
    let lastTime = Date.now();
    
    const animate = () => {
      if (!isDragging) {
        const currentTime = Date.now();
        const delta = currentTime - lastTime;
        lastTime = currentTime;
        
        const currentX = x.get();
        const newX = currentX - (delta * 0.03); // Smooth scroll speed
        
        // Reset position when we've scrolled through one set
        if (newX <= -totalWidth) {
          x.set(newX + totalWidth);
        }
        
        x.set(newX);
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging, x, totalWidth]);

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background */}
      <PortfolioBackground />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FED201]/10 border border-[#FED201]/20 backdrop-blur-sm mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-[#FED201]" />
            <span className="text-[#FED201] tracking-wider text-sm uppercase">Portfolio</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-[#FED201] to-[#FFE44D] bg-clip-text text-transparent">
            Featured Work
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            A selection of our recent projects that showcase our creativity and attention to detail.
          </p>
        </motion.div>

        {/* Infinite Slider */}
        <div className="relative" ref={constraintsRef}>
          <motion.div
            className="flex gap-8 cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -totalWidth, right: 0 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            {infiniteProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                className="group relative overflow-hidden rounded-3xl flex-shrink-0"
                style={{ width: CARD_WIDTH }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: (index % projects.length) * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Glassmorphism Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl" />
                
                {/* Glowing border effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, rgba(254, 210, 1, 0.4), rgba(254, 210, 1, 0.4))',
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                {/* Image Container */}
                <div className="relative h-[500px] overflow-hidden rounded-3xl">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 pointer-events-none select-none"
                    draggable={false}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Animated gradient on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(254, 210, 1, 0.4), transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#FED201] animate-pulse" />
                    <span className="text-[#FED201] text-sm tracking-wider uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 group-hover:text-[#FED201] transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>

                  {/* View Project Button */}
                  <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm tracking-wider uppercase">View Project</span>
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#FED201]/0 group-hover:border-[#FED201]/100 rounded-tr-2xl transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-20" />
        
        {/* Drag Hint */}
        <motion.div
          className="text-center mt-12 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm tracking-wider uppercase">
            <motion.span
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              ←
            </motion.span>
            {' '}Drag to explore{' '}
            <motion.span
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              →
            </motion.span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}