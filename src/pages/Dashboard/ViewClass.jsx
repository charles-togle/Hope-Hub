import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Search from '@/components/dashboard/Search';

const LecturesData = [
  {
    key: 1,
    title: 'Introduction to Personal Safety',
    status: 'Done',
  },
  {
    key: 2,
    title: 'Understanding Physiological Indicators',
    status: 'Pending',
  },
  {
    key: 3,
    title: 'The FITT Principle Explained',
    status: 'Pending',
  },
];

const QuizzesData = [
  {
    type: 'Quiz',
    number: 1,
    title: 'Safety Protocols Quiz',
    status: 'Done',
    details: {
      Score: '9/10',
      Ranking: '1',
      ['Date Taken']: 'May 5, 2025',
      ['Start-time']: '9:00AM',
      ['End-time']: '9:30AM',
    },
    content: 'Covers basic personal safety measures and protocols.',
  },
  {
    type: 'Quiz',
    number: 2,
    title: 'Physiological Indicators Quiz',
    status: 'Pending',
    details: {},
    content: 'Covers topics on body signals and fitness indicators.',
  },
  {
    type: 'Quiz',
    number: 3,
    title: 'FITT Principle Quiz',
    status: 'Pending',
    details: {},
    content: 'Tests understanding of Frequency, Intensity, Time, and Type.',
  },
];

const transformDataLecture = data => {
  return data.map(item => ({
    LessonNumber: item.key,
    LessonStatus: item.status,
  }));
};

const transformQuizData = data => {
  return data.map(item => ({
    QuizNumber: item.number,
    QuizStatus: item.status,
    QuizScore: item.status.toLowerCase() === 'done' ? item.details.Score : -1,
  }));
};

function combineObjects (lectureArray, quizArray) {
  return [...lectureArray, ...quizArray];
}
const setTableHeadings = ({ activeFilter, data }) => {
  const headings = ['Name', 'Email'];
  if (activeFilter === 'Lecture') {
    data.forEach(data => {
      headings.push(`Lesson ${data.Number}`);
    });
  } else if (activeFilter === 'Quiz') {
    data.forEach(data => {
      headings.push(`Quiz ${data.Number}`);
    });
  }
  return headings
};

export default function ViewClass () {
  const params = useParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const [lectureSubFilter, setLectureSubFilter] = useState('all');
  const [quizSubFilter, setQuizSubFilter] = useState('none');
  const lecturesData = transformDataLecture(LecturesData);
  const quizData = transformQuizData(QuizzesData);
  const combinedData = combineObjects(lecturesData, quizData);

  const classCode = params.classCode;
  useEffect(() => {
    console.log(classCode);
  }, []);


  const Filters = ['All', 'Lecture', 'Quiz'];

  const handleFilterChange = filter => {
    setActiveFilter(filter);


  };
  useEffect(() => {
    console.log('Lectures Data:', lecturesData);
    console.log('Quiz Data:', quizData);
    console.log('Combined Arrays:', combinedData);
  }, []);

  return (
    <section className='parent-container' id='view-class'>
      <div className='content-container w-[90%]!'>
        <div className='self-start'>
          <p className='font-heading-small text-3xl text-primary-blue self-start'>
            Class Code: <span className='text-black'>{classCode}</span>
          </p>
          <hr className='h-0 w-50 mt-3 border-1 border-primary-yellow' />
        </div>{' '}
        <div
          className='self-start mt-5 flex w-full justify-between flex-col lg:flex-row gap-4'
          id='options'
        >
          <div className='flex flex-col gap-3'>
            {/* Main Filter Buttons */}
            <div
              id='buttons'
              className='rounded-sm bg-secondary-dark-blue w-full h-fit flex items-center flex-nowrap lg:w-fit'
            >
              {Filters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterChange(filter)}
                  className={
                    `text-white text-center font-content py-2 min-w-1/8 px-2 text-sm lg:w-auto lg:px-5 transition-colors ${
                      index === 0 ? 'rounded-l-sm' : ''
                    } ${index === Filters.length - 1 ? 'rounded-r-sm' : ''} ` +
                    (filter === activeFilter
                      ? 'bg-primary-yellow text-secondary-dark-blue'
                      : 'bg-secondary-dark-blue hover:bg-gray-700')
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className='h-10 flex items-center'>
              {activeFilter === 'Lecture' && (
                <div className='flex items-center gap-2 animate-fadeIn'>
                  <span className='text-sm font-content text-gray-600'>
                    Status:
                  </span>
                  <div className='flex bg-gray-100 rounded-md p-1'>
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'complete', label: 'Complete' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'incomplete', label: 'Incomplete' },
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setLectureSubFilter(option.value)}
                        className={`px-3 py-1 text-xs font-content rounded transition-colors ${
                          lectureSubFilter === option.value
                            ? 'bg-secondary-dark-blue text-white'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activeFilter === 'Quiz' && (
                <div className='flex items-center gap-2 animate-fadeIn'>
                  <span className='text-sm font-content text-gray-600'>
                    Sort by score:
                  </span>
                  <div className='flex bg-gray-100 rounded-md p-1'>
                    {[
                      { value: 'none', label: 'Default' },
                      { value: 'ascending', label: 'Low to High' },
                      { value: 'descending', label: 'High to Low' },
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setQuizSubFilter(option.value)}
                        className={`px-3 py-1 text-xs font-content rounded transition-colors ${
                          quizSubFilter === option.value
                            ? 'bg-secondary-dark-blue text-white'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeFilter === 'All' && (
                <div className='flex items-center gap-2 animate-fadeIn'>
                  <span className='text-sm font-content text-gray-500 italic'>
                    Showing all content
                  </span>
                </div>
              )}
            </div>
          </div>

          <div
            id='search'
            className='w-full lg:w-[40%] flex items-center gap-3'
          >
            <Search />
          </div>
        </div>
        <div>{/* content */}</div>
      </div>
    </section>
  );
}
