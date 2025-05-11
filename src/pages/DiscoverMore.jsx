import PageHeading from '@/components/PageHeading';
import youtube from '@/client/youtube';
import Search from '@/components/youtube/Search';
import VideoList from '@/components/youtube/VideoList';
import VideoPlayer from '@/components/youtube/VideoPlayer';
import Pagination from '@/components/youtube/Pagination';
import { useState } from 'react';

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

  const handleSearch = async (query, pageToken = '') => {
    const fullQuery = `${query} fitness`;

    setSearchQuery(fullQuery);

    const response = await youtube.get('/search', {
      params: {
        q: fullQuery,
        pageToken: pageToken,
      },
    });

    setVideos(response.data.items);
    setNextPageToken(response.data.nextPageToken || null);
    setPrevPageToken(response.data.prevPageToken || null);
  };

  const handleVideoSelect = video => {
    setSelectedVideo(video);
    fetchRelatedVideos(video.id.videoId);
  };
  return (
    <section id='discover-more' className='parent-container p-6 bg-gray-100'>
      <PageHeading text='Discover More'></PageHeading>
      <div className='content-container bg-white shadow-md border-2 mt-5 border-accent-blue rounded-lg p-6 w-[90%]!'>
        <h1 className='text-2xl text-left w-full font-bold mb-4 text-primary-yellow'>
          YouTube Search
        </h1>
        <Search onSearch={handleSearch} />
        <div className='mt-6'>
          <div className='w-full'>
            <VideoPlayer video={selectedVideo} />
          </div>
          <div className='mt-6'>
            <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
          </div>
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
    </section>
  );
}
