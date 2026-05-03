import { motion } from "motion/react";
import {
  Zap,
  Award,
  Lightbulb,
  Users,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { MagneticElement } from "./MagneticElement";

const benefits = [
  {
    icon: Zap,
    title: "Lightning-Fast Delivery",
    description:
      "We pride ourselves on quick turnaround times without compromising quality. Your deadlines are our deadlines.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Award,
    title: "Award-Winning Team",
    description:
      "Our talented designers have won over 15 industry awards and recognition for exceptional creative work.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description:
      "We don't just follow trends—we create them. Every project gets a fresh, creative approach tailored to your needs.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Collaborative Process",
    description:
      "Your vision, our expertise. We work closely with you at every step to ensure the final product exceeds expectations.",
    color: "from-green-500 to-emerald-500",
  },
];

const features = [
  "100% Client Satisfaction Rate",
  "Unlimited Revisions Until Perfect",
  "Transparent Communication",
  "Post-Launch Support",
  "Scalable Solutions",
  "Budget-Friendly Options",
];

export function WhyWorkWithUs() {
  return (
    <section className="relative py-32 px-6 bg-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FED201]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.2, 0.3],
            x: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-6 py-3 rounded-full bg-[#FED201]/10 border border-[#FED201]/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-5 w-5 text-[#FED201]" />
            <span className="text-[#FED201] tracking-wider text-sm font-bold uppercase">
              Why Choose Us
            </span>
          </motion.div>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold">
            Why Work With{" "}
            <span className="text-[#FED201]">Codweb</span>?
          </h2>
          <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg md:text-xl">
            We're not just another design agency. We're your
            creative partners committed to bringing your vision
            to life with exceptional quality and innovation.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <MagneticElement
              key={benefit.title}
              strength={0.15}
            >
              <motion.div
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 backdrop-blur-sm hover:border-[#FED201]/50 transition-all duration-300 cursor-pointer h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Icon with gradient background */}
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${benefit.color} mb-6 relative`}
                >
                  <benefit.icon className="h-8 w-8 text-white" />
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(to bottom right, rgba(254, 210, 1, 0.2), rgba(254, 210, 1, 0))`,
                    }}
                  />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#FED201] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover effect line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#FED201] to-transparent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </MagneticElement>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          className="p-10 rounded-3xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-[#FED201]/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            What You Get Working With Us
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FED201]/50 transition-colors group cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.4,
                }}
                whileHover={{ x: 5 }}
              >
                <CheckCircle className="h-6 w-6 text-[#FED201] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 text-lg mb-6">
            Join 50+ happy clients who chose Codweb for their
            design needs
          </p>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <svg
                  className="w-8 h-8 text-[#FED201]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            5.0 Average Rating • 200+ Projects Completed
          </p>
        </motion.div>
      </div>
    </section>
  );
}