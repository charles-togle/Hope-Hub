import React from 'react';

export default function Footer () {
  return (
    <footer className='flex flex-row bg-[#121212] min-h-[30vh] max-h-[30vh] h-[30vh] w-full items-center p-5 mt-10'>
      <p className='text-primary-blue font-content w-fit pl-10 text-3xl font-semibold italic'>
        Discover your health <br />
        strenghten your body <br /> unlock your potential
      </p>
      <hr className='h-30 border-1 border-primary-yellow mr-10 ml-10' />
      <div className='w-6/10 flex flex-col'>
        <p className='text-white text-center mt-5'>
          The Hope Hub, we believe in the Power of Physical Education to inspire
          change and create a lasting impact on well-being. Whether you're
          teaching the next generation of students or building your own fitness
          knowledge, we're here to guide you every step of the way.{' '}
        </p>
        <div></div>
      </div>
    </footer>
  );
}
