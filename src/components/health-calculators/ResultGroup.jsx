import arrow from '@/assets/images/result_arrow.png';

export default function ResultGroup ({ variant = 'gain', result }) {
  const designVariant = variant.toLowerCase();

  const colorVariant = designVariant === 'weight-gain' ? 'green' : 'red';
  const weightLabels = [0.25, 0.5, 1];
  const percentages = ['90%', '80%', '70%'];

  return (
    <div>
      <h1 className='text-xl px-15 py-7 rounded-t-lg bg-secondary-dark-blue text-white font-content text-center'>
        Result
      </h1>
      <div className='w-full flex flex-col rounded-b-lg border-2 border-secondary-dark-blue pr-7 pl-7 pt-8 pb-5 relative font-content'>
        <div className='flex flex-row text-center justify-center items-center w-full'>
          <hr
            className={`absolute left-0  border min-w-1/4 border-${colorVariant}`}
          />
          <p
            className={`text-${colorVariant} italic text-xl font-semibold whitespace-nowrap`}
          >
            {designVariant === 'weight-gain' ? 'Weight Gain' : 'Weight Loss'}
          </p>
          <hr
            className={`absolute right-0  min-w-1/4 border border-${colorVariant}`}
          />
        </div>
        <p className='font-medium text-xs pt-2 pb-1'>
          Energy intake to {designVariant === 'weight-gain' ? 'gain' : 'lose'}{' '}
          weight:
        </p>
        {result &&
          Object.entries(result).map((res, index) => (
            <div
              key={`result ${index}`}
              className='grid grid-cols-[60%_40%] place-items-center'
            >
              <div className='relative flex justify-center items-center w-full flex-col max-h-[85%] py-4'>
                <img src={arrow} className='h-full absolute w-full -z-1' />{' '}
                <p
                  className={`text-${colorVariant} pr-6 text-base text-center font-medium`}
                >
                  {res[0]}
                </p>
                <p> {weightLabels[index]} kg/week</p>
              </div>{' '}
              <div className='flex flex-col items-center justify-center border-2 border-black w-full h-[87%] -ml-[20%]  -z-2'>
                <p className={`text-${colorVariant} font-semibold text-lg`}>
                  {res[1]}{' '}
                  <span className='font-light text-xs'>
                    {percentages[index]}
                  </span>
                </p>
                <p>Calories/day</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
