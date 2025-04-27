import { Lessons } from '@/utilities/Lessons';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeading from '@/components/PageHeading';
import { useEffect, useState } from 'react';
import LecturePDF from '@/components/LecturePDF';
import LectureVideo from '@/components/LectureVideo';
import ErrorMessage from '@/components/utilities/ErrorMessage';
import setDataToStorage from '@/utilities/setDataToStorage';
import useLectureProgress from '@/hooks/useLectureProgress';
import getDataFromStorage from '@/utilities/getDataFromStorage';
export default function LecturePage() {
  const { lessonNumber, lectureType } = useParams();
  const [isError, setIsError] = useState(false);
  const [isLectureDone, setIsLectureDone] = useState(false);
  const [isVideo, setIsVideo] = useState(() => {
    if (lectureType === 'video') {
      return true;
    } else if (lectureType === 'lecture') {
      return false;
    } else {
      return false;
    }
  });

  const navigate = useNavigate();
  const selectedLessonNumber = lessonNumber;
  const { lectureProgress, setLectureProgress } = useLectureProgress();

  useEffect(() => {
    if (lectureType !== 'video' && lectureType !== 'lecture') {
      setIsError(true);
    }
  }, [lectureType]);

  useEffect(() => {
    navigate(
      `/lectures/lecture/${selectedLessonNumber}/${
        isVideo ? 'video' : 'lecture'
      }`,
    );
  }, [isVideo, navigate, lectureType, selectedLessonNumber]);

  useEffect(() => {
    const storedProgress = getDataFromStorage('LectureProgress');
    if (storedProgress) {
      const currentLecture = storedProgress.find(
        (progress) => progress.key === Number(selectedLessonNumber),
      );

      if (currentLecture && currentLecture.status === 'Done') {
        setIsLectureDone(true);
      }
      const updatedProgress = storedProgress.map((progress) => {
        if (
          progress.key === Number(selectedLessonNumber) &&
          progress.status === 'Incomplete'
        ) {
          return { ...progress, status: 'Pending' };
        }
        return progress;
      });

      if (JSON.stringify(storedProgress) !== JSON.stringify(updatedProgress)) {
        setDataToStorage('LectureProgress', updatedProgress);
        setLectureProgress(updatedProgress);
      }
    } else {
      setDataToStorage('LectureProgress', lectureProgress);
    }
  }, [selectedLessonNumber, setLectureProgress, lectureProgress]);

  if (selectedLessonNumber > Lessons.length || isError) {
    return <ErrorMessage text={'Error 404'} subText={'Page not found'} />;
  }

  const lessonDetails = Lessons.find(
    (lesson) => lesson.key === Number(selectedLessonNumber),
  );
  const { pdf, introduction, title, videoLecture } = lessonDetails;

  const handleLectureFinish = () => {
    if (isLectureDone) return;

    const lectureToUpdate = lectureProgress.find(
      (lecture) => lecture.key === Number(selectedLessonNumber),
    );
    if (!lectureToUpdate) {
      console.error('Lecture not found!');
      return;
    }
    const updatedLecture = { ...lectureToUpdate, status: 'Done' };
    const updatedProgress = lectureProgress.map((lecture) =>
      lecture.key === Number(selectedLessonNumber) ? updatedLecture : lecture,
    );
    setLectureProgress(updatedProgress);
    setDataToStorage('LectureProgress', updatedProgress);
    setIsLectureDone(true);
  };

  return (
    <div id="lecture-page" className="h-fit min-h-screen bg-gray-background">
      <PageHeading text="Lecture & Video Lessons"></PageHeading>
      <div
        id="content"
        className="w-[80%] h-fit flex flex-col mr-auto ml-auto mt-5 items-center relative"
      >
        <button
          id="switch"
          onClick={() => {
            setIsVideo((prev) => !prev);
          }}
          className="w-fit self-start px-5 mb-3 border-2 border-accent-blue py-2 text-xl font-content bg-secondary-dark-blue text-white hover:bg-accent-blue hover:text-white transition-all"
        >
          {isVideo ? 'READ DOCUMENT' : 'WATCH VIDEO LECTURE'}
        </button>
        <div
          className={`${
            isVideo ? 'hidden' : 'block'
          } transition-opacity duration-300`}
        >
          <LecturePDF
            lectureNumber={selectedLessonNumber}
            title={title}
            introduction={introduction}
            pdfLink={pdf}
            quizLink={''}
            onTimerEnd={() => handleLectureFinish()}
            isLectureDone={isLectureDone}
          />
        </div>
        <div
          className={`${
            isVideo ? 'block' : 'hidden'
          } transition-opacity duration-300`}
        >
          <LectureVideo
            lectureNumber={selectedLessonNumber}
            title={title}
            introduction={introduction}
            videoLink={videoLecture}
            quizLink={''}
            onVideoFinish={() => handleLectureFinish()}
            isLectureDone={isLectureDone}
          />
        </div>
      </div>
    </div>
  );
}
