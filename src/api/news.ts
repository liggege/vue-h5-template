import request from '@/utils/request'

export type NewsListRequest = {pageSize: number; pageNo: number; type?:string[];areaCode?:string};
export type NewsList = {
    id: string;
    title: string;
    desctiption: string
    imgUrl: string;
}
export type NewsListResponse = NewsList[]

export type NewsDetailRequest = { id: string }
export type NewsDeatilResponse  = NewsList & {
    content: string;
    origin: string;
    pushTime: string;
    url?: string
}

export function getNewsList(data: NewsListRequest) {
    return request<NewsListResponse>({
        url: '/news',
        method: 'POST',
        data
    })
}

export function getNewsDetail(data: NewsDetailRequest) {
    return request<NewsDeatilResponse>({
        url: `/news/${data.id}`,
        method: 'GET'
    })
}
