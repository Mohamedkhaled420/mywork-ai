
import React from 'react';
import { motion, Transition } from 'framer-motion'; // Added Transition
import { Sparkles } from 'lucide-react';
import { THEME_COLORS } from '../../constants';


const TypingIndicator: React.FC = () => {
  const theme = THEME_COLORS.chatbot;
  const dotVariants = {
    initial: { y: "0%" },
    animate: { y: ["0%", "-50%", "0%"] },
  };

  const dotTransition: Transition = { // Explicitly typed and added type property
    type: "tween",
    duration: 0.5,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <motion.div 
      className="flex items-center space-x-2 p-3 mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} flex items-center justify-center mr-1 shadow-md`}>
          <Sparkles size={16} className="text-white animate-pulse" />
      </div>
      <span className="text-sm text-gray-400">AI is thinking</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={`w-1.5 h-1.5 bg-purple-400 rounded-full`}
          variants={dotVariants}
          animate="animate"
          transition={{ ...dotTransition, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
};

export default TypingIndicator;