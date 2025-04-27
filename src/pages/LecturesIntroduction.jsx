import PageHeading from '@/components/PageHeading';
import LectureIntroduction from '@/components/LectureIntroComponent';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Lessons } from '@/utilities/Lessons';
import getDataFromStorage from '@/utilities/getDataFromStorage';
import setDataToStorage from '@/utilities/setDataToStorage';
import useLectureProgress from '@/hooks/useLectureProgress';

export default function Lectures() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const { lectureProgress, setLectureProgress } = useLectureProgress();
  const [activeLessons, setActiveLessons] = useState(Lessons);
  const [activeFilter, setActiveFilter] = useState('All');
  const storedProgress = useRef(null);
  const LectureFilters = ['All', 'Done', 'Pending', 'Incomplete'];
  const handleFilterChange = useCallback((filter) => {
    const mergedLessons = Lessons.map((lesson) => {
      const progress = storedProgress.current.find(
        (progress) => progress.key === lesson.key,
      );
      return {
        ...lesson,
        status: progress ? progress.status : 'Incomplete',
      };
    });

    const filteredLessons = mergedLessons.filter((lesson) => {
      if (filter === 'All') return true;
      return lesson.status === filter;
    });

    setActiveFilter(filter);
    setActiveLessons(filteredLessons);
  }, []);

  useEffect(() => {
    storedProgress.current = getDataFromStorage('LectureProgress');
    if (
      !storedProgress.current ||
      Object.keys(storedProgress.current).length === 0
    ) {
      setDataToStorage('LectureProgress', lectureProgress);
      setLectureProgress(lectureProgress);
    } else if (!dataLoaded) {
      setLectureProgress(storedProgress.current);
    }
    setDataLoaded(true);
  }, [setLectureProgress, dataLoaded, lectureProgress]);

  useEffect(() => {
    handleFilterChange('All');
  }, [handleFilterChange]);
  return (
    <div id="lectures" className="h-screen bg-background overflow-y-scroll">
      <PageHeading
        text="Lectures & Video Lessons"
        className="bg-background z-2"
      ></PageHeading>
      <div
        id="lectures-container"
        className="w-[80%] flex flex-col items-center mr-auto ml-auto relative"
      >
        <div
          id="buttons-wrapper"
          className="sticky top-0 pt-[3%] pb-[2%] self-start w-full flex flex-row-reverse justify-between bg-background z-10"
        >
          <p className="font-content text-sm w-[60%] text-wrap">
            <strong>Note: </strong>You can only take the quiz after reading or
            watching the lecture. (Lecture will be automatically marked as done
            after taking the quiz.)
          </p>
          <div
            id="buttons"
            className="rounded-sm bg-secondary-dark-blue w-fit h-fit flex flex-nowrap"
          >
            {LectureFilters.map((filter, index) => (
              <button
                key={index}
                onClick={() => handleFilterChange(filter)}
                className={`${
                  filter === activeFilter
                    ? 'bg-primary-yellow rounded-sm text-secondary-dark-blue!'
                    : ''
                } text-white font-content py-2 px-5`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div
          id="lecture-introductions"
          className="flex justify-center space-y-3 flex-col items-center overflow-auto mt-[2%]"
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
            <p className="font-content font-bold text-2xl pt-15">
              No Available Data
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
