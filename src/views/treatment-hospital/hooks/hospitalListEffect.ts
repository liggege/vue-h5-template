import { reactive, toRefs } from 'vue'
import {
  getTreatmentHospitalInfoList,
  TreatmentHospitalInfoListResponse
} from '@/api'

export interface HospitalInfoType {
  pageNo: number
  pageSize: number
  hospitalList: TreatmentHospitalInfoListResponse
  loading: boolean
  finished: boolean
  refreshing: boolean
}

export const hospitalListEffect = () => {
  const info = reactive<HospitalInfoType>({
    pageNo: 1,
    pageSize: 6,
    hospitalList: [],
    loading: false,
    finished: false,
    refreshing: false
  })

  const requestHospitalList = async () => {
    const res = await getTreatmentHospitalInfoList({
      pageSize: info.pageSize,
      pageNo: info.pageNo
    })
    const data = res.data
    info.loading = false
    if (info.refreshing) {
      info.hospitalList = data
      info.refreshing = false
      info.finished = false
      if (data.length < info.pageSize) {
        info.finished = true
      }
    } else {
      info.hospitalList = [...info.hospitalList, ...data]
      if (data.length < info.pageSize) {
        info.finished = true
      }
    }
  }

  const onLoad = () => {
    if (!info.finished || !info.loading) {
      info.loading = true
      info.pageNo += 1
      requestHospitalList()
    }
  }
  const onRefresh = () => {
    if (!info.loading) {
      info.refreshing = true
      info.loading = true
      info.pageNo = 1
      requestHospitalList()
    }
  }

  return { ...toRefs(info), requestHospitalList, onLoad, onRefresh }
}
