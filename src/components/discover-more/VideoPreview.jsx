export default function VideoPreview ({
  thumbnail,
  title,
  duration,
  uploadDate,
}) {
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      id='video-preview'
      className='min-w-50 pb-5 lg:pb-0 lg:min-w-10 max-w-full hover:brightness-80 hover:rounded-none overflow-hidden'
    >
      <div className='relative w-fit'>
        <img src={thumbnail} className=' rounded-lg hover:rounded-none' />
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
