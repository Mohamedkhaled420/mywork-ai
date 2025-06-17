
import React from 'react';
import { motion } from 'framer-motion';

const Shape: React.FC<{ className?: string; delay?: number; size?: string; initialX?: string; initialY?: string; animateX?: string[]; animateY?: string[] }> = ({ className, delay = 0, size = 'w-16 h-16', initialX = '0%', initialY = '0%', animateX = ['0%', '5%', '-5%', '0%'], animateY = ['0%', '-5%', '5%', '0%'] }) => (
  <motion.div
    className={`absolute ${size} bg-white/5 backdrop-blur-sm rounded-full ${className}`}
    initial={{ opacity: 0, x: initialX, y: initialY, scale:0.5 }}
    animate={{ 
      opacity: [0, 0.3, 0.3, 0], 
      x: animateX,
      y: animateY,
      scale: [0.5, 1, 1, 0.5],
      rotate: [0, 90, 180, 270, 360]
    }}
    transition={{ 
      duration: 20 + Math.random() * 10, 
      repeat: Infinity, 
      delay,
      ease: "linear"
    }}
  />
);


const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundImage: [
            "linear-gradient(to bottom right, #1a202c, #2d3748, #4a5568)", // Darker theme
            "linear-gradient(to bottom right, #2c5282, #2b6cb0, #3182ce)", // Deep blues
            "linear-gradient(to bottom right, #44337a, #5a67d8, #7f9cf5)", // Purples
            "linear-gradient(to bottom right, #1a202c, #2d3748, #4a5568)", // Back to Darker
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle floating shapes */}
      <Shape className="bg-cyan-500/10" delay={0} size="w-20 h-20" initialX="10%" initialY="20%" animateX={['10%', '15%', '5%', '10%']} animateY={['20%', '15%', '25%', '20%']} />
      <Shape className="bg-pink-500/10" delay={2} size="w-32 h-32" initialX="80%" initialY="30%" animateX={['80%', '75%', '85%', '80%']} animateY={['30%', '35%', '25%', '30%']} />
      <Shape className="bg-purple-500/10" delay={4} size="w-24 h-24" initialX="50%" initialY="70%" animateX={['50%', '55%', '45%', '50%']} animateY={['70%', '65%', '75%', '70%']} />
      <Shape className="bg-teal-500/10" delay={6} size="w-16 h-16" initialX="20%" initialY="80%" animateX={['20%', '25%', '15%', '20%']} animateY={['80%', '75%', '85%', '80%']} />
       <Shape className="bg-indigo-500/10" delay={8} size="w-28 h-28" initialX="70%" initialY="10%" animateX={['70%', '65%', '75%', '70%']} animateY={['10%', '15%', '5%', '10%']} />

      {/* Grid overlay for futuristic feel */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>
    </div>
  );
};

export default AnimatedBackground;
