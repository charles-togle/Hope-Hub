import PageHeading from '@/components/PageHeading';
import youtubeFetch from '@/client/youtube';
import Search from '@/components/discover-more-legacy/Search';
import VideoList from '@/components/discover-more-legacy/VideoList';
import VideoPlayer from '@/components/discover-more-legacy/VideoPlayer';
import Pagination from '@/components/discover-more-legacy/Pagination';
import { useState, useEffect, useRef } from 'react';

export default function DiscoverMore () {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);

  const fetchFullVideoDetails = async items => {
    const videoIds = items
      .map(v => v.id.videoId || v.id)
      .filter(Boolean)
      .join(',');
    if (!videoIds) return [];

    const data = await youtubeFetch('videos', {
      part: 'snippet,contentDetails',
      id: videoIds,
      maxResults: 10,
    });

    const detailsMap = data.items.reduce((acc, item) => {
      acc[item.id] = {
        snippet: item.snippet,
        duration: item.contentDetails.duration,
      };
      return acc;
    }, {});

    return items.map(video => {
      const id = video.id.videoId || video.id;
      const details = detailsMap[id] || {};
      return {
        ...video,
        snippet: { ...details.snippet },
        duration: details.duration || 'N/A',
      };
    });
  };

  const handleSearch = async (query, pageToken = '') => {
    const fullQuery = `${query} fitness`;
    setSearchQuery(fullQuery);
    try {
      const data = await youtubeFetch('search', {
        part: 'snippet',
        q: fullQuery,
        pageToken,
        type: 'video',
        maxResults: 10,
      });

      const fullVideos = await fetchFullVideoDetails(data.items);
      setVideos(fullVideos);
      setNextPageToken(data.nextPageToken || null);
      setPrevPageToken(data.prevPageToken || null);
    } catch (err) {
      // Silently fail or show user-friendly UI feedback if needed
    }
  };

  const handleVideoSelect = video => {
    if (window.innerWidth < 1024) {
      document.querySelectorAll('*').forEach(el => {
        if (el.scrollTop > 0) el.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    setSelectedVideo(video);
    if (nextPageToken) {
      handleSearch(searchQuery, nextPageToken);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const data = await youtubeFetch('search', {
          part: 'snippet',
          q: 'fitness tips',
          type: 'video',
          maxResults: 10,
        });

        const fullVideos = await fetchFullVideoDetails(data.items);
        if (fullVideos.length) {
          setSelectedVideo(fullVideos[0]);
          setVideos(fullVideos);
          setNextPageToken(data.nextPageToken || null);
          setPrevPageToken(data.prevPageToken || null);
        }
      } catch (err) {
        // Silently fail or show user-friendly UI feedback if needed
      }
    };
    init();
  }, []);

  return (
    <section
      id='discover-more'
      className='parent-container h-fit relative bg-transparent'
    >
      <PageHeading text='Discover More' />
      <div
        ref={containerRef}
        className='h-fit flex flex-col items-center justify-center mx-auto'
      >
        <div className='flex justify-between mb-8 w-4/5 mt-10'>
          <div>
            <p className='font-heading text-4xl text-primary-blue'>
              YouTube Search
            </p>
            <hr className='w-3/4 border-1 border-primary-yellow mt-2' />
          </div>
          <Search onSearch={handleSearch} className='w-1/2 -mr-10' />
        </div>
        <div className='w-4/5 shadow-md mb-10 border-2 border-accent-blue rounded-lg p-6'>
          <div className='flex flex-col sm:gap-10 lg:grid lg:grid-cols-[59%_39%] gap-x-4 lg:min-h-[100vh] lg:max-h-[120vh]'>
            <VideoPlayer video={selectedVideo} />
            <div className='h-full'>
              <VideoList
                videos={videos}
                onVideoSelect={handleVideoSelect}
                className='h-7/10 lg:flex lg:flex-col grid grid-cols-2'
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
