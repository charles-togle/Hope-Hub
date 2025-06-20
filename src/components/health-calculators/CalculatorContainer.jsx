export default function CalculatorContainer ({
  children,
  heading,
  onClear,
  onCalculate,
}) {
  return (
    <div>
      <h1 className='text-xl px-15 py-7 rounded-t-lg bg-secondary-dark-blue text-white font-content text-center'>
        {heading}
      </h1>
      <div className='flex flex-col rounded-b-lg border-2 border-secondary-dark-blue pr-15 pl-15 pt-8 pb-5 relative'>
        <hr className='h-0 w-[40%] border-1 border-primary-yellow absolute top-4 left-20' />
        {children}{' '}
        <div className='font-content -mr-15 -ml-15 flex justify-center gap-4 mt-7 relative items-center'>
          <button
            className='py-1 w-2/10 border-1 rounded-sm border-secondary-dark-blue cursor-pointer hover:brightness-90 bg-white'
            onClick={() => onClear()}
          >
            Clear
          </button>
          <button
            className='border-1 w-2/10 py-1 rounded-sm text-white border-secondary-dark-blue bg-secondary-dark-blue cursor-pointer hover:brightness-90'
            onClick={() => onCalculate()}
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}
