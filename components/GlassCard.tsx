
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  borderColor = 'border-white/20',
  initial = { opacity: 0, y: 20 }, // Default initial animation
  animate = { opacity: 1, y: 0 },   // Default animate animation
  transition = { duration: 0.5 }, // Default transition
  ...rest // All other props, including variants, custom, exit, etc.
}) => {
  return (
    <motion.div
      className={`bg-white/5 backdrop-blur-lg shadow-2xl rounded-xl p-6 md:p-8 ${borderColor} border ${className}`}
      initial={initial}
      animate={animate}
      transition={transition}
      {...rest} // Spread the rest of the props. If 'variants' is in rest, 'initial' and 'animate' (if strings) will refer to it.
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;