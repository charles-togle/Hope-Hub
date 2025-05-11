export default function VideoList ({ videos, onVideoSelect }) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {videos.map(video => (
        <div
          key={video.id.videoId}
          onClick={() => onVideoSelect(video)}
          className='flex flex-col items-center gap-2 p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer'
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className='w-1/2 h-auto rounded-md'
          />
          <h4 className='text-sm font-medium text-gray-800 text-center'>
            {video.snippet.title}
          </h4>
        </div>
      ))}
    </div>
  );
}
