import PageHeading from '@/components/PageHeading';
import VideoHeading from '@/components/discover-more/VideoHeading';
import VideoList from '@/components/discover-more/VideoList';
import VideoPlayer from '@/components/discover-more/VideoPlayer';
import Footer from '@/components/Footer';
import Content from '@/components/health-calculators/Content';
import { UpperBodyVideos } from '@/utilities/DiscoverMoreVideos';
import { LowerBodyVideos } from '@/utilities/DiscoverMoreVideos';
import { References } from '@/utilities/DiscoverMoreVideos';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Citation from '@/components/Citations';
export default function DiscoverMore () {
  const [videoDetails, setVideoDetails] = useState({});
  const parentContainerRef = useRef();
  const navigate = useNavigate();
  const { videoUrl } = useParams();

  const combinedVideos = [...UpperBodyVideos, ...LowerBodyVideos];

  useEffect(() => {
    if (videoUrl) {
      const foundVideo = combinedVideos.find(video => video.url === videoUrl);
      if (foundVideo) {
        setVideoDetails(foundVideo);
      } else {
        navigate('/discover-more', { replace: true });
      }
    } else {
      setVideoDetails({});
    }
  }, [videoUrl, navigate]);

  const handleVideoClick = video => {
    setVideoDetails(video);
    navigate(`/discover-more/${video.url}`);
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
      <div className='flex flex-col gap-10 mt-10 px-5 sm:text-xs md:text-sm w-[95%] mr-auto ml-auto '>
        <Citation citations={References} title='References' />
      </div>
      <Footer></Footer>
    </section>
  );
}
