import PageHeading from '@/components/PageHeading';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { fetchQuizzes, extractQuizDetails } from '@/utilities/QuizData';
import Footer from '@/components/Footer';

export default function QuizDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Done', 'Pending', 'Locked'];

  useEffect(() => {
    async function fetchAndSetQuizzes() {
      const data = extractQuizDetails(await fetchQuizzes());
      setQuizzes(data);
      setTimeout(() => setIsLoading(false), 1000);
    }
    fetchAndSetQuizzes();
  }, []);

  return (
    <div>
      <PageHeading text="Quizzes" className="bg-background z-2"></PageHeading>
      <div
        id="quizzes"
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
                    filter cursor-pointer`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </li>
              );
            })}
          </ul>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh] p-4">
            <Loader2 className="animate-spin text-primary-yellow" size={48} />
          </div>
        ) : (
          Array.isArray(quizzes) && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
              <div className="w-full">
                {quizzes.map((quiz) => {
                  return (
                    (quiz.status === activeFilter ||
                      activeFilter === 'All') && (
                      <Card key={'Quiz ' + quiz.number} quiz={quiz} />
                    )
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

function Card({ quiz }) {
  const statusColors = {
    Done: 'bg-green',
    Pending: 'bg-primary-yellow',
    Locked: 'bg-red',
  };

  const cardBody = (
    <div className="rounded-2xl flex flex-col border-2 border-secondary-dark-blue overflow-clip mb-5">
      <div className="flex justify-between items-center px-10  bg-secondary-dark-blue font-content text-white h-[10vh]">
        <h2 className="text-2xl">
          <strong>{'Quiz ' + quiz.number + ': '}</strong>
          {quiz.title}
        </h2>
        <h3
          className={`${
            statusColors[quiz.status]
          } rounded-sm w-[12%] flex items-center justify-center py-1`}
        >
          {quiz.status}
        </h3>
      </div>
      <div className="flex justify-between items-center py-4 pl-10 pr-15 w-full h-[25vh]">
        <Results status={quiz.status} details={quiz.details} />
        <div className="w-[3px] h-full bg-primary-yellow"></div>
        <Overview content={quiz.content} />
      </div>
    </div>
  );

  return quiz.status === 'Locked' ? (
    cardBody
  ) : (
    <Link to={`quiz/${quiz.number}`}>{cardBody}</Link>
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
          <i>Not yet Done</i>
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
