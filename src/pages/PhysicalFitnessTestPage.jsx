import PhysicalFitnessTest from '@/components/PhysicalFitnessTest';
import PageHeading from '@/components/PageHeading';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AlertMessage } from '@/components/utilities/AlertMessage';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '@/components/utilities/ErrorMessage';
import { usePhysicalFitnessData } from '@/hooks/usePhysicalFitnessData';
import getDataFromStorage from '@/utilities/getDataFromStorage';

export function PhysicalFitnessTestPage() {
  const { testIndex } = useParams();
  const [isBadRequest, setIsBadRequest] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const { physicalFitnessData, setPhysicalFitnessData } =
    usePhysicalFitnessData();
  const navigate = useNavigate();

  useEffect(() => {
    const dataFromStorage = getDataFromStorage('physicalFitnessData');
    if (dataFromStorage && Object.keys(dataFromStorage).length > 0) {
      setPhysicalFitnessData(dataFromStorage);

      let finishedTestIndex = [];
      let currentTestIndex = 0;
      if (dataFromStorage) {
        finishedTestIndex = dataFromStorage.finishedTestIndex;
        currentTestIndex = Number(testIndex);
      }
      if (testIndex === 0) {
        setIsDataReady(true);
      }
      if (
        !finishedTestIndex.includes(currentTestIndex - 1) ||
        finishedTestIndex.length <= currentTestIndex
      ) {
        console.log(finishedTestIndex);
        setIsBadRequest(true);
      }
      setIsDataReady(true);
    } else {
      console.log('No data in storage or empty object');
      setIsBadRequest(true);
    }
  }, [setPhysicalFitnessData, testIndex]);

  const handleTimeoutConfirm = () => {
    if (testIndex === '0') {
      setIsTimeout(false);
      window.location.reload();
    } else {
      navigate('/physical-fitness-test/test/0');
    }
  };

  const handleTimeoutCancel = () => {
    navigate('/physical-fitness-test/parq');
  };

  if (!isDataReady && !isBadRequest) {
    return <div></div>;
  }

  // if (isBadRequest) {
  //   return <ErrorMessage text={'Error 400'} subText={'Bad Request'} />;
  // }

  if (isTimeout) {
    return (
      <AlertMessage
        text={'Looks like the timer has ran out, Retry?'}
        onCancel={handleTimeoutCancel}
        onConfirm={handleTimeoutConfirm}
      />
    );
  }

  return (
    <div id="physical-fitness-test-container">
      <PageHeading text="Physical Fitness Test" />
      <div id="physical-fitness-content" className="content-container w-full! mb-10">
        <PhysicalFitnessTest
          physicalFitnessData={physicalFitnessData}
          index={testIndex}
          // setIsTimeout={setIsTimeout}
          setIsBadRequest={setIsBadRequest}
        />
      </div>
    </div>
  );
}
