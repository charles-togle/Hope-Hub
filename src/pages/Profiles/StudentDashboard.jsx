import Banner from '@/components/dashboard/Banner';
import Statistics from '@/components/dashboard/Statistics';
import ProfilePicture from '@/components/dashboard/ProfilePicture';
import Container from '@/components/dashboard/Container';
import { LogOut } from 'lucide-react';
import supabase from '@/client/supabase';
import { useUserId } from '@/hooks/useUserId';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinClass from '@/components/dashboard/JoinClass';

export default function StudentDashboard () {
  const [preTestFinished, setPreTestFinished] = useState(false);
  const [postTestFinished, setPostTestFinished] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [lectureProgress, setLectureProgress] = useState({
    completed: 0,
    incomplete: 0,
    pending: 0,
    total: 10,
  });
  const [isDataReady, setIsDataReady] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [classCode, setClassCode] = useState(null);
  const [tempClassCode, setTempClassCode] = useState(''); //for setting new class code
  const [isJoiningClass, setIsJoiningClass] = useState(false);

  const userID = useUserId();
  const navigate = useNavigate();
  const memoizedFile = useMemo(
    () => profilePictureFile,
    [profilePictureFile?.name, profilePictureFile?.size],
  );

  let sampleProgress = {
    completed: 7,
    incomplete: 10,
    pending: 8,
  };
  sampleProgress = {
    ...sampleProgress,
    total: Object.values(sampleProgress).reduce((acc, value) => acc + value, 0),
  };
  const getLectureProgress = async () => {
    if (!userID) return;
    const { data, error } = await supabase
      .from('lecture_progress')
      .select('lecture_progress')
      .eq('uuid', userID)
      .single();

    if (error) {
      console.error('error fetching lecture progress: ', error.message);
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
        .from('class_code')
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
        setClassCode(classCode[0]);
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
    if (!isDataReady) return;
    isPreTestFinished().then(setPreTestFinished);
    isPostTestFinished().then(setPostTestFinished);
  }, [isDataReady]);

  useEffect(() => {
    if (!isDataReady) return;
    async function retrieveProfile () {
      if (!userID || typeof userID !== 'string') {
        setProfilePictureFile(null);
        return;
      }
      const folder = userID;
      const fileName = 'profilePicture';
      const { data: files, error: listError } = await supabase.storage
        .from('profile-pictures')
        .list(folder);

      if (listError) {
        console.error('Error listing files:', listError.message);
        setProfilePictureFile(null);
        return;
      }

      const fileExists = files?.some(file => file.name === fileName);

      if (!fileExists) {
        setProfilePictureFile(null);
        return;
      }

      const filePath = `${folder}/${fileName}`;
      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .download(filePath);

      if (error || !data) {
        setProfilePictureFile(null);
        return;
      }
      setProfilePictureFile(data);
    }

    retrieveProfile();
  }, [isDataReady]);

  const checkIfFinished = async column => {
    if (!userID) return;
    const { data: existing, error: fetchError } = await supabase
      .from('physical_fitness_test')
      .select(column)
      .eq('uuid', userID)
      .single();

    if (fetchError) {
      console.error('error fetching data', fetchError.message);
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
      .from('class_code')
      .update({ class_code: null })
      .eq('uuid', userID);
    if (leaveClassError) {
      console.log(
        'there was a problem leaving class: ',
        leaveClassError.message,
      );
      return;
    }
    setClassCode(null);
  };

  const handleJoinClass = async () => {
    console.log(tempClassCode);
    const { error: joinClassError } = await supabase
      .from('class_code')
      .update({ class_code: [tempClassCode] })
      .eq('uuid', userID);
    if (joinClassError) {
      console.log(
        'there was a problem joining class: ',
        joinClassError.message,
      );
      return;
    }
    setIsJoiningClass(false);
    setClassCode(tempClassCode);
  };

  const onProfileChange = async (file, fileName = 'profilePicture') => {
    if (!userID) return;
    const bucketName = 'profile-pictures';
    const folderName = userID;
    const filePath = `${folderName}/${fileName}`;
    const supabaseClient = supabase;

    // Delete existing file first
    await supabaseClient.storage.from(bucketName).remove([filePath]);

    // Then upload new one
    const { data, error } = await supabaseClient.storage
      .from(bucketName)
      .upload(filePath, file, { contentType: file.type, upsert: true });

    if (error) {
      console.error('Profile picture upload error:', error.message);
    } else {
      console.log('Profile picture uploaded:', data);
    }
  };

  useEffect(() => {
    if (!isDataReady) return;
    async function fetchStudentName () {
      if (!userID) {
        setStudentName('');
        return;
      }
      const { data, error } = await supabase
        .from('profile')
        .select('full_name')
        .eq('uuid', userID)
        .single();
      if (error || !data) {
        setStudentName('');
      } else {
        setStudentName(data.full_name || '');
      }
    }
    fetchStudentName();
  }, [isDataReady, userID]);

  if (!isDataReady) {
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
    <section className='StudentDashboard parent-container'>
      {isJoiningClass && (
        <JoinClass
          setTempClassCode={setTempClassCode}
          tempClassCode={tempClassCode}
          handleClose={() => setIsJoiningClass(false)}
          handleJoinClass={handleJoinClass}
        ></JoinClass>
      )}
      <div className='content-container grid! grid-cols-[75%_25%] w-[93%]! gap-x-10 pt-10! relative'>
        <div className='col-span-2'>
          <h1 className='font-heading text-primary-blue text-5xl'>Dashboard</h1>
          <hr className='w-90 border-1 border-primary-yellow mt-3 mb-3' />
        </div>
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
              <Statistics progress={sampleProgress} type='Quizzes' />
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
              className='p-7 bg-neutral-dark-blue text-white font-content rounded-md hover:brightness-90 cursor-pointer disabled:brightness-80 disabled:cursor-not-allowed'
              disabled={!preTestFinished}
              onClick={() => handlePreTestClick()}
            >
              VIEW PFT - PRE TEST RECORD
            </button>
            <button
              className='p-7 bg-neutral-dark-blue text-white font-content rounded-md hover:brightness-90 cursor-pointer disabled:brightness-80 disabled:cursor-not-allowed'
              disabled={!postTestFinished}
              onClick={() => handlePostTestClick()}
            >
              VIEW PFT - POST TEST RECORD
            </button>
          </div>
        </div>
        <div
          id='profile'
          className='sticky w-full h-full top-0 bg-white max-h-[80vh] flex flex-col items-center justify-start'
        >
          <Container className='h-full mt-0! flex flex-col items-center pt-5 space-y-5 relative'>
            <ProfilePicture
              onProfileChange={onProfileChange}
              initialFile={memoizedFile}
            />
            <div
              id='profile-details'
              className='w-full flex flex-col items-center space-y-2'
            >
              <p className='text-neutral-dark-blue font-bold text-xl'>
                {studentName}
              </p>
              <hr className='w-[50%] border-1 border-primary-yellow' />
              <p className='text-neutral-dark-blue font-md text-base'>
                Student
              </p>
            </div>
            <button
              className='font-bold text-red text-xl absolute bottom-1 mb-10 flex items-center gap-2 hover:brightness-75'
              onClick={() => handleLogout()}
            >
              <LogOut className='w-6 h-6' /> Logout
            </button>
          </Container>
        </div>
      </div>
    </section>
  );
}
