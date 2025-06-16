import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeading from '@/components/PageHeading';
import Timer from '@/components/quiz/Timer';
import QuizBackground from '@/assets/images/quiz_bg.png';
import { Input } from '@/components/ui/input';
import { calculatePoints } from '@/utilities/utils';
import CustomButton from '@/components/quiz/CustomButton';
import QuizProvider from '@/providers/QuizProvider';
import AudioPlayer from '@/components/quiz/AudioPlayer';
import audioFile from '@/assets/sounds/quizziz-in-game-theme.mp3';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
import {
  QuestionsContext,
  IdentificationRefContext,
  RemainingTimeContext,
  QuizContext,
} from '@/providers/QuizContext';
import {
  fetchLeaderboard,
  markQuizAsDone,
  submitAnswer,
} from '@/utilities/QuizData';
import { useEffect } from 'react';

const sampleLeaderboardNames = [
  { name: 'Togle, Charles Nathaniel', points: 1003 },
  { name: 'Villarica, Amrafel Marcus', points: 1002 },
  { name: 'Picao, Mark Kevin ', points: 1001 },
  { name: 'Casiano, Justine', points: 1000 },
  { name: 'San Jose, Alexa Joanne', points: 999 },
];

export default function Quiz() {
  return (
    <div>
      <PageHeading text="Quizzes" className="bg-background z-2"></PageHeading>
      <QuizProvider>
        <QuizPage />
      </QuizProvider>
    </div>
  );
}

