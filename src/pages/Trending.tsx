import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getTrending } from "../api/apis";

// icons
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

import styles from "./trending.module.scss";
import SongItem from "../components/SongItem/SongItem";

function Trending() {
  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["trending", page],
    queryFn: () => getTrending(),
    staleTime: 60 * 1000,
    gcTime: 120 * 1000,
    retry: 3,
  });

  const { mutate } = useMutation({
    mutationFn: (pageToken: string) => getTrending(pageToken),
    onSuccess: (data) => queryClient.setQueryData(["trending", page], data),
  });

  console.log(page);

  // co che caching
  // gcTime het thoi gian: fetch lai du lieu
  // gcTime chua het thoi gian staleTime chua bi het thoi gian, tra ve du lieu da caching
  // staleTime het thoi gian tra ve du lieu da caching dong thoi fetch api ngam va cap nhat lai du lieu

  if (isLoading) return <div>Loading</div>;

  return (
    <div className={styles.trendingContainer}>
      <div className={styles.trendingHeader}>
        <div className={styles.trendingBtn}>
          <span
            className={data?.prevPageToken ? styles.clickable : ""}
            onClick={() => {
              mutate(data?.prevPageToken);
              setPage(() => page - 1);
            }}
          >
            <MdArrowBackIosNew />
          </span>
          <span
            className={data?.nextPageToken ? styles.clickable : ""}
            onClick={() => {
              mutate(data?.nextPageToken);
              setPage(() => page + 1);
            }}
          >
            <MdArrowForwardIos />
          </span>
        </div>
        <p>Trending</p>
      </div>
      <div>
        {data?.items.map((item, index) => {
          return (
            <SongItem
              pos={index + 1}
              imgPath={item?.snippet?.thumbnails?.medium?.url}
              title={item?.snippet?.title}
              channel={item?.snippet?.channelTitle}
              pageNumber={page}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Trending;
