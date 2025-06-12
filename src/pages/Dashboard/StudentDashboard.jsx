import Banner from '@/components/dashboard/Banner';
import Statistics from '@/components/dashboard/Statistics';
import supabase from '@/client/supabase';
import { useUserId } from '@/hooks/useUserId';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinClass from '@/components/dashboard/JoinClass';
import ProfileSidebar from '@/components/dashboard/ProfileSidebar';
import { useName, useProfilePicture } from '@/hooks/useDashboardData';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import { onProfileChange as onProfileChangeUtil } from '@/utilities/onProfileChange';
import { LogOut } from 'lucide-react';

export default function StudentDashboard () {
  const userID = useUserId();
  const [preTestFinished, setPreTestFinished] = useState(false);
  const [postTestFinished, setPostTestFinished] = useState(false);
  const [lectureProgress, setLectureProgress] = useState({
    completed: 0,
    incomplete: 0,
    pending: 0,
    total: 10,
  });
  const [quizProgress, setQuizProgress] = useState({
    completed: 0,
    incomplete: 0,
    pending: 0,
    total: 2,
  });
  const [isDataReady, setIsDataReady] = useState(false);
  const [classCode, setClassCode] = useState(null);
  const [tempClassCode, setTempClassCode] = useState('');
  const [isJoiningClass, setIsJoiningClass] = useState(false);
  const navigate = useNavigate();

  const [profilePictureFile, setProfilePictureFile] = useProfilePicture(
    userID,
    isDataReady,
  );
  const memoizedFile = useMemo(
    () => profilePictureFile,
    [profilePictureFile?.name, profilePictureFile?.size],
  );
  const studentName = useName(userID, isDataReady);
  let sampleProgress = {
    completed: 7,
    incomplete: 10,
    pending: 8,
  };
  sampleProgress = {
    ...sampleProgress,
    total: Object.values(sampleProgress).reduce((acc, value) => acc + value, 0),
  };

  const getQuizProgress = async () => {
    if (!userID) return;

    const { count: quizCount } = await supabase
      .from('quiz')
      .select('*', { count: 'exact' });

    const { data: quizProgress, error: quizError } = await supabase
      .from('quiz_progress')
      .select('status')
      .eq('user_id', userID);

    if (quizError) {
      return;
    }
    console.log(quizProgress);
    let completed = 0;
    let incomplete = 0;
    let pending = 0;
    quizProgress.forEach(item => {
      if (item.status === 'Done') completed += 1;
      else if (item.status === 'Pending') pending += 1;
    });

    incomplete = quizCount - (completed + pending);

    setQuizProgress({
      completed,
      incomplete,
      pending,
      total: quizCount,
    });
  };

  const getLectureProgress = async () => {
    if (!userID) return;
    const { data, error } = await supabase
      .from('lecture_progress')
      .select('lecture_progress')
      .eq('uuid', userID)
      .single();

    if (error) {
      setIsDataReady(true);
      return;
    }

    const lectures = data.lecture_progress || [];
    let completed = 0;
    let incomplete = 0;
    let pending = 0;

    lectures.forEach(item => {
      if (item.status === 'Done') completed += 1;
      else if (item.status === 'Incomplete') incomplete += 1;
      else if (item.status === 'Pending') pending += 1;
    });

    setLectureProgress({
      completed,
      incomplete,
      pending,
      total: lectures.length,
    });
    setIsDataReady(true);
  };

  useEffect(() => {
    async function getClassCode () {
      const { data, error } = await supabase
        .from('student_class_code')
        .select()
        .single()
        .eq('uuid', userID);
      if (error) {
        setClassCode('');
        return;
      }
      const classCode = data?.class_code;
      if (!classCode) setClassCode(null);
      else {
        setClassCode(classCode);
      }
    }
    if (!isDataReady) return;
    getClassCode();
  }, [userID, isDataReady]);

  useEffect(() => {
    if (isDataReady) return;
    getLectureProgress();
  }, [userID, isDataReady]);

  useEffect(() => {
    if (isDataReady) return;
    getQuizProgress();
  }, [userID, isDataReady]);

  useEffect(() => {
    if (!isDataReady) return;
    isPreTestFinished().then(setPreTestFinished);
    isPostTestFinished().then(setPostTestFinished);
  }, [isDataReady]);

  const checkIfFinished = async column => {
    if (!userID) return;
    const { data: existing, error: fetchError } = await supabase
      .from('physical_fitness_test')
      .select(column)
      .eq('uuid', userID)
      .single();

    if (fetchError) {
      return;
    }
    if (existing[column] && existing[column].finishedTestIndex) {
      const { finishedTestIndex } = existing[column];
      return (
        finishedTestIndex &&
        finishedTestIndex.includes(finishedTestIndex.length - 1)
      );
    }
  };

  const isPreTestFinished = async () => {
    return await checkIfFinished('pre_physical_fitness_test');
  };

  const isPostTestFinished = async () => {
    return await checkIfFinished('post_physical_fitness_test');
  };

  const handlePostTestClick = () => {
    if (postTestFinished) {
      navigate('/physical-fitness-test/summary/post-test');
    }
  };
  const handlePreTestClick = () => {
    if (preTestFinished) {
      navigate('/physical-fitness-test/summary/pre-test');
    }
  };

  const handleLeaveClass = async () => {
    const { error: leaveClassError } = await supabase
      .from('student_class_code')
      .update({ class_code: null })
      .eq('uuid', userID);
    if (leaveClassError) {
      return;
    }
    setClassCode(null);
  };

  const handleJoinClass = async () => {
    const { error: joinClassError } = await supabase
      .from('student_class_code')
      .update({ class_code: tempClassCode })
      .eq('uuid', userID);
    if (joinClassError) {
      return;
    }
    setIsJoiningClass(false);
    setClassCode(tempClassCode);
  };

  const handleProfileChange = async (file, fileName = 'profilePicture') => {
    await onProfileChangeUtil(userID, file, fileName);
  };

  // Optionally, add a guard for userID before rendering:
  if (!userID) {
    return (
      <div className='w-full flex items-center justify-center h-screen'>
        <div className='font-content font-medium text-xl text-center w-full'>
          Loading...
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    supabase.auth.signOut().then(navigate('/auth/login'));
    localStorage.removeItem('lectureProgress');
    localStorage.removeItem('physicalFitnessData');
  };
  return (
    <section className='student-dashboard parent-container'>
      {isJoiningClass && (
        <JoinClass
          setTempClassCode={setTempClassCode}
          tempClassCode={tempClassCode}
          handleClose={() => setIsJoiningClass(false)}
          handleJoinClass={handleJoinClass}
        ></JoinClass>
      )}
      <div className='px-10 mt-5 mb-5 lg:mb-0 grid grid-cols-2 place-content-center w-full lg:w-fit lg:block '>
        <div>
          <h1 className='font-heading text-primary-blue text-4xl lg:text-5xl'>
            Dashboard
          </h1>
          <hr className='lg:w-90 border-1 border-primary-yellow mt-3' />
        </div>
        <div>
          <button
            className='lg:hidden ml-auto text-base font-bold font-content px-3 py-2 text-white bg-[#DB4E34] flex items-center gap-2 cursor-pointer'
            onClick={() => handleLogout()}
          >
            <LogOut className='w-6 h-6' /> Logout
          </button>
        </div>
      </div>
      <DashboardContainer>
        <div id='content' className='w-full '>
          <Banner
            name={studentName}
            classCode={classCode}
            onClassLeave={handleLeaveClass}
            onClassJoinOpen={() => setIsJoiningClass(true)}
          ></Banner>
          <div id='statistics' className='grid grid-cols-2 gap-5'>
            <div id='lectures'>
              <Statistics progress={lectureProgress} type='Lectures' />
            </div>
            <div id='quizzes'>
              <Statistics progress={quizProgress} type='Quizzes' />
            </div>
          </div>
          <div id='quiz-scores' className='w-full text-center'>
            {/* Quiz score here */} Quiz Score
          </div>
          <div
            id='physical-fitness-records'
            className='w-full text-center grid grid-cols-2 gap-5'
          >
            <button
              className='lg:p-7 lg:text-base text-xs p-5 bg-neutral-dark-blue text-white font-content rounded-md hover:brightness-90 cursor-pointer disabled:brightness-80 disabled:cursor-not-allowed'
              disabled={!preTestFinished}
              onClick={() => handlePreTestClick()}
            >
              VIEW PFT - PRE TEST RECORD
            </button>
            <button
              className='lg:p-7 lg:text-base text-xs p-5 bg-neutral-dark-blue text-white font-content rounded-md hover:brightness-90 cursor-pointer disabled:brightness-80 disabled:cursor-not-allowed'
              disabled={!postTestFinished}
              onClick={() => handlePostTestClick()}
            >
              VIEW PFT - POST TEST RECORD
            </button>
          </div>
        </div>
        <div
          id='profile'
          className='hidden sticky w-full h-full top-0 bg-white max-h-[80vh] lg:flex flex-col items-center justify-start'
        >
          <ProfileSidebar
            handleLogout={handleLogout}
            memoizedFile={memoizedFile}
            onProfileChange={handleProfileChange}
            name={studentName}
          />
        </div>
      </DashboardContainer>
    </section>
  );
}
