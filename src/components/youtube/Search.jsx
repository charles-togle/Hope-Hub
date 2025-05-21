import React, { useState } from 'react';
import SearchIcon from '@/assets/icons/search_icon.png';

export default function Search ({ onSearch, className }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className} flex gap-6 items-center justify-end`}
    >
      <input
        type='text'
        placeholder='Search Videos'
        value={query}
        onChange={e => setQuery(e.target.value)}
        className='w-3/4 p-2 h-10 border-1 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <div>
        <button
          type='submit'
          className='bg-white gap-2 self-end flex flex-row items-center justify-center font-content font-medium hover:brightness-95'
        >
          <img src={SearchIcon} className='h-5' />
          Search
        </button>
      </div>
    </form>
  );
}
