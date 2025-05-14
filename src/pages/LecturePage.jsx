import { Lessons } from '@/utilities/Lessons';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeading from '@/components/PageHeading';
import { useEffect, useState, useId } from 'react';
import LecturePDF from '@/components/LecturePDF';
import LectureVideo from '@/components/LectureVideo';
import ErrorMessage from '@/components/utilities/ErrorMessage';
import setDataToStorage from '@/utilities/setDataToStorage';
import getDataFromStorage from '@/utilities/getDataFromStorage';
import useLectureProgress from '@/hooks/useLectureProgress';
import supabase from '@/client/supabase';

export default function LecturePage () {
  const { lessonNumber, lectureType } = useParams();
  const navigate = useNavigate();
  // const userId = useId();
  const userId = '5c4ffb4f-420c-448c-8abe-7f9b319060a9';
  const [isError, setIsError] = useState(false);
  const [isLectureDone, setIsLectureDone] = useState(false);
  const [isVideo, setIsVideo] = useState(lectureType === 'video');
  const { lectureProgress, setLectureProgress } = useLectureProgress();
  const selectedLessonNumber = Number(lessonNumber);

  const lessonDetails = Lessons.find(
    lesson => lesson.key === selectedLessonNumber,
  );

  // Guard: invalid lectureType or out of bounds lesson
  useEffect(() => {
    if (
      !['video', 'lecture'].includes(lectureType) ||
      selectedLessonNumber > Lessons.length
    ) {
      setIsError(true);
    }
  }, [lectureType, selectedLessonNumber]);

  // Ensure correct route format based on isVideo state
  useEffect(() => {
    navigate(
      `/lectures/lecture/${selectedLessonNumber}/${
        isVideo ? 'video' : 'lecture'
      }`,
    );
  }, [isVideo, selectedLessonNumber, navigate]);

  // Sync progress between localStorage and Supabase
  useEffect(() => {
    const storedProgress = getDataFromStorage('LectureProgress');

    // Helper: update both local and remote progress
    const updateProgress = async updatedProgress => {
      setDataToStorage('LectureProgress', updatedProgress);
      setLectureProgress(updatedProgress);
      const { data, error } = await supabase
        .from('lecture_progress')
        .update({ lecture_progress: updatedProgress })
        .eq('uuid', userId)
        .select();
      if (error) console.error('Update error:', error.message);
      else {
        console.log(data);
      }
    };

    // Helper: insert new user progress
    const insertInitialProgress = async () => {
      const { data, error } = await supabase
        .from('lecture_progress')
        .insert({ uuid: userId, lecture_progress: lectureProgress });
      if (error) console.error('Insert error:', error.message);
      else {
        console.log(data);
      }
    };

    if (storedProgress) {
      const updatedProgress = storedProgress.map(progress => {
        if (progress.key === selectedLessonNumber) {
          if (progress.status === 'Done') setIsLectureDone(true);
          if (progress.status === 'Incomplete')
            return { ...progress, status: 'Pending' };
        }
        return progress;
      });

      const isChanged =
        JSON.stringify(storedProgress) !== JSON.stringify(updatedProgress);
      if (isChanged) updateProgress(updatedProgress);
    } else {
      insertInitialProgress();
      setDataToStorage('LectureProgress', lectureProgress);
    }
  }, [lectureProgress, selectedLessonNumber, setLectureProgress, userId]);

  // Handler: when lecture/video is finished
  const handleLectureFinish = () => {
    if (isLectureDone) return;

    const lectureToUpdate = lectureProgress.find(
      p => p.key === selectedLessonNumber,
    );
    if (!lectureToUpdate)
      return console.error('Lecture not found in progress!');

    const updatedProgress = lectureProgress.map(p =>
      p.key === selectedLessonNumber ? { ...p, status: 'Done' } : p,
    );

    setLectureProgress(updatedProgress);
    setDataToStorage('LectureProgress', updatedProgress);
    setIsLectureDone(true);

    // Also update remote DB
    supabase
      .from('lecture_progress')
      .update({ lecture_progress: updatedProgress })
      .eq('uuid', userId)
      .then(({ error }) => {
        if (error) console.error('Update on finish error:', error.message);
      });
  };

  // Render: error message
  if (!lessonDetails || isError) {
    return <ErrorMessage text='Error 404' subText='Page not found' />;
  }

  const { pdf, introduction, title, videoLecture } = lessonDetails;

  return (
    <div id='lecture-page' className='min-h-screen bg-gray-background'>
      <PageHeading text='Lecture & Video Lessons' />
      <div className='w-[90%] lg:w-[80%] mx-auto mt-5 flex flex-col items-center'>
        <button
          id='switch'
          onClick={() => setIsVideo(prev => !prev)}
          className='px-5 mb-3 py-2 text-xl font-content border-2 border-accent-blue bg-secondary-dark-blue text-white hover:bg-accent-blue transition-all'
        >
          {isVideo ? 'READ DOCUMENT' : 'WATCH VIDEO LECTURE'}
        </button>

        {!isVideo && (
          <LecturePDF
            lectureNumber={selectedLessonNumber}
            title={title}
            introduction={introduction}
            pdfLink={pdf}
            quizLink=''
            onTimerEnd={handleLectureFinish}
            isLectureDone={isLectureDone}
          />
        )}

        {isVideo && (
          <LectureVideo
            lectureNumber={selectedLessonNumber}
            title={title}
            introduction={introduction}
            videoLink={videoLecture}
            quizLink=''
            onVideoFinish={handleLectureFinish}
            isLectureDone={isLectureDone}
          />
        )}
      </div>
    </div>
  );
}
