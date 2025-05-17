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
import { useUserId } from '@/hooks/useId';

export function PhysicalFitnessTestPage () {
  const { testIndex } = useParams();
  const [isBadRequest, setIsBadRequest] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const { physicalFitnessData, setPhysicalFitnessData } =
    usePhysicalFitnessData();
  const navigate = useNavigate();
  const userId = useUserId();

  useEffect(() => {
    // Check if both pre and post physical fitness test already exist for this user
    const checkIfTestTaken = async () => {
      const resolvedUserId = await Promise.resolve(userId);
      const { data: existing, error: fetchError } = await supabase
        .from('physical_fitness_test')
        .select('pre_physical_fitness_test, post_physical_fitness_test')
        .eq('uuid', resolvedUserId)
        .single();
      if (fetchError) {
        console.error('Fetch error:', fetchError.message);
        return;
      }
      if (
        existing &&
        existing.pre_physical_fitness_test &&
        existing.post_physical_fitness_test
      ) {
        setIsTaken(true);
      }
    };
    checkIfTestTaken();
  }, [userId]);

  async function insertToDatabase (physicalFitnessData) {
    const resolvedUserId = await Promise.resolve(userId);
    const { data: existing, error: fetchError } = await supabase
      .from('physical_fitness_test')
      .select('pre_physical_fitness_test, post_physical_fitness_test')
      .eq('uuid', resolvedUserId)
      .single();
    if (fetchError) {
      console.error('Fetch error:', fetchError.message);
      return;
    }
    // Only check for pre/post here for insert logic, not for isTaken
    if (existing && existing.pre_physical_fitness_test) {
      const { data, error } = await supabase
        .from('physical_fitness_test')
        .update({ post_physical_fitness_test: physicalFitnessData })
        .eq('uuid', resolvedUserId);
      if (error) {
        console.error(
          'Update post_physical_fitness_test error:',
          error.message,
        );
      } else {
        console.log('Updated post_physical_fitness_test:', data);
      }
    } else {
      const { data, error } = await supabase
        .from('physical_fitness_test')
        .upsert({
          uuid: resolvedUserId,
          pre_physical_fitness_test: physicalFitnessData,
        });
      if (error) {
        console.error('Upsert pre_physical_fitness_test error:', error.message);
      } else {
        console.log('Upserted pre_physical_fitness_test:', data);
      }
    }
  }

  useEffect(() => {
    const dataFromStorage = getDataFromStorage('physicalFitnessData');
    console.log(dataFromStorage);
    if (dataFromStorage && Object.keys(dataFromStorage).length > 0) {
      setPhysicalFitnessData(dataFromStorage);

      let finishedTestIndex = [];
      let currentTestIndex = 0;

      if (dataFromStorage) {
        finishedTestIndex = dataFromStorage.finishedTestIndex;
        currentTestIndex = Number(testIndex);
        console.log(finishedTestIndex.length, currentTestIndex);
      }
      if (finishedTestIndex.length === currentTestIndex) {
        insertToDatabase(dataFromStorage);
        navigate('/physical-fitness-test/summary');
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
  }, [setPhysicalFitnessData, testIndex, physicalFitnessData.length, navigate]);

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
    // return <ErrorMessage text={'Error 400'} subText={'Bad Request'} />;
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
          />
        </div>
      )}
    </div>
  );
}
