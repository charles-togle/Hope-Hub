import PageHeading from '@/components/PageHeading';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QuizzesAndActivitiesData } from '@/utilities/QuizAndActivities';
import Footer from '@/components/Footer';

export default function QuizzesAndActivities() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Done', 'Pending', 'Locked'];

  return (
    <div>
      <PageHeading
        text="Quizzes & Activities"
        className="bg-background z-2"
      ></PageHeading>
      <div
        id="quizzes-and-activities"
        className="flex flex-col items-center justify-center w-5/6 mx-auto mb-8"
      >
        <div
          id="header"
          className="flex justify-between sticky top-0 z-10 w-full py-8 bg-background"
        >
          <h2 className="font-heading-small text-3xl text-primary-blue border-primary-yellow border-b-3 pb-2">
            Dashboard
          </h2>{' '}
          <ul className="flex rounded-sm bg-secondary-dark-blue">
            {filters.map((filter, index) => {
              return (
                <li
                  key={index}
                  className={`${filter === activeFilter ? 'filter-active' : ''}
                    filter`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </li>
              );
            })}
          </ul>
        </div>
        {QuizzesAndActivitiesData.map((task) => {
          return (
            (task.status === activeFilter || activeFilter === 'All') && (
              <Card key={task.type + task.number} task={task} />
            )
          );
        })}
      </div>
      <Footer></Footer>
    </div>
  );
}

function Card({ task }) {
  const statusColors = {
    Done: 'bg-green',
    Pending: 'bg-primary-yellow',
    Locked: 'bg-red',
  };

  return (
    <Link to={`${task.type.toLowerCase()}/${task.number}`}>
      <div className="rounded-2xl flex flex-col border-2 border-secondary-dark-blue overflow-clip mb-5">
        <div className="flex justify-between items-center px-10  bg-secondary-dark-blue font-content text-white h-[10vh]">
          <h2 className="text-2xl">
            <strong>{task.type + ' ' + task.number + ': '}</strong>
            {task.title}
          </h2>
          <h3
            className={`${
              statusColors[task.status]
            } rounded-sm w-[12%] flex items-center justify-center py-1`}
          >
            {task.status}
          </h3>
        </div>
        <div className="flex justify-between items-center py-4 pl-10 pr-15 h-[25vh]">
          <Results status={task.status} details={task.details} />
          <div className="w-[3px] h-full bg-primary-yellow"></div>
          <Overview content={task.content} />
        </div>
      </div>
    </Link>
  );
}

function Results({ status, details }) {
  const resultsView = {
    Done: details
      ? Object.entries(details).map(([key, value]) => {
          return (
            <h4 key={key}>
              <strong>
                <i>{key}:</i>
              </strong>
              {' ' + value}
            </h4>
          );
        })
      : null,
    Pending: (
      <h4>
        <strong>
          <i>Not yet Taken</i>
        </strong>
        <br />
        <i>(Can be taken)</i>
      </h4>
    ),
    Locked: (
      <h4>
        <strong>
          <i>LOCKED</i>
        </strong>
        <br />
        <i>(Finish the Lecture to Access)</i>
      </h4>
    ),
  };

  return (
    <div
      className={`${
        status === 'Done' ? 'items-start' : 'items-center text-center'
      } w-[23%] flex flex-col gap-y-1 justify-center font-content text-base`}
    >
      {resultsView[status]}
    </div>
  );
}

function Overview({ content }) {
  return (
    <div className="font-content text-base w-[62%]">
      <h4 className="text-primary-blue">Introduction: </h4>
      <ul className="list-disc list-outside pl-5">
        <li>{content}</li>
      </ul>
    </div>
  );
}
