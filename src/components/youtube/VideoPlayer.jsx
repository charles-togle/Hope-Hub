export default function VideoPlayer ({ video, className = '' }) {
  if (!video) {
    return <div>Search and select a video to play</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={`bg-accent-dark-blue rounded-lg w-full ${className}`}>
      <div className='video-player mb-4'>
        <iframe
          title='YouTube video player'
          src={url}
          width='100%'
          height='500'
          allow='autoplay; encrypted-media'
          allowFullScreen
          className='rounded-md w-full'
        />
      </div>
      <h2 className='text-2xl font-bold font-content mb-2 text-primary-blue'>
        {video.snippet.title}
        <hr className='w-1/2 border-primary-yellow border-1 mt-4 mb-4' />
      </h2>
      <p className='text-content w-full overflow-x-hidden pr-2 pl-2 font-content text-justify max-h-60 overflow-y-auto'>
        {video.snippet.description}
      </p>
    </div>
  );
}
