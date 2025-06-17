
import { useState, useCallback } from 'react';
import { MBTIQuestion, MBTIAnswer, MBTIScores, MBTIPersonalityType, MBTIResultDetails } from '../types';
import { MBTI_QUESTIONS, MBTI_DESCRIPTIONS } from '../constants';

const calculateMBTIScores = (answers: MBTIAnswer[]): MBTIScores => {
  const scores: MBTIScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  answers.forEach(answer => {
    const question = MBTI_QUESTIONS.find(q => q.id === answer.questionId);
    if (!question) return;

    // Scale: 1-3 for one pole, 4 neutral, 5-7 for other pole
    // Example: For E/I, if polePositive is 'E':
    // 7 (Strongly Agree with E statement) -> +3 E
    // 6 (Agree with E statement) -> +2 E
    // 5 (Slightly Agree with E statement) -> +1 E
    // 4 (Neutral) -> 0
    // 3 (Slightly Disagree with E statement = Slightly Agree with I) -> +1 I
    // 2 (Disagree with E statement = Agree with I) -> +2 I
    // 1 (Strongly Disagree with E statement = Strongly Agree with I) -> +3 I

    let scoreValue = 0;
    let targetPole: keyof MBTIScores;
    let oppositePole: keyof MBTIScores;

    if (question.dimension === 'E/I') { 
        targetPole = question.polePositive === 'E' ? 'E' : 'I';
        oppositePole = question.polePositive === 'E' ? 'I' : 'E';
    } else if (question.dimension === 'S/N') {
        targetPole = question.polePositive === 'S' ? 'S' : 'N';
        oppositePole = question.polePositive === 'S' ? 'N' : 'S';
    } else if (question.dimension === 'T/F') {
        targetPole = question.polePositive === 'T' ? 'T' : 'F';
        oppositePole = question.polePositive === 'T' ? 'F' : 'T';
    } else { // J/P
        targetPole = question.polePositive === 'J' ? 'J' : 'P';
        oppositePole = question.polePositive === 'J' ? 'P' : 'J';
    }
    
    if (answer.value > 4) scoreValue = answer.value - 4; // 1, 2, or 3
    else if (answer.value < 4) scoreValue = 4 - answer.value; // 1, 2, or 3
    
    if (answer.value > 4) scores[targetPole] += scoreValue;
    else if (answer.value < 4) scores[oppositePole] += scoreValue;

  });
  return scores;
};

const determineMBTIPersonalityType = (scores: MBTIScores): MBTIPersonalityType => {
  const EorI = scores.E >= scores.I ? 'E' : 'I';
  const SorN = scores.S >= scores.N ? 'S' : 'N';
  const TorF = scores.T >= scores.F ? 'T' : 'F';
  const JorP = scores.J >= scores.P ? 'J' : 'P';
  return `${EorI}${SorN}${TorF}${JorP}` as MBTIPersonalityType;
};

export const useMBTIStore = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<MBTIAnswer[]>([]);
  const [results, setResults] = useState<MBTIResultDetails | null>(null);

  const totalQuestions = MBTI_QUESTIONS.length;
  const currentQuestion = MBTI_QUESTIONS[currentQuestionIndex];
  const isCompleted = currentQuestionIndex >= totalQuestions;

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      if (existingAnswerIndex > -1) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = { questionId, value };
        return updatedAnswers;
      }
      return [...prev, { questionId, value }];
    });

    // Automatically move to next question after a brief delay
    setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else if (currentQuestionIndex === totalQuestions - 1) {
            // This is the last question, ensure isCompleted becomes true
            setCurrentQuestionIndex(prev => prev + 1); 
        }
    }, 300); // 300ms delay
  }, [currentQuestionIndex, totalQuestions]);

  const getCurrentAnswerValue = (questionId: string): number | undefined => {
    return answers.find(a => a.questionId === questionId)?.value;
  };
  
  const calculateResults = useCallback(() => {
    if (answers.length < totalQuestions) return; // Ensure all questions are answered in some way

    const finalScores = calculateMBTIScores(answers);
    const personalityType = determineMBTIPersonalityType(finalScores);
    const description = MBTI_DESCRIPTIONS[personalityType] || "No description available.";

    const breakdown = (['E/I', 'S/N', 'T/F', 'J/P'] as const).map(dim => {
      let poleA: keyof MBTIScores, poleB: keyof MBTIScores;
      if (dim === 'E/I') { poleA = 'E'; poleB = 'I'; }
      else if (dim === 'S/N') { poleA = 'S'; poleB = 'N'; }
      else if (dim === 'T/F') { poleA = 'T'; poleB = 'F'; }
      else { poleA = 'J'; poleB = 'P'; }
      
      return {
        dimension: dim,
        scores: { poleA: poleA as string, scoreA: finalScores[poleA], poleB: poleB as string, scoreB: finalScores[poleB] },
        preference: finalScores[poleA] >= finalScores[poleB] ? poleA as string : poleB as string
      };
    });

    setResults({ type: personalityType, description, breakdown });
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
    getCurrentAnswerValue,
  };
};
