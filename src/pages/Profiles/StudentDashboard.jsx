import Banner from '@/components/dashboard/Banner';
import Statistics from '@/components/dashboard/Statistics';
import ProfilePicture from '@/components/dashboard/ProfilePicture';
import Container from '@/components/dashboard/Container';
import { LogOut } from 'lucide-react';

export default function StudentDashboard () {
  let sampleProgress = {
    completed: 7,
    incomplete: 10,
    pending: 8,
  };
  sampleProgress = {
    ...sampleProgress,
    total: Object.values(sampleProgress).reduce((acc, value) => acc + value, 0),
  };
  const studentName = 'Charles Nathaniel Togle';
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
            <button className='p-7 bg-neutral-dark-blue text-white font-content rounded-md hover:brightness-90 cursor-pointer'>
              VIEW PFT - PRE TEST RECORD
            </button>
            <button className='p-7 bg-neutral-dark-blue text-white font-content rounded-md hover:brightness-90 cursor-pointer'>
              VIEW PFT - POST TEST RECORD
            </button>
          </div>
        </div>
        <div
          id='profile'
          className='sticky w-full h-full top-0 bg-white max-h-[80vh] flex flex-col items-center justify-start'
        >
          <Container className='h-full mt-0! flex flex-col items-center pt-5 space-y-5 relative'>
            <ProfilePicture />
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
