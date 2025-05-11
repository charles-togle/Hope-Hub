import React, { useState } from 'react';

export default function Search ({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className='flex w-full gap-6'>
      <input
        type='text'
        placeholder='Search YouTube...'
        value={query}
        onChange={e => setQuery(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button
        type='submit'
        className='px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600'
      >
        Search
      </button>
    </form>
  );
}
