import { Timer } from '@/components/utilities/Timer';
import { useNavigate } from 'react-router-dom';

export default function LecturePDF ({
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
      id='pdf-lecture'
      className='w-full border-secondary-dark-blue border-3 rounded-2xl bg-white overflow-hidden mb-10'
    >
      <h2 className='py-3 px-5 font-content font-medium text-xl bg-secondary-dark-blue text-white rounded-tl-xl rounded-tr-xl'>
        Lecture #{lectureNumber}:{' '}
        <span className='font-normal ml-3'>{title}</span>
      </h2>
      <div
        id='lecture-content'
        className='grid min-h-full w-full p-2 pt-5 pb-5 lg:p-10 bg-background lg:grid-cols-[65%_30%] lg:grid-row-2 lg:gap-x-10 md:grid-cols-[65%_30%] md:grid-row-2 md:gap-x-5'
      >
        <iframe
          src={pdfLink}
          className='mt-5 row-start-2 h-150 rounded-lg w-full lg:h-full lg:row-span-2 lg:mt-0 md:row-span-2'
        ></iframe>
        <div
          id='lecture-description'
          className='w-full flex flex-col relative font-content'
        >
          <div
            id='introduction'
            className=' flex flex-row flex-wrap space-x-5 mb-3 justify-start lg:text-base'
          >
            <p>Introduction</p>
            <Timer
              className='flex flex-row items-center w-30 justify-between'
              time={300}
              onEnd={() => {
                onTimerEnd();
              }}
            ></Timer>
          </div>
          <ul className='pt-3 pb-5 text-sm lg:text-base'>
            <li className='ml-5 list-disc'>{introduction}</li>
          </ul>
        </div>

        <div
          id='button-group'
          className='mt-10 font-content lg:col-start-2 md:col-start-2 flex justify-center items-center flex-col lg:mt-30 '
        >
          <p className='text-center mb-5 font-md '>
            Finished Learning? Test your knowledge and take the quiz!
          </p>
          <button
            onClick={() => {
              if (!isLectureDone) {
                navigate('not-found');
                return;
              }
              navigate(quizLink);
            }}
            disabled={isLectureDone ? undefined : true}
            className='w-[50%] py-2 text-lg text-white bg-secondary-dark-blue hover:brightness-90 disabled:brightness-50 lg:w-full md:w-full lg:py-5'
          >
            TAKE QUIZ
          </button>
        </div>
      </div>
    </div>
  );
}
