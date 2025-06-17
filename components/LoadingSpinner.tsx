
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 32, text, className="" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <Loader2 size={size} className="animate-spin text-purple-400" />
      {text && <p className="mt-2 text-sm text-gray-300">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
