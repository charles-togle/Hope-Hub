import arrow from '@/assets/images/result_arrow.png';

export default function ResultGroup ({
  variant = 'gain',
  result = {},
  maintainingCalories = 2000,
}) {
  const designVariant = variant.toLowerCase();
  const isWeightGain = designVariant.includes('gain');
  const colorVariant = isWeightGain ? 'green' : 'red';

  const weightLabels = [0.25, 0.5, 1];

  // Helper function to safely calculate percentage
  const safePercentage = (value, base) => {
    if (!value || !base || base === 0) return 0;
    const percentage = (value / base) * 100;
    return isNaN(percentage) ? 0 : Math.round(percentage);
  };

  const percentages =
    result && Object.keys(result).length > 0
      ? isWeightGain
        ? [
            100,
            safePercentage(result['Mild Weight Gain'], maintainingCalories),
            safePercentage(result['Weight Gain'], maintainingCalories),
            safePercentage(result['Extreme Weight Gain'], maintainingCalories),
          ]
        : [
            safePercentage(result['Mild Weight Loss'], maintainingCalories),
            safePercentage(result['Weight Loss'], maintainingCalories),
            safePercentage(result['Extreme Weight Loss'], maintainingCalories),
          ]
      : [0, 0, 0];

  const textColorClass = colorVariant === 'green' ? 'text-green' : 'text-red';
  const borderColorClass =
    colorVariant === 'green' ? 'border-green' : 'border-red';

  return (
    <div>
      <h1 className='text-xl px-15 py-7 rounded-t-lg bg-secondary-dark-blue text-white font-content text-center'>
        Result
      </h1>
      <div className='w-full flex flex-col rounded-b-lg border-2 border-secondary-dark-blue pr-7 pl-7 pt-8 pb-5 relative font-content'>
        {' '}
        <div className='flex flex-row text-center justify-center items-center w-full'>
          <hr
            className={`absolute left-0 border min-w-1/4 ${borderColorClass}`}
          />
          <p
            className={`${textColorClass} italic text-xl font-semibold whitespace-nowrap`}
          >
            {isWeightGain ? 'Weight Gain' : 'Weight Loss'}
          </p>
          <hr
            className={`absolute right-0 min-w-1/4 border ${borderColorClass}`}
          />
        </div>
        <p className='font-medium text-xs pt-2 pb-1'>
          Energy intake to {isWeightGain ? 'gain' : 'lose'} weight:
        </p>{' '}
        {result &&
          Object.keys(result).length > 0 &&
          Object.entries(result).map((res, index) => {
            const labelValue = res[0] || 'Unknown';
            const calorieValue = isNaN(res[1]) ? 0 : res[1];
            const formattedCalorieValue = calorieValue.toLocaleString();
            const percentageValue = percentages[index] || 0;
            const weightLabel = weightLabels[index] || 0;

            return (
              <div
                key={`result ${index}`}
                className='grid grid-cols-[60%_40%] place-items-center'
              >
                <div className='relative flex justify-center items-center w-full flex-col max-h-[85%] py-4'>
                  <img src={arrow} className='h-full absolute w-full -z-1' />{' '}
                  <p
                    className={`${textColorClass} pr-6 text-xs md:text-sm text-center font-medium`}
                  >
                    {labelValue}
                  </p>
                  <p className='text-xs md:text-sm'> {weightLabel} kg/week</p>
                </div>{' '}
                <div className='flex flex-col items-center justify-center border-2 border-black w-full h-[87%] -ml-[20%]  -z-2'>
                  <p className={`${textColorClass} font-semibold text-xs md:text-sm`}>
                    {formattedCalorieValue}{' '}
                    <span className='font-light text-xs'>
                      {percentageValue}%
                    </span>
                  </p>
                  <p className='text-xs md:text-sm'>Calories/day</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
