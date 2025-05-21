const formatDuration = isoDuration => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 'N/A';

  const [, hours, minutes, seconds] = match.map(val =>
    val ? parseInt(val, 10) : 0,
  );

  const formatted = [
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
    seconds > 0 ? `${seconds}s` : null,
  ]
    .filter(Boolean)
    .join(' ');

  return formatted || '0s';
};

export default function VideoList ({ videos, onVideoSelect, className }) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 font-content w-full overflow-y-auto ${className}`}
    >
      {videos.map(video => (
        <div
          key={video.id.videoId}
          onClick={() => onVideoSelect(video)}
          className='flex flex-row items-center gap-5 rounded-md hover:brightness-80 cursor-pointer'
        >
          <div className='relative'>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className='w-full h-auto rounded-md'
            />
            <p className='text-xs text-white mt-2 absolute bottom-2 right-2 bg-black bg-opacity-40 p-1 pl-2 pr-2'>
              {formatDuration(video.duration)}
            </p>
          </div>
          <h4 className='text-sm font-medium text-black text-left w-full'>
            {video.snippet.title}
          </h4>
        </div>
      ))}
    </div>
  );
}
