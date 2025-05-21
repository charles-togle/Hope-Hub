import Banner from '@/components/dashboard/Banner';
import Statistics from '@/components/dashboard/Statistics';
import ProfilePicture from '@/components/dashboard/ProfilePicture';
import Container from '@/components/dashboard/Container';
import { LogOut } from 'lucide-react';
import supabase from '@/client/supabase';
import { useUserId } from '@/hooks/useId';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const checkIfFinished = async column => {
    const resolvedUserId = await Promise.resolve(userID);
    const { data: existing, error: fetchError } = await supabase
      .from('physical_fitness_test')
      .select(column)
      .eq('uuid', resolvedUserId)
      .single();

    if (existing[column] && existing[column].finishedTestIndex) {
      const { finishedTestIndex } = existing[column];
      return (
        finishedTestIndex &&
        finishedTestIndex.includes(finishedTestIndex.length - 1)
      );
    }
  };

  useEffect(() => {
    isPreTestFinished().then(setPreTestFinished);
    isPostTestFinished().then(setPostTestFinished);
  }, []);

  useEffect(() => {
    async function retrieveProfile () {
      const resolvedUserId = await Promise.resolve(userID);
      if (!resolvedUserId) {
        setProfilePictureFile(null);
        return;
      }
      const filePath = `${resolvedUserId}/profilePicture`;
      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .download(filePath);
      if (error) {
        setProfilePictureFile(null);
        return;
      }
      if (data) {
        setProfilePictureFile(data);
      }
    }
    retrieveProfile();
  }, [userID]);

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

  const onProfileChange = async (file, fileName = 'profilePicture') => {
    const resolvedUserId = await Promise.resolve(userID);
    const bucketName = 'profile-pictures';
    const folderName = resolvedUserId;
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
      const resolvedUserId = await Promise.resolve(userID);
      if (!resolvedUserId) {
        setStudentName('');
        return;
      }
      const { data, error } = await supabase
        .from('profile')
        .select('full_name')
        .eq('uuid', resolvedUserId)
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
    localStorage.removeItem('lecture_progress');
    localStorage.removeItem('physical_fitness_data');
  };
  return (
    <section className='StudentDashboard parent-container'>
      <div className='content-container grid! grid-cols-[75%_25%] w-[93%]! gap-x-10 pt-10! relative'>
        <div className='col-span-2'>
          <h1 className='font-heading text-primary-blue text-5xl'>Dashboard</h1>
          <hr className='w-90 border-1 border-primary-yellow mt-3 mb-3' />
        </div>
        <div id='content' className='w-full '>
          <Banner name={studentName}></Banner>
          <div id='statistics' className='grid grid-cols-2 gap-5'>
            <div id='lectures'>
              <Statistics progress={sampleProgress} type='Lectures' />
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
            <button className='font-bold text-red text-xl absolute bottom-1 mb-10 flex items-center gap-2 hover:brightness-75'>
              <LogOut className='w-6 h-6' /> Logout
            </button>
          </Container>
        </div>
      </div>
    </section>
  );
}
