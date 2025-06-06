import { useNavigate } from 'react-router-dom';

export default function Table ({ headings, content }) {
  const navigate = useNavigate();
  const handleViewTestRecord = (student, testType) => {
    if (!student || !student.uuid) {
      console.error('Student data is missing or invalid:', student);
      return;
    }

    console.log('Viewing test record for student:', student.uuid);
    const summaryType =
      testType === 'Pre Test Record' ? 'pre-test' : 'post-test';
    navigate(
      `/physical-fitness-test/summary/${summaryType}?student=${student.uuid}`,
    );
  };
  return (
    <table className='shadow-lg w-full min-w-max'>
      <tbody className='font-content'>
        <tr className='text-white bg-secondary-dark-blue'>
          {headings.map((heading, index) => (
            <th
              key={heading}
              className={`py-5 px-4 font-medium text-sm whitespace-nowrap ${
                index === 0
                  ? 'rounded-tl-lg'
                  : index === headings.length - 1
                  ? 'rounded-tr-lg'
                  : ''
              }`}
            >
              {heading}
            </th>
          ))}
        </tr>{' '}
        {content.map((item, index) => (
          <tr
            key={index}
            className={`${
              index % 2 !== 0 ? 'bg-[rgba(17,28,78,0.5)] text-white' : ''
            }`}
          >
            {headings.map((heading, headingIndex) => (
              <td
                key={headingIndex}
                className={`${
                  heading === 'Pre Test Record' ||
                  heading === 'Post Test Record'
                    ? 'p-0'
                    : 'px-4 py-3'
                } whitespace-nowrap`}
              >
                {headingIndex === 0 ? (
                  <span className='min-w-[150px] block px-4 py-3'>
                    {item.studentName}
                  </span>
                ) : headingIndex === 1 ? (
                  <span className='min-w-[200px] block px-4 py-3'>
                    {item.email}
                  </span>
                ) : heading === 'Pre Test Record' ? (
                  item.preTestCompleted ? (
                    <button
                      className='bg-primary-blue text-white w-full h-full py-2 text-sm hover:brightness-110 transition-all duration-200'
                      onClick={() => handleViewTestRecord(item, heading)}
                    >
                      View
                    </button>
                  ) : (
                    <span className='w-full block text-center py-2'>
                      Not completed
                    </span>
                  )
                ) : heading === 'Post Test Record' ? (
                  item.postTestCompleted ? (
                    <button
                      className='bg-primary-blue text-white w-full h-full py-2 text-sm hover:brightness-110 transition-all duration-200'
                      onClick={() => handleViewTestRecord(item, heading)}
                    >
                      View
                    </button>
                  ) : (
                    <span className='w-full block text-center py-2'>
                      Not completed
                    </span>
                  )
                ) : (
                  <span className='min-w-[100px] block text-center px-4 py-3'>
                    {item[heading.replaceAll(' ', '')]}
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