export function QuizPage() {
  let { quizId } = useParams();
  const remainingTimeRef = useContext(RemainingTimeContext);
  const identificationAnswerRef = useContext(IdentificationRefContext);
  const questions = useContext(QuestionsContext);
  const { quizState, setQuizState } = useContext(QuizContext);

  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowPoints, setShouldShowPoints] = useState(false);

  console.log('questions: ', questions); // access quizId
  console.log('quiz state: ', quizState);
  console.log('questions answered: ', quizState.questionsAnswered);
  console.log('leaderboard: ', leaderboard);

  // const [quizState, setQuizState] = useState({
  //   quizId: quizId,
  //   questionIndex: 0,
  //   score: 0,
  //   points: 0,
  //   currentQuestionPoints: 0,
  //   // status: '', // should be fetched from the database in prod
  //   // status: 'Done', // data for test
  //   status: 'Pending', // data for test
  //   // questionsAnswered: sampleQuestionsResult,
  //   questionsAnswered: [], // data for prod
  // });

  function onAnswerSelected(answer, multipleChoice = true) {
    let correctAnswer = questions[quizState.questionIndex].answer;
    let isCorrect = false;

    if (multipleChoice) {
      correctAnswer = questions[quizState.questionIndex].choices.find(
        (choice) => choice.isCorrect,
      ).text;
      if (answer.isCorrect) isCorrect = true;
      answer = answer.text;
    } else {
      if (
        answer.trim().toLowerCase() ===
        questions[quizState.questionIndex].answer.toLowerCase()
      )
        isCorrect = true;
    }

    let pointsEarnedForCurrentQuestion = calculatePoints(
      isCorrect,
      remainingTimeRef.current,
      questions[quizState.questionIndex].duration,
    );

    setQuizState({
      ...quizState,
      currentQuestionPoints: pointsEarnedForCurrentQuestion,
    });
    setShouldShowPoints(true);

    let newQuizState = {
      ...quizState,
      questionIndex: quizState.questionIndex + 1,
      score: quizState.score + (isCorrect ? 1 : 0),
      points: quizState.points + pointsEarnedForCurrentQuestion,
      remainingTime: questions[0].duration, // reset remaining time after answering
      questionsAnswered: [
        ...quizState.questionsAnswered,
        {
          question: questions[quizState.questionIndex].question,
          correctAnswer: correctAnswer,
          answer: answer,
          isCorrect: isCorrect,
        },
      ],
    };

    if (quizState.questionIndex <= questions.length - 1) {
      setTimeout(async () => {
        setShouldShowPoints(false);
        setIsLoading(true);
        let error = await submitAnswer(newQuizState);

        if (newQuizState.questionIndex === questions.length) {
          newQuizState = {
            ...newQuizState,
            questionIndex: newQuizState.questionIndex - 1,
            status: 'Done',
          };

          error = await markQuizAsDone(newQuizState);
        }

        // console.log('quizState from submitAnswer: ', quizState);
        // console.log('data from submitAnswer: ', data);
        if (!error) {
          console.log('no errors');
          setQuizState(newQuizState);
          setIsLoading(false);
        }
      }, 1000);
    }

    // if (quizState.questionIndex === questions.length - 1) {
    //   const newQuizState = {
    //     ...quizState,
    //     questionIndex: quizState.questionIndex - 1,
    //     status: 'Done',
    //   };

    //   setTimeout(async () => {
    //     setIsLoading(true);
    //     const error = await markQuizAsDone(newQuizState);
    //     if (!error) {
    //       setQuizState(newQuizState);
    //     }
    //   }, 1000);
    // }
  }

  useEffect(() => {
    async function fetchAndSetLeaderboard() {
      setLeaderboard(await fetchLeaderboard(quizId));
    }

    fetchAndSetLeaderboard();
  }, [quizId, quizState.status]);

  console.log('leaderboard because quiz is done: ', leaderboard);

  const isIdentification =
    questions.length !== quizState.questionIndex &&
    questions[quizState.questionIndex].type === 'identification'
      ? true
      : false;

  return (
    <div>
      <AudioPlayer source={audioFile} shouldStop={quizState.status === 'Done'}>
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh] p-4">
            <Loader2 className="animate-spin text-primary-yellow" size={48} />
          </div>
        ) : (
          <div>
            <div id="quiz-1" className="flex flex-col w-5/6 mx-auto mb-4">
              <div className="flex items-start justify-between pt-8">
                <div>
                  <h2 className="font-heading-small text-3xl text-primary-blue ">
                    {quizState.status === 'Pending'
                      ? `Quiz #${quizId}: Lecture #${quizId}`
                      : 'Results & Summary'}
                  </h2>
                  <hr className="w-[60%] border-1 border-primary-yellow mt-2 mb-3" />
                </div>
                {quizState.status === 'Pending' && (
                  <Timer
                    key={quizState.questionIndex}
                    duration={
                      shouldShowPoints
                        ? remainingTimeRef.current
                        : quizState.remainingTime
                    }
                    color={'red'}
                    onTimerEnd={() => {
                      onAnswerSelected(
                        isIdentification ? identificationAnswerRef.current : '',
                        isIdentification ? false : true,
                      );
                      identificationAnswerRef.current = '';
                    }}
                  />
                )}
              </div>
              {quizState.status === 'Pending' ? (
                <QuizBody
                  key={quizState.questionIndex}
                  index={quizState.questionIndex}
                  question={questions[quizState.questionIndex]}
                  score={quizState.score}
                  handleAnswer={onAnswerSelected}
                  totalItems={questions.length}
                  showPoints={shouldShowPoints}
                  points={quizState.currentQuestionPoints}
                />
              ) : (
                <Results
                  questions={questions}
                  quizState={quizState}
                  leaderboard={leaderboard}
                />
              )}
            </div>
          </div>
        )}
      </AudioPlayer>
    </div>
  );
}

