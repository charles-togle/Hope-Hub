import { Lessons } from '@/utilities/Lessons';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeading from '@/components/PageHeading';
import { useEffect, useState } from 'react';
import LecturePDF from '@/components/lectures/LecturePDF';
import LectureVideo from '@/components/lectures/LectureVideo';
import ErrorMessage from '@/components/utilities/ErrorMessage';
import supabase from '@/client/supabase';
import { useUserId } from '@/hooks/useUserId';
import LectureProgress from '@/utilities/LectureProgress';
export default function LecturePage () {
  const { lessonNumber, lectureType } = useParams();
  const navigate = useNavigate();
  const userId = useUserId();
  const [isError, setIsError] = useState(false);
  const [isLectureDone, setIsLectureDone] = useState(false);
  const [isVideo, setIsVideo] = useState(lectureType === 'video');
  const [lectureProgress, setLectureProgress] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const selectedLessonNumber = Number(lessonNumber);

  const lessonDetails = Lessons.find(
    lesson => lesson.key === selectedLessonNumber,
  );

  // Fetch lecture progress from DB on mount
  useEffect(() => {
    if (!userId) return;
    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from('lecture_progress')
        .select('lecture_progress')
        .eq('uuid', userId)
        .single();
      if (error || !data || !data.lecture_progress) {
        setLectureProgress(LectureProgress());
      } else {
        setLectureProgress(data.lecture_progress);
      }
      setDataLoaded(true);
    };
    fetchProgress();
  }, [userId]);

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

  // Mark as pending if not done, and update DB
  useEffect(() => {
    if (!userId) return;
    if (!dataLoaded) return;
    if (!lectureProgress || lectureProgress.length === 0) return;
    const updateProgress = async () => {
      const updatedProgress = lectureProgress.map(progress => {
        if (progress.key === selectedLessonNumber) {
          if (progress.status === 'Done') setIsLectureDone(true);
          if (progress.status === 'Incomplete')
            return { ...progress, status: 'Pending' };
        }
        return progress;
      });
      const isChanged =
        JSON.stringify(lectureProgress) !== JSON.stringify(updatedProgress);
      if (isChanged) {
        setLectureProgress(updatedProgress);
        await supabase
          .from('lecture_progress')
          .update({ lecture_progress: updatedProgress })
          .eq('uuid', userId);
      }
    };
    updateProgress();
  }, [lectureProgress, selectedLessonNumber, dataLoaded, userId]);

  // Handler: when lecture/video is finished
  const handleLectureFinish = async () => {
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
    setIsLectureDone(true);
    // Update remote DB
    await supabase
      .from('lecture_progress')
      .update({ lecture_progress: updatedProgress })
      .eq('uuid', userId);
  };

  // Render: error message
  if (!lessonDetails || isError) {
    return <ErrorMessage text='Error 404' subText='Page not found' />;
  }
  if (!dataLoaded) {
    return (
      <div className='w-full flex items-center justify-center h-screen'>
        <div className='font-content font-medium text-xl text-center w-full'>
          Loading...
        </div>
      </div>
    );
  }

  const { pdf, introduction, title, videoLecture, quizLink } = lessonDetails;

  return (
    <section id='lecture-page' className='min-h-screen bg-gray-background'>
      <PageHeading text='Lecture & Video Lessons' />
      <div className='w-[90%] lg:w-[80%] mx-auto mt-5 flex flex-col items-center'>
        <button
          id='switch'
          onClick={() => setIsVideo(prev => !prev)}
          className='px-5 mb-3 py-2 text-xl self-start font-content border-2 border-accent-blue bg-secondary-dark-blue text-white hover:bg-accent-blue transition-all'
        >
          {isVideo ? 'READ DOCUMENT' : 'WATCH VIDEO LECTURE'}
        </button>

        {!isVideo && (
          <LecturePDF
            lectureNumber={selectedLessonNumber}
            title={title}
            introduction={introduction}
            pdfLink={pdf}
            quizLink={quizLink}
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
            quizLink={quizLink}
            onVideoFinish={handleLectureFinish}
            isLectureDone={isLectureDone}
          />
        )}
      </div>
    </section>
  );
}
