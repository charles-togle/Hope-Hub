export default function VideoPlayer ({ video, className }) {
  if (!video) {
    return <div>Search and select a video to play</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={`bg-accent-dark-blue p-4 rounded-lg w-full ${className}`}>
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
      <h2 className='text-2xl font-bold font-heading mb-2 text-primary-yellow'>
        {video.snippet.title}
      </h2>
      <p className='text-content font-content'>{video.snippet.description}</p>
    </div>
  );
}
