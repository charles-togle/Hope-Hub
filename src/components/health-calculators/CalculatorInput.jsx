export default function CalculatorInput ({
  label,
  units,
  value,
  setValue,
  unit,
  setUnit,
}) {
  return (
    <label className='flex flex-row justify-between font-content'>
      <span className='text-lg'>{label}</span>
      <div className='relative w-2/3'>
        <input
          type='number'
          value={value}
          onChange={e => setValue(e.target.value)}
          className='border-1 border-black rounded-lg pr-20 pl-3 py-1 w-full'
        />
        {label !== 'Age' && units && (
          <select
            name='unit'
            id='unit'
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-500 border-none outline-none cursor-pointer text-base'
          >
            {units.map(singleUnit => (
              <option key={singleUnit} value={singleUnit}>
                {singleUnit}
              </option>
            ))}
          </select>
        )}
        {label === 'Age' && (
          <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-base'>
            Years old
          </span>
        )}
      </div>
    </label>
  );
}
