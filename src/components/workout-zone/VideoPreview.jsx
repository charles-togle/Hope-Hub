import { useEffect } from 'react';
import { useState } from 'react';

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function VideoPreview ({
  thumbnail,
  title,
  duration,
  uploadDate,
}) {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (thumbnail) {
      const img = new Image();
      img.onload = () => setIsLoading(false);
      img.onerror = () => setIsLoading(false);
      img.src = thumbnail;
    }
  }, [thumbnail]);

  return (
    <div
      id='video-preview'
      className='aspect-video pb-5 lg:pb-0 lg:min-w-10 max-w-full hover:brightness-80 hover:rounded-none h-fit'
    >
      <div className='relative w-fit'>
        {loading ? (
          <div className='aspect-video lg:min-w-10 animate-pulse bg-gray-300 h-35 lg:h-50 rounded-lg'></div>
        ) : (
          <img
            src={thumbnail}
            className=' rounded-lg hover:rounded-none h-35 lg:h-50'
            alt={title}
          />
        )}
        <p className='absolute bottom-2 right-2 z-1 text-white bg-black p-1 text-sm opacity-95 font-medium'>
          {duration}
        </p>
      </div>
      <div>
        <p className='font-content font-semibold'>{title}</p>
        <p className='text-sm text-gray-500'>{formatDate(uploadDate)}</p>
      </div>
    </div>
  );
}
