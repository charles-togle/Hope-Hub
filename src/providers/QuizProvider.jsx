import { useRef, useState, useEffect } from 'react';
import {
  extractQuizState,
  fetchQuizQuestions,
  fetchQuizStateIfExists,
} from '@/utilities/QuizData';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import {
  QuestionsContext,
  IdentificationRefContext,
  RemainingTimeContext,
  QuizContext,
} from '@/providers/QuizContext';

export default function QuizProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [quizState, setQuizState] = useState(null);
  const identificationAnswerRef = useRef('');
  const remainingTimeRef = useRef(0);
  const { quizId } = useParams();

  useEffect(() => {
    async function fetchAndSetQuizQuestions(quizId) {
      const questions = await fetchQuizQuestions(quizId);

      const extractedQuizState = extractQuizState(
        await fetchQuizStateIfExists(quizId),
      );

      if (extractedQuizState.remainingTime === 0)
        extractedQuizState.remainingTime = questions[0].duration;

      // console.log('updatedQUestions', updatedQuestions);
      // console.log('questions', updatedQuestions);

      // const shuffledQuestions = shuffleArray(updatedQuestions); // shuffle the questions

      // shuffledQuestions.map((question) => {
      //   if (question.type === 'identification') return question; // skip identification questions
      //   return {
      //     ...question,
      //     choices: shuffleArray(question.choices), // shuffle choices for each question
      //   };
      // });

      setQuizState(extractedQuizState);
      setQuestions(questions);
      setIsLoading(false);
    }

    fetchAndSetQuizQuestions(quizId);
  }, [quizId]);

  // let questions = QuizzesData.find(
  //   (quiz) => quiz.number.toString() === quizId,
  // ).questions;

  return (
    <QuizContext.Provider value={{ quizState, setQuizState }}>
      <QuestionsContext.Provider value={questions}>
        <RemainingTimeContext.Provider value={remainingTimeRef}>
          <IdentificationRefContext.Provider value={identificationAnswerRef}>
            {isLoading ? (
              <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin text-primary-blue" size={48} />
              </div>
            ) : (
              children
            )}
          </IdentificationRefContext.Provider>
        </RemainingTimeContext.Provider>
      </QuestionsContext.Provider>
    </QuizContext.Provider>
  );
}
