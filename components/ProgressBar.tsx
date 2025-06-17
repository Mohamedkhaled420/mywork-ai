
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  colorClass?: string; // e.g., 'bg-cyan-500'
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, colorClass = 'bg-purple-500' }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-gray-700/50 rounded-full h-2.5 my-4">
      <motion.div
        className={`h-2.5 rounded-full ${colorClass}`}
        initial={{ width: '0%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default ProgressBar;
