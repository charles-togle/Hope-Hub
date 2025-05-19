import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhysicalFitnessTestList } from '@/utilities/PhysicalFitnessTestList';
import { Fragment } from 'react';
import { usePhysicalFitnessData } from '@/hooks/usePhysicalFitnessData';
import { AlertMessage } from './utilities/AlertMessage';
import setDataToStorage from '@/utilities/setDataToStorage';
import getDataFromStorage from '@/utilities/getDataFromStorage';
import { Timer } from '@/components/utilities/Timer';
import { ResultSection } from './physical-fitness-test/ResultSection';
import { TipsAndInterpretation } from './physical-fitness-test/TipsAndInterperetation';
import supabase from '@/client/supabase';
import { useUserId } from '@/hooks/useId';

const InstructionsGroup = ({ text, array, id }) => (
  <div id={id}>
    <h3 className='text-base font-semibold'>{text}</h3>
    <ol className='list-decimal ml-6'>
      {array.map((item, index) => (
        <li key={`${text} ${index}`}>{item}</li>
      ))}
    </ol>
  </div>
);

export default function PhysicalFitnessTest ({
  index,
  setIsTimeout,
  physicalFitnessData,
  testType,
}) {
  console.log(testType);
  const [currentTime, setCurrentTime] = useState(
    `${String(new Date().getHours()).padStart(2, '0')}:${String(
      new Date().getMinutes(),
    ).padStart(2, '0')}`,
  );
  const [category, setCategory] = useState('');
  const [testResults, setTestResults] = useState({
    reps: '',
    sets: '',
    timeStarted: currentTime,
    timeEnded: '',
    classification: 'No data available',
  });
  const { setPhysicalFitnessData } = usePhysicalFitnessData();
  const testDetails = PhysicalFitnessTestList[index];
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const userId = useUserId();

  const {
    title,
    equipment,
    instructionsForPartner,
    instructionsForTester,
    instructionsScoring,
    videoInstructions,
  } = testDetails || {};
  const testName = title;

  useEffect(() => {
    const storedData = getDataFromStorage('physicalFitnessData');
    setCategory(storedData.category);
  }, []);

  const handleResultChange = (type, value) => {
    let key = '';
    switch (type) {
      case 'Reps':
        key = 'reps';
        break;
      case 'Sets':
        key = 'sets';
        break;
      case 'Time Started':
        key = 'timeStarted';
        break;
      case 'Time End':
        key = 'timeEnded';
        break;
    }

    console.log(key, value);
    setTestResults(prev => {
      const updatedTestResults = {
        ...prev,
        [key]: value.toString(),
      };
      if (key === 'reps') {
        handleInterpretation(updatedTestResults);
      }

      return updatedTestResults;
    });
  };

  const setClassification = value => {
    setTestResults(prev => ({
      ...prev,
      classification: value,
    }));
  };

  const handleInterpretation = updatedTestResults => {
    const reps = updatedTestResults.reps;
    const storedData = getDataFromStorage('physicalFitnessData');
    setCategory(storedData.category);
    let classificationDetails = testDetails.classification?.[category];
    if (testName === 'Push-Up') {
      classificationDetails = testDetails.classification?.[storedData.category];
    }
    if (!classificationDetails) {
      setCategory(prev => {
        if (!prev) {
          return storedData.category;
        }
        let data = prev.slice(-4);
        data = data === 'irls' ? 'Girls' : 'Boys';
        return data;
      });
      classificationDetails = testDetails.classification;
    }
    if (!classificationDetails) {
      setClassification('No information available');
      return;
    } else if (Array.isArray(classificationDetails)) {
      classificationDetails.forEach(item => {
        if (reps === item.exact) {
          setClassification(item.interpretation);
          return;
        } else if (item.min <= reps && item.max >= reps) {
          setClassification(item.interpretation);

          return;
        } else if (!item.max && item.min <= reps) {
          setClassification(item.interpretation);
          return;
        }
      });
    }
  };

  const handleSubmit = async () => {
    const resolvedUserId = await Promise.resolve(userId);
    setCurrentTime(
      `${String(new Date().getHours()).padStart(2, '0')}:${String(
        new Date().getMinutes(),
      ).padStart(2, '0')}`,
    );

    const hasEmptyField = Object.values(testResults).some(
      value => value.toString() === '' || value.toString().trim() === '',
    );

    if (hasEmptyField) {
      setAlertMessage('Please fill out all fields before submitting');
      setShowAlert(hasEmptyField);
      return;
    }

    const isTimeInvalid = testResults.timeStarted > testResults.timeEnded;
    if (isTimeInvalid) {
      setAlertMessage("Please input a valid time for 'Time End'");
      setShowAlert(isTimeInvalid);
      return;
    }

    setPhysicalFitnessData(prev => {
      const updatedFinishedTestIndex = Array.isArray(prev.finishedTestIndex)
        ? [...prev.finishedTestIndex]
        : [];

      updatedFinishedTestIndex[Number(index)] = Number(index);
      const updatedPhysicalFitnessData = {
        ...prev,
        [testDetails.key]: {
          title: testName,
          record: testResults.reps,
          sets: testResults.sets,
          timeStarted: testResults.timeStarted,
          timeEnd: testResults.timeEnded,
          classification: testResults.classification,
        },
        finishedTestIndex: updatedFinishedTestIndex,
      };

      setDataToStorage('physicalFitnessData', updatedPhysicalFitnessData);
      supabase
        .from('physical_fitness_test')
        .update({ [testType]: updatedPhysicalFitnessData })
        .eq('uuid', resolvedUserId)
        .then(({ data, error }) => {
          if (error) {
            console.log(testType);
            console.error('Supabase upsert error:', error.message);
          } else {
            console.log(data);
            console.log('Supabase upserted data:', data);
          }
        });
      return updatedPhysicalFitnessData;
    });
    if (physicalFitnessData.finishedTestIndex.length >= Number(index)) {
      navigate(`/physical-fitness-test/test/${Number(index) + 1}`);
      setTestResults({
        reps: '',
        sets: '',
        timeStarted: currentTime,
        timeEnded: '',
        classification: 'No data available',
      });
    }
  };

  return (
    <div id='test-container' className=''>
      {showAlert && (
        <AlertMessage
          text={alertMessage}
          onCancel={() => setShowAlert(false)}
          onConfirm={() => setShowAlert(false)}
        ></AlertMessage>
      )}
      <div
        id='test-contents'
        className='w-[95%] mt-20 gap-5 mr-auto ml-auto lg:grid lg:grid-cols-[65%_35%] lg:w-[85%] lg:mt-0'
      >
        <div
          id='test-instructions'
          className='p-5 pb-10 grid grid-cols-[60%_40%] border-2 border-black row-span-2 relative font-content rounded-2xl lg:p-10'
        >
          <div
            id='name'
            className='flex w-full flex-col justify-center items-start'
          >
            <h1 id='test-name' className='text-3xl font-bold mb-3'>
              {testName}
            </h1>
            <hr className='w-[50%] border-1 border-black' />
          </div>
          <div
            id='timer'
            className='absolute -top-20 flex pl-5 flex-row w-full justify-center gap-5 items-center lg:relative lg:top-0 lg:block lg:w-auto lg:p-0'
          >
            <p className='text-lg font-bold italic'>Timeout in:</p>
            <Timer
              className='flex flex-row justify-start items-center space-x-5 lg:relative lg:right-0 lg:w-[50%] lg:mt-2'
              onEnd={() => setIsTimeout(true)}
              time={600}
            ></Timer>
          </div>
          <iframe
            src={videoInstructions}
            className='col-span-2 mt-10 mb-5 w-full aspect-video border-1 border-black rounded-sm'
          ></iframe>
          <div id='instructions' className='col-span-2 text-sm font-medium'>
            <h2 className='text-xl font-bold mb-3'>Instructions:</h2>
            <InstructionsGroup
              text='Equipment'
              array={equipment}
              id='equipment'
            />
            <InstructionsGroup
              text='For the tester'
              array={instructionsForTester}
              id='for-tester'
            />
            <InstructionsGroup
              text='For the partner'
              array={instructionsForPartner}
              id='for-partner'
            />
            <InstructionsGroup
              text='Scoring'
              array={instructionsScoring}
              id='scoring'
            />
          </div>
          <hr className='absolute bottom-8 right-0 border-1 border-black w-[20%]' />
          <hr className='absolute bottom-5 left-0 border-1 border-black w-[50%]' />
        </div>
        <div
          id='results-interpretation-tips'
          className='flex flex-col space-y-5'
        >
          {/* right side container*/}
          <ResultSection
            testName={testName}
            handleResultChange={handleResultChange}
            handleSubmit={handleSubmit}
            testResults={testResults}
            currentTime={currentTime}
          />
          <TipsAndInterpretation
            testName={testName}
            testResults={testResults}
          />
        </div>
      </div>
    </div>
  );
}
