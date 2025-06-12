import SearchIcon from '@/assets/icons/search_icon.png';

export default function Search ({
  onSearch,
  placeholder = 'Search Student Name',
}) {
  const handleInputChange = e => {
    const searchTerm = e.target.value;
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <>
      <input
        type='text'
        placeholder={placeholder}
        className='rounded-lg border-1 w-full border-black h-1/2 pl-3'
        onChange={handleInputChange}
      />
      <div className='flex flex-row h-1/3 '>
        <img src={SearchIcon} alt='search' />
        <p>Search</p>
      </div>
    </>
  );
}
