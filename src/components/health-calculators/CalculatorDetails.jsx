export function CalculatorDetails ({ name, details }) {
  return (
    <div className='w-full flex flex-col'>
      <h2 className='text-3xl text-primary-blue font-heading-small'>{name}:</h2>
      <hr className='h-0 w-60 border-1 border-primary-yellow mt-2 mb-4' />
      <p className='font-content'>{details}</p>
    </div>
  );
}
