import { useNavigate } from 'react-router-dom';

export default function ClassCode ({
  classCode,
  name,
  classColor = 'FFF',
  onRemove = () => {},
}) {
  const navigate = useNavigate();
  return (
    <div
      className='w-[32%] h-35 rounded-lg relative text-white cursor-pointer'
      style={{ backgroundColor: `#${classColor}` }}
      onClick={() => navigate(`/dashboard/view-class/${classCode}`)}
    >
      <button
        onClick={() => onRemove()}
        className='absolute top-0 right-5 text-2xl font-bold'
        style={{ letterSpacing: '-0.2em' }}
      >
        ---
      </button>
      <div className='p-3 font-bold font-content'>
        <p>{name}</p>
        <p>{classCode}</p>
      </div>
    </div>
  );
}
