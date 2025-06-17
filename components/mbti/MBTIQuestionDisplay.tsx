
import React from 'react';
import { MBTIQuestion } from '../../types'; // Changed from ../../constants
import { RATING_LABELS } from '../../constants';
import GlassButton from '../GlassButton';
import { THEME_COLORS } from '../../constants';

interface MBTIQuestionDisplayProps {
  question: MBTIQuestion;
  currentAnswer: number | undefined;
  onAnswer: (value: number) => void;
}

const MBTIQuestionDisplay: React.FC<MBTIQuestionDisplayProps> = ({ question, currentAnswer, onAnswer }) => {
  const theme = THEME_COLORS.mbti;
  return (
    <div className="my-6 p-6 bg-white/5 rounded-lg shadow-md">
      <p className={`text-lg md:text-xl font-semibold mb-6 ${theme.accentText}`}>{question.text}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2">
        {RATING_LABELS.map((label, index) => {
          const value = index + 1;
          return (
            <GlassButton
              key={value}
              onClick={() => onAnswer(value)}
              className={`w-full text-xs sm:text-sm ${currentAnswer === value ? `ring-2 ring-offset-2 ring-offset-gray-800 ring-${theme.primary}` : ''}`}
              colorClass={currentAnswer === value ? `bg-${theme.primary}/70 hover:bg-${theme.primary}/90 border-${theme.primary}/70` : `bg-${theme.primary}/30 hover:bg-${theme.primary}/50 border-${theme.primary}/50`}
            >
              {label} ({value})
            </GlassButton>
          );
        })}
      </div>
    </div>
  );
};

export default MBTIQuestionDisplay;