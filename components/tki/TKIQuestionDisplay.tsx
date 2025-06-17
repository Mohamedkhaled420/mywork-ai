
import React from 'react';
import { TKIQuestion, TKIStyle } from '../../types';
import GlassButton from '../GlassButton';
import { THEME_COLORS } from '../../constants';

interface TKIQuestionDisplayProps {
  question: TKIQuestion;
  onAnswer: (chosenStyle: TKIStyle) => void;
}

const TKIQuestionDisplay: React.FC<TKIQuestionDisplayProps> = ({ question, onAnswer }) => {
  const theme = THEME_COLORS.tki;
  return (
    <div className="my-6 p-6 bg-white/5 rounded-lg shadow-md">
      <p className={`text-lg md:text-xl font-semibold mb-6 ${theme.accentText}`}>Which statement is more characteristic of your behavior?</p>
      <div className="space-y-4 md:space-y-0 md:flex md:space-x-4">
        <GlassButton
          onClick={() => onAnswer(question.styleA)}
          className="w-full md:w-1/2 text-left p-4 leading-normal"
          colorClass={`bg-${theme.primary}/30 hover:bg-${theme.primary}/50 border-${theme.primary}/50`}
        >
          <span className="font-bold block mb-1">Option A:</span>
          {question.statementA}
        </GlassButton>
        <GlassButton
          onClick={() => onAnswer(question.styleB)}
          className="w-full md:w-1/2 text-left p-4 leading-normal"
          colorClass={`bg-${theme.primary}/30 hover:bg-${theme.primary}/50 border-${theme.primary}/50`}
        >
          <span className="font-bold block mb-1">Option B:</span>
          {question.statementB}
        </GlassButton>
      </div>
    </div>
  );
};

export default TKIQuestionDisplay;
