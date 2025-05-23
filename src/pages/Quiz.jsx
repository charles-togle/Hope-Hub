import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QuizzesData } from '@/utilities/QuizAndActivities';
import PageHeading from '@/components/PageHeading';
import Timer from '@/components/quiz/Timer';
import QuizBackground from '@/assets/images/quiz_bg.png';
import { Input } from '@/components/ui/input';
import { shuffleArray } from '@/utilities/utils';
import CustomButton from '@/components/quiz/CustomButton';
import { IdentificationRefContext } from '@/contexts/IdentificationRefContext';
import QuizProvider from '@/providers/QuizProvider';

const sampleQuizQuestions = [
  {
    type: 'multiple-choice',
    duration: '10',
    question: 'What is the capital of France?',
    choices: [
      { text: 'Paris', isCorrect: true },
      { text: 'Madrid', isCorrect: false },
      { text: 'Berlin', isCorrect: false },
      { text: 'Rome', isCorrect: false },
    ],
  },
  {
    type: 'identification',
    duration: '10',
    question: 'What is the capital of Spain?',
    answer: 'Madrid',
  },
  {
    type: 'multiple-choice',
    duration: '10',
    question: 'What is the capital of Germany?',
    choices: [
      { text: 'Madrid', isCorrect: false },
      { text: 'Paris', isCorrect: false },
      { text: 'Rome', isCorrect: false },
      { text: 'Berlin', isCorrect: true },
    ],
  },
  {
    type: 'multiple-choice',
    duration: '10',
    question: 'What is the capital of Italy?',
    choices: [
      { text: 'Madrid', isCorrect: false },
      { text: 'Berlin', isCorrect: false },
      { text: 'Rome', isCorrect: true },
      { text: 'Paris', isCorrect: false },
    ],
  },
  {
    type: 'identification',
    duration: '10',
    question: 'What is the capital of Portugal?',
    answer: 'Lisbon',
  },
];

const sampleQuestionsResult = [
  {
    question: 'What is the capital of France?',
    answer: 'Madrid',
    isCorrect: false,
  },
  {
    question: 'What is the capital of Spain?',
    answer: 'Cairo',
    isCorrect: false,
  },
  {
    question: 'What is the capital of Germany?',
    answer: 'Berlin',
    isCorrect: true,
  },
  {
    question: 'What is the capital of Italy?',
    answer: 'Rome',
    isCorrect: true,
  },
  {
    question: 'What is the capital of Portugal?',
    answer: 'Manila',
    isCorrect: false,
  },
];

const sampleLeaderboardNames = [
  { name: 'Togle, Charles Nathaniel', points: 1003 },
  { name: 'Villarica, Amrafel Marcus', points: 1002 },
  { name: 'Picao, Mark Kevin ', points: 1001 },
  { name: 'Casiano, Justine', points: 1000 },
  { name: 'San Jose, Alexa Joanne', points: 999 },
];

export default function Quiz() {
  return (
    <QuizProvider>
      <QuizPage />
    </QuizProvider>
  );
}

