import testTimer from '@/assets/icons/timer_pft.png';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhysicalFitnessTestList } from '@/utilities/PhysicalFitnessTestList';
import { Fragment } from 'react';
import { usePhysicalFitnessData } from '@/hooks/usePhysicalFitnessData';
import ErrorMessage from './utilities/ErrorMessage';

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

export default function PhysicalFitnessTest({ index }) {
  const [category, setCategory] = useState('');
  const restTimerRef = useRef(null);
  const [testResults, setTestResults] = useState({
    reps: 0,
    sets: 0,
    timeStarted: '',
    timeEnded: '',
  });
  const [repResultClassification, setRepResultClassification] =
    useState('No data available');
  const [restTimeRemaining, setRestTimeRemaining] = useState(5);
  const testDetails = PhysicalFitnessTestList[index];
  const {
    title,
    equipment,
    instructionsForPartner,
    instructionsForTester,
    instructionsScoring,
    videoInstruction,
  } = testDetails;
  const testName = title;
  const { physicalFitnessData, setPhysicalFitnessData } =
    usePhysicalFitnessData();
  const [userSkippedURL, setUserSkippedURL] = useState(false);

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

  //verify if the user skipped using URL
  useEffect(() => {
    if (index !== '0') {
      if (!physicalFitnessData.finishedTestIndex.includes(Number(index) - 1)) {
        setUserSkippedURL(true);
      }
    }
  }, [index, physicalFitnessData]);

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
      console.log('Timer reached 0! Perform your action here.');
      //popup alert
    }
  }, [restTimeRemaining]);

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

  const handleInterpretation = (updatedTestResults) => {
    const reps = updatedTestResults.reps;
    let classificationDetails = testDetails.classification[category];
    if (!classificationDetails) {
      setCategory((prev) => {
        let data = prev.slice(-4);
        data = data === 'irls' ? 'Girls' : 'Boys';
        return data;
      });
      classificationDetails = testDetails.classification;
    }
    if (!classificationDetails) {
      setCategory('No Classification Available');
      return;
    }
    classificationDetails.forEach((item) => {
      if (reps === item.exact) {
        setRepResultClassification(item.interpretation);
        return;
      } else if (item.min <= reps && item.max >= reps) {
        setRepResultClassification(item.interpretation);
        return;
      } else if (!item.max && item.min <= reps) {
        setRepResultClassification(item.interpretation);
        return;
      }
    });
  };

  useEffect(() => {
    console.log(repResultClassification);
  }, [repResultClassification]);

  if(userSkippedURL){
    return(
      <ErrorMessage text={"Error 404"} subText={"Bad Request"}></ErrorMessage>
    )
  }
  return (
    <div id="test-container" className="grid grid-cols-[65%_35%] gap-5">
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
      <div id="results-interpretation-tips" className="flex flex-col space-y-5">
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

                        if (label !== 'Time Started' && label !== 'Time End') {
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
                        label !== 'Time Started' && label !== 'Time End'
                          ? '-1'
                          : undefined
                      }
                      max={
                        label !== 'Time Started' && label !== 'Time End'
                          ? '999'
                          : undefined
                      }
                      defaultValue={
                        label !== 'Time Started' && label !== 'Time End'
                          ? '0'
                          : ''
                      }
                      name={label}
                      id={label}
                      className="px-2 w-[80%] place-self-center h-fit border-1 border-black text-center font-content rounded-sm"
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
            <button className="border-1 border-black rounded-md px-5 py-1 mt-5 text-sm bg-white hover:brightness-95">
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
            <h1 className="text-3xl font-md mb-3 font-bold">Interpretation</h1>
            <hr className="w-[50%] border-1 border-black -mr-10" />
          </div>
          <hr className="w-[50%] border-1 border-black mb-1" />
          <div id="interpretation" className="mb-3">
            <h2 className="font-semibold text-lg font-content">{testName}</h2>
            <p className="ml-2 font-bold text-lg font-content">
              {testResults.reps} : {repResultClassification}
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
  );
}
