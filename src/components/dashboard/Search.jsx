import SearchIcon from '@/assets/icons/search_icon.png';

export default function Search ({}) {
  return (
    <>
      <input
        type='text'
        placeholder='Search Student Name'
        className='rounded-lg border-1 w-full border-black h-1/2 pl-3'
      />
      <div className='flex flex-row h-1/3 '>
        <img src={SearchIcon} alt='search' />
        <p>Search</p>
      </div>
    </>
  );
}
