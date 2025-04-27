import { Timer } from '@/components/utilities/Timer';
import { useNavigate } from 'react-router-dom';

export default function LecturePDF({
  lectureNumber,
  introduction,
  title,
  quizLink,
  pdfLink,
  isLectureDone = false,
  onTimerEnd = () => {
    console.log('end');
  },
}) {
  const navigate = useNavigate();

  return (
    <div
      id="video-lecture"
      className="w-full border-secondary-dark-blue border-3 rounded-2xl bg-white overflow-hidden mb-10"
    >
      <h2 className="py-3 px-5 font-content font-medium text-xl bg-secondary-dark-blue text-white rounded-tl-xl rounded-tr-xl">
        Lecture #{lectureNumber}:{' '}
        <span className="font-normal ml-3">{title}</span>
      </h2>
      <div
        id="lecture-content"
        className="flex flex-row min-h-full w-full justify-around gap-5 p-10 bg-background"
      >
        <iframe src={pdfLink} className="w-[65%] rounded-lg "></iframe>
        <div
          id="lecture-description"
          className="w-[30%] flex flex-col relative font-content"
        >
          <div
            id="introduction"
            className="flex flex-row flex-wrap space-x-5 mb-3 justify-start"
          >
            <p>Introduction</p>
            <Timer
              className="flex flex-row items-center w-30 justify-between"
              time={5}
              onEnd={() => {
                onTimerEnd();
              }}
            ></Timer>
          </div>
          <ul className="pt-3 pb-5">
            <li className="ml-5 list-disc">{introduction}</li>
          </ul>
          <div
            id="button-group"
            className="mt-30 flex justify-center items-center flex-col"
          >
            <p className="text-center mb-5 font-md ">
              Finished Learning? Test your knowledge and take the quiz!
            </p>
            <button
              onClick={() => {
                if (!isLectureDone) {
                  navigate('not-found');
                  return;
                }
                console.log(quizLink);
              }}
              disabled={isLectureDone ? undefined : true}
              className="w-full py-2 text-lg text-white bg-accent-blue hover:brightness-90 disabled:brightness-50"
            >
              TAKE QUIZ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
