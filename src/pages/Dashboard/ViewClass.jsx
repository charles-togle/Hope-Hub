import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Search from '@/components/dashboard/Search';
import Table from '@/components/dashboard/ViewClass/Table';
import { Lessons } from '@/utilities/Lessons';
import { getStudentsByClassCode } from '@/services/getStudentDataByClassCode';
import { cleanStudentData } from '@/services/cleanStudentData';
import { useUserId } from '@/hooks/useUserId';
import supabase from '@/client/supabase';
import ErrorMessage from '@/components/utilities/ErrorMessage';

const sampleData = [
  {
    email: 'charles3939togle@gmail.com',
    full_name: 'TestPerson1',
    lecture_progress: [
      [
        { key: 1, title: 'Personal Safety Protocol', status: 'Incomplete' },
        { key: 2, title: 'Physiological Indicators', status: 'Incomplete' },
        { key: 3, title: 'The FITT Principle', status: 'Incomplete' },
      ],
    ],
  },
  {
    email: 'ctogle.a12345617@umak.edu.ph',
    full_name: 'TestPerson2',
    lecture_progress: [
      [
        { key: 1, title: 'Personal Safety Protocol', status: 'Incomplete' },
        { key: 2, title: 'Physiological Indicators', status: 'Incomplete' },
        { key: 3, title: 'The FITT Principle', status: 'Done' },
      ],
    ],
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
    Type: 'Lecture',
    LessonNumber: item.key,
  }));
};

const transformQuizData = data => {
  return data.map(item => ({
    Type: 'Quiz',
    QuizNumber: item.number,
  }));
};

function combineObjects (lectureArray, quizArray) {
  return [...lectureArray, ...quizArray];
}
const getTableHeadings = (activeFilter, data) => {
  const headings = ['Name', 'Email'];
  if (activeFilter === 'Lecture') {
    data.forEach(data => {
      headings.push(`Lesson ${data.LessonNumber}`);
    });
  } else if (activeFilter === 'Quiz') {
    data.forEach(data => {
      headings.push(`Quiz ${data.QuizNumber}`);
    });
  } else if (activeFilter === 'All') {
    data.forEach(data => {
      if (data.Type === 'Lecture') {
        headings.push(`Lesson ${data.LessonNumber}`);
      } else if (data.Type === 'Quiz') {
        headings.push(`Quiz ${data.QuizNumber}`);
      }
    });
    headings.push('Pre Test Record');
    headings.push('Post Test Record');
  }
  return headings;
};

export default function ViewClass () {
  //initialize data
  const lecturesData = transformDataLecture(Lessons);
  const quizData = transformQuizData(QuizzesData);
  const combinedData = combineObjects(lecturesData, quizData);

  const params = useParams();
  const userId = useUserId();
  const [activeFilter, setActiveFilter] = useState('All');
  const [defaultStudentData, setDefaultStudentData] = useState([]);
  const [lectureSubFilter, setLectureSubFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [quizSubFilter, setQuizSubFilter] = useState('none');
  const [activeStudentData, setActiveStudentData] = useState([]);
  const [headings, setHeadings] = useState(
    getTableHeadings('All', combinedData),
  );
  const [isOwnershipChecked, setIsOwnershipChecked] = useState(false);
  const [hasOwnership, setHasOwnership] = useState(false);
  const Filters = ['All', 'Lecture', 'Quiz'];
  const classCode = params.classCode;

  // Check if the current teacher owns this class
  const checkClassOwnership = async () => {
    if (!userId || !classCode) {
      setHasOwnership(false);
      setIsOwnershipChecked(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('teacher_class_code')
        .select('class_code')
        .eq('uuid', userId)
        .eq('class_code', classCode)
        .single();

      if (error || !data) {
        setHasOwnership(false);
      } else {
        setHasOwnership(true);
      }
    } catch (err) {
      console.error('Error checking class ownership:', err);
      setHasOwnership(false);
    }

    setIsOwnershipChecked(true);
  };

  useEffect(() => {
    checkClassOwnership();
  }, [userId, classCode]);

  useEffect(() => {
    if (isOwnershipChecked && hasOwnership) {
      setIsLoading(true);
      getStudentData();
      setIsLoading(false);
    }
  }, [isOwnershipChecked, hasOwnership]);

  const getStudentData = async () => {
    const allStudentData = await getStudentsByClassCode(classCode);
    const cleanedStudentData = cleanStudentData(allStudentData);
    console.log(cleanedStudentData);
    setActiveStudentData(cleanedStudentData);
    setDefaultStudentData(cleanedStudentData);
  };
  const handleFilterChange = filter => {
    setActiveFilter(filter);
    if (filter === 'Lecture') {
      setHeadings(getTableHeadings(filter, lecturesData));
      setActiveStudentData(defaultStudentData);
      handleLectureSubFilterChange('all');
    } else if (filter === 'Quiz') {
      setHeadings(getTableHeadings(filter, quizData));
      setActiveStudentData(defaultStudentData);
    } else if (filter === 'All') {
      setHeadings(getTableHeadings(filter, combinedData));
      setActiveStudentData(defaultStudentData);
      setLectureSubFilter('all');
    }
  };
  const handleLectureSubFilterChange = filter => {
    setLectureSubFilter(filter);
    if (filter === 'all') {
      setActiveStudentData(defaultStudentData);
    } else if (filter === 'done') {
      // Filter students who have completed all lessons
      const filteredData = defaultStudentData.filter(student => {
        return (
          student.Lesson1 === 'Done' &&
          student.Lesson2 === 'Done' &&
          student.Lesson3 === 'Done'
        );
      });
      setActiveStudentData(filteredData);
    } else if (filter === 'pending') {
      // Filter students who have at least one pending lesson
      const filteredData = defaultStudentData.filter(student => {
        return (
          student.Lesson1 === 'Pending' ||
          student.Lesson2 === 'Pending' ||
          student.Lesson3 === 'Pending'
        );
      });
      setActiveStudentData(filteredData);
    } else if (filter === 'incomplete') {
      // Filter students who have at least one incomplete lesson
      const filteredData = defaultStudentData.filter(student => {
        return (
          student.Lesson1 === 'Incomplete' ||
          student.Lesson2 === 'Incomplete' ||
          student.Lesson3 === 'Incomplete'
        );
      });
      setActiveStudentData(filteredData);
    }
  };
  if (!isOwnershipChecked || isLoading) {
    return <p>Loading...</p>;
  }

  if (isOwnershipChecked && !hasOwnership) {
    return <ErrorMessage text='Error 404' subText='Class Not Found' />;
  }

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
                      { value: 'done', label: 'Done' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'incomplete', label: 'Incomplete' },
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleLectureSubFilterChange(option.value)
                        }
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
        </div>{' '}
        <div className='w-full mt-10'>
          <div className='overflow-x-auto'>
            <Table headings={headings} content={activeStudentData}></Table>
          </div>
        </div>
      </div>
    </section>
  );
}
