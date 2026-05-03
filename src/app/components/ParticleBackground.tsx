import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'square' | 'triangle' | 'line';
  color: string;
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const colors = [
      'rgba(168, 85, 247, 0.3)', // purple
      'rgba(236, 72, 153, 0.3)', // pink
      'rgba(96, 165, 250, 0.3)', // blue
      'rgba(167, 139, 250, 0.3)', // violet
    ];

    const shapes: Array<'circle' | 'square' | 'triangle' | 'line'> = ['circle', 'square', 'triangle', 'line'];

    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderShape = (particle: Particle) => {
    const baseStyle = {
      width: particle.size,
      height: particle.size,
      background: particle.color,
    };

    switch (particle.shape) {
      case 'circle':
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: '50%',
              boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
            }}
          />
        );
      case 'square':
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: '8px',
              transform: 'rotate(45deg)',
              boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
              filter: `drop-shadow(0 0 ${particle.size / 2}px ${particle.color})`,
            }}
          />
        );
      case 'line':
        return (
          <div
            style={{
              width: particle.size * 1.5,
              height: 2,
              background: particle.color,
              boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
            }}
          />
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        // Calculate parallax effect based on mouse position
        const parallaxX = (mousePosition.x - 50) * 0.02;
        const parallaxY = (mousePosition.y - 50) * 0.02;

        return (
          <motion.div
            key={particle.id}
            className="absolute"
            initial={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [
                0,
                Math.sin(particle.id) * 100 + parallaxX,
                Math.cos(particle.id) * 100 + parallaxX,
                0,
              ],
              y: [
                0,
                Math.cos(particle.id) * 100 + parallaxY,
                Math.sin(particle.id) * 100 + parallaxY,
                0,
              ],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.3, 0.6, 0.4, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              filter: 'blur(1px)',
            }}
          >
            {renderShape(particle)}
          </motion.div>
        );
      })}

      {/* Floating lines that connect particles */}
      {particles.slice(0, 8).map((particle, index) => {
        const nextParticle = particles[(index + 1) % 8];
        return (
          <motion.svg
            key={`line-${particle.id}`}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
          >
            <motion.line
              x1={`${particle.x}%`}
              y1={`${particle.y}%`}
              x2={`${nextParticle.x}%`}
              y2={`${nextParticle.y}%`}
              stroke="rgba(168, 85, 247, 0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 8,
                delay: index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.svg>
        );
      })}

      {/* Floating dots that follow mouse */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`follower-${i}`}
          className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
          animate={{
            x: [
              `${mousePosition.x + Math.sin(i * 0.5) * 20}%`,
              `${mousePosition.x + Math.cos(i * 0.5) * 20}%`,
            ],
            y: [
              `${mousePosition.y + Math.cos(i * 0.5) * 20}%`,
              `${mousePosition.y + Math.sin(i * 0.5) * 20}%`,
            ],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
          style={{
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Glowing orbs that move in wave patterns */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: 150 + i * 30,
            height: 150 + i * 30,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? 'rgba(168, 85, 247, 0.15)' : 'rgba(96, 165, 250, 0.15)'
            } 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          animate={{
            x: [
              `${20 + i * 15}%`,
              `${80 - i * 15}%`,
              `${20 + i * 15}%`,
            ],
            y: [
              `${10 + i * 10}%`,
              `${90 - i * 10}%`,
              `${10 + i * 10}%`,
            ],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
