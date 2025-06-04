import React from 'react';
import InstagramIcon from '@/assets/icons/instagram_icon.png';
import TwitterIcon from '@/assets/icons/twitter_icon.png';
import YoutubeIcon from '@/assets/icons/youtube_icon.png';
import FacebookIcon from '@/assets/icons/facebook_icon.png';

const Icons = [InstagramIcon, TwitterIcon, YoutubeIcon, FacebookIcon];

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
        <div className='flex flex-row w-full justify-center gap-2 mt-4'>
          {Icons.map((icon, index) => (
            <img src={icon} key={index} className='w-10 cursor-pointer' />
          ))}
        </div>
      </div>
    </footer>
  );
}
