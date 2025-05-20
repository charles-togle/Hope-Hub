import PageHeading from '@/components/PageHeading';
import ErrorMessage from '@/components/utilities/ErrorMessage';
import { Fragment, useEffect, useState } from 'react';
import supabase from '@/client/supabase';
import { useUserId } from '@/hooks/useUserId';
import { useParams } from 'react-router-dom';

export function PhysicalFitnessTestSummary () {
  const { testType } = useParams();
  const [isDataReady, setIsDataReady] = useState(false);
  const [dataResults, setDataResults] = useState([]);
  const [isBadRequest, setIsBadRequest] = useState(false);
  const userId = useUserId();

  let columnName = '';
  if (testType === 'pre-test') {
    columnName = 'pre_physical_fitness_test';
  } else if (testType === 'post-test') {
    columnName = 'post_physical_fitness_test';
  } else {
    columnName = 'pre_physical_fitness_test';
  }

  useEffect(() => {
    async function checkConstraints () {
      const resolvedUserId = await Promise.resolve(userId);
      const { data: existing, error: fetchError } = await supabase
        .from('physical_fitness_test')
        .select(columnName)
        .eq('uuid', resolvedUserId)
        .single();
      console.log(existing);
      const finishedTests = existing[columnName].finishedTestIndex;
      const max = existing[columnName].finishedTestIndex.length - 1;
      if (existing && !finishedTests.includes(max)) {
        setIsBadRequest(true);
      } else if (fetchError) {
        setIsBadRequest(true);
      }
    }
    checkConstraints();
  });

  useEffect(() => {
    if (isDataReady) {
      return;
    }

    async function getDataFromDatabase () {
      //handle pre test or post test
      const resolvedUserId = await Promise.resolve(userId);
      const data = await getPhysicalFitnessData(resolvedUserId, columnName);
      if (data) {
        setDataResults(getSummary(data));
        setIsDataReady(true);
      }
    }

    getDataFromDatabase();
  }, [isDataReady]);

  if (isBadRequest) {
    return <ErrorMessage text={'Error 400'} subText={'Bad Request'} />;
  }

  if (!isDataReady) {
    return (
      <div className='w-full flex justify-center items-center h-screen font-content text-2xl'>
        Loading..
      </div>
    );
  }

  if (!dataResults) {
    return <ErrorMessage text={'Error 400'} subText={'Bad Request'} />;
  }

  return (
    <section id='physical-fitness-test-summary' className='parent-container'>
      <PageHeading text={'Physical Fitness Test'}></PageHeading>
      <div id='summary-content' className='content-container'>
        <h1 className='w-full text-left text-4xl font-heading -ml-20 mb-5 font-medium text-primary-blue'>
          {testType === 'pre-test' ? 'Pre Test' : 'Post Test'} Record
        </h1>
        <div className='w-full flex flex-col space-y-5 mb-10'>
          {dataResults.map((summary, index) => (
            <Fragment key={`${summary.title} ${index}`}>
              {(() => {
                const sectionHeadings = {
                  0: 'A. Cardiovascular Endurance',
                  1: 'B. Strength',
                  3: 'C. Flexibility',
                };
                const heading = sectionHeadings[index];
                return (
                  heading && (
                    <Fragment>
                      <h1 className='text-3xl font-heading -ml-5 mb-0 font-medium'>
                        {heading}
                      </h1>
                      <hr className='w-1/3 border-1 border-primary-yellow mb-4 -ml-5' />
                    </Fragment>
                  )
                );
              })()}
              <TableSummary summary={summary} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

const TableColumn = ({ columnContent }) => (
  <tr>
    {columnContent.map((content, index) => (
      <td
        className={`${
          index === 0 ? 'border-l-0!' : ''
        } text-center font-content w-15 h-15 border-l-4 border-t-4 border-secondary-dark-blue`}
        key={`data ${index}`}
      >
        {content}
      </td>
    ))}
  </tr>
);

const TableHeading = ({ headings }) => (
  <tr>
    {headings.map((heading, index) => (
      <th
        className={`${
          index === 0 ? 'border-l-0!' : ''
        } h-20 text-center font-content border-l-4 text-white bg-secondary-dark-blue border-white`}
        key={heading}
      >
        {heading}
      </th>
    ))}
  </tr>
);

const TableSummary = ({ summary }) => (
  <div id='summary'>
    <div className='flex flex-row font-heading space-x-2 text-lg'>
      <p>{summary.number}.</p>
      <p>{summary.title}</p>
    </div>
    <hr className='w-20 border-1 border-primary-yellow mb-3' />
    <div
      id='table-container'
      className='rounded-md overflow-hidden border-5 border-secondary-dark-blue h-fit w-full'
    >
      <table className='w-full h-full'>
        <tbody>
          <tr className={`${summary.hasParentHeading ? '' : 'hidden'}`}>
            <th
              className='text-center font-bold font-content h-10  border-b-4 border-white'
              colSpan={summary.headings.length}
            >
              {summary.parentHeading}
            </th>
          </tr>
          <TableHeading headings={summary.headings} />
          <TableColumn columnContent={summary.content} />
        </tbody>
      </table>
    </div>
  </div>
);

function handleData ({
  data,
  hasParentHeading = false,
  parentHeading = '',
  number,
  unit = '',
}) {
  return {
    hasParentHeading: hasParentHeading,
    parentHeading: [parentHeading],
    title: data.title,
    number: number.toString(),
    headings: ['Reps', 'Sets', 'Classification', 'Time Started', 'Time Ended'],
    content: [
      `${data.record} ${unit}`,
      data.sets.toString(),
      data.classification,
      data.timeStarted,
      data.timeEnd,
    ],
  };
}

function customHandleData ({
  title,
  hasParentHeading = false,
  parentHeading = '',
  headings = [],
  content = [],
  number,
}) {
  return {
    hasParentHeading: hasParentHeading,
    parentHeading: parentHeading,
    title: title,
    number: number,
    headings: headings,
    content: content,
  };
}

const getSummary = dataGathered => {
  console.log(dataGathered);
  let dataResults = [];
  dataResults.push(
    customHandleData({
      title: '3 Minute Step Test',
      hasParentHeading: true,
      parentHeading: ['Heart Rate per Minute'],
      headings: ['Before the Activity', 'After the Activity'],
      content: [
        `${dataGathered.preStepTest.record} Beats per Minute`,
        `${dataGathered.stepTest.record} Beats per Minute`,
      ],
      number: 1,
    }),
  );

  dataResults.push(handleData({ data: dataGathered.pushUp, number: 2 }));
  dataResults.push(
    handleData({ data: dataGathered.basicPlank, unit: 'Second(s)', number: 3 }),
  );
  dataResults.push(
    handleData({
      data: dataGathered.zipperTestRight,
      hasParentHeading: true,
      unit: 'cm',
      parentHeading: 'Overlap/Gap (centimeters)',
      number: 4,
    }),
  );
  dataResults.push(
    handleData({
      data: dataGathered.zipperTestLeft,
      hasParentHeading: true,
      unit: 'cm',
      parentHeading: 'Overlap/Gap (centimeters)',
      number: 5,
    }),
  );
  dataResults.push(
    handleData({
      data: dataGathered.sitAndReachFirst,
      hasParentHeading: true,
      unit: 'cm',
      parentHeading: 'Score (centimeters)',
      number: 6,
    }),
  );
  dataResults.push(
    handleData({
      data: dataGathered.sitAndReachSecond,
      hasParentHeading: true,
      unit: 'cm',
      parentHeading: 'Score (centimeters)',
      number: 7,
    }),
  );
  return dataResults;
};

async function getPhysicalFitnessData (userId, column) {
  const { data, error } = await supabase
    .from('physical_fitness_test')
    .select(column)
    .eq('uuid', userId);

  if (data) {
    return data[0][column];
  } else {
    return error;
  }
}
