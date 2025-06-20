export default function CalculatorInput ({
  label,
  units,
  value,
  setValue,
  unit,
  setUnit,
}) {
  return (
    <label className='flex flex-col justify-between sm:flex-row font-content'>
      <span className='text-sm md:text-lg pb-1 '>{label}</span>
      <div className='relative w-full flex items-center justify-center md:w-2/3 text-xs md:text-sm pb-2 sm:pb-0'>
        <input
          type='number'
          value={value}
          onChange={e => setValue(e.target.value)}
          className='border-1 border-black rounded-lg p-1 w-full text-xs md:text-sm'
        />
        {label !== 'Age' && units && (
          <select
            name='unit'
            id='unit'
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className='absolute right-2 transform  bg-transparent text-gray-500 border-none outline-none cursor-pointer sm:text-xs md:text-sm'
          >
            {units.map(singleUnit => (
              <option key={singleUnit} value={singleUnit}>
                {singleUnit}
              </option>
            ))}
          </select>
        )}
        {label === 'Age' && (
          <span className='absolute right-3 transform text-gray-500 pointer-events-none sm:text-xs md:text-sm'>
            Years
          </span>
        )}
      </div>
    </label>
  );
}
