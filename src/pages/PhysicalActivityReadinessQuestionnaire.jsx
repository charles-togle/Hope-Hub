import PageHeading from '@/components/PageHeading';
import { usePhysicalFitnessData } from '@/hooks/usePhysicalFitnessData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertMessage } from '@/components/utilities/AlertMessage';
import setDataToStorage from '@/utilities/setDataToStorage';
import { useUserId } from '@/hooks/useUserId';
import supabase from '@/client/supabase';
export default function PhysicalActivityReadinessQuestionnaire () {
  const { physicalFitnessData, setPhysicalFitnessData } =
    usePhysicalFitnessData();
  const [areAllAnswersNo, setAreAllAnswersNo] = useState(false);
  const [areAllAnswered, setAreAllAnswered] = useState(false);
  const [areAllUserDataFilled, setAreAllUserDataFilled] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [answers, setAnswers] = useState(Array(6).fill(null));
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userId = useUserId();

  useEffect(() => {
    if (areAllAnswered && areAllAnswersNo && areAllUserDataFilled) {
      setPhysicalFitnessData(prev => ({
        ...prev,
        isPARQFinished: false,
      }));
    }
  }, [
    areAllAnswered,
    areAllAnswersNo,
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
    const allNo = currentAnswers.every(answer => answer === 'No');
    const allAnswered = currentAnswers.every(answer => answer !== null);
    setAnswers(currentAnswers);
    setAreAllAnswersNo(allNo);
    setAreAllAnswered(allAnswered);
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    if (
      areAllAnswered &&
      areAllAnswersNo &&
      areAllUserDataFilled &&
      isEmailValid
    ) {
      const updatedData = {
        ...physicalFitnessData,
        isPARQFinished: true,
      };
      setPhysicalFitnessData(updatedData);
      setDataToStorage('physicalFitnessData', updatedData);

      if (!userId) {
        setErrorMessage('User not found.');
        setIsError(true);
        return;
      }
      // Fetch existing test record
      const { data: existing, error: fetchError } = await supabase
        .from('physical_fitness_test')
        .select('pre_physical_fitness_test, post_physical_fitness_test')
        .eq('uuid', userId)
        .single();
      let testType = '';
      if (fetchError) {
        setErrorMessage('Error fetching test record: ' + fetchError.message);
        setIsError(true);
        return;
      }
      console.log(existing);
      const preFinished =
        existing?.pre_physical_fitness_test?.finishedTestIndex || [];
      const postFinished =
        existing?.post_physical_fitness_test?.finishedTestIndex || [];
      const max = Math.max(preFinished.length, postFinished.length);
      if (!preFinished.includes(max - 1)) {
        testType = 'pre_physical_fitness_test';
      } else if (!postFinished.includes(max - 1)) {
        testType = 'post_physical_fitness_test';
      } else {
        setErrorMessage('You have already completed all tests.');
        setIsError(true);
        return;
      }
      // Insert or update the test data
      const { error: updateError } = await supabase
        .from('physical_fitness_test')
        .update({ [testType]: updatedData })
        .eq('uuid', userId);
      if (updateError) {
        setErrorMessage('Error saving test data: ' + updateError.message);
        setIsError(true);
        return;
      }
      navigate('/physical-fitness-test/test/0');
    } else {
      if (!areAllAnswered) {
        setErrorMessage('Make sure to answer all questions');
      } else if (!areAllAnswersNo) {
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

  const isNullOrWhiteSpace = input => {
    return !input || input.trim().length === 0;
  };
  const handleInformationChange = (keyName, value) => {
    // Update the data first
    const updatedData = {
      ...physicalFitnessData,
      [keyName]: value,
    };
    setPhysicalFitnessData(updatedData);

    // Handle email validation
    if (keyName === 'email') {
      setIsEmailValid(emailRegex.test(value.trim()));
    }

    // Check if all required fields are filled
    setAreAllUserDataFilled(() =>
      ['name', 'gender', 'email', 'category'].every(
        key => !isNullOrWhiteSpace(updatedData[key]),
      ),
    );
  };

  return (
    <div
      id='physical-fitness-test-parq'
      className='w-full min-h-screen max-h-fit'
    >
      {isError && (
        <AlertMessage
          text={errorMessage}
          onConfirm={() => setIsError(false)}
          onCancel={() => setIsError(false)}
        ></AlertMessage>
      )}
      <PageHeading text='Physical Fitness Test'></PageHeading>
      <div
        id='physical-fitness-test-parq-container'
        className='content-container'
      >
        <h2
          id='heading'
          className='font-heading text-2xl text-center w-full lg:text-4xl lg:self-start! lg:text-left'
        >
          Physical Activity Readiness Questionnaire (PAR-Q)
        </h2>
        <hr className='border-1 border-primary-yellow yellow w-[50%] self-start mt-2 lg:w-[20%] ' />
        <div
          id='physical-fitness-test-parq-content'
          className='apply-drop-shadow w-full flex flex-col justify-center items-center mt-5 font-content text-lg space-y-5 lg:mt-10'
        >
          <div id='instructions' className='w-[95%]'>
            <p>Directions</p>
            <hr className='mb-7' />
            <ol className='list-decimal ml-7 text-sm lg:text-base'>
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
            id='information'
            className='w-[95%] min-h-10 flex flex-col space-y-2 text-sm lg:text-base'
          >
            <label>
              <p>
                Full Name:
                <span className='text-accent-gray'>
                  {' '}
                  (Surname, First Name, M.I. ex. Dela Cruz, Juan A.)
                </span>
              </p>
              <input
                type='text'
                onChange={e => handleInformationChange('name', e.target.value)}
                defaultValue={physicalFitnessData?.name}
                className='border-1 border-[#8B8989] w-full font-content px-1 rounded-sm mt-0.5'
              />
            </label>
            <div className='flex flex-row space-x-5'>
              <p>Gender</p>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='Male'
                  onChange={e =>
                    handleInformationChange('gender', e.target.value)
                  }
                />
                Male
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='Female'
                  onChange={e =>
                    handleInformationChange('gender', e.target.value)
                  }
                />
                Female
              </label>
            </div>
            <label>
              <p>
                Email:{' '}
                <span className='text-accent-gray'>
                  {' '}
                  (ex. juan_delacruz@email.com)
                </span>
              </p>
              <input
                type='email'
                defaultValue={physicalFitnessData?.email}
                onChange={e => handleInformationChange('email', e.target.value)}
                className='border-1 border-[#8B8989] w-full font-content px-1 rounded-sm mt-0.5 not-valid:border-red'
              />
            </label>{' '}
            <label>
              <p>Age:</p>
              <select
                defaultValue={physicalFitnessData?.category}
                onChange={e =>
                  handleInformationChange('category', e.target.value)
                }
                className='border-1 border-[#8B8989]! w-full font-content px-1 rounded-sm mt-0.5'
              >
                <option disabled value=''>
                  --Select one option--
                </option>
                <option value='elementaryBoys'>
                  Boy (Elementary 5-12 yrs old)
                </option>
                <option value='elementaryGirls'>
                  Girl (Elementary 5-12 yrs old)
                </option>
                <option value='secondaryBoys'>
                  Boy (High School 13-18 yrs old)
                </option>
                <option value='secondaryGirls'>
                  Girl (High School 13-18 yrs old)
                </option>
              </select>
            </label>
          </div>
          <div id='questions' className='w-[95%] min-h-10 text-sm lg:text-base'>
            <p className='text-base'>
              PHYSICAL ACTIVITY READINESS QUESTIONNAIRE (PAR-Q)
            </p>
            <hr className='mb-7' />
            <ol className='list-decimal ml-7'>
              {questions.map((question, index) => (
                <li key={index} className='mb-4'>
                  {question}
                  <div className='flex flex-col mt-2'>
                    <label className='mb-2 lg:mb-0'>
                      <input
                        type='radio'
                        name={`radioQuestion${index}`}
                        value={'Yes'}
                        className='mr-2'
                        onChange={e =>
                          handleAnswerChange(index, e.target.value)
                        }
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type='radio'
                        name={`radioQuestion${index}`}
                        value={'No'}
                        className='mr-2'
                        onChange={e =>
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
            id='button-container'
            className='w-[95%] drop-shadow-none! border-0! flex justify-end p-0! mb-5'
          >
            <button
              className='px-10 py-3 bg-secondary-dark-blue text-white hover:brightness-70'
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
