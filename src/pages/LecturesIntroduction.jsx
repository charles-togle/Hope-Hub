import PageHeading from "@/components/PageHeading";
import LectureIntroduction from "@/components/LectureIntroComponent";
import { useState } from "react";
import { Lessons } from "@/utilities/Lessons";

export default function Lectures() {
  const [activeLessons, setActiveLessons] = useState(Lessons);
  const [activeFilter, setActiveFilter] = useState("All");
  const LectureFilters = ["All", "Done", "Pending", "Incomplete"];
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    const lessons = [...Lessons];
    setActiveLessons(() => {
      if (filter === "All") return Lessons;
      return lessons.filter((lesson) => lesson.status === filter);
    });
  };
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
                    ? "bg-primary-yellow rounded-sm text-secondary-dark-blue!"
                    : ""
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
