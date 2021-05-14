import { reactive, toRefs } from 'vue'
import { getFeverClinicInfoList, FeverClinicInfoListResponse } from '@/api'

export interface VaccPointInfoType {
    pageNo: number
    pageSize: number
    infoList: FeverClinicInfoListResponse
    loading: boolean
    finished: boolean
    refreshing: boolean
}

export const feverClinicListEffect = () => {

    const info = reactive<VaccPointInfoType>({
        pageNo: 1,
        pageSize: 6,
        infoList: [],
        loading: false,
        finished: false,
        refreshing: false
    })

    const requestFeverClinicInfoList =  async ()=> {
        const res = await getFeverClinicInfoList({
            pageSize: info.pageSize,
            pageNo: info.pageNo
        })
        const data = res.data
        info.loading = false
        if(info.refreshing) {
            info.infoList = data
            info.refreshing = false
            info.finished = false
            if(data.length < info.pageSize) {
                info.finished = true
            }
        }else {
            info.infoList = [...info.infoList, ...data]
            if(data.length < info.pageSize) {
                info.finished = true
            }
        }
    }

    const onLoad = () => {
        if(!info.finished || !info.loading) {
            info.loading = true
            info.pageNo += 1
            requestFeverClinicInfoList()
        }
    }
    const onRefresh = () => {
        if(!info.loading) {
            info.refreshing = true
            info.loading = true
            info.pageNo = 1
            requestFeverClinicInfoList()
        }
    }

    return {...toRefs(info)  ,requestFeverClinicInfoList, onLoad, onRefresh}
}