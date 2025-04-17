export default function LectureVideo({
  lectureNumber,
  title,
  introduction,
  quizLink,
  videoLink,
}) {
  return (
    <div id="video-lecture" className="w-full">
      <h2 className="bg-neutral-light-blue py-3 px-5 font-content font-medium text-xl">
        Lecture #{lectureNumber}:{" "}
        <span className="font-normal ml-3">{title}</span>
      </h2>
      <div
        id="lecture-content"
        className="flex flex-col min-h-full justify-center p-10 mb-10 bg-background"
      >
        <iframe
          src={videoLink}
          frameborder="0"
          allowFullScreen
          className="h-120"
        ></iframe>
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
