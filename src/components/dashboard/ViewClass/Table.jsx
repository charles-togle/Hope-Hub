export default function Table ({ headings, content }) {
  return (
    <table className='shadow-lg'>
      <tbody className='font-content'>
        <tr className='text-white bg-secondary-dark-blue'>
          {headings.map((heading, index) => (
            <th
              key={heading}
              className={`px-7 py-3 ${
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
              <td key={headingIndex} className='px-7 py-3'>
                {headingIndex === 0
                  ? item.studentName
                  : headingIndex === 1
                  ? item.email
                  : item[heading.replaceAll(' ', '')]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
