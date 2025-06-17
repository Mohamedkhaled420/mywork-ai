
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTKIStore } from '../hooks/useTKIStore';
import TKIQuestionDisplay from '../components/tki/TKIQuestionDisplay';
import TKIResultsDisplay from '../components/tki/TKIResultsDisplay';
import GlassButton from '../components/GlassButton';
import ProgressBar from '../components/ProgressBar';
import GlassCard from '../components/GlassCard';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { THEME_COLORS } from '../constants';
import { motion } from 'framer-motion';

const TKIPage: React.FC = () => {
  const {
    currentQuestionIndex,
    currentQuestion,
    results,
    totalQuestions,
    isCompleted,
    handleAnswer,
    calculateResults,
    retakeTest,
  } = useTKIStore();

  const theme = THEME_COLORS.tki;

  useEffect(() => {
    if (isCompleted && !results) {
      calculateResults();
    }
  }, [isCompleted, results, calculateResults]);

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/">
          <GlassButton colorClass={`bg-${theme.primary}/30 hover:bg-${theme.primary}/50 border-${theme.primary}/50`} className="!px-3 !py-2">
            <ArrowLeft size={20} className="mr-1" /> Back to Home
          </GlassButton>
        </Link>
        <h1 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo}`}>
          TKI Conflict Styles
        </h1>
        {results && (
          <GlassButton onClick={retakeTest} colorClass={`bg-${theme.secondary}/30 hover:bg-${theme.secondary}/50 border-${theme.secondary}/50`} className="!px-3 !py-2">
            <RotateCcw size={20} className="mr-1" /> Retake
          </GlassButton>
        )}
      </motion.div>

      {!results ? (
        <GlassCard className={`border-${theme.primary}/50`}>
          <div className="flex justify-between items-center mb-2 text-sm text-gray-300">
            <span>Question {Math.min(currentQuestionIndex + 1, totalQuestions)} of {totalQuestions}</span>
          </div>
          <ProgressBar current={currentQuestionIndex} total={totalQuestions} colorClass={`bg-${theme.primary}`} />
          {currentQuestion && !isCompleted && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <TKIQuestionDisplay
                question={currentQuestion}
                onAnswer={(chosenStyle) => handleAnswer(currentQuestion.id, chosenStyle)}
              />
            </motion.div>
          )}
           {isCompleted && (
            <div className="text-center py-8">
              <p className="text-xl text-gray-200">Calculating your results...</p>
            </div>
          )}
        </GlassCard>
      ) : (
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <TKIResultsDisplay results={results} />
        </motion.div>
      )}
    </div>
  );
};

export default TKIPage;
