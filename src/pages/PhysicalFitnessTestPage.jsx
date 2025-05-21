import PhysicalFitnessTest from '@/components/PhysicalFitnessTest';
import PageHeading from '@/components/PageHeading';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AlertMessage } from '@/components/utilities/AlertMessage';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '@/components/utilities/ErrorMessage';
import { usePhysicalFitnessData } from '@/hooks/usePhysicalFitnessData';
import getDataFromStorage from '@/utilities/getDataFromStorage';
import supabase from '@/client/supabase';
import { useUserId } from '@/hooks/useUserId';

export function PhysicalFitnessTestPage () {
  const { testIndex } = useParams();
  const [isBadRequest, setIsBadRequest] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const [testType, setTestType] = useState('');
  const { physicalFitnessData, setPhysicalFitnessData } =
    usePhysicalFitnessData();
  const navigate = useNavigate();
  const userId = useUserId();

  useEffect(() => {
    // Check if both pre and post physical fitness test already exist for this user
    const checkIfTestTaken = async () => {
      const resolvedUserId = await Promise.resolve(userId);
      if (!resolvedUserId) {
        setIsBadRequest(true);
        setIsDataReady(true);
        return;
      }
      const { data: existing, error: fetchError } = await supabase
        .from('physical_fitness_test')
        .select('pre_physical_fitness_test, post_physical_fitness_test')
        .eq('uuid', resolvedUserId)
        .single();

      const preTestFinishedTests =
        existing.pre_physical_fitness_test.finishedTestIndex;
      const postTestFinishedTests =
        existing.post_physical_fitness_test.finishedTestIndex;
      const max =
        preTestFinishedTests.length - 1 || postTestFinishedTests.length - 1;

      if (fetchError) {
        console.error('Fetch error:', fetchError.message);
        return;
      }
      if (
        existing &&
        preTestFinishedTests.includes(max) &&
        postTestFinishedTests.includes(max)
      ) {
        setIsTaken(true);
        return;
      }
      if (existing && !preTestFinishedTests.includes(max)) {
        setTestType('pre_physical_fitness_test');
        return;
      }
      if (existing && !postTestFinishedTests.includes(max)) {
        setTestType('post_physical_fitness_test');
        return;
      }
    };
    checkIfTestTaken();
  }, [userId]);

  //remove item from localStorage everytime it is unmounted
  // useEffect(()=>{
  //   return () => {
  //     localStorage.removeItem('physicalFitnessdata')
  //   }
  // },[])

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
        setIsBadRequest(true);
      }
      setIsDataReady(true);
    } else {
      console.log('No data in storage or empty object');
      setIsBadRequest(true);
    }
  }, [setPhysicalFitnessData, testIndex, physicalFitnessData.length, navigate]);

  useEffect(() => {
    const finishedTestIndex = physicalFitnessData.finishedTestIndex || [];
    if (finishedTestIndex.includes(finishedTestIndex.length - 1)) {
      localStorage.removeItem('physicalFitnessData');
      navigate(
        `/physical-fitness-test/summary/${
          testType === 'pre_physical_fitness_data' ? 'pre-test' : 'post-test'
        }`,
      );
    }
  }, [physicalFitnessData.finishedTestIndex, navigate]);

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

  if (isDataReady && isBadRequest) {
    return <ErrorMessage text={'Error 400'} subText={'Bad Request'} />;
  }

  if (isBadRequest) {
    return <ErrorMessage text={'Error 400'} subText={'Bad Request'} />;
  }

  if (isTimeout) {
    return (
      <AlertMessage
        text={'Looks like the timer has ran out, Retry?'}
        onCancel={handleTimeoutCancel}
        onConfirm={handleTimeoutConfirm}
      />
    );
  }

  if (isTaken) {
    return (
      <ErrorMessage
        text={'You have already been taken the test'}
        subText='go to dashboard to view results'
      />
    );
  }

  return (
    <div id='physical-fitness-test-container'>
      <PageHeading text='Physical Fitness Test' />
      {isDataReady && (
        <div
          id='physical-fitness-content'
          className='content-container w-full! mb-10'
        >
          <PhysicalFitnessTest
            physicalFitnessData={physicalFitnessData}
            index={testIndex}
            setIsTimeout={setIsTimeout}
            setIsBadRequest={setIsBadRequest}
            testType={testType}
          />
        </div>
      )}
    </div>
  );
}
