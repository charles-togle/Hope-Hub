export default function ClassCode ({
  classCode,
  name,
  classColor = 'FFF',
  onRemove = () => {},
}) {
  return (
    <div
      className='w-[32%] h-35 rounded-lg relative text-white'
      style={{ backgroundColor: `#${classColor}` }}
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
