import { Lessons } from '@/utilities/Lessons';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeading from '@/components/PageHeading';
import { useState, useEffect } from 'react';
import LecturePDF from '@/components/LecturePDF';
import LectureVideo from '@/components/LectureVideo';
import ErrorMessage from '@/components/utilities/ErrorMessage';

export default function LecturePage() {
  const { lessonNumber, lectureType } = useParams();
  const [isError, setIsError] = useState(false);
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

  useEffect(() => {
    if (lectureType !== 'video' && lectureType !== 'lecture') {
      setIsError(true);
    }
  }, [lectureType]);

  useEffect(()=>{
    navigate(`/lectures/lecture/${selectedLessonNumber}/${isVideo ? "video" : "lecture"}`)
  }, [isVideo, navigate, lectureType, selectedLessonNumber])


  if (selectedLessonNumber > Lessons.length || isError) {
    return <ErrorMessage text={'Error 404'} subText={'Page not found'} />;
  }

  const lessonDetails = Lessons.find(
    (lesson) => lesson.key === Number(selectedLessonNumber),
  );
  const { pdf, introduction, title, videoLecture } = lessonDetails;

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
          className="w-fit self-start px-5 mb-3 border-2 border-accent-blue py-2 text-xl font-content bg-white hover:bg-accent-blue hover:text-white transition-all"
        >
          {isVideo ? 'READ DOCUMENT' : 'WATCH VIDEO LECTURE'}
        </button>
        {isVideo ? (
          <LectureVideo
            lectureNumber={selectedLessonNumber}
            title={title}
            introduction={introduction}
            videoLink={videoLecture}
            quizLink={''}
          />
        ) : (
          <LecturePDF
            lectureNumber={selectedLessonNumber}
            title={title}
            introduction={introduction}
            pdfLink={pdf}
            quizLink={''}
          />
        )}
      </div>
    </div>
  );
}