function QuizBody({
  index,
  question,
  score,
  handleAnswer,
  totalItems,
  showPoints,
  points,
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      <div className="rounded-t-full border-2 border-secondary-dark-blue py-4 px-14 relative top-3">
        <span className="font-content text-2xl">Score: {score}</span>
      </div>
      <div
        className="flex flex-col justify-center items-center rounded-2xl w-full min-h-[90vh] z-10 bg-cover bg-center bg-no-repeat 
          p-10 text-2xl text-white font-content relative"
        style={{ backgroundImage: `url(${QuizBackground})` }}
      >
        <h3 className="my-7 text-3xl">
          {index + 1}/{totalItems}
        </h3>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            {showPoints && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 bg-[rgba(0,0,0,0.5)] rounded-2xl"
              >
                <motion.span
                  className="text-green-500 text-8xl font-bold drop-shadow-lg"
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  +{points} points!
                </motion.span>
              </motion.div>
            )}
            <p className="w-[80%] text-center whitespace-pre-line">
              {question.question}
            </p>
            <hr className="w-[75%] border-1 border-white mt-8 mb-4" />
            {question.type === 'identification' ? (
              <Identification handleAnswer={handleAnswer} />
            ) : (
              <MultipleChoice
                choices={question.choices}
                handleAnswer={handleAnswer}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Identification({ handleAnswer }) {
  const [identificationAnswer, setIdentificationAnswer] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const identificationAnswerRef = useContext(IdentificationRefContext);

  function onChange(e) {
    setIdentificationAnswer(e.target.value);
    identificationAnswerRef.current = e.target.value;
  }

  return (
    <div className="w-[70%] flex mt-5 justify-between items-center">
      <Input
        className="rounded-sm w-[80%] h-full text-left bg-white text-black !text-lg border-2 border-black py-2 px-10 placeholder:text-left"
        type="text"
        placeholder="Answer"
        onChange={(e) => onChange(e)}
        value={identificationAnswer}
      />
      <CustomButton
        disabled={isDisabled}
        onClick={() => {
          if (identificationAnswer.trim() !== '') {
            setIsDisabled(true);
            handleAnswer(identificationAnswer, false);
          }
        }}
        className="bg-secondary-dark-blue text-white font-content text-lg px-8 py-2"
      >
        SUBMIT
      </CustomButton>
    </div>
  );
}

function MultipleChoice({ choices, handleAnswer }) {
  const colors = ['#FFB24E', '#FF3B30', '#A16BFF', '#34C759'];
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="flex flex-wrap justify-center w-full h-full mt-3">
      {choices.map((choice, index) => (
        <CustomButton
          key={index + choice.text}
          disabled={isDisabled}
          onClick={() => {
            setIsDisabled(true);
            handleAnswer(choice);
          }}
          className={`rounded-md w-[45%] min-h-[20vh] text-center m-3 px-6 py-6 text-balance break-words text-xl `}
          style={{ backgroundColor: colors[index] }}
        >
          <span>{choice.text}</span>
        </CustomButton>
      ))}
    </div>
  );
}

function Results({ questions, quizState, leaderboard }) {
  console.log('this was rebuilt');
  console.log('leaderboards for results', leaderboard);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[70%] flex flex-col items-center justify-center text-black font-content mx-auto"
      >
        <div className="rounded-2xl mt-8 mb-6 py-8 text-base border-2 border-black w-full bg-[linear-gradient(180deg,#111C4E_0%,#003D69_100%)]">
          <div className="relative w-full flex flex-col items-center justify-center border-t-2 border-white text-white">
            <div className="w-[55%] bg-[#111C4E] absolute -top-3 left-1/2 -translate-x-1/2 ">
              <h3 className="w-fit mx-auto font-semibold text-2xl text-center border-b-[0.8px] border-white px-6">
                Summary
              </h3>
            </div>
            <h3 className="text-lg mt-9">
              Quiz #{quizState.quizId} Lecture #{quizState.quizId}
            </h3>
            <h2 className="text-2xl font-semibold border-b-2 border-white px-3 pb-4 mt-4">
              You aced, keep shining!
            </h2>
            <div className="flex items-center justify-between mt-5 mb-4 w-[55%]">
              <div>
                <h1 className="text-2xl font-semibold border-b-2 border-white px-2">
                  Score:
                </h1>
              </div>
              <div className="rounded-xl border-2 border-white py-5 px-30 bg-[#000A3A]">
                <motion.h1
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-4xl font-bold"
                >
                  {quizState.score}/{quizState.questionsAnswered.length}
                </motion.h1>
              </div>
            </div>
            <hr className="w-[75%] border-1 border-white mt-3 mb-4" />
            <h3 className="text-lg">Performance Stats</h3>
            <div className="flex items-center justify-between mt-3 w-[70%]">
              <div className="flex flex-col items-center justify-center text-green py-3 px-25 rounded-xl border-2 border-white  bg-[#000A3A]">
                <motion.h3
                  animate={{
                    rotate: [-3, 3, -3, 3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-2xl font-bold"
                >
                  {quizState.score}
                </motion.h3>
                <motion.h3
                  animate={{
                    rotate: [-3, 3, -3, 3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Correct
                </motion.h3>
              </div>
              <div className="flex flex-col items-center justify-center text-red py-3 px-25 rounded-xl border-2 border-white bg-[#000A3A]">
                <motion.h3
                  animate={{
                    rotate: [-3, 3, -3, 3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-2xl font-bold"
                >
                  {quizState.questionsAnswered.length - quizState.score}
                </motion.h3>
                <motion.h3
                  animate={{
                    rotate: [-3, 3, -3, 3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Incorrect
                </motion.h3>
              </div>
            </div>
            <hr className="w-[40%] border-1 border-white mt-8 mb-5" />
          </div>
          <div className="pt-4 relative w-full mt-8 text-lg text-white">
            <div className="flex items-center justify-between relative">
              <hr className="w-[30%] border-1 border-white" />
              <h3 className="w-[40%] absolute -top-4 left-1/2 -translate-x-1/2 text-center font-bold text-xl">
                Leaderboard
              </h3>
              <hr className="w-[30%] border-1 border-white" />
            </div>
            <div className="mt-6">
              {leaderboard.map((user, index) => (
                <LeaderboardName key={index + user.name} user={user} />
              ))}
            </div>
          </div>
        </div>
        <div className="self-baseline my-3">
          <h4 className="font-semibold text-xl">Review Questions</h4>
          <h4 className="text-lg">Here lies all the correct answers.</h4>
        </div>
        {quizState.questionsAnswered.map((questionData, index) => {
          return (
            <ResultQuestion
              key={index + questionData.question}
              index={index}
              questionData={questionData}
              questions={questions}
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

function LeaderboardName({ user }) {
  console.log('leaderboards name');
  return (
    <div>
      <div className="flex flex-col justify-between gap-y-2 w-[70%] mx-auto font-medium">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <h3>{user.rank}</h3>
            <h3>{user.name}</h3>
          </div>
          <h3>{user.points} pts</h3>
        </div>
      </div>
    </div>
  );
}

function ResultQuestion({ index, questionData, questions }) {
  console.log('questions length', questions.length);
  console.log('index', index);
  console.log('questions:', questions);
  const selectedColor = questionData.isCorrect ? 'bg-green' : 'bg-red';

  return (
    <div
      className={`rounded-xl border-2 ${
        questionData.isCorrect ? 'border-green' : 'border-red'
      } py-5 px-8 my-4 w-full`}
    >
      <p className="whitespace-pre-line">
        {index + 1}. {questionData.question}
      </p>
      <hr className="border-1 border-black/30 my-3" />
      {questions[index].type === 'identification' ? (
        <div className="my-1">
          <div className="flex items-center gap-x-2">
            <div
              className={`w-[15px] h-[15px] rounded-full shrink-0 ${
                questionData.answer.trim() === ''
                  ? 'bg-[#D9D9D9]'
                  : selectedColor
              }`}
            ></div>
            <h3>Your answer: {questionData.answer}</h3>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-baseline gap-y-2 my-3">
          {questions
            .find((q) => q.question === questionData.question)
            .choices.map((choice, i) => {
              return (
                <div
                  key={i + choice.text}
                  className="flex items-center gap-x-2"
                >
                  <div
                    className={`w-[15px] h-[15px] rounded-full shrink-0 ${
                      choice.text === questionData.answer
                        ? selectedColor
                        : 'bg-[#D9D9D9]'
                    }`}
                  ></div>
                  <p>{choice.text}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
