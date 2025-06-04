export default function VideoPlayer ({ video }) {
  return (
    <>
      <div id='video-player' className='w-7/10'>
        <div>
          <video
            src={video.videoLink}
            about={video.videoTitle}
            controls
            className='rounded-lg'
          />
        </div>
        <div id='video-details' className='mt-5 mb-20'>
          <h2 className='text-3xl font-content text-primary-blue font-medium'>
            {video.title}
          </h2>
          <hr className='w-1/3 border-1 border-primary-yellow mt-2 mb-4' />
          <p>{video.description}</p>
        </div>
      </div>
      <hr className='w-full border-1 border-black mb-10' />
    </>
  );
}
