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

  const fetchFullVideoDetails = async videos => {
    const videoIds = videos.map(video => video.id.videoId).join(',');

    const response = await youtube.get('/videos', {
      params: {
        id: videoIds,
        part: 'snippet,contentDetails',
      },
    });

    const detailsMap = response.data.items.reduce((acc, item) => {
      acc[item.id] = {
        snippet: item.snippet,
        duration: item.contentDetails.duration,
      };
      return acc;
    }, {});

    return videos.map(video => {
      const id = video.id.videoId;
      const details = detailsMap[id];

      return {
        ...video,
        snippet: {
          ...details?.snippet,
        },
        duration: details?.duration || 'N/A',
      };
    });
  };

  const fetchRelatedVideos = async videoId => {
    const response = await youtube.get('/search', {
      params: {
        relatedToVideoId: videoId,
        type: 'video',
        q: 'fitness',
      },
    });

    const fullVideos = await fetchFullVideoDetails(response.data.items);
    setVideos(fullVideos);
    setNextPageToken(response.data.nextPageToken || null);
    setPrevPageToken(response.data.prevPageToken || null);
  };

  const handleSearch = async (query, pageToken = '') => {
    const fullQuery = `${query} fitness`;
    setSearchQuery(fullQuery);

    const response = await youtube.get('/search', {
      params: {
        q: fullQuery,
        pageToken: pageToken,
        type: 'video',
      },
    });

    const fullVideos = await fetchFullVideoDetails(response.data.items);
    setVideos(fullVideos);
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

      const fullVideos = await fetchFullVideoDetails(response.data.items);
      if (fullVideos.length > 0) {
        setSelectedVideo(fullVideos[0]);
        setVideos(fullVideos);
        setNextPageToken(response.data.nextPageToken || null);
        setPrevPageToken(response.data.prevPageToken || null);
      }
    };

    searchAndPlayFirstVideo();
  }, []);

  return (
    <section
      id='discover-more'
      className='parent-container h-fit relative bg-transparent!'
    >
      <PageHeading text='Discover More' />
      <div className='h-fit flex flex-col items-center justify-center mr-auto ml-auto'>
        <div className='flex flex-row justify-between mb-8 w-[85%] mt-10'>
          <div>
            <p className='font-heading text-4xl text-primary-blue'>
              YouTube Search
            </p>
            <hr className='w-3/4 border-1 border-primary-yellow mt-2' />
          </div>
          <Search onSearch={handleSearch} className='w-[50%] -mr-10' />
        </div>
        <div className='w-[85%] shadow-md mb-10 border-2 border-accent-blue rounded-lg p-6 bg-transparent! relative'>
          <div className='grid grid-cols-[59%_39%] gap-x-[2%] grid-rows-1 max-h-[120vh]'>
            <VideoPlayer video={selectedVideo} />
            <div className='h-full'>
              <VideoList
                videos={videos}
                onVideoSelect={handleVideoSelect}
                className='h-[90%]'
              />
              {videos.length > 0 && (
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
