import { reactive, toRefs } from 'vue'
import { getVaccPointInfoList, VaccPointInfoListResponse } from '@/api'

export interface VaccPointInfoType {
    pageNo: number
    pageSize: number
    pointList: VaccPointInfoListResponse
    loading: boolean
    finished: boolean
    refreshing: boolean
}

export const pointListEffect = () => {

    const info = reactive<VaccPointInfoType>({
        pageNo: 1,
        pageSize: 6,
        pointList: [],
        loading: false,
        finished: false,
        refreshing: false
    })

    const requestPointList =  async ()=> {
        const res = await getVaccPointInfoList({
            pageSize: info.pageSize,
            pageNo: info.pageNo
        })
        const data = res.data
        info.loading = false
        if(info.refreshing) {
            info.pointList = data
            info.refreshing = false
            info.finished = false
            if(data.length < info.pageSize) {
                info.finished = true
            }
        }else {
            info.pointList = [...info.pointList, ...data]
            if(data.length < info.pageSize) {
                info.finished = true
            }
        }
    }

    const onLoad = () => {
        if(!info.finished || !info.loading) {
            info.loading = true
            info.pageNo += 1
            requestPointList()
        }
    }
    const onRefresh = () => {
        if(!info.loading) {
            info.refreshing = true
            info.loading = true
            info.pageNo = 1
            requestPointList()
        }
    }

    return {...toRefs(info)  ,requestPointList, onLoad, onRefresh}
}