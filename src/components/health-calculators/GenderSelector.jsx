export default function GenderSelector ({ gender, setGender }) {
  return (
    <div className='flex flex-row justify-between w-full font-content'>
      <p className='text-lg'>Gender</p>
      <div className='w-2/3 flex justify-around'>
        <label className='text-lg'>
          <input
            type='radio'
            name='gender'
            value='male'
            checked={gender === 'male'}
            onChange={e => setGender(e.target.value)}
            className='scale-150 border-2 border-black mr-3'
          />
          Male
        </label>
        <label className='text-lg'>
          <input
            type='radio'
            name='gender'
            value='female'
            checked={gender === 'female'}
            onChange={e => setGender(e.target.value)}
            className='scale-150 border-2 border-black mr-3'
          />
          Female
        </label>
      </div>
    </div>
  );
}
