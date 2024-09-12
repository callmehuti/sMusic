import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getTrending } from '../api/apis';

// icons
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';

import styles from '@styles/Trending.module.scss';
import SongItem from '@components/SongItem/SongItem';
import SkeletonSongItem from '@components/SongItem/SkeletonSongItem';

function Trending() {
  const [page, setPage] = useState(0);

  //avoid using useQuery() directly in your component, should be put in a custom hook for reuse later.
  const { data, isLoading } = useQuery({
    queryKey: ['trending', page],
    queryFn: () => getTrending(page),
    staleTime: 60 * 1000,
    gcTime: 120 * 1000,
    retry: 3,
    refetchOnWindowFocus: false
  });

  return (
    <div className={styles.trendingContainer}>
      <div className={`${styles.trendingHeader}`}>
        <div className={styles.trendingBtn}>
          <span
            className={data?.prevPageToken ? styles.clickable : ''}
            role={'prev'}
            onClick={() => {
              if (page <= 0) return;
              setPage(page - 1);
            }}
          >
            <MdArrowBackIosNew />
          </span>
          <span
            role={'next'}
            className={data?.nextPageToken ? styles.clickable : ''}
            onClick={() => {
              if (data && page >= data.pageInfo.totalResults / data.pageInfo.resultsPerPage) return;
              setPage(page + 1);
            }}
          >
            <MdArrowForwardIos />
          </span>
        </div>
        <p>Trending</p>
      </div>
      <div className='overflow-y-auto no-scrollbar' style={{ height: '90%', padding: '1rem 2rem' }}>
        {isLoading ? (
          <SkeletonSongItem quantity={10} />
        ) : (
          data?.items.map((item, index) => {
            return (
              <SongItem
                key={item.id}
                pos={index + 1}
                imgPath={item?.snippet?.thumbnails?.medium?.url}
                title={item?.snippet?.title}
                channel={item?.snippet?.channelTitle}
                pageNumber={page}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Trending;
