import { reactive, toRefs } from 'vue'
import { getNewsList, NewsListResponse } from '@/api'

export interface NewsListInfoType {
  pageNo: number
  pageSize: number
  newsList: NewsListResponse
  loading: boolean
  finished: boolean
  refreshing: boolean
}

export const newsListEffect = () => {
  const info = reactive<NewsListInfoType>({
    pageNo: 1,
    pageSize: 6,
    newsList: [],
    loading: false,
    finished: false,
    refreshing: false
  })

  const requestNewsList = async () => {
    const res = await getNewsList({
      pageSize: info.pageSize,
      pageNo: info.pageNo
    })
    const data = res.data
    info.loading = false
    if (info.refreshing) {
      info.newsList = data
      info.refreshing = false
      info.finished = false
      if (data.length <= info.pageSize) {
        info.finished = true
      }
    } else {
      info.newsList = [...info.newsList, ...data]
      if (data.length <= info.pageSize) {
        info.finished = true
      }
    }
  }

  const onLoad = () => {
    if (!info.finished || !info.loading) {
      info.loading = true
      info.pageNo += 1
      requestNewsList()
    }
  }
  const onRefresh = () => {
    if (!info.loading) {
      info.refreshing = true
      info.loading = true
      info.pageNo = 1
      requestNewsList()
    }
  }

  return { ...toRefs(info), requestNewsList, onLoad, onRefresh }
}
