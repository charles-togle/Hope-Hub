import PageHeading from '@/components/PageHeading';
import youtube from '@/client/youtube';
import Search from '@/components/youtube/Search';
import VideoList from '@/components/youtube/VideoList';
import VideoPlayer from '@/components/youtube/VideoPlayer';
import Pagination from '@/components/youtube/Pagination';
import { useState, useEffect } from 'react';
import BackgroundImage from '@/assets/images/generic_bg.png';

export default function DiscoverMore () {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRelatedVideos = async videoId => {
    const response = await youtube.get('/search', {
      params: {
        relatedToVideoId: videoId,
        type: 'video',
        q: 'fitness',
      },
    });

    setVideos(response.data.items);
    setNextPageToken(response.data.nextPageToken || null);
    setPrevPageToken(response.data.prevPageToken || null);
  };

  const fetchVideoDurations = async videos => {
    const videoIds = videos.map(video => video.id.videoId).join(',');
    const response = await youtube.get('/videos', {
      params: {
        id: videoIds,
        part: 'contentDetails',
      },
    });

    const durations = response.data.items.reduce((acc, item) => {
      acc[item.id] = item.contentDetails.duration;
      return acc;
    }, {});

    console.log(durations);

    return videos.map(video => ({
      ...video,
      duration: durations[video.id.videoId] || 'N/A',
    }));
  };

  const handleSearch = async (query, pageToken = '') => {
    const fullQuery = `${query} fitness`;

    setSearchQuery(fullQuery);

    const response = await youtube.get('/search', {
      params: {
        q: fullQuery,
        pageToken: pageToken,
      },
    });

    const videosWithDurations = await fetchVideoDurations(response.data.items);

    setVideos(videosWithDurations);
    setNextPageToken(response.data.nextPageToken || null);
    setPrevPageToken(response.data.prevPageToken || null);
  };

  const handleVideoSelect = video => {
    setSelectedVideo(video);
    fetchRelatedVideos(video.id.videoId);
  };

  useEffect(() => {
    const searchAndPlayFirstVideo = async () => {
      const response = await youtube.get('/search', {
        params: {
          q: 'fitness tips',
          type: 'video',
        },
      });

      const firstVideo = response.data.items[0];
      if (firstVideo) {
        const videosWithDurations = await fetchVideoDurations(
          response.data.items,
        );
        setSelectedVideo(videosWithDurations[0]);
        setVideos(videosWithDurations);
        setNextPageToken(response.data.nextPageToken || null);
        setPrevPageToken(response.data.prevPageToken || null);
      }
    };

    searchAndPlayFirstVideo();
  }, []); // Run only once when the component mounts

  return (
    <section
      id='discover-more'
      className='parent-container h-fit relative bg-transparent! '
    >
      <PageHeading text='Discover More'></PageHeading>
      <div className='h-screen overflow-hidden  mt-5 '>
        <div className='content-container  shadow-md border-3 border-accent-blue rounded-lg p-6 w-full!  bg-transparent! relative'>
          <img src={BackgroundImage} className='fixed top-0 -z-1' alt='' />
          <Search onSearch={handleSearch} />
          <div className='grid grid-cols-[65%_35%] grid-rows-2'>
            <VideoPlayer video={selectedVideo} />
            <div className='h-90'>
              <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
              {videos.length > 0 && ( // Only show Pagination if videos are available
                <Pagination
                  onPrev={() => handleSearch(searchQuery, prevPageToken)}
                  onNext={() => handleSearch(searchQuery, nextPageToken)}
                  hasPrev={!!prevPageToken}
                  hasNext={!!nextPageToken}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
