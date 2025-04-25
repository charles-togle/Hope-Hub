import { useEffect, useRef, useState } from 'react';

export default function LectureVideo({
  lectureNumber,
  title,
  introduction,
  quizLink,
  videoLink,
  onVideoFinish = () => {
    console.log('Video Finished');
  },
}) {
  const [progressSeconds, setProgressSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef(null);
  const videoRef = useRef(null);

  const startOrToggleProgress = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        if (videoRef.current) {
          setProgressSeconds(Math.floor(videoRef.current.currentTime));
        }
      }, 1000);
      console.log('Progress started');
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log('Progress paused');
    }
  };

  const stopProgress = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    console.log('Progress stopped');
  };

  const handleSeeked = () => {
    if (videoRef.current) {
      const actualTime = Math.floor(videoRef.current.currentTime);
      setProgressSeconds(actualTime);
      console.log('Seeked to', actualTime, 'seconds');
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && intervalRef.current === null) {
      const actualTime = Math.floor(videoRef.current.currentTime);
      setProgressSeconds(actualTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      setDuration(Math.floor(videoRef.current.duration));
    }
  };

  useEffect(() => {
    console.log(progressSeconds);
    if (!isDone && progressSeconds >= duration - 1 && duration > 0) {
      setIsDone(true);
    }
  }, [progressSeconds, duration, isDone]);

  useEffect(() => {
    console.log(isDone);
    () => onVideoFinish();
  }, [isDone, onVideoFinish]);

  return (
    <div id="video-lecture" className="w-full">
      <h2 className="bg-neutral-light-blue py-3 px-5 font-content font-medium text-xl">
        Lecture #{lectureNumber}:{' '}
        <span className="font-normal ml-3">{title}</span>
      </h2>
      <div
        id="lecture-content"
        className="flex flex-col min-h-full justify-center p-10 mb-10 bg-background"
      >
        <video
          src={videoLink}
          controls
          onPlay={startOrToggleProgress}
          onPause={stopProgress}
          onSeeked={handleSeeked}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          ref={videoRef}
          className="h-120"
        >
          Your browser does not support the video tag.
        </video>
        <div
          id="lecture-description"
          className=" flex items-center h-fit mt-10 relative font-content"
        >
          <p className="absolute top-0">Introduction</p>
          <ul className="w-full pt-10">
            <li className="ml-10 list-disc text-left">{introduction}</li>
          </ul>
          <hr className="h-45 border-1 border-black mr-10 ml-10" />
          <div
            id="button-group"
            className="flex justify-center items-center flex-col"
          >
            <p className="text-center mb-5 font-md ">
              Done Learning? Test your knowledge and take the quiz!
            </p>
            <button
              onClick={() => console.log(quizLink)}
              className="w-full py-2 text-lg text-white bg-accent-blue hover:brightness-90"
            >
              TAKE QUIZ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