export function QuizPage() {
  let { quizId } = useParams();
  let questions = QuizzesData.find(
    (quiz) => quiz.number.toString() === quizId,
  ).questions; // data for prod
  // let questions = sampleQuizQuestions; // data for test

  const [quizState, setQuizState] = useState({
    quizId: quizId,
    questionIndex: 0,
    score: 0,
    questions: [], // data for prod
    // questions: sampleQuestionsResult,
    // status: 'completed', // data for test
    status: 'in progress', // data for prod
  });

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

    if (quizState.questionIndex <= questions.length - 1) {
      setQuizState((prevQuizState) => {
        return {
          ...prevQuizState,
          questionIndex: prevQuizState.questionIndex + 1,
          score: prevQuizState.score + (isCorrect ? 1 : 0),
          questions: [
            ...prevQuizState.questions,
            {
              question: questions[prevQuizState.questionIndex].question,
              correctAnswer: correctAnswer,
              answer: answer,
              isCorrect: isCorrect,
            },
          ],
        };
      });
    }

    if (quizState.questionIndex === questions.length - 1) {
      setQuizState((prevQuizState) => {
        return {
          ...prevQuizState,
          questionIndex: prevQuizState.questionIndex - 1,
          status: 'completed',
        };
      });
    }
  }

  const isIdentification =
    questions[quizState.questionIndex].type === 'identification';
  const identificationAnswerRef = useContext(IdentificationRefContext);

  return (
    <div>
      <PageHeading
        text="Quizzes & Activities"
        className="bg-background z-2"
      ></PageHeading>
      <div id="quiz-1" className="flex flex-col w-5/6 mx-auto mb-4">
        <div className="flex items-start justify-between pt-8">
          <div>
            <h2 className="font-heading-small text-3xl text-primary-blue ">
              {quizState.status === 'in progress'
                ? `Quiz #${quizId}: Lecture #${quizId}`
                : 'Results & Summary'}
            </h2>
            <hr className="w-[60%] border-1 border-primary-yellow mt-2 mb-3" />
          </div>
          {quizState.status === 'in progress' && (
            <Timer
              key={quizState.questionIndex}
              duration={questions[quizState.questionIndex].duration}
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
        {quizState.status === 'in progress' ? (
          <QuizBody
            index={quizState.questionIndex}
            question={questions[quizState.questionIndex]}
            score={quizState.score}
            handleAnswer={onAnswerSelected}
          />
        ) : (
          <Results questions={questions} quizState={quizState} />
        )}
      </div>
    </div>
  );
}

function QuizBody({ index, question, score, handleAnswer }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      <div className="rounded-t-full border-2 border-secondary-dark-blue py-4 px-14 relative top-3">
        <span className="font-content text-2xl">Score: {score}</span>
      </div>
      <div
        className="flex flex-col justify-center items-center rounded-2xl w-full min-h-[90vh] z-10 bg-cover bg-center bg-no-repeat 
        p-10 text-2xl text-white font-content"
        style={{ backgroundImage: `url(${QuizBackground})` }}
      >
        <h3 className="my-7 text-3xl">{index + 1}/10</h3>
        <p className="w-[80%] text-center">{question.question}</p>
        <hr className="w-[75%] border-1 border-white mt-8 mb-4" />
        {question.type === 'identification' ? (
          <Identification handleAnswer={handleAnswer} />
        ) : (
          <MultipleChoice
            choices={question.choices}
            handleAnswer={handleAnswer}
          />
        )}
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
  choices = shuffleArray(choices);

  return (
    <div className="flex flex-wrap justify-center w-full h-full mt-3">
      {choices.map((choice, index) => (
        <CustomButton
          key={index + choice.text}
          onClick={() => handleAnswer(choice)}
          className={`rounded-md w-[45%] min-h-[20vh] text-center m-3 px-6 py-6 text-balance break-words text-xl `}
          style={{ backgroundColor: colors[index] }}
        >
          <span>{choice.text}</span>
        </CustomButton>
      ))}
    </div>
  );
}

function Results({ questions, quizState }) {
  return (
    <div className="w-[70%] flex flex-col items-center justify-center text-black font-content mx-auto">
      <div className="rounded-2xl mt-8 mb-6 py-8 text-base border-2 border-black w-full">
        <div className="relative w-full flex flex-col items-center justify-center border-t-2 border-black">
          <div className="w-[55%] bg-white absolute -top-3 left-1/2 -translate-x-1/2 ">
            <h3 className="w-fit mx-auto font-semibold text-2xl text-center border-b-[0.8px] border-black px-6">
              Summary
            </h3>
          </div>
          <h3 className="text-lg mt-9">
            Quiz #{quizState.quizId} Lecture #{quizState.quizId}
          </h3>
          <h2 className="text-2xl font-semibold border-b-2 border-black px-3 pb-4 mt-4">
            You aced, keep shining!
          </h2>
          <div className="flex items-center justify-between mt-5 mb-4 w-[55%]">
            <div>
              <h1 className="text-2xl font-semibold border-b-2 border-black px-2">
                Score:
              </h1>
            </div>
            <div className="rounded-xl border-2 border-black py-5 px-30">
              <h1 className="text-4xl font-bold">
                {quizState.score}/{quizState.questions.length}
              </h1>
            </div>
          </div>
          <hr className="w-[75%] border-1 border-black mt-3 mb-4" />
          <h3 className="text-lg">Performance Stats</h3>
          <div className="flex items-center justify-between mt-3 w-[70%]">
            <div className="flex flex-col items-center justify-center text-green py-3 px-25 rounded-xl border-2 border-black">
              <h3 className="text-2xl font-bold">{quizState.score}</h3>
              <h3>Correct</h3>
            </div>
            <div className="flex flex-col items-center justify-center text-red py-3 px-25 rounded-xl border-2 border-black">
              <h3 className="text-2xl font-bold">
                {quizState.questions.length - quizState.score}
              </h3>
              <h3>Incorrect</h3>
            </div>
          </div>
          <hr className="w-[40%] border-1 border-black mt-8 mb-5" />
        </div>
        <div className="border-t-2 border-black pt-4 relative w-full mt-10 text-lg">
          <h3 className="w-[40%] absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-center font-bold text-xl">
            Leaderboard
          </h3>
          <div className="mt-6">
            {sampleLeaderboardNames
              .sort((a, b) => b.points - a.points)
              .map((user, index) => (
                <LeaderboardName
                  key={index + user.name}
                  rank={index + 1}
                  user={user}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="self-baseline my-3">
        <h4 className="font-semibold text-xl">Review Questions</h4>
        <h4 className="text-lg">Here lies all the correct answers.</h4>
      </div>
      {quizState.questions.map((questionData, index) => {
        return (
          <ResultQuestion
            key={index + questionData.question}
            index={index}
            questionData={questionData}
            questions={questions}
          />
        );
      })}
    </div>
  );
}

function LeaderboardName({ rank, user }) {
  return (
    <div>
      <div className="flex flex-col justify-between gap-y-2 w-[70%] mx-auto font-medium">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <h3>{rank}</h3>
            <h3>{user.name}</h3>
          </div>
          <h3>{user.points.toLocaleString()} pts</h3>
        </div>
      </div>
    </div>
  );
}

function ResultQuestion({ index, questionData, questions }) {
  const selectedColor = questionData.isCorrect ? 'bg-green' : 'bg-red';

  return (
    <div
      className={`rounded-xl border-2 ${
        questionData.isCorrect ? 'border-green' : 'border-red'
      } py-5 px-8 my-4 w-full`}
    >
      <p>
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
          {questions[index].choices.map((choice, i) => {
            return (
              <div key={i + choice.text} className="flex items-center gap-x-2">
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
