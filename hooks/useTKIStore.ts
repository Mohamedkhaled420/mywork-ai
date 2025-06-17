
import { useState, useCallback } from 'react';
import { TKIQuestion, TKIAnswer, TKIScores, TKIResultDetails, TKIStyle } from '../types';
import { TKI_QUESTIONS, TKI_DESCRIPTIONS } from '../constants';

const calculateTKIScores = (answers: TKIAnswer[]): TKIScores => {
  const scores: TKIScores = {
    [TKIStyle.Competing]: 0,
    [TKIStyle.Collaborating]: 0,
    [TKIStyle.Compromising]: 0,
    [TKIStyle.Avoiding]: 0,
    [TKIStyle.Accommodating]: 0,
  };
  answers.forEach(answer => {
    scores[answer.chosenStyle]++;
  });
  return scores;
};

const determineDominantTKIStyle = (scores: TKIScores): TKIStyle => {
  let dominantStyle = TKIStyle.Competing; // Default
  let maxScore = 0;
  for (const style in scores) {
    if (scores[style as TKIStyle] > maxScore) {
      maxScore = scores[style as TKIStyle];
      dominantStyle = style as TKIStyle;
    }
  }
  return dominantStyle;
};

export const useTKIStore = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<TKIAnswer[]>([]);
  const [results, setResults] = useState<TKIResultDetails | null>(null);

  const totalQuestions = TKI_QUESTIONS.length;
  const currentQuestion = TKI_QUESTIONS[currentQuestionIndex];
  const isCompleted = currentQuestionIndex >= totalQuestions;

  const handleAnswer = useCallback((questionId: string, chosenStyle: TKIStyle) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      if (existingAnswerIndex > -1) {
         // TKI typically doesn't allow changing answers once moved on, but for UI sake, we allow overwrite if on same Q
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = { questionId, chosenStyle };
        return updatedAnswers;
      }
      return [...prev, { questionId, chosenStyle }];
    });

    // Automatically move to next question
    setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else if (currentQuestionIndex === totalQuestions - 1) {
             setCurrentQuestionIndex(prev => prev + 1);
        }
    }, 300); // 300ms delay for visual feedback
  }, [currentQuestionIndex, totalQuestions]);
  
  const calculateResults = useCallback(() => {
     if (answers.length < totalQuestions) return;

    const finalScores = calculateTKIScores(answers);
    const dominantStyle = determineDominantTKIStyle(finalScores);
    const description = TKI_DESCRIPTIONS[dominantStyle] || "No description available.";
    
    const scoresArray = Object.entries(finalScores).map(([style, score]) => ({
        style: style as TKIStyle,
        score: score as number,
    }));

    setResults({ dominantStyle, description, scores: scoresArray });
  }, [answers, totalQuestions]);

  const retakeTest = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
  }, []);

  return {
    currentQuestionIndex,
    currentQuestion,
    answers,
    results,
    totalQuestions,
    isCompleted,
    handleAnswer,
    calculateResults,
    retakeTest,
  };
};
