export default function RadioButton ({
  choices,
  value,
  setValue,
  name,
  text,
  showBodyFat = false,
  bodyFatValue = '',
  onBodyFatChange,
}) {
  const handleChange = selectedValue => {
    setValue(selectedValue);
  };

  return (
    <div className='radio-group font-content'>
      {text && (
        <label className='block text-lg font-medium text-gray mb-3'>
          {text}
        </label>
      )}
      <div className='space-y-2 font-content'>
        {choices.map((choice, index) => {
          const isLastChoice = index === choices.length - 1;

          return (
            <div
              key={index}
              className={`flex items-center ${
                isLastChoice && showBodyFat ? 'justify-between' : ''
              }`}
            >
              <div className='flex items-center'>
                <input
                  type='radio'
                  id={`${name}-${index}`}
                  name={name}
                  value={choice.value || choice}
                  checked={value === (choice.value || choice)}
                  onChange={() => handleChange(choice.value || choice)}
                  className='w-4 h-4 text-primary-blue bg-gray-100'
                />
                <label
                  htmlFor={`${name}-${index}`}
                  className='ml-2 text-sm text-gray-900 cursor-pointer'
                >
                  {choice.label || choice}
                </label>
              </div>

              {isLastChoice && showBodyFat && (
                <div className='flex items-center gap-2 bg-gray-50 px-2 rounded-lg border'>
                  <label htmlFor='body-fat' className='text-sm text-gray-700'>
                    Body Fat
                  </label>
                  <input
                    type='number'
                    name='body-fat'
                    id='body-fat'
                    value={bodyFatValue}
                    onChange={onBodyFatChange}
                    min='5'
                    max='50'
                    step='0.1'
                    className='bg-white border border-gray-300 rounded-md w-20 px-2 py-1 text-sm focus:ring-2 focus:ring-primary-blue focus:border-primary-blue'
                  />
                  <span className='text-sm text-gray-600'>%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
