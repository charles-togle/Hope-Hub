import { useNavigate } from 'react-router-dom';

export default function LectureIntroduction({
  lectureKey,
  title,
  introduction,
  status,
}) {
  const navigate = useNavigate();
  const getStatusClass = () => {
    if (status === 'Incomplete') return 'bg-red';
    if (status === 'Done') return 'bg-green';
    if (status === 'Pending') return 'bg-accent-orange';
    return ''; // Default class if no match
  };

  const handleClick = () => {
    navigate(`lecture/${lectureKey}/lecture`);
  };

  return (
    <div
      id="lecture-introduction"
      className="border-3 border-black rounded-md"
      onClick={() => handleClick()}
    >
      <div id="content" className="flex flex-col  pb-5">
        <div
          id="heading"
          className="flex flex-row justify-between py-5 px-5 items-center bg-secondary-dark-blue mb-3"
        >
          <p className="text-white font-content font-bold text-lg">
            Lecture #{lectureKey}:{' '}
            <span className="text-white ml-3 font-normal">{title}</span>
          </p>
          <p
            className={`${getStatusClass()} mr-5 font-content text-white w-[12%] min-w-fit px-2 text-center text-md py-1 font-medium`}
          >
            {status}
          </p>
        </div>
        <div id="introduction" className="px-5">
          <p>Introduction</p>
          <ul className="list-disc px-10">
            <li> {introduction}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
