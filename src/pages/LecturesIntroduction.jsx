import PageHeading from '@/components/PageHeading';
import LectureIntroduction from '@/components/LectureIntroComponent';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Lessons } from '@/utilities/Lessons';
import getDataFromStorage from '@/utilities/getDataFromStorage';
import setDataToStorage from '@/utilities/setDataToStorage';
import useLectureProgress from '@/hooks/useLectureProgress';
import supabase from '@/client/supabase';

export default function Lectures () {
  const [dataLoaded, setDataLoaded] = useState(false);
  const { lectureProgress, setLectureProgress } = useLectureProgress();
  const [activeLessons, setActiveLessons] = useState(Lessons);
  const [activeFilter, setActiveFilter] = useState('All');
  const [storedProgress, setStoredProgress] = useState(null);
  const LectureFilters = ['All', 'Done', 'Pending', 'Incomplete'];
  const userId = '5c4ffb4f-420c-448c-8abe-7f9b319060a9';

  const insertInitialProgress = async () => {
    const { data, error } = await supabase
      .from('lecture_progress')
      .upsert({ uuid: userId, lecture_progress: lectureProgress });
    if (error) {
      console.error('Upsert error:', error.message);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    const fetchProgressFromDB = async () => {
      // Query Supabase for user's lecture progress
      const { data, error } = await supabase
        .from('lecture_progress')
        .select('lecture_progress')
        .eq('uuid', userId)
        .single();

      if (error) {
        console.error('Error fetching progress:', error.message);
        // If DB fetch fails, set default progress
        setDataToStorage('LectureProgress', lectureProgress);
        setLectureProgress(lectureProgress);
        insertInitialProgress();
      } else if (data && data.lecture_progress) {
        // If DB has data, use it for localStorage and state
        setDataToStorage('LectureProgress', data.lecture_progress);
        setLectureProgress(data.lecture_progress);
        setStoredProgress(data.lecture_progress);
      } else {
        // If no data in DB, set default progress
        setDataToStorage('LectureProgress', lectureProgress);
        setLectureProgress(lectureProgress);
        insertInitialProgress();
      }
      setDataLoaded(true);
    };

    // Check localStorage first
    const localProgress = getDataFromStorage('LectureProgress');
    setStoredProgress(localProgress);

    if (!localProgress || Object.keys(localProgress).length === 0) {
      // If not in localStorage, get from DB
      fetchProgressFromDB();
    } else if (!dataLoaded) {
      // If in localStorage, just update state
      setLectureProgress(localProgress);
      setDataLoaded(true);
    }
  }, [setLectureProgress, dataLoaded, lectureProgress, userId]);

  const handleFilterChange = useCallback(
    filter => {
      if (!storedProgress || Object.keys(storedProgress).length === 0) {
        return;
      }
      const mergedLessons = Lessons.map(lesson => {
        const progress = storedProgress.find(
          progress => progress.key === lesson.key,
        );
        return {
          ...lesson,
          status: progress ? progress.status : 'Incomplete',
        };
      });

      const filteredLessons = mergedLessons.filter(lesson => {
        if (filter === 'All') return true;
        return lesson.status === filter;
      });

      setActiveFilter(filter);
      setActiveLessons(filteredLessons);
    },
    [storedProgress],
  );

  useEffect(() => {
    handleFilterChange('All');
  }, [handleFilterChange]);
  return (
    <div
      id='lectures'
      className='overflow-x-hidden h-screen bg-background overflow-y-scroll'
    >
      <PageHeading
        text='Lectures & Video Lessons'
        className='bg-background z-2'
      ></PageHeading>
      <div
        id='lectures-container'
        className='w-[90%] flex flex-col items-center mr-auto ml-auto relative mb-10 lg:w-[80%]'
      >
        <div
          id='buttons-wrapper'
          className='sticky top-0 pt-[3%] pb-[2%] self-start w-full flex flex-col-reverse items-center justify-between flex-wrap bg-background z-10 lg:flex-nowrap lg:flex-row'
        >
          <div
            id='buttons'
            className='rounded-sm bg-secondary-dark-blue w-full h-fit flex justify-between flex-nowrap lg:w-fit'
          >
            {LectureFilters.map((filter, index) => (
              <button
                key={index}
                onClick={() => handleFilterChange(filter)}
                className={`${
                  filter === activeFilter
                    ? 'bg-primary-yellow rounded-sm text-secondary-dark-blue!'
                    : ''
                } text-white text-center font-content py-2 min-w-1/8 px-2 text-sm lg:w-auto lg:px-5`}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className='font-content text-xs w-full text-wrap self-start mb-5 lg:text-base lg:w-6/10 lg:mb-0 lg:pl-5'>
            <strong>Note:</strong> You can only take the quiz after reading or
            watching the lecture. (Lecture will be automatically marked as done
            after taking the quiz.)
          </p>
        </div>
        <div
          id='lecture-introductions'
          className='flex justify-center space-y-3 flex-col items-center overflow-auto mt-5'
        >
          {activeLessons.length !== 0 ? (
            activeLessons.map((lesson, index) => (
              <LectureIntroduction
                lectureKey={lesson.key}
                key={index}
                title={lesson.title}
                introduction={lesson.introduction}
                status={lesson.status}
              ></LectureIntroduction>
            ))
          ) : (
            <p className='font-content font-bold text-2xl pt-15'>
              No Available Data
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
