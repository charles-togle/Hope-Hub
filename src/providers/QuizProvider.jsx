import { useRef } from 'react';
import { QuizzesData } from '@/utilities/QuizData';
import { shuffleArray } from '@/utilities/utils';
import { useParams } from 'react-router-dom';
import {
  QuestionsContext,
  IdentificationRefContext,
  RemainingTimeContext,
} from '@/providers/QuizContext';

export default function QuizProvider({ children }) {
  const identificationAnswerRef = useRef('');
  const remainingTimeRef = useRef(0);
  let { quizId } = useParams();

  let questions = QuizzesData.find(
    (quiz) => quiz.number.toString() === quizId,
  ).questions;

  questions = shuffleArray(questions); // shuffle questions
  questions = questions.map((question) => {
    if (question.type === 'identification') return question; // skip identification questions
    return {
      ...question,
      choices: shuffleArray(question.choices), // shuffle choices for each question
    };
  });

  return (
    <QuestionsContext.Provider value={questions}>
      <RemainingTimeContext.Provider value={remainingTimeRef}>
        <IdentificationRefContext.Provider value={identificationAnswerRef}>
          {children}
        </IdentificationRefContext.Provider>
      </RemainingTimeContext.Provider>
    </QuestionsContext.Provider>
  );
}
