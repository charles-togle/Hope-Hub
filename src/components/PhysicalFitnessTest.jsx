import testTimer from '@/assets/icons/timer_pft.png';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhysicalFitnessTestList } from '@/utilities/PhysicalFitnessTestList';
import { Fragment } from 'react';
import { usePhysicalFitnessData } from '@/hooks/usePhysicalFitnessData';
import { AlertMessage } from './utilities/AlertMessage';
import { setDataToStorage } from '@/utilities/setDataToStorage';
import { getDataFromStorage } from '@/utilities/getDataFromStorage';

const InstructionsGroup = ({ text, array, id }) => (
  <div id={id}>
    <h3 className="text-sm font-semibold">{text}</h3>
    <ol className="list-decimal ml-6">
      {array.map((item, index) => (
        <li key={`${text} ${index}`}>{item}</li>
      ))}
    </ol>
  </div>
);

export default function PhysicalFitnessTest({
  index,
  setIsTimeout,
  physicalFitnessData,
}) {
  const [currentTime] = useState(
    `${String(new Date().getHours()).padStart(2, '0')}:${String(
      new Date().getMinutes(),
    ).padStart(2, '0')}`,
  );
  const [category, setCategory] = useState('');
  const restTimerRef = useRef(null);
  const [testResults, setTestResults] = useState({
    reps: '',
    sets: '',
    timeStarted: currentTime,
    timeEnded: '',
    classification: 'No data available',
  });

  const [restTimeRemaining, setRestTimeRemaining] = useState(600);
  const { setPhysicalFitnessData } =
    usePhysicalFitnessData();
  const testDetails = PhysicalFitnessTestList[index];
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const {
    title,
    equipment,
    instructionsForPartner,
    instructionsForTester,
    instructionsScoring,
    videoInstruction,
  } = testDetails || {};
  const testName = title;

  const startTimer = () => {
    if (!restTimerRef.current) {
      restTimerRef.current = setInterval(() => {
        setRestTimeRemaining((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
  };

  const handleCategory = (value) => {
    switch (value) {
      case 'elementary-boy':
        setCategory('elementaryBoys');
        break;
      case 'elementary-girl':
        setCategory('elementaryGirls');
        break;
      case 'secondary-boy':
        setCategory('secondaryBoys');
        break;
      case 'secondary-girl':
        setCategory('secondaryGirls');
        break;
    }
  };

  const stopTimer = () => {
    if (restTimerRef.current) {
      clearInterval(restTimerRef.current);
      restTimerRef.current = null;
    }
  };




  useEffect(() => {
    handleCategory('elementary-girl');
  }, []);
  //starting timer on mount
  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, []);
  
  //do this if timer is 0
  useEffect(() => {
    if (restTimeRemaining === 0) {
      setIsTimeout(true);
    }
  }, [setIsTimeout, restTimeRemaining]);

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
    setTestResults((prev) => {
      const updatedTestResults = {
        ...prev,
        [key]: value,
      };
      if (key === 'reps') {
        handleInterpretation(updatedTestResults);
      }

      return updatedTestResults;
    });
  };

  const setClassification = (value) => {
    setTestResults((prev) => ({
      ...prev,
      classification: value,
    }));
  };

  const handleInterpretation = (updatedTestResults) => {
    const reps = updatedTestResults.reps;
    let classificationDetails = testDetails.classification?.[category];
    if (!classificationDetails) {
      setCategory((prev) => {
        let data = prev.slice(-4);
        data = data === 'irls' ? 'Girls' : 'Boys';
        return data;
      });
      classificationDetails = testDetails.classification;
    }
    if (!classificationDetails) {
      setClassification('No information available');
      return;
    }
    classificationDetails.forEach((item) => {
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
  };

  const handleSubmit = () => {
    const hasEmptyField = Object.values(testResults).some(
      (value) => value.toString() === '' || value.toString().trim() === '',
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

    setPhysicalFitnessData((prev) => {
      const updatedFinishedTestIndex = Array.isArray(prev.finishedTestIndex)
        ? [...prev.finishedTestIndex]
        : [];

      updatedFinishedTestIndex[Number(index)] = Number(index);
      return {
        ...prev,
        [testDetails.key]: {
          record: Number(testResults.reps),
          sets: Number(testResults.sets),
          timeStarted: testResults.timeStarted,
          timeEnd: testResults.timeEnded,
          classification: testResults.classification,
        },
        finishedTestIndex: updatedFinishedTestIndex,
      };
    });
    if (physicalFitnessData.finishedTestIndex.length >= Number(index)) {
      navigate(`/physical-fitness-test/test/${Number(index) + 1}`);
      setDataToStorage('physicalFitnessData', physicalFitnessData)
      console.log(getDataFromStorage('physicalFitnessData'))
    }
  };

  return (
    <div id="test-container" className="">
      {showAlert && (
        <AlertMessage
          text={alertMessage}
          onCancel={() => setShowAlert(false)}
          onConfirm={() => setShowAlert(false)}
        ></AlertMessage>
      )}
      <div
        id="test-contents"
        className="w-[85%] mr-auto ml-auto grid grid-cols-[65%_35%] gap-5"
      >
        <div
          id="test-instructions"
          className="grid grid-cols-[60%_40%] border-2 border-black row-span-2 relative p-10 font-content rounded-2xl"
        >
          <div
            id="name"
            className="flex w-full flex-col justify-center items-start"
          >
            <h1 id="test-name" className="text-3xl font-bold mb-3">
              {testName}
            </h1>
            <hr className="w-[50%] border-1 border-black" />
          </div>
          <div id="timer" className="relative">
            <p className="absolute">Exercise Timer:</p>
            <div className="mt-7 flex flex-row justify-start items-center space-x-5">
              <img src={testTimer} alt="rest-timer" className="w-8" />
              <p className="text-nowrap">
                {Math.floor(restTimeRemaining / 60)} :{' '}
                {String(restTimeRemaining % 60).padStart(2, '0')} mins
              </p>
            </div>
          </div>
          <iframe
            src={videoInstruction}
            className="col-span-2 mt-10 mb-5 w-full aspect-video border-1 border-black rounded-sm"
          ></iframe>
          <div id="instructions" className="col-span-2 text-sm font-medium">
            <h2 className="text-xl font-bold mb-3">Instructions:</h2>
            <InstructionsGroup
              text="Equipment"
              array={equipment}
              id="equipment"
            />
            <InstructionsGroup
              text="For the tester"
              array={instructionsForTester}
              id="for-tester"
            />
            <InstructionsGroup
              text="For the partner"
              array={instructionsForPartner}
              id="for-partner"
            />
            <InstructionsGroup
              text="Scoring"
              array={instructionsScoring}
              id="scoring"
            />
          </div>
          <hr className="absolute bottom-8 right-0 border-1 border-black w-[20%]" />
          <hr className="absolute bottom-5 left-0 border-1 border-black w-[50%]" />
        </div>
        <div
          id="results-interpretation-tips"
          className="flex flex-col space-y-5"
        >
          {/* right side container*/}
          <div
            id="results"
            className="border-2 border-black rounded-2xl p-10 relative font-content"
          >
            <div
              id="heading"
              className="flex flex-row  justify-between items-center"
            >
              <h1 className="text-3xl font-bold mb-3">Results</h1>
              <hr className="font-md text-2xl w-[50%] border-1 border-black -mr-10 mb-1" />
            </div>
            <hr className="w-[50%] border-1 border-black" />
            <div id="data" className="flex flex-col relative ml-3">
              <h2 className="absolute font-semibold text-lg">{testName}</h2>
              <div
                id="inputs"
                className="mt-7 ml-2 grid grid-cols-2 divide-x divide-black"
              >
                {['Reps', 'Sets', 'Time Started', 'Time End'].map(
                  (label, index) => (
                    <Fragment key={`${index} ${label}`}>
                      <label
                        htmlFor={label}
                        className="p-1 lg:text-lg md:text-sm sm: text-xs"
                      >
                        {label}:{' '}
                      </label>
                      <input
                        onChange={(e) => {
                          let value = e.target.value;

                          if (
                            label !== 'Time Started' &&
                            label !== 'Time End'
                          ) {
                            value = Math.max(-1, Math.min(999, value));
                          }
                          handleResultChange(label, value);
                        }}
                        type={
                          label === 'Time Started' || label === 'Time End'
                            ? 'time'
                            : 'number'
                        }
                        min={
                          label === 'Time Started'
                            ? ''
                            : label === 'Time End'
                            ? currentTime
                            : '-1'
                        }
                        max={
                          label !== 'Time Started' && label !== 'Time End'
                            ? '999'
                            : undefined
                        }
                        defaultValue={
                          label === 'Time End'
                            ? ''
                            : label === 'Time Started'
                            ? currentTime
                            : ''
                        }
                        disabled={label === 'Time Started'}
                        name={label}
                        id={label}
                        className="px-2 w-[85%] place-self-center h-fit border-1 border-black text-center font-content rounded-sm"
                      />
                    </Fragment>
                  ),
                )}
              </div>
              <hr className="absolute -bottom-3 right-0 w-[35%] border-1 border-black" />
            </div>
            <div
              id="button"
              className="flex flex-row items-center justify-between"
            >
              <hr className="-ml-10 border-1 border-black w-[50%]" />
              <button
                onClick={() => handleSubmit()}
                type="button"
                className="border-1 border-black rounded-md px-5 py-1 mt-5 text-sm bg-white hover:brightness-95"
              >
                Submit
              </button>
            </div>
          </div>
          <div
            id="interpretation-and-tips"
            className="border-2 border-black p-10 rounded-2xl relative"
          >
            <div
              id="heading"
              className="flex flex-row items-center justify-between"
            >
              <h1 className="text-3xl font-md mb-3 font-bold">
                Interpretation
              </h1>
              <hr className="w-[50%] border-1 border-black -mr-10" />
            </div>
            <hr className="w-[50%] border-1 border-black mb-1" />
            <div id="interpretation" className="mb-3">
              <h2 className="font-semibold text-lg font-content">{testName}</h2>
              <p className="ml-2 font-bold text-lg font-content">
                {testResults.reps} : {testResults.classification}
              </p>
            </div>
            <div id="tips" className="pb-10">
              <h2 className="font-content text-sm font-semibold">
                Tips to Improve
              </h2>
              <ul className="list-decimal ml-6 font-content text-sm font-medium">
                <li>
                  Lorem ipsum dolor sit amet consectetur. Sed augue ultrices
                  phasellus mi nulla nisi sollicitudin sagittis.
                </li>
                <li>
                  Pharetra tellus pellentesque faucibus fusce eget sagittis.
                  Cursus sed gravida pellentesque quam.
                </li>
                <li>
                  Eget justo sit tortor amet in eu diam velit. Id facilisi metus
                  in fames faucibus viverra ullamcorper bibendum.
                </li>
              </ul>
            </div>
            <hr className="-ml-10 border-1 border-black w-[50%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
