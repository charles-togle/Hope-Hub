import PageHeading from '@/components/PageHeading';
import VideoHeading from '@/components/discover-more/VideoHeading';
import VideoList from '@/components/discover-more/VideoList';
import VideoPlayer from '@/components/discover-more/VideoPlayer';
import { UpperBodyVideos } from '@/utilities/DiscoverMoreVideos';
import { LowerBodyVideos } from '@/utilities/DiscoverMoreVideos';
import { useRef, useState } from 'react';
export default function DiscoverMore () {
  const [videoDetails, setVideoDetails] = useState({});
  const parentContainerRef = useRef();
  const handleVideoClick = video => {
    setVideoDetails(video);
    if (parentContainerRef.current) {
      parentContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id='discover-more'
      className='parent-container overflow-y-auto'
      ref={parentContainerRef}
    >
      <PageHeading text='Discover More'></PageHeading>
      <div className='content-container w-full! pt-10!'>
        {Object.keys(videoDetails).length !== 0 && (
          <VideoPlayer video={videoDetails}></VideoPlayer>
        )}
        <div className='relative w-full'>
          <div className='absolute left-0'>
            <VideoHeading text='Upper Body'></VideoHeading>
          </div>
          <div className='mt-20 w-9/10 mr-auto ml-auto '>
            <VideoList
              videos={UpperBodyVideos}
              onVideoClick={handleVideoClick}
            ></VideoList>
          </div>
        </div>
        <div className='relative w-full mt-10'>
          <div className='absolute left-0'>
            <VideoHeading text='Lower Body'></VideoHeading>
          </div>
          <div className='mt-20 w-9/10 mr-auto ml-auto '>
            <VideoList
              videos={LowerBodyVideos}
              onVideoClick={handleVideoClick}
            ></VideoList>
          </div>
        </div>
      </div>
    </section>
  );
}
