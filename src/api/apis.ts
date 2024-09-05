import { AxiosResponse } from "axios";
import api from "./config.api";

interface ITrendingRes {
  nextPageToken?: string,
  prevPageToken?: string
}

export const getTrending = async (pageToken = ''): Promise<AxiosResponse<ITrendingRes>> => {
  const endpoint = `/getYoutubeTrending`;
  const res = await api.get<ITrendingRes>(endpoint, {
    params: {
      pageToken
    }
  });
  return res;
}