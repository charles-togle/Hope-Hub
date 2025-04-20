import PageHeading from '@/components/PageHeading';
import { usePhysicalFitnessData } from '@/hooks/usePhysicalFitnessData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertMessage } from '@/components/AlertMessage';

export default function PhysicalActivityReadinessQuestionnaire() {
  const { physicalFitnessData, setPhysicalFitnessData } =
    usePhysicalFitnessData();
  const [areAllAnswersYes, setAreAllAnswersYes] = useState(false);
  const [areAllAnswered, setAreAllAnswered] = useState(false);
  const [areAllUserDataFilled, setAreAllUserDataFilled] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [answers, setAnswers] = useState(Array(6).fill(null));
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (areAllAnswered && areAllAnswersYes && areAllUserDataFilled) {
      setPhysicalFitnessData((prev) => ({
        ...prev,
        isPARQFinished: false,
      }));
    }
  }, [
    areAllAnswered,
    areAllAnswersYes,
    setPhysicalFitnessData,
    areAllUserDataFilled,
  ]);

  const questions = [
    'Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?',
    'Do you feel pain in your chest when you do physical activity?',
    'In the past month, have you had chest pain when you were not doing physical activity?',
    'Do you have a bone or joint problem that could be made worse by a change in your physical activity?',
    'Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?',
    'Do you know of any other reason why you should not do physical activity? if yes ? please include reason.',
  ];

  const handleAnswerChange = (index, value) => {
    const currentAnswers = [...answers];
    currentAnswers[index] = value;
    const allYes = currentAnswers.every((answer) => answer === 'Yes');
    const allAnswered = currentAnswers.every((answer) => answer !== null);
    setAnswers(currentAnswers);
    setAreAllAnswersYes(allYes);
    setAreAllAnswered(allAnswered);
  };

  const handleSubmit = () => {
    setErrorMessage('');
    if (
      areAllAnswered &&
      areAllAnswersYes &&
      areAllUserDataFilled &&
      isEmailValid
    ) {
      const updatedData = {
        ...physicalFitnessData,
        isPARQFinished: true,
      };
      console.log('Data sent to backend:', updatedData);
      setPhysicalFitnessData(updatedData);
      navigate('/physical-fitness-test/test/1');
    } else {
      console.log('Conditions not met:', {
        areAllAnswered,
        areAllAnswersYes,
        areAllUserDataFilled,
      });
      if (!areAllAnswered) {
        setErrorMessage('Make sure to answer all questions');
      } else if (!areAllAnswersYes) {
        setErrorMessage(
          'You currently cannot take the Physical Fitness Test, try again a different time',
        );
      } else if (!areAllUserDataFilled) {
        setErrorMessage('Please complete Student/User Data');
      } else if (!isEmailValid) {
        setErrorMessage('Please enter a valid email address');
      }
      setIsError(true);
    }
  };

  const isNullOrWhiteSpace = (input) => {
    return !input || input.trim().length === 0;
  };

  const handleInformationChange = (keyName, value) => {
    if (keyName === 'email' && !emailRegex.test(value.trim())) {
      setIsEmailValid(false);
      return;
    } else {
      setIsEmailValid(true);
    }
    setPhysicalFitnessData((prev) => ({
      ...prev,
      [keyName]: value,
    }));
    setAreAllUserDataFilled(() =>
      ['name', 'gender', 'email', 'category'].every(
        (key) => physicalFitnessData[key] !== !isNullOrWhiteSpace,
      ),
    );
  };

  return (
    <div
      id="physical-fitness-test-parq"
      className="w-full min-h-screen max-h-fit"
    >
      {isError && (
        <AlertMessage
          text={errorMessage}
          onConfirm={() => setIsError(false)}
          onCancel={() => setIsError(false)}
        ></AlertMessage>
      )}
      <PageHeading text="Physical Fitness Test"></PageHeading>
      <div
        id="physical-fitness-test-parq-container"
        className="w-[80%] mr-auto  ml-auto pt-[5%] flex flex-col items-center justify-center"
      >
        <h2 id="heading" className="font-heading text-3xl self-start! w-full">
          Physical Activity Readiness Questionnaire (PAR-Q)
        </h2>
        <hr className="border-1 border-primary-yellow yellow w-[20%] self-start mt-2" />
        <div
          id="physical-fitness-test-parq-content"
          className="apply-drop-shadow w-full flex flex-col justify-center items-center mt-10 font-content text-lg space-y-5"
        >
          <div id="instructions" className="w-[95%]">
            <p>Directions</p>
            <hr className="mb-7" />
            <ol className="list-decimal ml-7">
              <li>
                Take the Physical Activity Readiness Questionnaire (PAR-Q).
              </li>
              <li>
                Be honest in all your answers. <br />
                <br /> If you answered YES to one or more questions and have
                been inactive or concern about your health, consult a physician
                before taking a fitness test or substantially increasing your
                physical activity. <br />
                <br /> If you answered NO to all the PAR-Q questions, you can be
                reasonably sure that you can exercise safely and have a low risk
                of having any medical complications from exercise.
              </li>
            </ol>
          </div>
          <div
            id="information"
            className="w-[95%] min-h-10 flex flex-col space-y-2"
          >
            <label>
              <p>
                Full Name:
                <span className="text-accent-gray">
                  {' '}
                  (Surname, First Name, M.I. ex. Dela Cruz, Juan A.)
                </span>
              </p>
              <input
                type="text"
                onChange={(e) =>
                  handleInformationChange('name', e.target.value)
                }
                className="border-1 border-[#8B8989] w-full font-content px-1 rounded-sm mt-0.5"
              />
            </label>
            <div className="flex flex-row space-x-5">
              <p>Gender</p>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) =>
                    handleInformationChange('gender', e.target.value)
                  }
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) =>
                    handleInformationChange('gender', e.target.value)
                  }
                />
                Female
              </label>
            </div>
            <label>
              <p>
                Email:{' '}
                <span className="text-accent-gray">
                  {' '}
                  (ex. juan_delacruz@email.com)
                </span>
              </p>
              <input
                type="email"
                onChange={(e) =>
                  handleInformationChange('email', e.target.value)
                }
                className="border-1 border-[#8B8989] w-full font-content px-1 rounded-sm mt-0.5 not-valid:border-red"
              />
            </label>
            <label>
              <p>Age:</p>
              <select
                onChange={(e) =>
                  handleInformationChange('category', e.target.value)
                }
                className="border-1 border-[#8B8989]! w-full font-content px-1 rounded-sm mt-0.5"
              >
                <option disabled> --Select one option--</option>
                <option value="elementary-boy">
                  Boy (Elementary 5-12 yrs old)
                </option>
                <option value="elementary-girl">
                  Girl (Elementary 5-12 yrs old)
                </option>
                <option value="secondary-boy">
                  Boy (High School 13-18 yrs old)
                </option>
                <option value="secondary-girl">
                  Girl (High School 13-18 yrs old)
                </option>
              </select>
            </label>
          </div>
          <div id="questions" className="w-[95%] min-h-10">
            <p>PHYSICAL ACTIVITY READINESS QUESTIONNAIRE (PAR-Q)</p>
            <hr className="mb-7" />
            <ol className="list-decimal ml-7">
              {questions.map((question, index) => (
                <li key={index} className="mb-4">
                  {question}
                  <div className="flex flex-col mt-2">
                    <label>
                      <input
                        type="radio"
                        name={`radioQuestion${index}`}
                        value={'Yes'}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`radioQuestion${index}`}
                        value={'No'}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                      />
                      No
                    </label>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div
            id="button-container"
            className="w-[95%] drop-shadow-none! border-0! flex justify-end p-0! mb-5"
          >
            <button
              className="px-10 py-3 bg-secondary-dark-blue text-white"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
