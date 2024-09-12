import api from './config.api'

interface ITrendingRes {
  nextPageToken?: string
  prevPageToken?: string
  items: ITrendingItem[]
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}

interface ITrendingItem {
  id: string
  snippet: {
    title: string
    channelTitle: string
    thumbnails: {
      medium: {
        url: string
      }
    }
  }
}

interface IPageWithToken {
  [key: number]: string
}

const pageWithToken: IPageWithToken = {}

export const getTrending = async (page = 0): Promise<ITrendingRes | null> => {
  try {
    const pageToken = pageWithToken[page] || ''
    const endpoint = '/getYoutubeTrending'
    const res = await api.get(endpoint, {
      params: {
        pageToken
      }
    })
    if (res?.data?.result?.prevPageToken) {
      pageWithToken[page - 1] = res.data.result.prevPageToken
    }

    if (res?.data?.result?.nextPageToken) {
      pageWithToken[page + 1] = res.data.result.nextPageToken
    }
    console.log(page, pageWithToken)
    return res.data.result
  } catch (error) {
    return null
  }
}
