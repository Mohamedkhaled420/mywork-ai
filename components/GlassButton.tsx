import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode; // Kept to maintain its original mandatory status
  variant?: 'primary' | 'secondary';
  colorClass?: string; // e.g., 'bg-cyan-500/30 hover:bg-cyan-500/50 border-cyan-500/50'
  // className is inherited from HTMLMotionProps and can be destructured in the component
  // Other standard button attributes (onClick, type, disabled, etc.) are also inherited
}

const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  className = '', // className is destructured from props (originating from HTMLMotionProps)
  variant = 'primary',
  colorClass = 'bg-purple-600/30 hover:bg-purple-600/50 border-purple-500/50', 
  ...props 
}) => {
  
  const baseStyle = "px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
  const effectiveColorClass = variant === 'secondary' 
    ? `bg-gray-500/20 hover:bg-gray-500/40 border-gray-400/50 text-gray-200 hover:text-white ${className}` 
    : `${colorClass} text-white ${className}`;

  return (
    <motion.button
      className={`${baseStyle} ${effectiveColorClass}`}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.2)" }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlassButton;