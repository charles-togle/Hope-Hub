export default function LecturePDF({
  lectureNumber,
  introduction,
  title,
  quizLink,
  pdfLink,
}) {
  return (
    <div id="video-lecture" className="w-full">
      <h2 className="bg-neutral-light-blue py-3 px-5 font-content font-medium text-xl">
        Lecture #{lectureNumber}:{" "}
        <span className="font-normal ml-3">{title}</span>
      </h2>
      <div
        id="lecture-content"
        className="flex flex-row min-h-full w-full justify-between p-10 mb-10 bg-background"
      >
        <iframe src={pdfLink} className="w-[65%]"></iframe>
        <div
          id="lecture-description"
          className="w-[30%] flex flex-col relative font-content"
        >
          <p className="absolute top-0">Introduction</p>
          <ul className=" pt-10">
            <li className="ml-5 list-disc">{introduction}</li>
          </ul>
          <div
            id="button-group"
            className="mt-30 flex justify-center items-center flex-col"
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
